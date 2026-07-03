// app/api/progress/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskflowContent } from "@/lib/taskflow-content";
import { NodeStatus } from "@prisma/client";
import { updateStreak } from "@/lib/streak/updateStreak";
import { checkAndAwardBadges } from "@/lib/badges/checkBadges";

import { isValidOrigin } from "@/lib/auth/verifyOrigin";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const records = await prisma.userProgress.findMany({
    where: { userId: session.user.id, taskflowSlug: slug },
  });

  const progress: Record<string, string> = {};
  for (const r of records) {
    // Map database enum in_progress to client string in-progress
    progress[r.nodeId] = r.status === "in_progress" ? "in-progress" : r.status;
  }

  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 2048) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  // CSRF check
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { slug?: string; nodeId?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { slug, nodeId, status } = body;

  if (!slug || !nodeId || !status) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const content = taskflowContent[slug];
  if (!content) {
    return NextResponse.json({ error: "Unknown slug" }, { status: 400 });
  }
  const validNodeIds = new Set(content.nodes.map((n) => n.id));
  if (!validNodeIds.has(nodeId)) {
    return NextResponse.json({ error: "Unknown nodeId" }, { status: 400 });
  }

  const validStatuses = ["pending", "in-progress", "done", "skipped"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

  // Map to DB enum name
  const dbStatus = (status === "in-progress" ? "in_progress" : status) as NodeStatus;

  if (status === "pending") {
    await prisma.userProgress.deleteMany({
      where: { userId: session.user.id, taskflowSlug: slug, nodeId },
    });
  } else {
    await prisma.userProgress.upsert({
      where: {
        userId_taskflowSlug_nodeId: { userId: session.user.id, taskflowSlug: slug, nodeId },
      },
      update: { status: dbStatus },
      create: { userId: session.user.id, taskflowSlug: slug, nodeId, status: dbStatus },
    });
  }

  let badgesAwarded: string[] = [];
  if (dbStatus === "done") {
    try {
      const awardedComeback = await updateStreak(session.user.id);
      if (awardedComeback) {
        badgesAwarded.push("comeback-kid");
      }
      const newBadges = await checkAndAwardBadges(session.user.id, slug);
      badgesAwarded = [...badgesAwarded, ...newBadges];

      // Fetch user's actual email and preferences
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { email: true, name: true, emailUnsubscribed: true, emailPreferences: true },
      });

      if (dbUser && dbUser.email && !dbUser.emailUnsubscribed) {
        const prefs = (dbUser.emailPreferences as Record<string, boolean> | null) || {};

        // 1. First completed topic milestone trigger
        const totalCompleted = await prisma.userProgress.count({
          where: { userId: session.user.id, status: "done" },
        });
        if (totalCompleted === 1) {
          const { sendFirstNodeEmail } = await import("@/lib/email/templates/milestone");
          const roadmapConfig = taskflowContent[slug];
          const nodeConfig = roadmapConfig?.nodes.find((n) => n.id === nodeId);
          const nextEdge = roadmapConfig?.edges.find((e) => e.source === nodeId);
          const nextNode = nextEdge ? roadmapConfig?.nodes.find((n) => n.id === nextEdge.target) : undefined;
          
          await sendFirstNodeEmail(
            { email: dbUser.email, name: dbUser.name },
            {
              nodeLabel: nodeConfig?.label || nodeId,
              roadmapTitle: slug.toUpperCase(),
              roadmapId: slug,
              nextNodeLabel: nextNode?.label,
            }
          );
        }

        // 2. New badges trigger
        if (badgesAwarded.length > 0 && prefs.badges !== false) {
          const { sendBadgeEarnedEmail } = await import("@/lib/email/templates/badgeEarned");
          const { BADGE_DEFINITIONS } = await import("@/lib/badges/definitions");
          for (const badgeId of badgesAwarded) {
            const badge = BADGE_DEFINITIONS[badgeId];
            if (badge) {
              await sendBadgeEarnedEmail(
                { email: dbUser.email, name: dbUser.name },
                badge
              );
            }
          }
        }

        // 3. Roadmap complete trigger
        const roadmapConfig = taskflowContent[slug];
        if (roadmapConfig) {
          const childNodeIds = roadmapConfig.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id);
          const doneCount = await prisma.userProgress.count({
            where: {
              userId: session.user.id,
              taskflowSlug: slug,
              nodeId: { in: childNodeIds },
              status: "done",
            },
          });
          if (doneCount === childNodeIds.length && childNodeIds.length > 0) {
            const { sendRoadmapCompleteEmail } = await import("@/lib/email/templates/roadmapComplete");
            await sendRoadmapCompleteEmail(
              { email: dbUser.email, name: dbUser.name },
              { title: slug.toUpperCase(), id: slug }
            );
          }
        }
      }
    } catch (e) {
      console.error("Failed to run streak/badge check or send trigger email:", e);
    }
  }

  return NextResponse.json({ ok: true, badgesAwarded });
}

export async function DELETE(request: Request) {
  // CSRF check
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const content = taskflowContent[slug];
  if (!content) {
    return NextResponse.json({ error: "Unknown slug" }, { status: 400 });
  }

  await prisma.userProgress.deleteMany({
    where: { userId: session.user.id, taskflowSlug: slug },
  });

  return NextResponse.json({ ok: true });
}
