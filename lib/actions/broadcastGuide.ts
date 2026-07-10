"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { guides } from "@/lib/guides-data";
import { buildNewGuideEmailPayload } from "@/lib/email/templates/newGuide";
import { isAdmin } from "@/lib/admin/auth";
import crypto from "crypto";

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

  // BUG-L7: Deduplication guard — prevent double-broadcast if admin clicks twice
  const dedupSubject = `New Guide: ${guide.title}`;
  const alreadyQueued = await prisma.emailQueue.findFirst({
    where: { subject: dedupSubject, status: { in: ["pending", "sent"] } },
    select: { id: true },
  });
  if (alreadyQueued) {
    return { error: "This guide has already been broadcast. Check the email queue." };
  }

  try {
    const parsedReadTime = parseInt(guide.readingTime, 10);
    const readTimeNum = isNaN(parsedReadTime) ? 5 : parsedReadTime;

    let totalQueued = 0;
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

      // BUG-M1: Build and write this page to the DB immediately instead of
      // accumulating all pages in memory (prevents OOM on large user bases).
      const pageEmails: { id: string; to: string; subject: string; html: string; text: string }[] = [];
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
          pageEmails.push({
            id: crypto.randomUUID(),
            to: payload.to,
            subject: payload.subject,
            html: payload.html,
            text: payload.text,
          });
        }
      }

      if (pageEmails.length > 0) {
        await prisma.emailQueue.createMany({
          data: pageEmails.map((e) => ({
            id: e.id,
            to: e.to,
            subject: e.subject,
            html: e.html,
            text: e.text,
            status: "pending",
            attempts: 0,
          })),
          skipDuplicates: true,
        });

        totalQueued += pageEmails.length;

        // Send this page in the background
        const pageCopy = [...pageEmails];
        try {
          const { after } = await import("next/server");
          after(async () => {
            const SEND_BATCH_SIZE = 10;
            for (let k = 0; k < pageCopy.length; k += SEND_BATCH_SIZE) {
              const batch = pageCopy.slice(k, k + SEND_BATCH_SIZE);
              await sendAndUpdateBatch(batch);
              if (pageCopy.length > SEND_BATCH_SIZE) {
                await new Promise((r) => setTimeout(r, 200));
              }
            }
          });
        } catch {
          const runFallback = async () => {
            const SEND_BATCH_SIZE = 10;
            for (let k = 0; k < pageCopy.length; k += SEND_BATCH_SIZE) {
              const batch = pageCopy.slice(k, k + SEND_BATCH_SIZE);
              await sendAndUpdateBatch(batch);
            }
          };
          runFallback().catch((err) => {
            console.error("[broadcast fallback execution failed]", err);
          });
        }
      }

      cursor = learners[learners.length - 1].id;
      if (learners.length < 500) {
        hasMore = false;
      }
    }

    return { success: true, count: totalQueued };
  } catch (e) {
    console.error("Failed to broadcast new guide alert:", e);
    return { error: "Failed to broadcast notifications." };
  }
}

async function sendAndUpdateBatch(
  batch: { id: string; to: string; subject: string; html: string; text: string }[]
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

  const succeededIds: string[] = [];
  const failedEmails: { id: string; error: string }[] = [];

  results.forEach((res, idx) => {
    const email = batch[idx];
    if (res.status === "fulfilled") {
      succeededIds.push(email.id);
    } else {
      failedEmails.push({
        id: email.id,
        error: res.reason instanceof Error ? res.reason.message : String(res.reason),
      });
    }
  });

  if (succeededIds.length > 0) {
    await prisma.emailQueue.updateMany({
      where: {
        id: { in: succeededIds },
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
    await prisma.emailQueue.update({
      where: {
        id: fail.id,
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

