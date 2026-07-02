"use client";

import { useState } from "react";
import { updateEmailPreferences, unsubscribeAllAction } from "@/lib/actions/subscribe";

const EMAIL_TYPES = [
  { key: "weekly_digest", label: "Weekly learning digest", description: "Your progress summary every Monday" },
  { key: "new_guides",    label: "New guide alerts", description: "When new guides relevant to your path are published" },
  { key: "badges",        label: "Badge notifications", description: "When you earn a new achievement" },
  { key: "streak",        label: "Streak warnings", description: "When your learning streak is at risk" },
];

export function UnsubscribeForm({
  email,
  initialPreferences,
}: {
  email: string;
  initialPreferences: Record<string, boolean>;
}) {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(initialPreferences);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      await updateEmailPreferences(email, prefs);
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubAll = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const all = Object.fromEntries(Object.keys(prefs).map((k) => [k, false]));
      setPrefs(all);
      await unsubscribeAllAction(email);
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-left space-y-4 max-w-md mx-auto">
      {EMAIL_TYPES.map(({ key, label, description }) => (
        <div
          key={key}
          className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-surface/50 transition-colors"
        >
          <input
            type="checkbox"
            id={key}
            checked={prefs[key]}
            onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
            className="mt-0.5"
            disabled={loading}
          />
          <label htmlFor={key} className="cursor-pointer select-none">
            <span className="text-sm font-semibold text-text-primary block">{label}</span>
            <span className="text-xs text-text-secondary mt-0.5 block">{description}</span>
          </label>
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 py-2.5 bg-accent hover:bg-amber-600 text-black text-sm font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-60"
        >
          {saved ? "Saved ✓" : "Save preferences"}
        </button>
        <button
          onClick={handleUnsubAll}
          disabled={loading}
          className="px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary border border-border rounded-xl transition-all cursor-pointer disabled:opacity-60"
        >
          Unsubscribe all
        </button>
      </div>
    </div>
  );
}
