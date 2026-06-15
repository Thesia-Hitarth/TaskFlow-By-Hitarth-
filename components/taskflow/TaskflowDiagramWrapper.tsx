"use client";

import dynamic from "next/dynamic";
import type { TaskflowContent } from "@/lib/taskflow-content/types";

const TaskflowDiagram = dynamic(
  () => import("./TaskflowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] w-full rounded-xl border border-border/50 bg-surface/30 animate-pulse mt-10" />
    ),
  }
);

interface TaskflowDiagramWrapperProps {
  content: TaskflowContent;
}

export default function TaskflowDiagramWrapper({ content }: TaskflowDiagramWrapperProps) {
  return <TaskflowDiagram content={content} />;
}
