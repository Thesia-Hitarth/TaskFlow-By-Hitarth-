// lib/projects/types.ts

export interface ProjectChallenge {
  id: string
  title: string
  roadmapId: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string             // "4-8 hours"
  description: string
  mustHaveRequirements: string[]
  stretchGoals: string[]
  designReference?: string          // path to a reference screenshot/mockup image
  suggestedTechStack: string[]      // ["HTML", "CSS", "Vanilla JS"]
  hints: string[]                   // high-level guided approach, not solutions
  exampleSolutionRepo?: string      // link to an example solution
}
