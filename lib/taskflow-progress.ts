"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { NodeStatus } from "./taskflow-content/types";

const PREFIX = "taskflow-progress:";

function readLocal(slug: string): Record<string, NodeStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PREFIX + slug);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocal(slug: string, progress: Record<string, NodeStatus>) {
  localStorage.setItem(PREFIX + slug, JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent("taskflow-progress-update", { detail: { slug } }));
}

export function useTaskflowProgress(slug: string) {
  const { status: sessionStatus } = useSession();
  const isAuthed = sessionStatus === "authenticated";
  const [progress, setProgress] = useState<Record<string, NodeStatus>>({});

  const load = useCallback(async () => {
    if (isAuthed) {
      try {
        const res = await fetch(`/api/progress?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        }
      } catch (err) {
        console.error("Failed to fetch database progress:", err);
      }
    } else {
      // Wrap in microtask to avoid synchronous setState during effect invocation
      Promise.resolve().then(() => {
        setProgress(readLocal(slug));
      });
    }
  }, [slug, isAuthed]);

  useEffect(() => {
    load();

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!isAuthed) {
        if (detail?.slug === slug) {
          Promise.resolve().then(() => {
            setProgress(readLocal(slug));
          });
        }
      } else {
        if (!detail || !detail.slug || detail.slug === slug) {
          load();
        }
      }
    };

    window.addEventListener("taskflow-progress-update", handler);
    return () => {
      window.removeEventListener("taskflow-progress-update", handler);
    };
  }, [slug, isAuthed, load]);

  const updateStatus = useCallback(
    (nodeId: string, newStatus: NodeStatus) => {
      setProgress((prev) => {
        const next = { ...prev };
        if (newStatus === "pending") {
          delete next[nodeId];
        } else {
          next[nodeId] = newStatus;
        }

        if (isAuthed) {
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, nodeId, status: newStatus }),
          }).catch((err) => console.error("Failed to update database progress:", err));
        } else {
          writeLocal(slug, next);
        }

        return next;
      });
    },
    [slug, isAuthed]
  );

  return { progress, updateStatus };
}
