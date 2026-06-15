"use client";

export default function TaskflowProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm text-text-secondary mb-1 font-semibold">
        <span>{done} / {total} done</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-card border border-border overflow-hidden">
        <div className="h-full bg-accent transition-all duration-300 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

