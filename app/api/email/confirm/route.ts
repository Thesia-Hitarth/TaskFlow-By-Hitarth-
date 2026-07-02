import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/email/tokens";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const email = verifyToken(token, "confirm");
    if (!email) {
      return NextResponse.json({ error: "Invalid or expired confirmation token" }, { status: 400 });
    }

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

    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/?subscribed=true`);
  } catch (error) {
    console.error("[Email Confirmation] Failed:", error);
    return NextResponse.json({ error: "Invalid confirmation token" }, { status: 400 });
  }
}
