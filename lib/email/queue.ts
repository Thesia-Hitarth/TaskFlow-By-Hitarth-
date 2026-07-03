import { prisma } from "@/lib/prisma";
import { after } from "next/server";
import { processEmailQueue } from "./process";

export async function queueEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
  scheduledAt?: Date; // optional: schedule for future
}) {
  const record = await prisma.emailQueue.create({
    data: {
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      scheduledAt: payload.scheduledAt ?? new Date(),
    },
  });

  try {
    after(() => {
      processEmailQueue().catch((err) =>
        console.error("[after] Email queue processing error:", err)
      );
    });
  } catch {
    processEmailQueue().catch((err) =>
      console.error("[direct] Email queue processing error:", err)
    );
  }

  return record;
}
