// BUG-024: Added CSRF protection via Origin header validation on mutating (POST) requests.
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  // GET requests don't need CSRF checking (they are safe/idempotent)
  if (!origin) return true;
  const allowedOrigin = getAllowedOrigin();
  return origin.startsWith(allowedOrigin);
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({});

  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const records = await prisma.userProgress.findMany({
    where: { userId: session.user.id, taskflowSlug: slug },
  });

  const progress: Record<string, string> = {};
  for (const r of records) progress[r.nodeId] = r.status;

  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  // CSRF check: reject requests not coming from our own origin
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

  const validStatuses = ["pending", "in-progress", "done", "skipped"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

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

  return NextResponse.json({ ok: true });
}
