"use client";

import { NodeStatus } from "@/lib/taskflow-content/types";

const statusStyles: Record<NodeStatus, string> = {
  pending: "border-[#2a2a2a] text-[#a3a3a3] hover:border-amber-500 hover:text-white",
  done: "border-green-500 text-green-400 bg-green-500/10",
  "in-progress": "border-yellow-500 text-yellow-400 bg-yellow-500/10",
  skipped: "border-red-500/40 text-red-400/70 bg-red-500/5 line-through",
};

export default function SubtopicNode({ data }: any) {
  const status: NodeStatus = data.status ?? "pending";
  return (
    <div className={`rounded-md border px-3 py-2 min-w-[170px] text-sm cursor-pointer transition-colors ${statusStyles[status]}`}>
      {data.label}
    </div>
  );
}
