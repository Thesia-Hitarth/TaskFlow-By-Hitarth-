import { prisma } from "@/lib/prisma";
import { sendEmail } from "./send";

interface PendingEmail {
  id: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  attempts: number;
}

export async function processEmailQueue(): Promise<{ processed: number; sent: number }> {
  const batchId = crypto.randomUUID();
  
  // Concurrency safety: fetch and lock matching records using FOR UPDATE SKIP LOCKED
  const pending = await prisma.$queryRaw<PendingEmail[]>`
    UPDATE "EmailQueue"
    SET status = 'processing', "lastError" = ${batchId}
    WHERE id IN (
      SELECT id FROM "EmailQueue"
      WHERE status = 'pending' AND "scheduledAt" <= NOW() AND attempts < 3
      ORDER BY "scheduledAt" ASC
      LIMIT 100
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id, "to", subject, html, text, attempts
  `;

  if (pending.length === 0) return { processed: 0, sent: 0 };

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
            lastError: result.error || "Unknown error",
          },
        });
      }
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return { processed: pending.length, sent };
}
