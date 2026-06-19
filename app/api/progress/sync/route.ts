// app/api/progress/sync/route.ts
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
  if (!origin) return true; // same-origin server-side request
  const allowedOrigin = getAllowedOrigin();
  return origin.startsWith(allowedOrigin);
}

const VALID_STATUSES = new Set(["pending", "in-progress", "done", "skipped"]);

export async function POST(request: Request) {
  // Size limit validation (BUG-03): Reject bodies larger than 8KB
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 8192) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  // CSRF: reject cross-origin POST requests
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { slug?: string; progress?: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { slug, progress } = body;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Missing or invalid slug" }, { status: 400 });
  }
  if (!progress || typeof progress !== "object" || Array.isArray(progress)) {
    return NextResponse.json({ error: "Missing or invalid progress data" }, { status: 400 });
  }

  // Validate slug against known taskflow slugs (BUG-03)
  const content = taskflowContent[slug];
  if (!content) {
    return NextResponse.json({ error: "Unknown slug" }, { status: 400 });
  }

  // Get allowed node IDs for this slug
  const validNodeIds = new Set(content.nodes.map((n) => n.id));

  // Validate all status values and node IDs before writing to DB
  for (const [nodeId, status] of Object.entries(progress)) {
    if (typeof nodeId !== "string" || !validNodeIds.has(nodeId) || !VALID_STATUSES.has(status)) {
      return NextResponse.json(
        { error: `Invalid status "${status}" or nodeId "${nodeId}"` },
        { status: 400 }
      );
    }
  }

  // Perform bulk updates / deletes
  for (const [nodeId, status] of Object.entries(progress)) {
    // Map status string to DB enum value
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
  }

  return NextResponse.json({ ok: true });
}
