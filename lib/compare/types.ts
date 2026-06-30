// lib/compare/types.ts

export interface RoadmapComparisonData {
  roadmapId: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string                  // "~6 months"
  description: string
  technologiesCovered: string[]          // ["React", "TypeScript", "Next.js", "REST APIs"]
  jobTitlesAfter: string[]               // ["Front-End Developer", "UI Engineer"]
  salaryRangeIndia?: string              // "₹8–20 LPA"
  salaryRangeUS?: string                 // "$70k–$120k"
  bestForTraits: string[]                // "You enjoy visual, immediate feedback" etc.
  commonPairings: string[]               // roadmap IDs often combined with this one
  nodeIds: string[]                      // full list of this roadmap's node IDs, used for overlap calculation
}
