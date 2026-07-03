"use server";

import { prisma } from "@/lib/prisma";

export type FeedUser = {
  name: string | null;
  username: string | null;
  image: string | null;
};

export type FeedItem =
  | { type: "progress"; user: FeedUser; nodeId: string; taskflowSlug: string; time: string }
  | { type: "project"; user: FeedUser; projectId: string; title: string; time: string };

export async function getMoreActivityAction(
  beforeTimeISO: string,
  limit = 10
): Promise<{ items: FeedItem[]; nextBeforeTimeISO: string | null }> {
  const beforeTime = new Date(beforeTimeISO);
  if (isNaN(beforeTime.getTime())) {
    return { items: [], nextBeforeTimeISO: null };
  }

  // Run both queries concurrently (MED-004) and filter by publicProfile (HIGH-005)
  const [recentProgress, recentProjects] = await Promise.all([
    prisma.userProgress.findMany({
      where: {
        status: "done",
        user: { username: { not: null }, publicProfile: true },
        updatedAt: { lt: beforeTime },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        nodeId: true,
        taskflowSlug: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
      },
    }),
    prisma.showcaseProject.findMany({
      where: {
        isApproved: true,
        createdAt: { lt: beforeTime },
        author: { publicProfile: true },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
      },
    }),
  ]);

  // 3. Combine and sort
  const items = [
    ...recentProgress.map((p) => ({
      type: "progress" as const,
      user: p.user,
      nodeId: p.nodeId,
      taskflowSlug: p.taskflowSlug,
      time: p.updatedAt.toISOString(),
    })),
    ...recentProjects.map((p) => ({
      type: "project" as const,
      user: p.author,
      projectId: p.id,
      title: p.title,
      time: p.createdAt.toISOString(),
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, limit);

  const nextBeforeTimeISO = items.length > 0 ? items[items.length - 1].time : null;

  return { items, nextBeforeTimeISO };
}
