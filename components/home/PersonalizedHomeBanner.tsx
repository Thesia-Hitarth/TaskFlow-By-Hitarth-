import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { taskflowContent } from "@/lib/taskflow-content";
import { taskflows } from "@/lib/taskflows-data";

export async function PersonalizedHomeBanner() {
  const session = await auth();
  if (!session?.user?.id) return null; // Only show for logged-in users

  const userId = session.user.id;

  // Find the most recently updated done/in_progress progress record
  const lastActive = await prisma.userProgress.findFirst({
    where: {
      userId,
      status: { in: ["done", "in_progress"] },
    },
    orderBy: { updatedAt: "desc" },
    select: { taskflowSlug: true, nodeId: true },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, streakDays: true },
  });

  if (!lastActive || !user) return null;

  const content = taskflowContent[lastActive.taskflowSlug];
  const meta = taskflows.find((t) => t.slug === lastActive.taskflowSlug);
  const activeNode = content?.nodes.find((n) => n.id === lastActive.nodeId);

  if (!content || !activeNode) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 to-amber-500/5 dark:from-amber-500/5 dark:to-transparent border border-amber-500/20 rounded-3xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md transition-all duration-300">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="min-w-0 z-10">
        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest leading-none">
          Welcome back, {user.name?.split(" ")[0] ?? "Developer"}
        </p>
        <h3 className="text-base font-extrabold text-text-primary mt-2 flex items-center flex-wrap gap-x-1.5 leading-tight">
          Last active on
          <span className="text-amber-500 underline decoration-amber-500/30 underline-offset-4 decoration-2">
            {meta?.title ?? content.title}
          </span>
          <span className="text-text-secondary font-medium text-sm">/</span>
          <span className="text-text-secondary font-bold text-sm truncate max-w-[200px]">
            {activeNode.label}
          </span>
        </h3>
      </div>

      <div className="flex items-center gap-4 shrink-0 z-10">
        {user.streakDays > 0 && (
          <div
            title={`${user.streakDays}-day learning streak`}
            className="flex items-center gap-1 text-orange-500 font-extrabold text-sm bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full select-none"
          >
            <Flame className="h-4 w-4 fill-orange-500" />
            {user.streakDays}
          </div>
        )}

        <Link
          href={`/${lastActive.taskflowSlug}`}
          className="px-4.5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
        >
          Continue Track <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
