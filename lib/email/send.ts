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
    const fromAddress = process.env.EMAIL_FROM;
    if (!fromAddress) {
      throw new Error("SMTP configuration error: EMAIL_FROM environment variable is not defined.");
    }

    const info = await transporter.sendMail({
      from: fromAddress,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      replyTo: payload.replyTo,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`[Email] Sent to ${payload.to} — MessageId: ${info.messageId}`);
    }
    return { success: true };
  } catch (error) {
    console.error(`[Email] Failed to send to ${payload.to}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}
