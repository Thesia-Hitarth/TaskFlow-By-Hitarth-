"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { taskflowContent } from "@/lib/taskflow-content";

const SYNCED_FLAG = "taskflow-progress-synced";

export default function ProgressSync() {
  const { status } = useSession();

  // Clear sync flag on sign-out (BUG-07)
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
              console.error(`Sync failed for ${slug}: ${res.status}`);
            }
          } catch (e) {
            allSucceeded = false;
            console.error(`Failed to sync taskflow progress for ${slug}:`, e);
          }
        }

        if (allSucceeded) {
          localStorage.setItem(SYNCED_FLAG, "true");
          window.dispatchEvent(new CustomEvent("taskflow-progress-update"));
        }
      } catch (err) {
        console.error("Error syncing progress:", err);
      }
    }

    sync();
  }, [status]);

  return null;
}
