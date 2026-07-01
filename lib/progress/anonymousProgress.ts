"use client";

const PREFIX = "taskflow-progress:";

export function getAllAnonymousProgress(): Record<string, Record<string, string>> {
  if (typeof window === "undefined") return {};
  const result: Record<string, Record<string, string>> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        const slug = key.replace(PREFIX, "");
        const raw = localStorage.getItem(key);
        if (raw) {
          result[slug] = JSON.parse(raw);
        }
      }
    }
  } catch (e) {
    console.error("Failed to read all anonymous progress from localStorage:", e);
  }
  return result;
}

export function clearAnonymousProgressForSlug(slug: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PREFIX + slug);
  } catch (e) {
    console.error(`Failed to clear local progress for slug ${slug}:`, e);
  }
}

export async function syncAnonymousProgress() {
  if (typeof window === "undefined") return;
  const localData = getAllAnonymousProgress();
  const slugs = Object.keys(localData);

  for (const slug of slugs) {
    const progress = localData[slug];
    if (Object.keys(progress).length === 0) continue;

    try {
      const res = await fetch("/api/progress/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, progress }),
      });

      if (res.ok) {
        clearAnonymousProgressForSlug(slug);
        // Dispatch event so taskflow hooks refresh if active
        window.dispatchEvent(new CustomEvent("taskflow-progress-update", { detail: { slug } }));
      } else {
        console.error(`Failed to sync anonymous progress for ${slug}: HTTP ${res.status}`);
      }
    } catch (err) {
      console.error(`Error syncing anonymous progress for ${slug}:`, err);
    }
  }
}
