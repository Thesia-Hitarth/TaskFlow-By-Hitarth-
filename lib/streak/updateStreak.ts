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
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
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
      // Perform a safe check followed by atomic upsert to avoid duplicate record exceptions
      const existingBadge = await prisma.userBadge.findUnique({
        where: { userId_badgeId: { userId, badgeId } },
      });
      if (!existingBadge) {
        await prisma.userBadge.upsert({
          where: { userId_badgeId: { userId, badgeId } },
          update: {},
          create: { userId, badgeId },
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

    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    // 1. Fetch solved exercise attempts within 365 days
    const exercises = await prisma.exerciseAttempt.findMany({
      where: { userId, status: "solved", solvedAt: { not: null, gte: oneYearAgo } },
      select: { solvedAt: true },
    });

    // 2. Fetch completed roadmap nodes within 365 days
    const nodeProgress = await prisma.userProgress.findMany({
      where: { userId, status: "done", updatedAt: { gte: oneYearAgo } },
      select: { updatedAt: true },
    });

    // 3. Fetch project submissions within 365 days
    const projects = await prisma.projectSubmission.findMany({
      where: { userId, createdAt: { gte: oneYearAgo } },
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

    // Sync entries in a batch to avoid N+1 queries
    const dates = Object.keys(activityMap);
    if (dates.length === 0) return;

    const existingActivities = await prisma.userActivity.findMany({
      where: {
        userId,
        date: { in: dates },
      },
    });

    const existingMap = new Set(existingActivities.map((ea) => ea.date));
    const existingCountMap = new Map(existingActivities.map((ea) => [ea.date, ea.count]));

    const toCreate = dates
      .filter((d) => !existingMap.has(d))
      .map((d) => ({
        userId,
        date: d,
        count: activityMap[d],
      }));

    if (toCreate.length > 0) {
      await prisma.userActivity.createMany({
        data: toCreate,
        skipDuplicates: true,
      });
    }

    const updates = dates
      .filter((d) => existingMap.has(d) && (existingCountMap.get(d) ?? 0) < activityMap[d])
      .map((d) =>
        prisma.userActivity.update({
          where: { userId_date: { userId, date: d } },
          data: { count: activityMap[d] },
        })
      );

    if (updates.length > 0) {
      await prisma.$transaction(updates);
    }
  } catch (error) {
    console.error("Failed to sync past activities:", error);
  }
}
