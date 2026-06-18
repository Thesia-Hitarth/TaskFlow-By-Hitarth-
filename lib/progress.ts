"use client";
import { useState, useEffect, useCallback } from "react";

export type NodeStatus = "pending" | "done" | "in-progress" | "skipped";

const PREFIX = "taskflow-progress:";

function read(slug: string): Record<string, NodeStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PREFIX + slug);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useRoadmapProgress(slug: string) {
  const [progress, setProgress] = useState<Record<string, NodeStatus>>({});

  useEffect(() => {
    queueMicrotask(() => setProgress(read(slug)));
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.slug === slug) setProgress(read(slug));
    };
    window.addEventListener("taskflow-progress-update", handler);
    return () =>
      window.removeEventListener("taskflow-progress-update", handler);
  }, [slug]);

  const updateStatus = useCallback(
    (nodeId: string, status: NodeStatus) => {
      const current = read(slug);
      if (status === "pending") delete current[nodeId];
      else current[nodeId] = status;
      localStorage.setItem(PREFIX + slug, JSON.stringify(current));
      window.dispatchEvent(
        new CustomEvent("taskflow-progress-update", { detail: { slug } })
      );
    },
    [slug]
  );

  const clearProgress = useCallback(() => {
    localStorage.removeItem(PREFIX + slug);
    window.dispatchEvent(
      new CustomEvent("taskflow-progress-update", { detail: { slug } })
    );
  }, [slug]);

  const doneCount = Object.values(progress).filter(
    (s) => s === "done"
  ).length;
  const totalCount = Object.keys(progress).length;

  return { progress, updateStatus, clearProgress, doneCount, totalCount };
}
