import { auth } from "@/auth";
import { assertSameOrigin } from "@/lib/api-security";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, progress } = (await request.json()) as {
    slug: string;
    progress: Record<string, string>;
  };

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
