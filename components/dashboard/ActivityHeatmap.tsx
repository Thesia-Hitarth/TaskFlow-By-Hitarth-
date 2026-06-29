"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface Activity {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  activities: Activity[];
  weeks?: number; // how many weeks to show (default 12)
}

export function ActivityHeatmap({ activities, weeks = 12 }: ActivityHeatmapProps) {
  const { grid, maxCount } = useMemo(() => {
    // Build a lookup map of date → count
    const map = new Map(activities.map((a) => [a.date, a.count]));

    // Generate last N weeks of dates, aligned to start on a Sunday
    const today = new Date();
    
    // Find the Sunday of N weeks ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (weeks * 7) + 1);
    
    // Adjust start date to the nearest Sunday
    const dayOfWeek = startDate.getDay();
    if (dayOfWeek > 0) {
      startDate.setDate(startDate.getDate() - dayOfWeek);
    }

    const gridList: Array<{ date: string; count: number; label: string }> = [];
    const d = new Date(startDate);

    // Keep adding days until we cover today or complete the grid
    const totalDays = weeks * 7;
    for (let i = 0; i < totalDays; i++) {
      const dateStr = d.toISOString().split("T")[0];
      gridList.push({
        date: dateStr,
        count: map.get(dateStr) ?? 0,
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });
      d.setDate(d.getDate() + 1);
    }

    const maxVal = Math.max(1, ...activities.map((a) => a.count));
    return { grid: gridList, maxCount: maxVal };
  }, [activities, weeks]);

  function getColorClass(count: number): string {
    if (count === 0) return "bg-card hover:bg-card/85 border border-border/40";
    
    const intensity = Math.ceil((count / maxCount) * 4); // 1–4
    
    switch (intensity) {
      case 1:
        return "bg-amber-500/20 border border-amber-500/10";
      case 2:
        return "bg-amber-500/40 border border-amber-500/20";
      case 3:
        return "bg-amber-500/70 border border-amber-500/30";
      case 4:
      default:
        return "bg-amber-500 border border-amber-600";
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface border border-border p-5 rounded-2xl shadow-md">
      <div className="flex gap-2 min-w-0 flex-1 overflow-x-auto pb-2 scrollbar-thin">
        {/* Row Labels (Mon, Wed, Fri only, to keep it clean) */}
        <div className="flex flex-col justify-between py-1 text-[10px] font-bold text-text-secondary select-none w-7 shrink-0 text-right pr-2">
          <span>Sun</span>
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>

        <div
          className="grid gap-1 w-max"
          style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
        >
          {/* Render week columns, each column is 7 days */}
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1 shrink-0">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const cell = grid[weekIdx * 7 + dayIdx];
                if (!cell) {
                  return <div key={dayIdx} className="w-3 h-3 rounded-md bg-transparent" />;
                }
                return (
                  <div
                    key={dayIdx}
                    title={`${cell.label}: ${cell.count} node${
                      cell.count !== 1 ? "s" : ""
                    } completed`}
                    className={cn(
                      "w-3.5 h-3.5 rounded-[4px] cursor-default transition-all duration-300 transform hover:scale-110",
                      getColorClass(cell.count)
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Details */}
      <div className="flex sm:flex-col items-start justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6 gap-3 shrink-0">
        <div>
          <h4 className="text-xs font-black text-text-primary uppercase tracking-wider">Consistency</h4>
          <p className="text-[10px] text-text-secondary font-medium mt-0.5">Study progress heatmap</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary select-none">
          <span>Less</span>
          <div className="w-3 h-3 rounded-md bg-card border border-border/40" />
          <div className="w-3 h-3 rounded-md bg-amber-500/20 border border-amber-500/10" />
          <div className="w-3 h-3 rounded-md bg-amber-500/40 border border-amber-500/20" />
          <div className="w-3 h-3 rounded-md bg-amber-500/70 border border-amber-500/30" />
          <div className="w-3 h-3 rounded-md bg-amber-500 border border-amber-600" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
