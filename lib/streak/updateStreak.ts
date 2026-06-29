import { prisma } from "@/lib/prisma";

export async function updateStreak(userId: string): Promise<boolean> {
  const today = new Date().toISOString().split("T")[0]; // UTC date format: "YYYY-MM-DD"

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
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}
