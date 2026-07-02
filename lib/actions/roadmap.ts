"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getRoadmapDynamicData(slug: string) {
  try {
    const session = await auth();
    let hasSeenTour = false;
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { hasSeenTour: true },
      });
      hasSeenTour = user?.hasSeenTour ?? false;
    }

    // Fetch social proof (learner counts & recently active avatars)
    const learnerCount = await prisma.userProgress.groupBy({
      by: ["userId"],
      where: { taskflowSlug: slug, status: { in: ["done", "in_progress"] } },
    }).then(res => res.length);

    // Optimized: Only get progress records of users who have an image, look at last 100 updates
    const recentLearnerRecords = await prisma.userProgress.findMany({
      where: { 
        taskflowSlug: slug, 
        status: { in: ["done", "in_progress"] },
        user: { image: { not: null } },
      },
      orderBy: { updatedAt: "desc" },
      take: 100,
      select: {
        userId: true,
        user: {
          select: {
            image: true,
            name: true,
            username: true,
          },
        },
      },
    });

    const uniqueLearnersWithImages: Array<{ image: string; name: string; username: string }> = [];
    const seenUsers = new Set<string>();
    for (const p of recentLearnerRecords) {
      if (p.user.image && !seenUsers.has(p.userId)) {
        seenUsers.add(p.userId);
        uniqueLearnersWithImages.push({
          image: p.user.image,
          name: p.user.name || "",
          username: p.user.username || "",
        });
        if (uniqueLearnersWithImages.length >= 5) break;
      }
    }

    return {
      success: true,
      hasSeenTour,
      learnerCount,
      recentLearners: uniqueLearnersWithImages,
    };
  } catch (e) {
    console.error("Failed to fetch dynamic roadmap data:", e);
    return {
      success: false,
      hasSeenTour: false,
      learnerCount: 0,
      recentLearners: [],
    };
  }
}
