"use client";
import { useTaskflowProgress } from "@/lib/taskflow-progress";
import { TaskflowContentNode } from "@/lib/taskflow-content/types";

interface Props {
  slug: string;
  nodes: TaskflowContentNode[];
}

export default function RoadmapProgressBar({ slug, nodes }: Props) {
  const { progress, clearProgress, isLoaded } = useTaskflowProgress(slug);

  // Extract all subtopic child node IDs (milestones are ignored)
  const childNodeIds = new Set(
    nodes.filter((n) => n.kind === "subtopic").map((n) => n.id)
  );

  const done = Object.entries(progress).filter(
    ([id, s]) => childNodeIds.has(id) && s === "done"
  ).length;

  const inProgress = Object.entries(progress).filter(
    ([id, s]) => childNodeIds.has(id) && s === "in-progress"
  ).length;

  const totalSubtopics = childNodeIds.size;
  const pct = totalSubtopics === 0 ? 0 : Math.round((done / totalSubtopics) * 100);

  if (!isLoaded) {
    return <div className="mb-6 h-[116px] w-full rounded-lg border border-border bg-card animate-pulse" />;
  }

  if (totalSubtopics === 0) return null;

  // Check if there is any progress on subtopics
  const hasAnyProgress = Object.keys(progress).some((id) => childNodeIds.has(id));

  return (
    <div className="mb-6 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-text-primary font-medium">Your Progress</span>
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span className="text-green-400 font-bold">{done} done</span>
          {inProgress > 0 && (
            <span className="text-yellow-400 font-bold">{inProgress} in progress</span>
          )}
          <span>{totalSubtopics} total</span>
          <span className="font-semibold text-accent">{pct}%</span>
        </div>
      </div>

      <div className="h-2 w-full rounded-full bg-[#2a2a2a] overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-3 text-xs text-text-secondary font-medium">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-border bg-transparent" />
            Pending
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Done
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500/50" />
            Skipped
          </span>
        </div>
        {hasAnyProgress && (
          <button
            onClick={clearProgress}
            className="text-xs text-text-secondary hover:text-red-400 transition-colors font-semibold cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
