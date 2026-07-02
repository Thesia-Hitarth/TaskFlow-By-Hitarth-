// INFO-003: Dedicated cleanup cron endpoint.
// Runs nightly via vercel.json to retain data hygiene independently of other cron jobs.
// Cleans: AIUsageLog (>90 days), AIRateLimit (>24 h), expired Sessions.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { safeCompare } from "@/lib/utils/crypto";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";
  const cronSecret = process.env.CRON_SECRET;

  const host = request.headers.get("host") ?? "";
  const isLocalDev =
    isDev && (host.startsWith("localhost") || host.startsWith("127.0.0.1"));

  if (!isLocalDev) {
    const expectedHeader = cronSecret ? `Bearer ${cronSecret}` : null;
    if (!cronSecret || !authHeader || !safeCompare(authHeader, expectedHeader)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const results: Record<string, number | string> = {};

  try {
    // 1. AI Usage Logs older than 90 days
    const usageLogs = await prisma.aIUsageLog.deleteMany({
      where: { createdAt: { lt: ninetyDaysAgo } },
    });
    results.aiUsageLogsDeleted = usageLogs.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean AIUsageLog:", err);
    results.aiUsageLogsError = String(err);
  }

  try {
    // 2. AI Rate Limit records older than 24 hours
    const rateLimits = await prisma.aIRateLimit.deleteMany({
      where: { timestamp: { lt: oneDayAgo } },
    });
    results.aiRateLimitsDeleted = rateLimits.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean AIRateLimit:", err);
    results.aiRateLimitsError = String(err);
  }

  try {
    // 3. Expired NextAuth sessions
    const sessions = await prisma.session.deleteMany({
      where: { expires: { lt: now } },
    });
    results.expiredSessionsDeleted = sessions.count;
  } catch (err) {
    console.error("[cleanup] Failed to clean expired sessions:", err);
    results.expiredSessionsError = String(err);
  }

  return NextResponse.json({ ok: true, timestamp: now.toISOString(), ...results });
}
