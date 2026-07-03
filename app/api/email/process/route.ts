import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCronRequest } from "@/lib/auth/verifyCronRequest";
import { processEmailQueue } from "@/lib/email/process";
import { after } from "next/server";

export async function GET(request: NextRequest) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Retention cleanup: purge AIUsageLog records older than 90 days
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  try {
    after(() => {
      prisma.aIUsageLog
        .deleteMany({
          where: { createdAt: { lt: ninetyDaysAgo } },
        })
        .catch((err) => console.error("Failed to clean up old AIUsageLog records:", err));
    });
  } catch {
    prisma.aIUsageLog
      .deleteMany({
        where: { createdAt: { lt: ninetyDaysAgo } },
      })
      .catch((err) => console.error("Failed to clean up old AIUsageLog records:", err));
  }

  try {
    const { processed, sent } = await processEmailQueue();
    return NextResponse.json({ processed, sent });
  } catch (error) {
    console.error("Failed to process email queue:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
