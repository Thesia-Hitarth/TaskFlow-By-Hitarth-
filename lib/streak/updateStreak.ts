import { prisma } from "@/lib/prisma";
import { getUserTimezone, getLocalDateString } from "@/lib/utils/timezone";

export async function updateStreak(userId: string): Promise<boolean> {
  const timezone = await getUserTimezone();
  const today = getLocalDateString(new Date(), timezone);

  // 1. Upsert today's activity count
  await prisma.userActivity.upsert({
    where: { userId_date: { userId, date: today } },
    update: { count: { increment: 1 } },
    create: { userId, date: today, count: 1 },
  });

  // 2. Fetch user's current streak state
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { streakDays: true, longestStreak: true, lastActivityDate: true },
  });

  if (!user) return false;

  const lastDate = user.lastActivityDate;
  const yesterday = getPreviousDay(today);

  let newStreak = user.streakDays;
  let isComeback = false;

  if (lastDate) {
    if (lastDate === today) {
      // Already active today, streak doesn't change
      return false;
    }

    // Check if returned after 7+ days of absence
    const diffTime = Math.abs(new Date(today).getTime() - new Date(lastDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 7) {
      isComeback = true;
    }

    if (lastDate === yesterday) {
      // Consecutive activity, extend streak
      newStreak = user.streakDays + 1;
    } else {
      // Gap in activity (excluding consecutive or today), reset streak to 1
      newStreak = 1;
    }
  } else {
    // First activity ever, start streak at 1
    newStreak = 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      streakDays: newStreak,
      lastActivityDate: today,
      longestStreak: Math.max(newStreak, user.longestStreak),
    },
  });

  // Award the Comeback Kid badge immediately if it's a comeback
  if (isComeback) {
    try {
      const badgeId = "comeback-kid";
      const existingBadge = await prisma.userBadge.findUnique({
        where: { userId_badgeId: { userId, badgeId } },
      });
      if (!existingBadge) {
        await prisma.userBadge.create({
          data: { userId, badgeId },
        });
        return true; // indicates comeback badge was awarded
      }
    } catch (e) {
      console.error("Failed to award comeback-kid badge:", e);
    }
  }

  return false;
}

function getPreviousDay(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  d.setUTCDate(d.getUTCDate() - 1);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function syncPastActivities(userId: string): Promise<void> {
  try {
    const timezone = await getUserTimezone();

    // 1. Fetch solved exercise attempts
    const exercises = await prisma.exerciseAttempt.findMany({
      where: { userId, status: "solved", solvedAt: { not: null } },
      select: { solvedAt: true },
    });

    // 2. Fetch completed roadmap nodes
    const nodeProgress = await prisma.userProgress.findMany({
      where: { userId, status: "done" },
      select: { updatedAt: true },
    });

    // 3. Fetch project submissions
    const projects = await prisma.projectSubmission.findMany({
      where: { userId },
      select: { createdAt: true },
    });

    const activityMap: Record<string, number> = {};

    const addDate = (dateObj: Date | null) => {
      if (!dateObj) return;
      const dateStr = getLocalDateString(dateObj, timezone);
      activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
    };

    exercises.forEach((e: { solvedAt: Date | null }) => addDate(e.solvedAt));
    nodeProgress.forEach((n: { updatedAt: Date }) => addDate(n.updatedAt));
    projects.forEach((p: { createdAt: Date }) => addDate(p.createdAt));

    // Sync entries
    for (const [date, count] of Object.entries(activityMap)) {
      const existing = await prisma.userActivity.findUnique({
        where: { userId_date: { userId, date } },
      });
      if (!existing) {
        await prisma.userActivity.create({
          data: { userId, date, count },
        });
      } else if (existing.count < count) {
        await prisma.userActivity.update({
          where: { userId_date: { userId, date } },
          data: { count },
        });
      }
    }
  } catch (error) {
    console.error("Failed to sync past activities:", error);
  }
}
