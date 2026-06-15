"use client";

import { Handle, Position } from "@xyflow/react";
import { NodeStatus } from "@/lib/taskflow-content/types";

const statusStyles: Record<NodeStatus, string> = {
  pending: "border-border bg-card text-text-secondary hover:border-accent hover:text-text-primary",
  done: "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400",
  "in-progress": "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  skipped: "border-red-500/40 bg-red-500/5 text-red-500/60 dark:text-red-400/60 opacity-60 line-through",
};

export default function SubtopicNode({ data }: { data: { label: string; status?: NodeStatus } }) {
  const status: NodeStatus = data.status ?? "pending";
  return (
    <div className={`rounded-lg border px-3 py-2 min-w-[170px] text-sm cursor-pointer transition-all duration-200 relative ${statusStyles[status]}`}>
      <Handle id="left" type="target" position={Position.Left} className="!bg-border !border-none" />
      {data.label}
    </div>
  );
}


