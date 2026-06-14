"use client";

export default function TaskflowProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm text-[#737373] mb-1">
        <span>{done} / {total} done</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#1e1e1e] border border-[#2a2a2a] overflow-hidden">
        <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
