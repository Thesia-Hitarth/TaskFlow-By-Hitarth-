import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { WeeklyProgressEmail } from "@/emails/WeeklyProgress";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY || "temp_key");

// Vercel Cron settings
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  // 1. Security Check: Only callable from Vercel Cron
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  // Only enforce auth if CRON_SECRET is defined in env
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 2. Fetch users active in the last 7 days (those who marked nodes completed)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const activeUsers = await prisma.user.findMany({
      where: {
        email: { not: null },
        progress: {
          some: {
            status: "done",
            updatedAt: { gte: oneWeekAgo },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        streakDays: true,
        progress: {
          where: {
            status: "done",
            updatedAt: { gte: oneWeekAgo },
          },
          select: {
            taskflowSlug: true,
            nodeId: true,
          },
        },
      },
      take: 100, // batch processing limit
    });

    let sentCount = 0;
    for (const user of activeUsers) {
      if (!user.email) continue;

      const nodesThisWeek = user.progress.length;
      if (nodesThisWeek === 0) continue;

      // Group by taskflowSlug to find their top active path
      const pathCounts = user.progress.reduce<Record<string, number>>((acc, p) => {
        acc[p.taskflowSlug] = (acc[p.taskflowSlug] ?? 0) + 1;
        return acc;
      }, {});

      const topRoadmap = Object.entries(pathCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "frontend";

      // Calculate progress percentage of the top roadmap
      const allRoadmapDone = await prisma.userProgress.count({
        where: {
          userId: user.id,
          taskflowSlug: topRoadmap,
          status: "done",
        },
      });

      // Quick estimate for percentage
      const totalRoadmapNodes = 30; // fallback default count
      const topRoadmapPercent = Math.min(100, Math.round((allRoadmapDone / totalRoadmapNodes) * 100));

      try {
        await resend.emails.send({
          from: "TaskFlow <onboarding@resend.dev>", // Resend test sandbox sender
          to: user.email,
          subject: `Your week: ${nodesThisWeek} node${nodesThisWeek !== 1 ? "s" : ""} completed 🎯`,
          react: React.createElement(WeeklyProgressEmail, {
            name: user.name?.split(" ")[0] ?? "Developer",
            streakDays: user.streakDays,
            nodesCompletedLastWeek: nodesThisWeek,
            topRoadmap: topRoadmap,
            topRoadmapPercent: topRoadmapPercent,
            nextNodeLabel: "Continue your path",
            nextNodeRoadmap: topRoadmap,
          }),
        });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send email to ${user.email}:`, err);
      }
    }

    return NextResponse.json({ success: true, sent: sentCount });
  } catch (error) {
    console.error("Weekly email cron error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
