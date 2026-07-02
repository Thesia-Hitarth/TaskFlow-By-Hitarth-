"use client";

import { useState } from "react";
import { GuideMeta } from "@/lib/guides-data";
import { broadcastNewGuideAction } from "@/lib/actions/broadcastGuide";

export function BroadcastGuideCard({ guides }: { guides: GuideMeta[] }) {
  const [selectedSlug, setSelectedSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; count?: number; error?: string } | null>(null);

  const handleBroadcast = async () => {
    if (!selectedSlug) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await broadcastNewGuideAction(selectedSlug);
      setResult(res);
    } catch {
      setResult({ error: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-1">
          Broadcast New Guide Announcement
        </h3>
        <p className="text-xs text-text-secondary">
          Send an email notification to all subscribed learners informing them about a newly published guide.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          disabled={loading}
          className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-hidden focus:border-accent disabled:opacity-60"
        >
          <option value="">-- Select a guide to broadcast --</option>
          {guides.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.title} ({g.readingTime})
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleBroadcast}
          disabled={loading || !selectedSlug}
          className="px-6 py-2 bg-accent hover:bg-amber-600 disabled:bg-border text-black text-sm font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Broadcast Alert"}
        </button>
      </div>

      {result && (
        <div className="pt-2 text-xs font-semibold animate-fade-in">
          {result.success ? (
            <p className="text-green-600 dark:text-green-400">
              ✓ Successfully queued guide alerts for {result.count} subscribers!
            </p>
          ) : (
            <p className="text-red-600 dark:text-red-400">
              ✗ Error: {result.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
