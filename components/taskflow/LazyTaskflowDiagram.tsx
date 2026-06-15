"use client";

import dynamic from "next/dynamic";
import { TaskflowContent } from "@/lib/taskflow-content/types";

const TaskflowDiagramImpl = dynamic(
  () => import("./TaskflowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] w-full rounded-xl border border-border/50 bg-surface/30 animate-pulse" />
    ),
  }
);

interface LazyTaskflowDiagramProps {
  content: TaskflowContent;
}

export default function LazyTaskflowDiagram({ content }: LazyTaskflowDiagramProps) {
  return <TaskflowDiagramImpl content={content} />;
}
