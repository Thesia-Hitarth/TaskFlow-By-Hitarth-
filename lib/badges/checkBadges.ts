import { prisma } from "@/lib/prisma";
import { taskflowContent } from "@/lib/taskflow-content";

export async function checkAndAwardBadges(
  userId: string,
  taskflowSlug: string
): Promise<string[]> {
  const newlyAwarded: string[] = [];

  // Helper to award a badge if they don't have it yet
  async function tryAward(badgeId: string) {
    try {
      const existing = await prisma.userBadge.findUnique({
        where: { userId_badgeId: { userId, badgeId } },
      });
      if (!existing) {
        await prisma.userBadge.create({
          data: { userId, badgeId },
        });
        newlyAwarded.push(badgeId);
      }
    } catch (e) {
      console.error(`Failed to award badge ${badgeId}:`, e);
    }
  }

  // Fetch user stats
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { streakDays: true },
  });

  // 1. 🌱 First Step: completed at least 1 node
  const totalDone = await prisma.userProgress.count({
    where: { userId, status: "done" },
  });
  if (totalDone >= 1) {
    await tryAward("first-step");
  }

  // 2. 🔥 On Fire: 7-day streak
  if (user && user.streakDays >= 7) {
    await tryAward("on-fire");
  }

  // 3. 🎯 Halfway There & 💯 Completionist: check taskflow progress
  const content = taskflowContent[taskflowSlug];
  if (content) {
    const childNodeIds = content.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id);
    const totalSubtopics = childNodeIds.length;

    if (totalSubtopics > 0) {
      const doneCount = await prisma.userProgress.count({
        where: {
          userId,
          taskflowSlug,
          nodeId: { in: childNodeIds },
          status: "done",
        },
      });

      // Halfway There: >= 50% done
      if (doneCount >= Math.ceil(totalSubtopics / 2)) {
        await tryAward("halfway-there");
      }

      // Completionist: 100% done
      if (doneCount === totalSubtopics) {
        await tryAward("completionist");
      }
    }
  }

  // 4. 🚀 Multi-Tracker: actively learning (done or in progress) 3+ taskflows
  const activeTaskflows = await prisma.userProgress.groupBy({
    by: ["taskflowSlug"],
    where: {
      userId,
      status: { in: ["done", "in_progress"] },
    },
  });
  if (activeTaskflows.length >= 3) {
    await tryAward("multi-tracker");
  }

  // 5. 📚 Scholar: read 5 or more guides
  const guideViews = await prisma.guideView.count({
    where: { userId },
  });
  if (guideViews >= 5) {
    await tryAward("scholar");
  }

  // 6. ⚡ Speed Learner: completed 5 nodes today (UTC)
  const today = new Date().toISOString().split("T")[0];
  const todayActivity = await prisma.userActivity.findUnique({
    where: { userId_date: { userId, date: today } },
    select: { count: true },
  });
  if (todayActivity && todayActivity.count >= 5) {
    await tryAward("speed-learner");
  }

  // 7. 📅 Week One: active on 7 distinct days
  const activityDays = await prisma.userActivity.count({
    where: { userId },
  });
  if (activityDays >= 7) {
    await tryAward("week-one");
  }

  // 8. 🦉 Night Owl: completed 10 nodes between 12 AM and 5 AM UTC
  const progressRecords = await prisma.userProgress.findMany({
    where: { userId, status: "done" },
    select: { updatedAt: true },
  });
  const nightCompletions = progressRecords.filter((r) => {
    const hours = new Date(r.updatedAt).getUTCHours();
    return hours >= 0 && hours < 5;
  }).length;
  if (nightCompletions >= 10) {
    await tryAward("night-owl");
  }

  return newlyAwarded;
}
