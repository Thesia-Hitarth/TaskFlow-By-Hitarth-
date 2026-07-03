"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { guides } from "@/lib/guides-data";
import { buildNewGuideEmailPayload } from "@/lib/email/templates/newGuide";
import { isAdmin } from "@/lib/admin/auth";

export async function broadcastNewGuideAction(guideSlug: string) {
  const session = await auth();
  if (!isAdmin(session)) {
    return { error: "Unauthorized. Admin privileges required." };
  }

  const guide = guides.find((g) => g.slug === guideSlug);
  if (!guide) {
    return { error: "Guide not found." };
  }

  try {
    const parsedReadTime = parseInt(guide.readingTime, 10);
    const readTimeNum = isNaN(parsedReadTime) ? 5 : parsedReadTime;

    let lastId: string | undefined = undefined;
    const batchSize = 1000;
    let totalQueued = 0;

    while (true) {
      const learners: Array<{
        id: string;
        email: string | null;
        name: string | null;
        emailPreferences: unknown;
      }> = await prisma.user.findMany({
        where: {
          email: { not: null },
          emailUnsubscribed: false,
          ...(lastId ? { id: { gt: lastId } } : {}),
        },
        select: {
          id: true,
          email: true,
          name: true,
          emailPreferences: true,
        },
        orderBy: { id: "asc" },
        take: batchSize,
      });

      if (learners.length === 0) break;

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
        totalQueued += emailsToQueue.length;
      }

      lastId = learners[learners.length - 1].id;
      if (learners.length < batchSize) break;
    }

    return { success: true, count: totalQueued };
  } catch (e) {
    console.error("Failed to broadcast new guide alert:", e);
    return { error: "Failed to broadcast notifications." };
  }
}

