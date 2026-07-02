import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWeeklyDigestEmail } from "@/lib/email/templates/weeklyDigest";

import { safeCompare } from "@/lib/utils/crypto";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";
  const cronSecret = process.env.CRON_SECRET;
  
  const host = request.headers.get("host") ?? "";
  const isLocalDev = isDev && (host.startsWith("localhost") || host.startsWith("127.0.0.1"));

  if (!isLocalDev) {
    const expectedHeader = cronSecret ? `Bearer ${cronSecret}` : null;
    if (!cronSecret || !authHeader || !safeCompare(authHeader, expectedHeader)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get all active users with their weekly stats
  const activeUsers = await prisma.user.findMany({
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
  });

  // Pre-fetch count of total completed steps for all activeUsers in a single query (resolves HIGH-001)
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

  // Filter eligible users before batching to avoid unnecessary work
  const eligibleUsers = activeUsers.filter((user) => {
    if (!user.email) return false;
    const prefs =
      user.emailPreferences && typeof user.emailPreferences === "object"
        ? (user.emailPreferences as Record<string, boolean>)
        : {};
    return prefs.weekly_digest !== false;
  });

  // Send in batches of 25 to avoid overwhelming the SMTP server while
  // staying well within Vercel's function timeout. Promise.allSettled ensures
  // a single failure never blocks the rest of the batch.
  const BATCH_SIZE = 25;
  let sent = 0;

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
          recentCompletions: user.progress.map((p) => ({
            nodeLabel: p.nodeId
              .split("-")
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            roadmapTitle: p.taskflowSlug
              .split("-")
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
          })),
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

  return NextResponse.json({ processed: activeUsers.length, eligible: eligibleUsers.length, sent });
}
