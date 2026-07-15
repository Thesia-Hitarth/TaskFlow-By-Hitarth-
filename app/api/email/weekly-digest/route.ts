import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { sendWeeklyDigestEmail } from "@/lib/email/templates/weeklyDigest";
import { taskflowContent } from "@/lib/taskflow-content";

import { verifyCronRequest } from "@/lib/auth/verifyCronRequest";

type WeeklyDigestUser = Prisma.UserGetPayload<{
  include: { progress: { where: object; orderBy: object; take: number } };
}>;

export async function GET(request: NextRequest) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const BATCH_SIZE = 25;
  let sent = 0;
  let processed = 0;
  let eligible = 0;
  let cursor: string | undefined = undefined;
  let hasMore = true;

  // BUG-L8: cursor-based pagination — avoids loading all users into memory at once.
  while (hasMore) {
    const activeUsers: WeeklyDigestUser[] = await prisma.user.findMany({
      where: {
        email: { not: null },
        emailUnsubscribed: false,
        progress: { some: { updatedAt: { gte: sevenDaysAgo } } },
      },
      include: {
        progress: {
          where: { status: "done", updatedAt: { gte: sevenDaysAgo } },
          orderBy: { updatedAt: "desc" },
          take: 5,
        },
      },
      orderBy: { id: "asc" },
      take: 200,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });

    if (activeUsers.length === 0) break;
    processed += activeUsers.length;

    // Pre-fetch count of total completed steps for this batch
    const completionCounts = await prisma.userProgress.groupBy({
      by: ["userId"],
      where: {
        userId: { in: activeUsers.map((u) => u.id) },
        status: "done",
      },
      _count: { userId: true },
    });

    const countMap = Object.fromEntries(
      completionCounts.map((c) => [c.userId, c._count.userId])
    );

    const eligibleUsers = activeUsers.filter((user) => {
      if (!user.email) return false;
      const prefs =
        user.emailPreferences && typeof user.emailPreferences === "object"
          ? (user.emailPreferences as Record<string, boolean>)
          : {};
      return prefs.weekly_digest !== false;
    });
    eligible += eligibleUsers.length;

    for (let i = 0; i < eligibleUsers.length; i += BATCH_SIZE) {
      const chunk = eligibleUsers.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        chunk.map((user) =>
          sendWeeklyDigestEmail({
            user: { email: user.email!, name: user.name },
            stats: {
              nodesCompletedThisWeek: user.progress.length,
              currentStreak: user.streakDays,
              totalCompleted: countMap[user.id] ?? 0,
            },
            recentCompletions: user.progress.map((p) => {
              const flow = taskflowContent[p.taskflowSlug];
              const node = flow?.nodes.find((n) => n.id === p.nodeId);
              return {
                nodeLabel: node?.label ?? p.nodeId
                  .split("-")
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" "),
                roadmapTitle: flow?.title ?? p.taskflowSlug
                  .split("-")
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" "),
              };
            }),
          })
        )
      );

      results.forEach((result, idx) => {
        if (result.status === "fulfilled") {
          sent++;
        } else {
          console.error(
            `[weekly-digest] Failed to send to ${chunk[idx].email}:`,
            result.reason
          );
        }
      });
    }

    cursor = activeUsers[activeUsers.length - 1].id;
    if (activeUsers.length < 200) hasMore = false;
  }

  return NextResponse.json({ processed, eligible, sent });
}
