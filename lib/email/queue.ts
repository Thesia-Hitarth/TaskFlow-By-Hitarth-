import { prisma } from "@/lib/prisma";

export async function queueEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
  scheduledAt?: Date; // optional: schedule for future
}) {
  return prisma.emailQueue.create({
    data: {
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      scheduledAt: payload.scheduledAt ?? new Date(),
    },
  });
}
