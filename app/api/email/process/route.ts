import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email/send";
import { safeCompare } from "@/lib/utils/crypto";

export async function GET(request: NextRequest) {
  // Verify this is from Vercel Cron or manual check with correct secret
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";
  const cronSecret = process.env.CRON_SECRET;

  if (!isDev) {
    const expectedHeader = cronSecret ? `Bearer ${cronSecret}` : null;
    if (!cronSecret || !authHeader || !safeCompare(authHeader, expectedHeader)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Fetch up to 100 pending emails at a time
  const pending = await prisma.emailQueue.findMany({
    where: {
      status: "pending",
      scheduledAt: { lte: new Date() }, // only emails scheduled for now or past
      attempts: { lt: 3 }, // don't retry more than 3 times
    },
    orderBy: { scheduledAt: "asc" },
    take: 100,
  });

  const results = await Promise.allSettled(
    pending.map(async (email) => {
      const result = await sendEmail({
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });

      if (result.success) {
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { status: "sent", sentAt: new Date(), attempts: { increment: 1 } },
        });
      } else {
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: email.attempts + 1 >= 3 ? "failed" : "pending",
            attempts: { increment: 1 },
            lastError: result.error,
          },
        });
      }
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return NextResponse.json({ processed: pending.length, sent });
}
