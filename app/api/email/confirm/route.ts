import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const email = Buffer.from(token, "base64").toString("utf-8");

    // Update in database
    await prisma.subscriber.updateMany({
      where: { email },
      data: { confirmed: true },
    });

    // Also update any matching User record if they exist
    await prisma.user.updateMany({
      where: { email },
      data: {
        emailUnsubscribed: false,
        emailPreferences: {
          weekly_digest: true,
          new_guides: true,
          badges: true,
          streak: true,
        },
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/?subscribed=true`);
  } catch (error) {
    console.error("[Email Confirmation] Failed:", error);
    return NextResponse.json({ error: "Invalid confirmation token" }, { status: 400 });
  }
}
