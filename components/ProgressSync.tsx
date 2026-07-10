"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { taskflowContent } from "@/lib/taskflow-content";

const SYNCED_FLAG = "taskflow-progress-synced";

export default function ProgressSync() {
  const { status } = useSession();
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.removeItem(SYNCED_FLAG);
    }
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (localStorage.getItem(SYNCED_FLAG)) return;

    async function sync() {
      try {
        let allSucceeded = true;
        let lastFailedSlug: string | null = null;

        for (const slug of Object.keys(taskflowContent)) {
          const raw = localStorage.getItem(`taskflow-progress:${slug}`);
          if (!raw) continue;

          try {
            const progress = JSON.parse(raw);
            if (Object.keys(progress).length === 0) continue;

            const res = await fetch("/api/progress/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug, progress }),
            });

            if (res.ok) {
              localStorage.removeItem(`taskflow-progress:${slug}`);
            } else {
              allSucceeded = false;
              lastFailedSlug = slug;
              console.error(`Sync failed for ${slug}: ${res.status}`);
            }
          } catch (e) {
            allSucceeded = false;
            lastFailedSlug = slug;
            console.error(`Failed to sync taskflow progress for ${slug}:`, e);
          }
        }

        if (allSucceeded) {
          localStorage.setItem(SYNCED_FLAG, "true");
          setSyncError(null);
          window.dispatchEvent(new CustomEvent("taskflow-progress-update"));
        } else if (lastFailedSlug) {
          setSyncError(lastFailedSlug);
        }
      } catch (err) {
        console.error("Error syncing progress:", err);
      }
    }

    sync();
  }, [status]);

  if (!syncError) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-4 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span>⚠️</span>
        <p>Sync failed for "{syncError}". Progress not saved on server.</p>
      </div>
      <button 
        onClick={() => setSyncError(null)}
        className="text-[10px] uppercase font-bold text-red-500 hover:text-red-700 bg-red-500/20 px-2 py-1 rounded cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}
