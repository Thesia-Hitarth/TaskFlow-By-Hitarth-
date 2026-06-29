import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { BadgeGrid } from "@/components/dashboard/BadgeGrid";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { taskflowContent } from "@/lib/taskflow-content";
import { taskflows } from "@/lib/taskflows-data";
import { Trophy, Flame, Calendar, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  // Search by exact name (case-insensitive)
  const decodedUsername = decodeURIComponent(username);
  const user = await prisma.user.findFirst({
    where: { name: { equals: decodedUsername, mode: "insensitive" } },
    select: {
      id: true,
      name: true,
      image: true,
      streakDays: true,
      longestStreak: true,
      createdAt: true,
      badges: {
        include: { badge: true },
        orderBy: { awardedAt: "desc" },
      },
      activities: {
        orderBy: { date: "asc" },
      },
      progress: {
        where: { status: "done" },
        select: { taskflowSlug: true, nodeId: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  // Group done nodes by taskflowSlug to calculate progress percentages
  const bySlug: Record<string, Set<string>> = {};
  for (const p of user.progress) {
    if (taskflowContent[p.taskflowSlug]) {
      bySlug[p.taskflowSlug] ??= new Set();
      bySlug[p.taskflowSlug].add(p.nodeId);
    }
  }

  const started = Object.keys(bySlug);

  // Total completions across subtopics
  let totalDoneCount = 0;
  for (const slug of started) {
    const content = taskflowContent[slug];
    const childNodeIds = new Set(
      content.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id)
    );
    totalDoneCount += Array.from(bySlug[slug]).filter((nodeId) =>
      childNodeIds.has(nodeId)
    ).length;
  }

  const estimatedHours = totalDoneCount * 2;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Banner */}
        <div className="relative rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 sm:p-8 overflow-hidden mb-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5 relative z-10 min-w-0">
            {user.image ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-amber-500/30">
                <Image
                  src={user.image}
                  alt={user.name ?? "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center font-extrabold text-2xl">
                {user.name ? user.name[0].toUpperCase() : "D"}
              </div>
            )}

            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest leading-none">
                Learning Profile
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1 truncate">
                {user.name}
              </h1>
              <p className="text-xs text-text-secondary mt-1 font-medium">
                Member since {new Date(user.createdAt).toLocaleDateString()} · ~{estimatedHours} hours invested
              </p>
            </div>
          </div>

          {/* Streak details */}
          <div className="flex items-center gap-3.5 bg-amber-500/10 border border-amber-500/20 px-5 py-3 rounded-2xl shrink-0 z-10">
            <Flame className="h-6 w-6 text-amber-500 fill-amber-500 animate-pulse" />
            <div>
              <p className="text-amber-500 font-black text-lg leading-none">
                {user.streakDays} {user.streakDays === 1 ? "day" : "days"}
              </p>
              <p className="text-[9px] text-text-secondary font-semibold uppercase mt-0.5 tracking-wider">
                Current Streak
              </p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-card border border-border p-5 rounded-2xl text-center">
            <Trophy className="h-5 w-5 text-amber-500 mx-auto mb-1.5" />
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Completed Nodes</span>
            <span className="text-2xl font-black text-text-primary mt-1 block">{totalDoneCount}</span>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl text-center">
            <BookOpen className="h-5 w-5 text-amber-500 mx-auto mb-1.5" />
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Active tracks</span>
            <span className="text-2xl font-black text-text-primary mt-1 block">{started.length}</span>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl text-center">
            <Flame className="h-5 w-5 text-amber-500 mx-auto mb-1.5" />
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Longest streak</span>
            <span className="text-2xl font-black text-text-primary mt-1 block">{user.longestStreak} d</span>
          </div>
        </div>

        {/* Consistency Heatmap */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-amber-500" />
            Study Activity
          </h2>
          <ActivityHeatmap activities={user.activities} />
        </section>

        {/* Active Roadmaps */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-amber-500" />
            Learning Pathways
          </h2>

          {started.length === 0 ? (
            <p className="text-sm text-text-secondary italic">No active taskflows yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {started.map((slug) => {
                const content = taskflowContent[slug];
                const meta = taskflows.find((t) => t.slug === slug);
                const childNodeIds = new Set(
                  content.nodes.filter((n) => n.kind === "subtopic").map((n) => n.id)
                );
                const done = Array.from(bySlug[slug]).filter((nodeId) =>
                  childNodeIds.has(nodeId)
                ).length;
                const total = childNodeIds.size;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;

                return (
                  <div
                    key={slug}
                    className="border border-border bg-card rounded-2xl p-5 flex items-center gap-4 shadow-sm"
                  >
                    <ProgressRing percent={pct} size={48} strokeWidth={4} />
                    <div className="min-w-0 flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wide">
                        {meta?.type ?? "track"}
                      </span>
                      <h3 className="text-base font-bold text-text-primary mt-1.5 truncate">
                        {meta?.title ?? content.title}
                      </h3>
                      <p className="text-xs text-text-secondary font-medium mt-0.5">
                        {done} / {total} nodes completed
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Badges Earned */}
        <section>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Badges Earned
          </h2>
          <BadgeGrid badges={user.badges} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
