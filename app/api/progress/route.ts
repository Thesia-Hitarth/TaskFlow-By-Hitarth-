// app/api/progress/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskflowContent } from "@/lib/taskflow-content";
import { NodeStatus } from "@prisma/client";

function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // GET requests don't need CSRF checking or same-origin server-side request
  const allowedOrigin = getAllowedOrigin();
  return origin.startsWith(allowedOrigin);
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
  // Size limit validation (BUG-03): Reject bodies larger than 2KB
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

  // Validate slug against known taskflow slugs (BUG-03)
  const content = taskflowContent[slug];
  if (!content) {
    return NextResponse.json({ error: "Unknown slug" }, { status: 400 });
  }

  // Validate nodeId belongs to this taskflow (BUG-03)
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

  return NextResponse.json({ ok: true });
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

  // Validate slug against known taskflow slugs (BUG-03)
  const content = taskflowContent[slug];
  if (!content) {
    return NextResponse.json({ error: "Unknown slug" }, { status: 400 });
  }

  await prisma.userProgress.deleteMany({
    where: { userId: session.user.id, taskflowSlug: slug },
  });

  return NextResponse.json({ ok: true });
}
