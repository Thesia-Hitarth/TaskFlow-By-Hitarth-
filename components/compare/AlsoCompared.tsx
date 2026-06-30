// components/compare/AlsoCompared.tsx
import Link from "next/link"
import { getComparisonData } from "@/lib/compare/getComparisonData"
import { getRoadmap } from "@/lib/roadmaps"

export function AlsoCompared({ roadmapId }: { roadmapId: string }) {
  const data = getComparisonData(roadmapId)
  if (!data || data.commonPairings.length === 0) return null

  return (
    <div className="mt-8 p-6 rounded-2xl border border-border bg-surface/30">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary mb-3">
        Learners exploring {getRoadmap(roadmapId)?.title} also compared it with:
      </p>
      <div className="flex flex-wrap gap-2">
        {data.commonPairings.map(pairId => {
          const pairRoadmap = getRoadmap(pairId)
          if (!pairRoadmap) return null
          return (
            <Link
              key={pairId}
              href={`/compare?a=${roadmapId}&b=${pairId}`}
              className="text-xs font-bold px-3 py-1.5 rounded-xl border border-border bg-card text-text-secondary hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
            >
              vs {pairRoadmap.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
