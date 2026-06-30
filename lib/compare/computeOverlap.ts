// lib/compare/computeOverlap.ts
import { getComparisonData } from "./getComparisonData"

export interface OverlapResult {
  overlapPercentage: number       // relative to the SMALLER of the two roadmaps (more meaningful than relative to the union)
  sharedTopics: string[]
  uniqueToA: string[]
  uniqueToB: string[]
}

export function computeOverlap(roadmapIdA: string, roadmapIdB: string): OverlapResult {
  const dataA = getComparisonData(roadmapIdA)
  const dataB = getComparisonData(roadmapIdB)

  if (!dataA || !dataB) {
    return { overlapPercentage: 0, sharedTopics: [], uniqueToA: [], uniqueToB: [] }
  }

  const setA = new Set(dataA.nodeIds)
  const setB = new Set(dataB.nodeIds)

  const shared = [...setA].filter(id => setB.has(id))
  const uniqueToA = [...setA].filter(id => !setB.has(id))
  const uniqueToB = [...setB].filter(id => !setA.has(id))

  const smallerSetSize = Math.min(setA.size, setB.size)
  const overlapPercentage = smallerSetSize > 0
    ? Math.round((shared.length / smallerSetSize) * 100)
    : 0

  return { overlapPercentage, sharedTopics: shared, uniqueToA, uniqueToB }
}
