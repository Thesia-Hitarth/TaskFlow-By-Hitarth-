// app/api/progress/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskflowContent } from "@/lib/taskflow-content";
import { NodeStatus } from "@prisma/client";
import { updateStreak } from "@/lib/streak/updateStreak";
import { checkAndAwardBadges } from "@/lib/badges/checkBadges";

function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // GET requests don't need CSRF checking or same-origin server-side request
  const allowedOrigin = getAllowedOrigin();
  return origin === allowedOrigin;
}

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
    } catch (e) {
      console.error("Failed to run streak/badge check:", e);
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
