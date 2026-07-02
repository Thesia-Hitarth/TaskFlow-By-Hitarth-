import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWeeklyDigestEmail } from "@/lib/email/templates/weeklyDigest";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  let sent = 0;
  for (const user of activeUsers) {
    if (!user.email) continue;
    
    // Check user preferences (defaults to enabled if not set)
    let prefs: Record<string, boolean> = {};
    if (user.emailPreferences && typeof user.emailPreferences === "object") {
      prefs = user.emailPreferences as Record<string, boolean>;
    }
    if (prefs.weekly_digest === false) continue;

    // Get total completions count
    const totalCompleted = await prisma.userProgress.count({
      where: { userId: user.id, status: "done" },
    });

    await sendWeeklyDigestEmail({
      user: { email: user.email, name: user.name },
      stats: {
        nodesCompletedThisWeek: user.progress.length,
        currentStreak: user.streakDays,
        totalCompleted,
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
    });
    sent++;
  }

  return NextResponse.json({ processed: activeUsers.length, sent });
}
