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

    // Update subscriber table
    await prisma.subscriber.updateMany({
      where: { email },
      data: { confirmed: true },
    });

    // For any matching User, only clear the unsubscribed flag.
    // Do NOT overwrite emailPreferences — that would reset custom category opt-outs (BUG-M8).
    await prisma.user.updateMany({
      where: { email },
      data: { emailUnsubscribed: false },
    });

    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/?subscribed=true`);
  } catch (error) {
    console.error("[Email Confirmation] Failed:", error);
    return NextResponse.json({ error: "Invalid confirmation token" }, { status: 400 });
  }
}
