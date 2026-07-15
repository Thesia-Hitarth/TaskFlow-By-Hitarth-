import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendStreakWarningEmail } from "@/lib/email/templates/streakWarning";
import { taskflowContent } from "@/lib/taskflow-content";

import { verifyCronRequest } from "@/lib/auth/verifyCronRequest";

export async function GET(request: NextRequest) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const targetDateStr = twoDaysAgo.toISOString().split("T")[0];

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const prevDateStr = threeDaysAgo.toISOString().split("T")[0];

  const usersToWarn = await prisma.user.findMany({
    where: {
      email: { not: null },
      emailUnsubscribed: false,
      streakDays: { gt: 0 },
      lastActivityDate: { in: [targetDateStr, prevDateStr] },
    },
    include: {
      progress: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
  });

  // Filter eligible users (respect email preferences, skip missing email)
  const eligibleUsers = usersToWarn.filter((user) => {
    if (!user.email) return false;
    const prefs =
      user.emailPreferences && typeof user.emailPreferences === "object"
        ? (user.emailPreferences as Record<string, boolean>)
        : {};
    return prefs.streak !== false;
  });

  // Send in batches to stay within Vercel function timeout limits.
  const BATCH_SIZE = 25;
  let sent = 0;

  for (let i = 0; i < eligibleUsers.length; i += BATCH_SIZE) {
    const chunk = eligibleUsers.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      chunk.map((user) => {
        let roadmapId = "frontend";
        let roadmapTitle = "Frontend";
        if (user.progress.length > 0) {
          roadmapId = user.progress[0].taskflowSlug;
          const flow = taskflowContent[roadmapId];
          roadmapTitle = flow?.title ?? roadmapId
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        }
        return sendStreakWarningEmail(
          { email: user.email!, name: user.name },
          { currentStreak: user.streakDays, roadmapTitle, roadmapId }
        );
      })
    );

    results.forEach((result, idx) => {
      if (result.status === "fulfilled") {
        sent++;
      } else {
        console.error(
          `[streak-warnings] Failed to send to ${chunk[idx].email}:`,
          result.reason
        );
      }
    });
  }

  return NextResponse.json({ processed: usersToWarn.length, eligible: eligibleUsers.length, sent });
}
