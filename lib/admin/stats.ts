import { prisma } from "@/lib/prisma";

export async function getPlatformStats() {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const [
    totalUsers,
    newUsersThisWeek,
    nodesCompletedToday,
    activePaths7d,
    guidesRead7d,
    recentUsers,
    popularRoadmaps,
    hardestNodes,
    emailPending,
    emailSent24h,
    emailFailed,
  ] = await Promise.all([
    // 1. Total users
    prisma.user.count(),

    // 2. New users this week
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),

    // 3. Nodes completed today
    prisma.userProgress.count({
      where: { status: "done", updatedAt: { gte: startOfDay } },
    }),

    // 4. Active unique paths in last 7 days (distinct taskflowSlug values with activity)
    prisma.userProgress.groupBy({
      by: ["taskflowSlug"],
      where: { updatedAt: { gte: sevenDaysAgo } },
      _count: { taskflowSlug: true },
    }).then((r) => r.length),

    // 5. Guide views in last 7 days
    prisma.guideView.count({
      where: { viewedAt: { gte: sevenDaysAgo } },
    }),

    // 6. Recent users (last 10)
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, email: true, image: true, createdAt: true },
    }),

    // 7. Most popular roadmaps by completion count (last 7 days)
    prisma.userProgress.groupBy({
      by: ["taskflowSlug"],
      where: { status: "done", updatedAt: { gte: sevenDaysAgo } },
      _count: { nodeId: true },
      orderBy: { _count: { nodeId: "desc" } },
      take: 10,
    }),

    // 8. Hardest nodes — in_progress but never done by many users
    prisma.userProgress.groupBy({
      by: ["taskflowSlug", "nodeId"],
      where: { status: "in_progress" },
      _count: { userId: true },
      orderBy: { _count: { userId: "desc" } },
      take: 10,
    }),

    // 9-11. Email queue health
    prisma.emailQueue.count({ where: { status: "pending" } }),
    prisma.emailQueue.count({
      where: { status: "sent", sentAt: { gte: new Date(Date.now() - 86400000) } },
    }),
    prisma.emailQueue.count({ where: { status: "failed" } }),
  ]);

  return {
    totalUsers,
    newUsersThisWeek,
    nodesCompletedToday,
    activePaths7d,
    guidesRead7d,
    recentUsers,
    popularRoadmaps: popularRoadmaps.map((r) => ({
      roadmapId: r.taskflowSlug,
      completions: r._count.nodeId,
    })),
    hardestNodes: hardestNodes.map((n) => ({
      roadmapId: n.taskflowSlug,
      nodeId: n.nodeId,
      stuckCount: n._count.userId,
    })),
    emailQueue: { pending: emailPending, sent24h: emailSent24h, failed: emailFailed },
  };
}
