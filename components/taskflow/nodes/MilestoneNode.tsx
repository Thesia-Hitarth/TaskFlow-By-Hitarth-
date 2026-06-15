"use client";

import { Handle, Position } from "@xyflow/react";
import { NodeStatus } from "@/lib/taskflow-content/types";

const statusStyles: Record<NodeStatus, string> = {
  pending: "border-border bg-surface text-text-primary hover:border-accent hover:shadow-xs",
  done: "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 font-semibold",
  "in-progress": "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-semibold",
  skipped: "border-red-500/40 bg-red-500/5 text-red-500/60 dark:text-red-400/60 opacity-60 line-through",
};

export default function MilestoneNode({ data }: { data: { label: string; status?: NodeStatus } }) {
  const status: NodeStatus = data.status ?? "pending";
  return (
    <div className={`rounded-xl border-2 px-4 py-3 min-w-[180px] text-center font-semibold cursor-pointer transition-all duration-200 ${statusStyles[status]}`}>
      <Handle id="top" type="target" position={Position.Top} className="!bg-border !border-none" />
      {data.label}
      <Handle id="bottom" type="source" position={Position.Bottom} className="!bg-border !border-none" />
      <Handle id="right" type="source" position={Position.Right} className="!bg-border !border-none" />
    </div>
  );
}


