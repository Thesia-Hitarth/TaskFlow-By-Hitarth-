import { getRoadmap } from "@/lib/roadmaps"

const HOURS_PER_WEEK: Record<string, number> = {
  casual: 4,
  "part-time": 7,
  committed: 15,
  "full-time": 25,
}

export function estimateTimelineWeeks(roadmapId: string, timeCommitmentId: string): number {
  const roadmap = getRoadmap(roadmapId)
  if (!roadmap) return 0

  // roadmap.estimatedHoursTotal exists on our RoadmapConfig type —
  // sum of all node estimatedTime values, precomputed at build time
  const totalHours = roadmap.estimatedHoursTotal ?? 120 // sane fallback
  const hoursPerWeek = HOURS_PER_WEEK[timeCommitmentId] ?? 7

  return Math.ceil(totalHours / hoursPerWeek)
}
