"use client";

import { useState } from "react";
import { CheckCircle2, Clock, SkipForward, Circle, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskflowContent, TaskflowContentNode, NodeStatus } from "@/lib/taskflow-content/types";

interface RoadmapListViewProps {
  content: TaskflowContent;
  nodeStatuses: Record<string, NodeStatus>;
  onNodeClick: (node: TaskflowContentNode) => void;
}

const STATUS_ICON: Record<NodeStatus, React.ReactNode> = {
  done: <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />,
  "in-progress": <Clock size={16} className="text-amber-400 shrink-0 animate-pulse" />,
  skipped: <SkipForward size={16} className="text-slate-400 shrink-0" />,
  pending: <Circle size={16} className="text-slate-300 dark:text-slate-600 shrink-0" />,
};

export function RoadmapListView({ content, nodeStatuses, onNodeClick }: RoadmapListViewProps) {
  const sections = groupNodesByMilestone(content);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-card rounded-xl border border-border shadow-md overflow-hidden">
      {sections.map((section) => {
        const isCollapsed = collapsedSections.has(section.id);
        const doneCount = section.nodes.filter((n) => nodeStatuses[n.id] === "done").length;
        const totalCount = section.nodes.length;
        const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

        return (
          <div key={section.id} className="transition-colors">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center gap-3 px-4 py-4 bg-surface/50 text-left hover:bg-surface/85 transition-all select-none"
            >
              {isCollapsed ? (
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-slate-400 shrink-0" />
              )}
              <span className="text-sm font-bold tracking-tight text-text-primary flex-1">
                {section.title}
              </span>
              <span className="text-xs text-text-secondary font-medium mr-2">
                {doneCount}/{totalCount}
              </span>
              {/* Mini progress bar */}
              <div className="w-16 h-2 bg-border rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </button>

            {/* Nodes list */}
            {!isCollapsed && (
              <ul className="bg-background/20 divide-y divide-slate-100/50 dark:divide-slate-800/50">
                {section.nodes.map((node) => {
                  const status = nodeStatuses[node.id] ?? "pending";
                  return (
                    <li key={node.id}>
                      <button
                        onClick={() => onNodeClick(node)}
                        className={cn(
                          "w-full flex items-center gap-3.5 px-6 py-3.5 text-left",
                          "hover:bg-surface/40 active:bg-surface/60",
                          "transition-all"
                        )}
                        aria-label={`${node.label} — Status: ${status}. Tap to view details.`}
                      >
                        {STATUS_ICON[status]}
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm font-semibold truncate transition-all",
                              status === "done"
                                ? "line-through text-text-secondary/50"
                                : "text-text-primary"
                            )}
                          >
                            {node.label}
                          </p>
                          {node.estimatedTime && (
                            <p className="text-[10px] text-text-secondary font-medium mt-0.5">
                              ⏱ {node.estimatedTime}
                            </p>
                          )}
                        </div>
                        {node.isOptional && (
                          <span className="text-[9px] font-bold text-text-secondary border border-dashed border-border px-2 py-0.5 rounded-full shrink-0">
                            Optional
                          </span>
                        )}
                        <ChevronRight size={14} className="text-slate-400 shrink-0" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function groupNodesByMilestone(content: TaskflowContent) {
  const milestones = content.nodes.filter((n) => n.kind === "milestone");
  const subtopics = content.nodes.filter((n) => n.kind === "subtopic");

  const sections = milestones.map((m) => {
    const childNodes = subtopics.filter((s) => s.parentId === m.id);
    return {
      id: m.id,
      title: m.label,
      nodes: childNodes,
    };
  });

  const orphanSubtopics = subtopics.filter(
    (s) => !s.parentId || !milestones.some((m) => m.id === s.parentId)
  );
  if (orphanSubtopics.length > 0) {
    sections.push({
      id: "general",
      title: "General Topics",
      nodes: orphanSubtopics,
    });
  }

  return sections;
}
