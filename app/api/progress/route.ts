import { auth } from "@/auth";
import { assertSameOrigin } from "@/lib/api-security";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, nodeId, status } = await request.json();

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
