interface ChartItem {
  roadmapId: string;
  completions: number;
}

export function PopularRoadmapsChart({ data }: { data: ChartItem[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-text-secondary py-4 text-center">No completions recorded in the last 7 days.</p>;
  }

  const max = Math.max(...data.map((d) => d.completions), 1);

  return (
    <div className="space-y-3.5">
      {data.map((item) => (
        <div key={item.roadmapId} className="flex items-center gap-3">
          <span className="text-xs text-text-secondary w-28 shrink-0 truncate capitalize">
            {item.roadmapId.replace(/-/g, " ")}
          </span>
          <div className="flex-1 bg-surface border border-border/50 rounded-full h-3.5 overflow-hidden p-0.5">
            <div
              className="h-full bg-accent rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${(item.completions / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-text-secondary w-8 text-right shrink-0">
            {item.completions}
          </span>
        </div>
      ))}
    </div>
  );
}
