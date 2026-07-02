import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendStreakWarningEmail } from "@/lib/email/templates/streakWarning";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Two days ago string in YYYY-MM-DD
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const targetDateStr = twoDaysAgo.toISOString().split("T")[0];

  const usersToWarn = await prisma.user.findMany({
    where: {
      email: { not: null },
      emailUnsubscribed: false,
      streakDays: { gt: 0 },
      lastActivityDate: targetDateStr,
    },
    include: {
      progress: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
  });

  let sent = 0;
  for (const user of usersToWarn) {
    if (!user.email) continue;

    let prefs: Record<string, boolean> = {};
    if (user.emailPreferences && typeof user.emailPreferences === "object") {
      prefs = user.emailPreferences as Record<string, boolean>;
    }
    if (prefs.streak === false) continue;

    let roadmapId = "frontend";
    let roadmapTitle = "Frontend";
    if (user.progress.length > 0) {
      roadmapId = user.progress[0].taskflowSlug;
      roadmapTitle = roadmapId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    await sendStreakWarningEmail(
      { email: user.email, name: user.name },
      {
        currentStreak: user.streakDays,
        roadmapTitle,
        roadmapId,
      }
    );
    sent++;
  }

  return NextResponse.json({ processed: usersToWarn.length, sent });
}
