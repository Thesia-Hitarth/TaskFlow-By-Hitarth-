"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { taskflowContent } from "@/lib/taskflow-content";

const SYNCED_FLAG = "taskflow-progress-synced";

export default function ProgressSync() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;
    if (localStorage.getItem(SYNCED_FLAG)) return;

    async function sync() {
      try {
        for (const slug of Object.keys(taskflowContent)) {
          const raw = localStorage.getItem(`taskflow-progress:${slug}`);
          if (!raw) continue;

          try {
            const progress = JSON.parse(raw);
            if (Object.keys(progress).length === 0) continue;

            await fetch("/api/progress/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug, progress }),
            });

            localStorage.removeItem(`taskflow-progress:${slug}`);
          } catch (e) {
            console.error(`Failed to sync taskflow progress for ${slug}:`, e);
          }
        }
        localStorage.setItem(SYNCED_FLAG, "true");
        window.dispatchEvent(new CustomEvent("taskflow-progress-update"));
      } catch (err) {
        console.error("Error syncing progress:", err);
      }
    }

    sync();
  }, [status]);

  return null;
}
