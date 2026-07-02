"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { guides } from "@/lib/guides-data";
import { sendNewGuideEmail } from "@/lib/email/templates/newGuide";

export async function broadcastNewGuideAction(guideSlug: string) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "hitarththesia123@gmail.com";
  if (!session?.user?.email || session.user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    return { error: "Unauthorized. Admin access required." };
  }

  const guide = guides.find((g) => g.slug === guideSlug);
  if (!guide) {
    return { error: "Guide not found." };
  }

  try {
    const learners = await prisma.user.findMany({
      where: {
        email: { not: null },
        emailUnsubscribed: false,
      },
      select: {
        email: true,
        name: true,
        emailPreferences: true,
      },
    });

    let count = 0;
    for (const learner of learners) {
      if (!learner.email) continue;
      const prefs = (learner.emailPreferences as Record<string, boolean> | null) || {};
      if (prefs.new_guides === false) continue;

      const readTimeNum = parseInt(guide.readingTime) || 5;

      await sendNewGuideEmail(
        { email: learner.email, name: learner.name },
        {
          title: guide.title,
          slug: guide.slug,
          description: guide.description,
          readTime: readTimeNum,
        }
      );
      count++;
    }

    return { success: true, count };
  } catch (e) {
    console.error("Failed to broadcast new guide alert:", e);
    return { error: "Failed to broadcast notifications." };
  }
}
