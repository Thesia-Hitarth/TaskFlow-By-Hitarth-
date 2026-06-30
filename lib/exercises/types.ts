// lib/exercises/types.ts

export type ExerciseType = "function" | "html-css-js"
export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced"

export interface FunctionExercise {
  id: string
  type: "function"
  title: string
  difficulty: ExerciseDifficulty
  description: string          // the problem statement, supports basic markdown
  functionName: string         // must match exactly what the user is asked to define
  starterCode: string          // pre-filled in the editor
  solutionCode: string         // shown only after the user passes, or gives up
  testCases: {
    description: string
    args: unknown[]
    expected: unknown
    hidden?: boolean           // hidden test cases aren't shown until after a passing run
    runSnippet?: string
  }[]
  hints: string[]              // progressive hints, revealed one at a time
  relatedRoadmapNode?: { roadmapId: string; nodeId: string }
}

export interface HtmlCssJsExercise {
  id: string
  type: "html-css-js"
  title: string
  difficulty: ExerciseDifficulty
  description: string
  starterHtml: string
  starterCss: string
  starterJs?: string
  successCriteria: string[]    // human-readable checklist
  hints: string[]
  relatedRoadmapNode?: { roadmapId: string; nodeId: string }
}

export type Exercise = FunctionExercise | HtmlCssJsExercise
