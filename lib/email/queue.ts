import { after } from "next/server";
import { sendEmail } from "./send";

export async function queueEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
  scheduledAt?: Date; // ignored now as emails are sent directly
}) {
  const runSend = () => {
    sendEmail({
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }).catch((err) => {
      console.error(`[Nodemailer after] Failed to send email to ${payload.to}:`, err);
    });
  };

  try {
    after(() => {
      runSend();
    });
  } catch {
    // Fallback for environment/contexts where next/server after() is not supported/ready
    runSend();
  }

  // Return a mock object mimicking the Prisma record signature for backward compatibility
  return {
    id: "direct-sent",
    status: "sent",
    attempts: 1,
    sentAt: new Date(),
    ...payload,
  };
}
