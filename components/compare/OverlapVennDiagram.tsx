// components/compare/OverlapVennDiagram.tsx
import { computeOverlap } from "@/lib/compare/computeOverlap"
import { getRoadmap } from "@/lib/roadmaps"

interface Props {
  roadmapIdA: string
  roadmapIdB: string
}

// Geometry helper: given a desired overlap percentage, compute how far apart
// to place two equal-radius circles so their intersection area matches that percentage.
function computeCircleDistance(overlapPct: number, radius: number): number {
  // At 0% overlap, distance = 2*radius (circles just touching)
  // At 100% overlap, distance = 0 (circles fully coincide)
  const maxDistance = radius * 2
  return maxDistance * (1 - overlapPct / 100)
}

export function OverlapVennDiagram({ roadmapIdA, roadmapIdB }: Props) {
  const overlap = computeOverlap(roadmapIdA, roadmapIdB)
  const roadmapA = getRoadmap(roadmapIdA)
  const roadmapB = getRoadmap(roadmapIdB)
  if (!roadmapA || !roadmapB) return null

  const RADIUS = 75
  const VIEWBOX_WIDTH = 340
  const VIEWBOX_HEIGHT = 200
  const CENTER_Y = VIEWBOX_HEIGHT / 2

  const distance = computeCircleDistance(overlap.overlapPercentage, RADIUS)
  const cxA = VIEWBOX_WIDTH / 2 - distance / 2
  const cxB = VIEWBOX_WIDTH / 2 + distance / 2

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-extrabold text-text-primary tracking-tight">Topic Overlap</h3>
        <p className="text-xs text-text-secondary font-medium mt-0.5 mb-4">
          {overlap.overlapPercentage}% of topics in the shorter path are shared.
        </p>
      </div>

      <div className="w-full flex justify-center py-2">
        <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="w-full max-w-[280px] h-auto overflow-visible">
          {/* Circle A */}
          <circle
            cx={cxA} cy={CENTER_Y} r={RADIUS}
            className="fill-amber-500/15 stroke-amber-600 dark:stroke-amber-500"
            strokeWidth={2}
          />
          {/* Circle B */}
          <circle
            cx={cxB} cy={CENTER_Y} r={RADIUS}
            className="fill-orange-500/15 stroke-orange-600 dark:stroke-orange-500"
            strokeWidth={2}
          />

          {/* Counts inside each region */}
          {/* Left unique count */}
          <text x={cxA - distance / 4 - 8} y={CENTER_Y + 5} textAnchor="middle" className="fill-text-primary text-base font-extrabold font-sans">
            {overlap.uniqueToA.length}
          </text>
          {/* Center shared count */}
          <text x={VIEWBOX_WIDTH / 2} y={CENTER_Y + 5} textAnchor="middle" className="fill-text-primary text-base font-extrabold font-sans">
            {overlap.sharedTopics.length}
          </text>
          {/* Right unique count */}
          <text x={cxB + distance / 4 + 8} y={CENTER_Y + 5} textAnchor="middle" className="fill-text-primary text-base font-extrabold font-sans">
            {overlap.uniqueToB.length}
          </text>

          {/* Labels for circles */}
          <text x={cxA - 15} y={CENTER_Y - RADIUS - 8} textAnchor="middle" className="fill-amber-600 dark:fill-amber-500 text-[10px] font-bold tracking-tight">
            {roadmapA.title}
          </text>
          <text x={cxB + 15} y={CENTER_Y - RADIUS - 8} textAnchor="middle" className="fill-orange-600 dark:fill-orange-500 text-[10px] font-bold tracking-tight">
            {roadmapB.title}
          </text>
        </svg>
      </div>

      {/* Shared topics list */}
      {overlap.sharedTopics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary mb-2">Shared Topics ({overlap.sharedTopics.length})</p>
          <div className="flex flex-wrap gap-1">
            {overlap.sharedTopics.slice(0, 8).map(topicId => (
              <span key={topicId} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-border">
                {formatTopicLabel(topicId)}
              </span>
            ))}
            {overlap.sharedTopics.length > 8 && (
              <span className="text-[9px] font-bold text-text-secondary/70 self-center ml-1">+{overlap.sharedTopics.length - 8} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function formatTopicLabel(nodeId: string): string {
  return nodeId.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
}
