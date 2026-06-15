import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskflowContent } from "@/lib/taskflow-content";
import { taskflows } from "@/lib/taskflows-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, GraduationCap, Trophy, ChevronRight, BookOpen } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const records = await prisma.userProgress.findMany({
    where: { userId: session.user.id },
  });

  const bySlug: Record<string, Record<string, string>> = {};
  for (const r of records) {
    bySlug[r.taskflowSlug] ??= {};
    bySlug[r.taskflowSlug][r.nodeId] = r.status;
  }

  // Filter started taskflows that exist in the content registry
  const started = Object.keys(bySlug).filter((slug) => taskflowContent[slug]);

  // Calculate overall achievements
  let totalDoneCount = 0;
  for (const slug of started) {
    totalDoneCount += Object.values(bySlug[slug]).filter((s) => s === "done").length;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* User Profile Summary Card */}
        <div className="relative rounded-2xl border border-border bg-surface/50 backdrop-blur-md p-6 sm:p-8 overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm tracking-wider uppercase mb-1">
                <GraduationCap className="h-4 w-4" />
                Student Portal
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {session.user.name ?? session.user.email}
              </h1>
              <p className="text-sm text-muted mt-1 max-w-xl">
                Continue your learning tracks and view statistics across your chosen taskflows.
              </p>
            </div>

            <div className="flex items-center gap-6 sm:border-l sm:border-border sm:pl-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-black text-white">{started.length}</div>
                <div className="text-xs text-muted font-medium uppercase mt-0.5">Active Paths</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-black text-amber-500 flex items-center gap-1.5 justify-center sm:justify-start">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  {totalDoneCount}
                </div>
                <div className="text-xs text-muted font-medium uppercase mt-0.5">Nodes Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              Your Active Taskflows
            </h2>
            <Link 
              href="/taskflows" 
              className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-medium flex items-center gap-1"
            >
              Explore more <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {started.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface p-12 text-center shadow-lg">
              <div className="inline-flex p-3 rounded-full bg-card border border-border mb-4">
                <LayoutDashboard className="h-6 w-6 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-white">No active learning paths</h3>
              <p className="text-sm text-muted mt-2 max-w-md mx-auto">
                You haven&apos;t started any taskflows yet. Choose a path from our registry to begin tracking your learning progress.
              </p>
              <Link
                href="/taskflows"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-amber-600 transition-colors"
              >
                Browse Taskflows
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {started.map((slug) => {
                const content = taskflowContent[slug];
                const meta = taskflows.find((t) => t.slug === slug);
                const done = Object.values(bySlug[slug]).filter((s) => s === "done").length;
                const total = content.nodes.length;
                const pct = Math.round((done / total) * 100);

                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="group relative rounded-xl border border-border bg-surface hover:bg-card hover:border-amber-500/30 transition-all duration-300 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:shadow-black/20"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wide">
                            {meta?.type ?? "track"}
                          </span>
                          <h3 className="text-lg font-bold text-white mt-2 group-hover:text-amber-500 transition-colors duration-200">
                            {meta?.title ?? content.title}
                          </h3>
                          <p className="text-xs text-muted mt-1 line-clamp-2">
                            {meta?.description || `A complete guide mapping out milestones for ${meta?.title || content.title}.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between text-xs text-muted mb-2 font-medium">
                        <span>Milestone Progress</span>
                        <span className="text-white font-bold">{pct}%</span>
                      </div>
                      
                      {/* Premium Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-background border border-border overflow-hidden p-[1px]">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between text-xs text-muted">
                        <span>{done} of {total} nodes completed</span>
                        <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5 font-semibold">
                          Continue Track <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
