"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email/send";
import { baseTemplate, h1, p, ctaButton } from "@/lib/email/templates/components";

import { generateToken, verifyToken } from "@/lib/email/tokens";
import { auth } from "@/auth";

import { headers } from "next/headers";
import { limitSubscribe } from "@/lib/ai/rateLimit";

const schema = z.object({ email: z.string().email() });

export async function subscribeEmailAction(email: string) {
  try {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const { success } = await limitSubscribe(ip);
    if (!success) {
      return { success: false, error: "Too many subscription attempts. Please try again later." };
    }
  } catch (error) {
    console.error("Rate limiting failed on subscribe action:", error);
  }

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
  const confirmToken = generateToken(normalizedEmail, "confirm");
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
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

export async function updateEmailPreferences(emailOrToken: string, preferences: Record<string, boolean>) {
  let email = verifyToken(emailOrToken, "unsubscribe");
  if (!email) {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized access to preferences." };
    }
    email = session.user.email;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const ALLOWED_PREFS = ["weekly_digest", "new_guides", "badges", "streak"];
  const sanitizedPreferences = Object.fromEntries(
    Object.entries(preferences).filter(([k]) => ALLOWED_PREFS.includes(k))
  );

  // Find if a user exists with this email
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailPreferences: sanitizedPreferences,
        emailUnsubscribed: Object.values(sanitizedPreferences).every(v => v === false),
      },
    });
  }

  // Update in Subscriber table as well
  const isSubscribed = Object.values(sanitizedPreferences).some(v => v === true);
  await prisma.subscriber.upsert({
    where: { email: normalizedEmail },
    update: { confirmed: isSubscribed },
    create: { email: normalizedEmail, confirmed: isSubscribed },
  });

  return { success: true };
}

export async function unsubscribeAllAction(emailOrToken: string) {
  let email = verifyToken(emailOrToken, "unsubscribe");
  if (!email) {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized access to preferences." };
    }
    email = session.user.email;
  }

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

