"use client";

import { TaskflowContentNode } from "@/lib/taskflow-content/types";
import { ArrowRight, Play } from "lucide-react";

interface NextNodeBannerProps {
  node: TaskflowContentNode | null;
  onOpen: (nodeId: string) => void;
}

export function NextNodeBanner({ node, onOpen }: NextNodeBannerProps) {
  if (!node) return null;

  return (
    <div className="flex items-center gap-3.5 px-4 py-3 bg-amber-500/10 border border-amber-500/25 rounded-2xl mb-6 shadow-sm animate-in fade-in duration-300">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 shrink-0">
        <Play className="h-4 w-4 fill-amber-500 shrink-0" />
      </div>
      
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block leading-none">
          Recommended Next Step
        </span>
        <span className="text-sm font-extrabold text-text-primary mt-1.5 block truncate leading-none">
          {node.label}
        </span>
      </div>

      <button
        onClick={() => onOpen(node.id)}
        className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1 cursor-pointer shrink-0"
      >
        Start Topic <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
