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
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFIX + slug, JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent("taskflow-progress-update", { detail: { slug } }));
}

// NOTE: next-auth v5 auto-detects AUTH_<PROVIDER>_ID and AUTH_<PROVIDER>_SECRET env vars
// for GitHub and Google without needing explicit credentials config inside auth.ts.
export function useTaskflowProgress(slug: string) {
  const { status: sessionStatus } = useSession();
  const isAuthed = sessionStatus === "authenticated";
  const [progress, setProgress] = useState<Record<string, NodeStatus>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const load = useCallback(async () => {
    if (isAuthed) {
      try {
        const res = await fetch(`/api/progress?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        } else if (res.status === 401) {
          setProgress(readLocal(slug));
        }
      } catch (err) {
        console.error("Failed to fetch database progress:", err);
      } finally {
        setIsLoaded(true);
      }
    } else {
      setProgress(readLocal(slug));
      setIsLoaded(true);
    }
  }, [slug, isAuthed]);

  useEffect(() => {
    setIsLoaded(false);
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
    async (nodeId: string, newStatus: NodeStatus) => {
      let prevStatus: NodeStatus = "pending";
      let nextProgress: Record<string, NodeStatus> = {};

      setProgress((prev) => {
        prevStatus = prev[nodeId] ?? "pending";
        const next = { ...prev };
        if (newStatus === "pending") {
          delete next[nodeId];
        } else {
          next[nodeId] = newStatus;
        }
        nextProgress = next;
        return next;
      });

      if (isAuthed) {
        try {
          const res = await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, nodeId, status: newStatus }),
          });
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          window.dispatchEvent(new CustomEvent("taskflow-progress-update", { detail: { slug } }));
        } catch (err) {
          console.error("Failed to update database progress, reverting:", err);
          setProgress((prev) => {
            const next = { ...prev };
            if (prevStatus === "pending") {
              delete next[nodeId];
            } else {
              next[nodeId] = prevStatus;
            }
            return next;
          });
        }
      } else {
        writeLocal(slug, nextProgress);
      }
    },
    [slug, isAuthed]
  );

  const clearProgress = useCallback(async () => {
    setProgress({});
    if (isAuthed) {
      try {
        const res = await fetch(`/api/progress?slug=${slug}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        window.dispatchEvent(new CustomEvent("taskflow-progress-update", { detail: { slug } }));
      } catch (err) {
        console.error("Failed to clear database progress:", err);
        load();
      }
    } else {
      localStorage.removeItem(PREFIX + slug);
      window.dispatchEvent(new CustomEvent("taskflow-progress-update", { detail: { slug } }));
    }
  }, [slug, isAuthed, load]);

  return { progress, updateStatus, clearProgress, isLoaded };
}
