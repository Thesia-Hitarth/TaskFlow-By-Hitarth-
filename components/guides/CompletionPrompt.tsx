"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface CompletionPromptProps {
  roadmapId: string;
  nodeId: string;
  nodeLabel: string;
}

export default function CompletionPrompt({
  roadmapId,
  nodeId,
  nodeLabel,
}: CompletionPromptProps) {
  const [visible, setVisible] = useState(false);
  const [marked, setMarked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Check if already completed locally or on server
  useEffect(() => {
    async function checkCurrentStatus() {
      try {
        const res = await fetch(`/api/progress?slug=${roadmapId}`);
        if (res.ok) {
          const progressMap = await res.json();
          if (progressMap[nodeId] === "done") {
            setMarked(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial node status:", err);
      }
    }
    checkCurrentStatus();
  }, [roadmapId, nodeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 1.0 }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMarkDone = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: roadmapId, nodeId, status: "done" }),
        });
        if (res.ok) {
          setMarked(true);
          // Celebrate with confetti!
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.9 },
            colors: ["#d97706", "#f59e0b", "#10b981", "#3b82f6"],
          });
          // Dispatch custom event to notify ReactFlow progress listeners
          window.dispatchEvent(
            new CustomEvent("taskflow-progress-update", { detail: { slug: roadmapId } })
          );
        }
      } catch (err) {
        console.error("Failed to mark node completed:", err);
      }
    });
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" />
      {visible && (
        <div className="mt-12 p-6 rounded-2xl border border-border bg-card shadow-xs transition-all duration-300">
          {!marked ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  Completed this topic?
                </h4>
                <p className="text-xs text-text-secondary mt-1 font-medium">
                  Have you finished learning <strong className="text-accent">{nodeLabel}</strong>? Mark it completed to update your roadmap progress.
                </p>
              </div>
              <button
                onClick={handleMarkDone}
                disabled={isPending}
                className="flex items-center gap-1.5 shrink-0 px-4 py-2 bg-accent hover:bg-accent/90 text-white dark:text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <CheckCircle className="h-4 w-4" />
                {isPending ? "Marking..." : "Mark as completed"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Marked as completed on your {roadmapId} roadmap!</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
