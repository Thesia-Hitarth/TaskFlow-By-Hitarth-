// lib/compare/getComparisonData.ts
import { taskflows } from "@/lib/taskflows-data"
import { taskflowContent } from "@/lib/taskflow-content"
import { qualitativeRegistry, defaultQualitativeData } from "./data/qualitativeData"
import type { RoadmapComparisonData } from "./types"

export function getComparisonData(roadmapId: string): RoadmapComparisonData | null {
  const taskflow = taskflows.find(tf => tf.slug === roadmapId)
  const content = taskflowContent[roadmapId]
  if (!taskflow) return null

  const qualitative = qualitativeRegistry[roadmapId] || defaultQualitativeData(roadmapId)
  
  // Extract all node IDs from taskflowContent (subtopics + milestones)
  const nodeIds = content ? content.nodes.map(n => n.id) : []

  // Ensure difficulty matches target lower-case enum format ("beginner" | "intermediate" | "advanced")
  const rawDiff = (taskflow.difficulty || "Beginner").toLowerCase()
  const difficulty = (rawDiff === "advanced" || rawDiff === "intermediate" || rawDiff === "beginner")
    ? rawDiff
    : "beginner"

  return {
    roadmapId,
    difficulty,
    estimatedTime: taskflow.estimatedTime || "~6 months",
    description: taskflow.description || `Step by step guide to learning ${taskflow.title}`,
    technologiesCovered: qualitative.technologiesCovered,
    jobTitlesAfter: qualitative.jobTitlesAfter,
    salaryRangeIndia: qualitative.salaryRangeIndia,
    salaryRangeUS: qualitative.salaryRangeUS,
    bestForTraits: qualitative.bestForTraits,
    commonPairings: qualitative.commonPairings,
    nodeIds,
  }
}
