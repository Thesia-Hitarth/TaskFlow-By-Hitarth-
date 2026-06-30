// components/compare/ComparisonTable.tsx
import Link from "next/link"
import { getComparisonData } from "@/lib/compare/getComparisonData"
import { getRoadmap } from "@/lib/roadmaps"

const DIFFICULTY_BADGE: Record<string, { emoji: string; color: string }> = {
  beginner: { emoji: "🟢", color: "text-emerald-600 dark:text-emerald-400 font-bold" },
  intermediate: { emoji: "🟡", color: "text-amber-600 dark:text-amber-400 font-bold" },
  advanced: { emoji: "🔴", color: "text-rose-600 dark:text-rose-400 font-bold" },
}

export function ComparisonTable({ roadmapIdA, roadmapIdB }: { roadmapIdA: string; roadmapIdB: string }) {
  const dataA = getComparisonData(roadmapIdA)
  const dataB = getComparisonData(roadmapIdB)
  const roadmapA = getRoadmap(roadmapIdA)
  const roadmapB = getRoadmap(roadmapIdB)

  if (!dataA || !dataB || !roadmapA || !roadmapB) return null

  const rows: { label: string; render: (d: NonNullable<typeof dataA>) => React.ReactNode }[] = [
    {
      label: "Difficulty",
      render: (d) => (
        <span className={DIFFICULTY_BADGE[d.difficulty]?.color || "text-text-secondary"}>
          {DIFFICULTY_BADGE[d.difficulty]?.emoji || ""} <span className="capitalize">{d.difficulty}</span>
        </span>
      ),
    },
    { label: "Estimated Time", render: (d) => d.estimatedTime },
    {
      label: "Technologies",
      render: (d) => (
        <div className="flex flex-wrap gap-1">
          {d.technologiesCovered.slice(0, 7).map(t => (
            <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-border">
              {t}
            </span>
          ))}
        </div>
      ),
    },
    { label: "Job titles after", render: (d) => d.jobTitlesAfter.join(", ") },
    { label: "Salary (India)", render: (d) => d.salaryRangeIndia ?? "—" },
    { label: "Salary (US)", render: (d) => d.salaryRangeUS ?? "—" },
  ]

  return (
    <div className="space-y-6">
      {/* Desktop Comparison Table (Visible on sm and larger viewports) */}
      <div className="hidden md:block rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
        {/* Header row with titles */}
        <div className="grid grid-cols-[160px_1fr_1fr] bg-surface/50 border-b border-border">
          <div />
          <div className="p-5 text-center font-extrabold text-text-primary border-l border-border text-base bg-accent/5">
            {roadmapA.title}
          </div>
          <div className="p-5 text-center font-extrabold text-text-primary border-l border-border text-base bg-accent/5">
            {roadmapB.title}
          </div>
        </div>

        {/* Data rows */}
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[160px_1fr_1fr] border-b border-border/60 ${i % 2 === 1 ? "bg-surface/20" : ""}`}
          >
            <div className="p-4 text-xs font-extrabold uppercase tracking-widest text-text-secondary self-center">
              {row.label}
            </div>
            <div className="p-4 text-sm text-text-primary font-semibold border-l border-border self-center">
              {row.render(dataA)}
            </div>
            <div className="p-4 text-sm text-text-primary font-semibold border-l border-border self-center">
              {row.render(dataB)}
            </div>
          </div>
        ))}

        {/* Best for you if... — qualitative row */}
        <div className="grid grid-cols-[160px_1fr_1fr] border-b border-border">
          <div className="p-4 text-xs font-extrabold uppercase tracking-widest text-text-secondary self-start pt-5">
            Best for you if...
          </div>
          <div className="p-5 border-l border-border">
            <ul className="space-y-2">
              {dataA.bestForTraits.map((trait, i) => (
                <li key={i} className="text-xs text-text-secondary font-medium flex items-start gap-1.5 leading-relaxed">
                  <span className="text-accent shrink-0 font-bold">•</span> {trait}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 border-l border-border">
            <ul className="space-y-2">
              {dataB.bestForTraits.map((trait, i) => (
                <li key={i} className="text-xs text-text-secondary font-medium flex items-start gap-1.5 leading-relaxed">
                  <span className="text-accent shrink-0 font-bold">•</span> {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA row */}
        <div className="grid grid-cols-[160px_1fr_1fr] bg-surface/50">
          <div />
          <div className="p-5 text-center border-l border-border">
            <Link href={`/${roadmapIdA}`} className="inline-block px-5 py-2.5 bg-accent hover:bg-amber-600 text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-accent/10 hover:shadow-accent/15">
              Start {roadmapA.title} →
            </Link>
          </div>
          <div className="p-5 text-center border-l border-border">
            <Link href={`/${roadmapIdB}`} className="inline-block px-5 py-2.5 bg-accent hover:bg-amber-600 text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-accent/10 hover:shadow-accent/15">
              Start {roadmapB.title} →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Cards (Visible only on smaller viewports) */}
      <div className="block md:hidden space-y-4">
        {[
          { id: roadmapIdA, roadmap: roadmapA, data: dataA },
          { id: roadmapIdB, roadmap: roadmapB, data: dataB }
        ].map(({ id, roadmap, data }) => (
          <div key={id} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-text-primary tracking-tight pb-2 border-b border-border">
              {roadmap.title}
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider">Difficulty</span>
                <span className="font-semibold">{rows[0].render(data)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider">Est. Time</span>
                <span className="font-semibold text-text-primary">{data.estimatedTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider">India Salary</span>
                <span className="font-semibold text-text-primary">{data.salaryRangeIndia}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider">US Salary</span>
                <span className="font-semibold text-text-primary">{data.salaryRangeUS}</span>
              </div>
              <div className="py-1 border-b border-border/30 space-y-1.5">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider block">Technologies</span>
                <div className="flex flex-wrap gap-1">
                  {data.technologiesCovered.slice(0, 5).map(t => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-border">{t}</span>
                  ))}
                </div>
              </div>
              <div className="py-1 space-y-2">
                <span className="text-text-secondary font-bold text-xs uppercase tracking-wider block">Ideal for you if...</span>
                <ul className="space-y-1 text-xs">
                  {data.bestForTraits.map((trait, idx) => (
                    <li key={idx} className="text-text-secondary font-medium leading-relaxed flex items-start gap-1">
                      <span className="text-accent">•</span> {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href={`/${id}`} className="block w-full py-2.5 bg-accent hover:bg-amber-600 text-black text-center text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-accent/5">
              Start {roadmap.title} Path →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
