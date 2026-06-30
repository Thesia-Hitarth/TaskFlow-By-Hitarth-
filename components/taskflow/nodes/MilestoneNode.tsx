"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { CheckCircle2, Clock, SkipForward, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NodeStatus, NodeDifficulty } from "@/lib/taskflow-content/types";
import * as Tooltip from "@radix-ui/react-tooltip";

interface MilestoneNodeProps {
  data: {
    label: string;
    status: NodeStatus;
    difficulty?: NodeDifficulty;
    estimatedTime?: string;
    resourceCount?: number;
    isOptional?: boolean;
    isLocked?: boolean;
    isCollapsed?: boolean;
    onToggleCollapse?: (e: React.MouseEvent) => void;
  };
  selected?: boolean;
}

const statusConfig: Record<NodeStatus, {
  borderClass: string;
  bgClass: string;
  icon: React.ReactNode;
  label: string;
}> = {
  pending: {
    borderClass: "border-border hover:border-accent",
    bgClass: "bg-surface text-text-primary",
    icon: <Circle className="h-3.5 w-3.5 text-text-secondary/60" />,
    label: "Not started",
  },
  "in-progress": {
    borderClass: "border-yellow-500",
    bgClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-semibold",
    icon: <Clock className="h-3.5 w-3.5 text-yellow-500 animate-pulse" />,
    label: "In progress",
  },
  done: {
    borderClass: "border-green-500",
    bgClass: "bg-green-500/10 text-green-600 dark:text-green-400 font-semibold",
    icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />,
    label: "Done",
  },
  skipped: {
    borderClass: "border-red-500/40 opacity-60",
    bgClass: "bg-red-500/5 text-red-500/60 dark:text-red-400/60 line-through",
    icon: <SkipForward className="h-3.5 w-3.5 text-red-500/60" />,
    label: "Skipped",
  },
};

const diffColors: Record<NodeDifficulty, string> = {
  beginner: "text-green-600 bg-green-500/10 dark:text-green-400 border border-green-500/20",
  intermediate: "text-yellow-600 bg-yellow-500/10 dark:text-yellow-400 border border-yellow-500/20",
  advanced: "text-red-600 bg-red-500/10 dark:text-red-400 border border-red-500/20",
};

function MilestoneNodeComponent({ data, selected }: MilestoneNodeProps) {
  const status = data.status ?? "pending";
  const cfg = statusConfig[status];
  const difficulty = data.difficulty ?? "beginner";

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div
          data-tour="roadmap-node"
          className={cn(
            "relative rounded-xl border-2 px-4 py-3 min-w-[190px] flex flex-col text-left transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm",
            cfg.borderClass,
            cfg.bgClass,
            selected && "ring-2 ring-accent ring-offset-2",
            data.isLocked && "opacity-50 cursor-not-allowed",
            data.isOptional && "border-dashed",
            status === "done" && "scale-[0.98]"
          )}
        >
          <Handle id="top" type="target" position={Position.Top} className="!bg-border !border-none" />

          {/* Optional Tag */}
          {data.isOptional && (
            <span className="absolute -top-2.5 left-3 text-[9px] font-bold bg-card border border-border text-text-secondary px-1.5 py-0.5 rounded-full leading-none">
              Optional
            </span>
          )}

          {/* Lock overlay tag */}
          {data.isLocked && (
            <span className="absolute -top-2.5 right-3 text-[9px] font-bold bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded-full leading-none">
              Locked
            </span>
          )}

          {/* Header Info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              {cfg.icon}
              <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider">{cfg.label}</span>
            </div>
            <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase", diffColors[difficulty])}>
              {difficulty}
            </span>
          </div>

          {/* Node Label */}
          <p className={cn(
            "text-sm font-bold text-text-primary tracking-tight leading-snug",
            status === "done" && "line-through text-text-secondary/60",
            status === "skipped" && "text-text-secondary/60"
          )}>
            {data.label}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between mt-2.5 text-[10px] text-text-secondary font-medium border-t border-border/35 pt-1.5">
            {data.estimatedTime && (
              <span className="flex items-center gap-0.5">⏱ {data.estimatedTime}</span>
            )}
            {data.resourceCount !== undefined && data.resourceCount > 0 && (
              <span className="text-accent font-semibold ml-auto">{data.resourceCount} res →</span>
            )}
          </div>

          {/* In-progress sliding bar */}
          {status === "in-progress" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden">
              <div className="h-full bg-yellow-500 animate-progress-slide" />
            </div>
          )}

          {/* Collapse/Expand subtopics toggle */}
          {data.onToggleCollapse && (
            <button
              onClick={data.onToggleCollapse}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card p-1 shadow-xs hover:border-accent text-text-secondary hover:text-accent transition-all cursor-pointer z-10"
              title={data.isCollapsed ? "Expand subtopics" : "Collapse subtopics"}
            >
              {data.isCollapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3.5 w-3.5" />}
            </button>
          )}

          <Handle id="bottom" type="source" position={Position.Bottom} className="!bg-border !border-none" />
          <Handle id="right" type="source" position={Position.Right} className="!bg-border !border-none" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={8}
          className="z-[200] max-w-[220px] rounded-xl bg-slate-900 text-white p-3 shadow-xl text-xs dark:bg-white dark:text-slate-900 border border-border"
        >
          <p className="font-bold leading-snug">{data.label}</p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            <span className="capitalize">{difficulty}</span>
            {data.estimatedTime && <span>· ⏱ {data.estimatedTime}</span>}
            {data.resourceCount !== undefined && data.resourceCount > 0 && (
              <span>· {data.resourceCount} resources</span>
            )}
          </div>
          {data.isOptional && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mt-1">Optional topic</p>
          )}
          {data.isLocked && (
            <p className="text-[10px] text-red-400 italic mt-1 font-semibold">🔒 Complete prerequisites first</p>
          )}
          <Tooltip.Arrow className="fill-slate-900 dark:fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const MilestoneNode = memo(MilestoneNodeComponent);
export default MilestoneNode;
