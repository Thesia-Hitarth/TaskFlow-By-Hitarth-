"use client";

import { Handle, Position } from "@xyflow/react";
import { NodeStatus } from "@/lib/taskflow-content/types";

const statusStyles: Record<NodeStatus, string> = {
  pending: "border-[#2a2a2a] bg-[#1e1e1e]",
  done: "border-green-500 bg-green-500/10",
  "in-progress": "border-yellow-500 bg-yellow-500/10",
  skipped: "border-red-500/50 bg-red-500/5 opacity-60",
};

export default function MilestoneNode({ data }: any) {
  const status: NodeStatus = data.status ?? "pending";
  return (
    <div className={`rounded-lg border-2 px-4 py-3 min-w-[180px] text-center font-semibold text-white cursor-pointer transition-colors ${statusStyles[status]}`}>
      <Handle type="target" position={Position.Top} className="!bg-[#2a2a2a] !border-none" />
      {data.label}
      <Handle type="source" position={Position.Bottom} className="!bg-[#2a2a2a] !border-none" />
    </div>
  );
}
