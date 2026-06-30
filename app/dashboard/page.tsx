import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskflowContent } from "@/lib/taskflow-content";
import { taskflows } from "@/lib/taskflows-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  GraduationCap,
  Trophy,
  ChevronRight,
  BookOpen,
  Calendar,
  Flame,
  Clock,
  Sparkles,
} from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { BadgeGrid } from "@/components/dashboard/BadgeGrid";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { syncPastActivities } from "@/lib/streak/updateStreak";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = session.user.id;

  // Retroactively sync past exercise solves and completed nodes to UserActivity table
  await syncPastActivities(userId);

  const [records, user] = await prisma.$transaction([
    prisma.userProgress.findMany({
      where: { userId },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        streakDays: true,
        longestStreak: true,
        activities: {
          orderBy: { date: "asc" },
        },
        badges: {
          include: { badge: true },
          orderBy: { awardedAt: "desc" },
        },
      },
    }),
  ]);

  if (!user) {
    redirect("/signin");
  }

  const bySlug: Record<string, Record<string, string>> = {};
  for (const r of records) {
    bySlug[r.taskflowSlug] ??= {};
    bySlug[r.taskflowSlug][r.nodeId] = r.status;
  }

  // Filter started taskflows that exist in the content registry
  const started = Object.keys(bySlug).filter((slug) => taskflowContent[slug]);

  // Calculate overall achievements based on child subtopics (milestones are ignored)
  let totalDoneCount = 0;
  for (const slug of started) {
    const content = taskflowContent[slug];
    const childNodeIds = new Set(
      content.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id)
    );
    totalDoneCount += Object.entries(bySlug[slug]).filter(
      ([id, s]) => childNodeIds.has(id) && s === "done"
    ).length;
  }

  const estimatedHours = totalDoneCount * 2; // Estimate ~2h per node

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Profile Summary Card */}
        <div className="relative rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 sm:p-8 overflow-hidden mb-10 shadow-lg">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-bold text-xs tracking-wider uppercase mb-1.5">
                <GraduationCap className="h-4 w-4" />
                Student Portal
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight truncate leading-none">
                Welcome back, {user.name ?? session.user.email?.split("@")[0] ?? "there"} 👋
              </h1>
              <p className="text-sm text-text-secondary mt-2 max-w-xl font-medium">
                Continue your learning tracks, track daily consistency, and view unlocked achievements.
              </p>
            </div>

            {/* Streak Counter Pill */}
            <div className="flex items-center gap-3.5 bg-amber-500/10 border border-amber-500/20 px-5 py-3 rounded-2xl shrink-0">
              <div className="relative flex items-center justify-center w-11 h-11 bg-amber-500/20 text-amber-500 rounded-xl">
                <Flame className="h-6 w-6 animate-pulse fill-amber-500" />
              </div>
              <div>
                <p className="text-amber-500 font-black text-xl leading-none">
                  {user.streakDays} {user.streakDays === 1 ? "day" : "days"}
                </p>
                <p className="text-[10px] text-text-secondary font-semibold uppercase mt-0.5 tracking-wider">
                  Current Streak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-card border border-border/80 p-5 rounded-2xl flex flex-col justify-center">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Active Paths</span>
            <span className="text-2xl font-black text-text-primary mt-1.5">{started.length}</span>
          </div>
          <div className="bg-card border border-border/80 p-5 rounded-2xl flex flex-col justify-center">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Nodes Done</span>
            <span className="text-2xl font-black text-amber-500 flex items-center gap-1.5 mt-1.5">
              <Trophy className="h-5 w-5" />
              {totalDoneCount}
            </span>
          </div>
          <div className="bg-card border border-border/80 p-5 rounded-2xl flex flex-col justify-center">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Hours Invested</span>
            <span className="text-2xl font-black text-text-primary mt-1.5 flex items-center gap-1.5">
              <Clock className="h-5 w-5 text-text-secondary" />
              ~{estimatedHours}h
            </span>
          </div>
          <div className="bg-card border border-border/80 p-5 rounded-2xl flex flex-col justify-center">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Longest Streak</span>
            <span className="text-2xl font-black text-text-primary mt-1.5 flex items-center gap-1.5">
              <Flame className="h-5 w-5 text-text-secondary" />
              {user.longestStreak} days
            </span>
          </div>
        </div>

        {/* Consistency Heatmap Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-amber-500" />
            Learning Consistency
          </h2>
          <ActivityHeatmap activities={user.activities} />
        </section>

        {/* Learning Paths Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              Your Active Taskflows
            </h2>
            <Link
              href="/taskflows"
              className="text-xs text-amber-500 hover:text-amber-600 transition-colors font-bold flex items-center gap-0.5"
            >
              Explore all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {started.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-md">
              <h3 className="text-base font-bold text-text-primary">No active learning paths</h3>
              <p className="text-xs text-text-secondary mt-1.5 max-w-sm mx-auto font-medium">
                You haven&apos;t started any taskflows yet. Choose a path from our registry to begin tracking progress.
              </p>
              <Link
                href="/taskflows"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-600 transition-colors"
              >
                Browse Taskflows
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {started.map((slug) => {
                const content = taskflowContent[slug];
                const meta = taskflows.find((t) => t.slug === slug);
                const childNodeIds = new Set(
                  content.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id)
                );
                const done = Object.entries(bySlug[slug]).filter(
                  ([id, s]) => childNodeIds.has(id) && s === "done"
                ).length;
                const total = childNodeIds.size;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;

                return (
                  <div
                    key={slug}
                    className="group border border-border bg-card hover:border-amber-500/25 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-4 items-start">
                      <ProgressRing percent={pct} size={50} strokeWidth={4} />
                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wide">
                          {meta?.type ?? "track"}
                        </span>
                        <h3 className="text-base font-bold text-text-primary mt-1.5 truncate">
                          {meta?.title ?? content.title}
                        </h3>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed font-medium">
                          {meta?.description || `Step-by-step milestones for ${meta?.title || content.title}.`}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-medium text-text-secondary">
                      <span>
                        {done} / {total} nodes completed
                      </span>
                      <Link
                        href={`/${slug}`}
                        className="text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-0.5 font-bold"
                      >
                        Continue Track <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Earned Badges
          </h2>
          <BadgeGrid badges={user.badges} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
