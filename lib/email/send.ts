import { transporter } from "./transporter";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string; // always include plain-text fallback
  replyTo?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "TaskFlow <no-reply@yourdomain.com>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      replyTo: payload.replyTo,
    });

    console.log(`[Email] Sent to ${payload.to} — MessageId: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error(`[Email] Failed to send to ${payload.to}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}
