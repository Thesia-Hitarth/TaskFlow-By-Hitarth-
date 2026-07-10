// app/api/progress/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskflowContent } from "@/lib/taskflow-content";
import { taskflows } from "@/lib/taskflows-data";
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

  if (!taskflowContent[slug]) {
    return NextResponse.json({ error: "Unknown slug" }, { status: 400 });
  }

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

  if (JSON.stringify(body).length > 2048) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
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

  // Return immediately — all side-effects run after the response is sent
  // so the client never waits on streak updates, badge checks, or email sends.
  const { after } = await import("next/server");
  after(async () => {
    try {
      await updateStreak(session.user.id);
      await checkAndAwardBadges(session.user.id, slug);

      // Fetch user's actual email and preferences
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { email: true, name: true, emailUnsubscribed: true, emailPreferences: true },
      });

      if (dbUser && dbUser.email && !dbUser.emailUnsubscribed) {
        const prefs = (dbUser.emailPreferences as Record<string, unknown> | null) || {};
        const completedRoadmaps = Array.isArray(prefs.completed_roadmaps)
          ? (prefs.completed_roadmaps as string[])
          : [];
        const firstNodeSent = prefs.first_node_sent === true;

        // 1. First completed topic milestone trigger
        const totalCompleted = await prisma.userProgress.count({
          where: { userId: session.user.id, status: "done" },
        });
        if (totalCompleted === 1 && !firstNodeSent) {
          const { sendFirstNodeEmail } = await import("@/lib/email/templates/milestone");
          const roadmapConfig = taskflowContent[slug];
          const roadmapMeta = taskflows.find((t) => t.slug === slug);
          const roadmapTitle = roadmapMeta?.title || slug.toUpperCase();
          const nodeConfig = roadmapConfig?.nodes.find((n) => n.id === nodeId);
          const nextEdge = roadmapConfig?.edges.find((e) => e.source === nodeId);
          const nextNode = nextEdge ? roadmapConfig?.nodes.find((n) => n.id === nextEdge.target) : undefined;

          await sendFirstNodeEmail(
            { email: dbUser.email, name: dbUser.name },
            {
              nodeLabel: nodeConfig?.label || nodeId,
              roadmapTitle,
              roadmapId: slug,
              nextNodeLabel: nextNode?.label,
            }
          );

          await prisma.user.update({
            where: { id: session.user.id },
            data: { emailPreferences: { ...prefs, first_node_sent: true } },
          });
        }

        // 2. Roadmap complete trigger
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
          if (doneCount === childNodeIds.length && childNodeIds.length > 0 && !completedRoadmaps.includes(slug)) {
            const { sendRoadmapCompleteEmail } = await import("@/lib/email/templates/roadmapComplete");
            const roadmapMeta = taskflows.find((t) => t.slug === slug);
            const roadmapTitle = roadmapMeta?.title || slug.toUpperCase();
            await sendRoadmapCompleteEmail(
              { email: dbUser.email, name: dbUser.name },
              { title: roadmapTitle, id: slug }
            );
            await prisma.user.update({
              where: { id: session.user.id },
              data: {
                emailPreferences: {
                  ...prefs,
                  completed_roadmaps: [...completedRoadmaps, slug],
                },
              },
            });
          }
        }
      }
    } catch (e) {
      console.error("[progress/after] Failed to run streak/badge check or send trigger email:", e);
    }
  });

  // NOTE: badgesAwarded is always [] here because badges are now computed in after().
  // The client will see newly-earned badges on the next page load / refresh.
  return NextResponse.json({ ok: true, badgesAwarded: [] });
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

  try {
    await prisma.userProgress.deleteMany({
      where: { userId: session.user.id, taskflowSlug: slug },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete user progress:", error);
    return NextResponse.json({ error: "Database error. Failed to reset progress." }, { status: 500 });
  }
}
