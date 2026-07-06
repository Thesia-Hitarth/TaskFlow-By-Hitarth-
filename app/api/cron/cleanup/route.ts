// INFO-003: Dedicated cleanup cron endpoint.
// Runs nightly via vercel.json to retain data hygiene independently of other cron jobs.
// Cleans: AIUsageLog (>90 days), AIRateLimit (>24 h), expired Sessions.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { verifyCronRequest } from "@/lib/auth/verifyCronRequest";

export async function GET(request: NextRequest) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const results: Record<string, number | string> = {};

  try {
    // 1. AI Usage Logs older than 90 days
    const usageLogs = await prisma.aIUsageLog.deleteMany({
      where: { createdAt: { lt: ninetyDaysAgo } },
    });
    results.aiUsageLogsDeleted = usageLogs.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean AIUsageLog:", err);
    results.aiUsageLogsError = String(err);
  }

  try {
    // 2. AI Rate Limit records older than 24 hours
    const rateLimits = await prisma.aIRateLimit.deleteMany({
      where: { timestamp: { lt: oneDayAgo } },
    });
    results.aiRateLimitsDeleted = rateLimits.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean AIRateLimit:", err);
    results.aiRateLimitsError = String(err);
  }

  try {
    // 3. Expired NextAuth sessions
    const sessions = await prisma.session.deleteMany({
      where: { expires: { lt: now } },
    });
    results.expiredSessionsDeleted = sessions.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean expired sessions:", err);
    results.expiredSessionsError = String(err);
  }

  try {
    // 4. Stale AI Cache entries (lastHitAt older than 30 days and hitCount < 5)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const cachedDeleted = await prisma.aICache.deleteMany({
      where: {
        lastHitAt: { lt: thirtyDaysAgo },
        hitCount: { lt: 5 }
      }
    });
    results.aiCacheDeleted = cachedDeleted.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean AICache:", err);
    results.aiCacheError = String(err);
  }

  try {
    // 5. Delete read notifications older than 90 days
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const deletedNotifications = await prisma.notification.deleteMany({
      where: {
        isRead: true,
        createdAt: { lt: ninetyDaysAgo },
      },
    });
    results.notificationsDeleted = deletedNotifications.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean notifications:", err);
    results.notificationsError = String(err);
  }

  try {
    // 6. Retry failed emails (attempts < 3)
    const failedEmails = await prisma.emailQueue.findMany({
      where: {
        status: "failed",
        attempts: { lt: 3 },
      },
      take: 20, // process in small batches to avoid timeouts
    });

    if (failedEmails.length > 0) {
      const { sendEmail } = await import("@/lib/email/send");
      const resultsList = await Promise.allSettled(
        failedEmails.map((email) =>
          sendEmail({
            to: email.to,
            subject: email.subject,
            html: email.html,
            text: email.text,
          })
        )
      );

      for (let i = 0; i < failedEmails.length; i++) {
        const email = failedEmails[i];
        const res = resultsList[i];
        if (res.status === "fulfilled" && res.value.success) {
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              status: "sent",
              sentAt: new Date(),
              attempts: email.attempts + 1,
            },
          });
        } else {
          const errorMsg = res.status === "rejected"
            ? String(res.reason)
            : (res.value as { error?: string })?.error || "Unknown send error";
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              attempts: email.attempts + 1,
              lastError: errorMsg,
            },
          });
        }
      }
    }
    results.emailsRetriedCount = failedEmails.length;
  } catch (err) {
    console.error("[cleanup] Failed to retry failed emails:", err);
    results.emailsRetriedError = String(err);
  }

  return NextResponse.json({ ok: true, timestamp: now.toISOString(), ...results });
}
