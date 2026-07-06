"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { guides } from "@/lib/guides-data";
import { buildNewGuideEmailPayload } from "@/lib/email/templates/newGuide";
import { isAdmin } from "@/lib/admin/auth";

import { Prisma } from "@prisma/client";

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

    const emailsToQueue: { to: string; subject: string; html: string; text: string }[] = [];
    let cursor: string | undefined = undefined;
    let hasMore = true;

    while (hasMore) {
      const learners: {
        id: string;
        email: string | null;
        name: string | null;
        emailPreferences: Prisma.JsonValue;
      }[] = await prisma.user.findMany({
        where: {
          email: { not: null },
          emailUnsubscribed: false,
        },
        select: {
          id: true,
          email: true,
          name: true,
          emailPreferences: true,
        },
        orderBy: { id: "asc" },
        take: 500,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
      });

      if (learners.length === 0) {
        hasMore = false;
        break;
      }

      for (const learner of learners) {
        if (!learner.email) continue;
        const prefs = (learner.emailPreferences as Record<string, boolean> | null) || {};
        if (prefs.new_guides !== false) {
          const payload = buildNewGuideEmailPayload(
            { email: learner.email, name: learner.name },
            {
              title: guide.title,
              slug: guide.slug,
              description: guide.description,
              readTime: readTimeNum,
            }
          );
          emailsToQueue.push({
            to: payload.to,
            subject: payload.subject,
            html: payload.html,
            text: payload.text,
          });
        }
      }

      cursor = learners[learners.length - 1].id;
      if (learners.length < 500) {
        hasMore = false;
      }
    }

    if (emailsToQueue.length > 0) {
      await prisma.emailQueue.createMany({
        data: emailsToQueue.map((e) => ({
          ...e,
          status: "pending",
          attempts: 0,
        })),
        skipDuplicates: true,
      });

      const subject = `New guide: ${guide.title}`;

      try {
        const { after } = await import("next/server");
        after(async () => {
          const SEND_BATCH_SIZE = 10;
          for (let k = 0; k < emailsToQueue.length; k += SEND_BATCH_SIZE) {
            const batch = emailsToQueue.slice(k, k + SEND_BATCH_SIZE);
            await sendAndUpdateBatch(batch, subject);
            if (emailsToQueue.length > SEND_BATCH_SIZE) {
              await new Promise((r) => setTimeout(r, 200));
            }
          }
        });
      } catch {
        const runFallback = async () => {
          const SEND_BATCH_SIZE = 10;
          for (let k = 0; k < emailsToQueue.length; k += SEND_BATCH_SIZE) {
            const batch = emailsToQueue.slice(k, k + SEND_BATCH_SIZE);
            await sendAndUpdateBatch(batch, subject);
          }
        };
        runFallback().catch((err) => {
          console.error("[broadcast fallback execution failed]", err);
        });
      }
    }

    return { success: true, count: emailsToQueue.length };
  } catch (e) {
    console.error("Failed to broadcast new guide alert:", e);
    return { error: "Failed to broadcast notifications." };
  }
}

async function sendAndUpdateBatch(
  batch: { to: string; subject: string; html: string; text: string }[],
  subject: string
) {
  const { sendEmail } = await import("@/lib/email/send");
  const results = await Promise.allSettled(
    batch.map((email) =>
      sendEmail({
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
      })
    )
  );

  const succeededEmails: string[] = [];
  const failedEmails: { to: string; error: string }[] = [];

  results.forEach((res, idx) => {
    const email = batch[idx];
    if (res.status === "fulfilled") {
      succeededEmails.push(email.to);
    } else {
      failedEmails.push({
        to: email.to,
        error: res.reason instanceof Error ? res.reason.message : String(res.reason),
      });
    }
  });

  if (succeededEmails.length > 0) {
    await prisma.emailQueue.updateMany({
      where: {
        to: { in: succeededEmails },
        subject,
        status: "pending",
      },
      data: {
        status: "sent",
        sentAt: new Date(),
        attempts: { increment: 1 },
      },
    });
  }

  for (const fail of failedEmails) {
    await prisma.emailQueue.updateMany({
      where: {
        to: fail.to,
        subject,
        status: "pending",
      },
      data: {
        status: "failed",
        lastError: fail.error,
        attempts: { increment: 1 },
      },
    });
  }
}

