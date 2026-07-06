import { prisma } from "@/lib/prisma";
import { taskflowContent } from "@/lib/taskflow-content";
import { getUserTimezone, getLocalDateString } from "@/lib/utils/timezone";

export async function checkAndAwardBadges(
  userId: string,
  taskflowSlug: string
): Promise<string[]> {
  const newlyAwarded: string[] = [];

  // Fetch the list of already owned badges to avoid redundant calculations and DB queries
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true }
  });
  const owned = new Set(userBadges.map(b => b.badgeId));

  // Helper to award a badge if they don't have it yet, atomically using upsert
  async function tryAward(badgeId: string) {
    if (owned.has(badgeId)) return;
    try {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId, badgeId } },
        update: {},
        create: { userId, badgeId },
      });
      newlyAwarded.push(badgeId);
      owned.add(badgeId);
    } catch (e) {
      console.error(`Failed to award badge ${badgeId}:`, e);
    }
  }

  // Get user's local date and timezone
  const timezone = await getUserTimezone();
  const today = getLocalDateString(new Date(), timezone);

  // Prepare variables for parallel query executions
  const content = taskflowContent[taskflowSlug];
  const childNodeIds = content ? content.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id) : [];
  const totalSubtopics = childNodeIds.length;

  // Set up conditional promises
  const userStreakPromise = !owned.has("on-fire")
    ? prisma.user.findUnique({ where: { id: userId }, select: { streakDays: true } })
    : Promise.resolve(null);

  const totalDonePromise = !owned.has("first-step")
    ? prisma.userProgress.count({ where: { userId, status: "done" } })
    : Promise.resolve(null);

  const doneCountPromise = (totalSubtopics > 0 && (!owned.has("halfway-there") || !owned.has("completionist")))
    ? prisma.userProgress.count({
        where: {
          userId,
          taskflowSlug,
          nodeId: { in: childNodeIds },
          status: "done",
        },
      })
    : Promise.resolve(null);

  const activeTaskflowsPromise = !owned.has("multi-tracker")
    ? prisma.userProgress.groupBy({
        by: ["taskflowSlug"],
        where: { userId, status: { in: ["done", "in_progress"] } },
      })
    : Promise.resolve(null);

  const guideViewsPromise = !owned.has("scholar")
    ? prisma.guideView.count({ where: { userId } })
    : Promise.resolve(null);

  const todayActivityPromise = !owned.has("speed-learner")
    ? prisma.userActivity.findUnique({
        where: { userId_date: { userId, date: today } },
        select: { count: true },
      })
    : Promise.resolve(null);

  const activityDaysPromise = !owned.has("week-one")
    ? prisma.userActivity.count({ where: { userId } })
    : Promise.resolve(null);

  const nightProgressPromise = !owned.has("night-owl")
    ? prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*)::bigint as count
        FROM "UserProgress"
        WHERE "userId" = ${userId}
          AND "status" = 'done'
          AND EXTRACT(HOUR FROM "updatedAt" AT TIME ZONE ${timezone}) BETWEEN 0 AND 5
      `
    : Promise.resolve(null);

  // Resolve all promises concurrently
  const [
    user,
    totalDone,
    doneCount,
    activeTaskflows,
    guideViews,
    todayActivity,
    activityDays,
    progressRecords
  ] = await Promise.all([
    userStreakPromise,
    totalDonePromise,
    doneCountPromise,
    activeTaskflowsPromise,
    guideViewsPromise,
    todayActivityPromise,
    activityDaysPromise,
    nightProgressPromise,
  ]);

  // Evaluate conditions
  // 1. 🌱 First Step
  if (totalDone !== null && totalDone >= 1) {
    await tryAward("first-step");
  }

  // 2. 🔥 On Fire
  if (user !== null && user && user.streakDays >= 7) {
    await tryAward("on-fire");
  }

  // 3. 🎯 Halfway There & 💯 Completionist
  if (doneCount !== null) {
    if (totalSubtopics > 1 && doneCount >= Math.ceil(totalSubtopics / 2)) {
      await tryAward("halfway-there");
    }
    if (doneCount === totalSubtopics) {
      await tryAward("completionist");
    }
  }

  // 4. 🚀 Multi-Tracker
  if (activeTaskflows !== null && activeTaskflows.length >= 3) {
    await tryAward("multi-tracker");
  }

  // 5. 📚 Scholar
  if (guideViews !== null && guideViews >= 5) {
    await tryAward("scholar");
  }

  // 6. ⚡ Speed Learner
  if (todayActivity !== null && todayActivity && todayActivity.count >= 5) {
    await tryAward("speed-learner");
  }

  // 7. 📅 Week One
  if (activityDays !== null && activityDays >= 7) {
    await tryAward("week-one");
  }

  // 8. 🦉 Night Owl: completed 10 nodes between 12 AM and 5 AM local time
  if (progressRecords !== null) {
    let nightCompletions = 0;
    if (progressRecords && progressRecords[0]) {
      nightCompletions = Number(progressRecords[0].count);
    }
    if (nightCompletions >= 10) {
      await tryAward("night-owl");
    }
  }

  return newlyAwarded;
}
