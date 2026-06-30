// components/compare/ThreeColumnTable.tsx
import Link from "next/link"
import { getComparisonData } from "@/lib/compare/getComparisonData"
import { getRoadmap } from "@/lib/roadmaps"

const DIFFICULTY_BADGE: Record<string, { emoji: string; color: string }> = {
  beginner: { emoji: "🟢", color: "text-emerald-600 dark:text-emerald-400 font-bold" },
  intermediate: { emoji: "🟡", color: "text-amber-600 dark:text-amber-400 font-bold" },
  advanced: { emoji: "🔴", color: "text-rose-600 dark:text-rose-400 font-bold" },
}

export function ThreeColumnTable({ roadmapIds }: { roadmapIds: [string, string, string] }) {
  const dataA = getComparisonData(roadmapIds[0])
  const dataB = getComparisonData(roadmapIds[1])
  const dataC = getComparisonData(roadmapIds[2])
  const roadmapA = getRoadmap(roadmapIds[0])
  const roadmapB = getRoadmap(roadmapIds[1])
  const roadmapC = getRoadmap(roadmapIds[2])

  if (!dataA || !dataB || !dataC || !roadmapA || !roadmapB || !roadmapC) return null

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
          {d.technologiesCovered.slice(0, 5).map(t => (
            <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-border">
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
      {/* Desktop Column View */}
      <div className="hidden lg:block rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
        <div className="grid grid-cols-[160px_1fr_1fr_1fr] bg-surface/50 border-b border-border">
          <div />
          <div className="p-4 text-center font-extrabold text-text-primary border-l border-border text-sm bg-accent/5">
            {roadmapA.title}
          </div>
          <div className="p-4 text-center font-extrabold text-text-primary border-l border-border text-sm bg-accent/5">
            {roadmapB.title}
          </div>
          <div className="p-4 text-center font-extrabold text-text-primary border-l border-border text-sm bg-accent/5">
            {roadmapC.title}
          </div>
        </div>

        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[160px_1fr_1fr_1fr] border-b border-border/60 ${i % 2 === 1 ? "bg-surface/20" : ""}`}
          >
            <div className="p-3.5 text-xs font-extrabold uppercase tracking-widest text-text-secondary self-center">
              {row.label}
            </div>
            <div className="p-3.5 text-xs text-text-primary font-semibold border-l border-border self-center">
              {row.render(dataA)}
            </div>
            <div className="p-3.5 text-xs text-text-primary font-semibold border-l border-border self-center">
              {row.render(dataB)}
            </div>
            <div className="p-3.5 text-xs text-text-primary font-semibold border-l border-border self-center">
              {row.render(dataC)}
            </div>
          </div>
        ))}

        {/* Best For You If */}
        <div className="grid grid-cols-[160px_1fr_1fr_1fr] border-b border-border">
          <div className="p-3.5 text-xs font-extrabold uppercase tracking-widest text-text-secondary self-start pt-5">
            Best for you if...
          </div>
          <div className="p-4 border-l border-border">
            <ul className="space-y-1.5">
              {dataA.bestForTraits.map((trait, i) => (
                <li key={i} className="text-xs text-text-secondary font-medium flex items-start gap-1 leading-relaxed">
                  <span className="text-accent shrink-0 font-bold">•</span> {trait}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-l border-border">
            <ul className="space-y-1.5">
              {dataB.bestForTraits.map((trait, i) => (
                <li key={i} className="text-xs text-text-secondary font-medium flex items-start gap-1 leading-relaxed">
                  <span className="text-accent shrink-0 font-bold">•</span> {trait}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-l border-border">
            <ul className="space-y-1.5">
              {dataC.bestForTraits.map((trait, i) => (
                <li key={i} className="text-xs text-text-secondary font-medium flex items-start gap-1 leading-relaxed">
                  <span className="text-accent shrink-0 font-bold">•</span> {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA links */}
        <div className="grid grid-cols-[160px_1fr_1fr_1fr] bg-surface/50">
          <div />
          <div className="p-4 text-center border-l border-border">
            <Link href={`/${roadmapIds[0]}`} className="inline-block px-4 py-2 bg-accent hover:bg-amber-600 text-black text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
              Start {roadmapA.title} →
            </Link>
          </div>
          <div className="p-4 text-center border-l border-border">
            <Link href={`/${roadmapIds[1]}`} className="inline-block px-4 py-2 bg-accent hover:bg-amber-600 text-black text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
              Start {roadmapB.title} →
            </Link>
          </div>
          <div className="p-4 text-center border-l border-border">
            <Link href={`/${roadmapIds[2]}`} className="inline-block px-4 py-2 bg-accent hover:bg-amber-600 text-black text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
              Start {roadmapC.title} →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Cards (Visible below lg breakpoint) */}
      <div className="block lg:hidden space-y-4">
        {[
          { id: roadmapIds[0], roadmap: roadmapA, data: dataA },
          { id: roadmapIds[1], roadmap: roadmapB, data: dataB },
          { id: roadmapIds[2], roadmap: roadmapC, data: dataC }
        ].map(({ id, roadmap, data }) => (
          <div key={id} className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-text-primary tracking-tight pb-2 border-b border-border">
              {roadmap.title}
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold uppercase tracking-wider">Difficulty</span>
                <span className="font-semibold">{rows[0].render(data)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold uppercase tracking-wider">Est. Time</span>
                <span className="font-semibold text-text-primary">{data.estimatedTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold uppercase tracking-wider">India Salary</span>
                <span className="font-semibold text-text-primary">{data.salaryRangeIndia}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-text-secondary font-bold uppercase tracking-wider">US Salary</span>
                <span className="font-semibold text-text-primary">{data.salaryRangeUS}</span>
              </div>
            </div>

            <Link href={`/${id}`} className="block w-full py-2 bg-accent hover:bg-amber-600 text-black text-center text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-accent/5">
              Start {roadmap.title} Path →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
