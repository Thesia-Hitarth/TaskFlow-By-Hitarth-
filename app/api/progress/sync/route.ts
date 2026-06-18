// BUG-024: Added CSRF protection + input validation to the progress sync endpoint.
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // No Origin = same-origin server-side request
  const allowedOrigin = getAllowedOrigin();
  return origin.startsWith(allowedOrigin);
}

const VALID_STATUSES = new Set(["pending", "in-progress", "done", "skipped"]);

export async function POST(request: Request) {
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

  // Validate all status values before writing to DB
  for (const [nodeId, status] of Object.entries(progress)) {
    if (typeof nodeId !== "string" || !VALID_STATUSES.has(status)) {
      return NextResponse.json(
        { error: `Invalid status "${status}" for node "${nodeId}"` },
        { status: 400 }
      );
    }
  }

  for (const [nodeId, status] of Object.entries(progress)) {
    if (status === "pending") {
      await prisma.userProgress.deleteMany({
        where: { userId: session.user.id, taskflowSlug: slug, nodeId },
      });
    } else {
      await prisma.userProgress.upsert({
        where: {
          userId_taskflowSlug_nodeId: { userId: session.user.id, taskflowSlug: slug, nodeId },
        },
        update: { status },
        create: { userId: session.user.id, taskflowSlug: slug, nodeId, status },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
