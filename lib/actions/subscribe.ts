"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email/send";
import { baseTemplate, h1, p, ctaButton } from "@/lib/email/templates/components";

const schema = z.object({ email: z.string().email() });

export async function subscribeEmailAction(email: string) {
  const parsed = schema.safeParse({ email });
  if (!parsed.success) return { success: false, error: "Invalid email address." };

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Check if they are already in Subscriber table
  const existing = await prisma.subscriber.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing && existing.confirmed) {
    return { success: true, message: "Already subscribed!" };
  }

  // 2. Upsert subscriber
  await prisma.subscriber.upsert({
    where: { email: normalizedEmail },
    update: {},
    create: { email: normalizedEmail, confirmed: false },
  });

  // 3. Send confirmation email
  const confirmToken = Buffer.from(normalizedEmail).toString("base64");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const confirmUrl = `${appUrl}/api/email/confirm?token=${confirmToken}`;

  const html = baseTemplate({
    preheader: "Please confirm your TaskFlow subscription",
    emailAddress: normalizedEmail,
    content: `
      ${h1("Confirm your subscription")}
      ${p("Thanks for subscribing to TaskFlow updates! Click the button below to confirm your email and start receiving:")}
      <ul style="margin:0 0 20px;padding-left:20px;color:#475569;font-size:15px;line-height:2;">
        <li>Weekly learning digest</li>
        <li>New guides & roadmap updates</li>
        <li>Platform announcements</li>
      </ul>
      ${ctaButton("Confirm Subscription →", confirmUrl)}
      ${p("If you didn't subscribe, ignore this email.")}
    `,
  });

  const mailResult = await sendEmail({
    to: normalizedEmail,
    subject: "Confirm your TaskFlow subscription",
    html,
    text: `Confirm your TaskFlow subscription: ${confirmUrl}`,
  });

  if (!mailResult.success) {
    return { success: false, error: "Failed to send confirmation email." };
  }

  return { success: true, message: "Confirmation email sent! Please check your inbox." };
}

export async function updateEmailPreferences(email: string, preferences: Record<string, boolean>) {
  const normalizedEmail = email.trim().toLowerCase();

  // Find if a user exists with this email
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailPreferences: preferences,
        emailUnsubscribed: Object.values(preferences).every(v => v === false),
      },
    });
  }

  // Update in Subscriber table as well
  const isSubscribed = Object.values(preferences).some(v => v === true);
  await prisma.subscriber.upsert({
    where: { email: normalizedEmail },
    update: { confirmed: isSubscribed },
    create: { email: normalizedEmail, confirmed: isSubscribed },
  });

  return { success: true };
}

export async function unsubscribeAllAction(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailUnsubscribed: true,
        emailPreferences: {
          weekly_digest: false,
          new_guides: false,
          badges: false,
          streak: false,
        },
      },
    });
  }

  await prisma.subscriber.updateMany({
    where: { email: normalizedEmail },
    data: { confirmed: false },
  });

  return { success: true };
}
