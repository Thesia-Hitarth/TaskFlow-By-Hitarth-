"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { guides } from "@/lib/guides-data";
import { buildNewGuideEmailPayload } from "@/lib/email/templates/newGuide";

export async function broadcastNewGuideAction(guideSlug: string) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return { error: "Server misconfiguration: ADMIN_EMAIL is not set." };
  }
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

    const parsedReadTime = parseInt(guide.readingTime, 10);
    const readTimeNum = isNaN(parsedReadTime) ? 5 : parsedReadTime;

    const emailsToQueue = learners
      .filter((learner) => {
        if (!learner.email) return false;
        const prefs = (learner.emailPreferences as Record<string, boolean> | null) || {};
        return prefs.new_guides !== false;
      })
      .map((learner) => {
        const payload = buildNewGuideEmailPayload(
          { email: learner.email!, name: learner.name },
          {
            title: guide.title,
            slug: guide.slug,
            description: guide.description,
            readTime: readTimeNum,
          }
        );
        return {
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          status: "pending",
        };
      });

    if (emailsToQueue.length > 0) {
      await prisma.emailQueue.createMany({
        data: emailsToQueue,
        skipDuplicates: true,
      });
    }

    return { success: true, count: emailsToQueue.length };
  } catch (e) {
    console.error("Failed to broadcast new guide alert:", e);
    return { error: "Failed to broadcast notifications." };
  }
}
