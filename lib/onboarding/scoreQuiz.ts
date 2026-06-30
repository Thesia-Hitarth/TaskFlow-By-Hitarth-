import { QUIZ_QUESTIONS, type QuizOptionId } from "./quizConfig"

export interface QuizAnswers {
  [questionId: string]: QuizOptionId | QuizOptionId[]  // single or multi-select
}

export interface ScoredRoadmap {
  roadmapId: string
  score: number
}

export function scoreQuizAnswers(answers: QuizAnswers): ScoredRoadmap[] {
  const totals: Record<string, number> = {}

  for (const question of QUIZ_QUESTIONS) {
    const answer = answers[question.id]
    if (!answer) continue

    const selectedIds = Array.isArray(answer) ? answer : [answer]

    for (const optionId of selectedIds) {
      const option = question.options.find(o => o.id === optionId)
      if (!option) continue

      for (const [roadmapId, weight] of Object.entries(option.weights)) {
        totals[roadmapId] = (totals[roadmapId] ?? 0) + (weight ?? 0)
      }
    }
  }

  return Object.entries(totals)
    .map(([roadmapId, score]) => ({ roadmapId, score }))
    .sort((a, b) => b.score - a.score)
}

export interface QuizRecommendation {
  primary: ScoredRoadmap
  secondary: ScoredRoadmap | null
  reasoning: string
}

export function buildRecommendation(answers: QuizAnswers): QuizRecommendation {
  const ranked = scoreQuizAnswers(answers)

  const primary = ranked[0] ?? { roadmapId: "frontend", score: 0 } // safe fallback if scoring ties out at zero
  const secondary = ranked[1] && ranked[1].score >= ranked[0].score * 0.6
    ? ranked[1]
    : null // only show a secondary suggestion if it's reasonably close, not a distant 3rd choice

  return {
    primary,
    secondary,
    reasoning: buildReasoningText(answers),
  }
}

// Generates a human-readable explanation referencing the user's actual answers —
// this is what makes the recommendation feel personalized rather than random.
function buildReasoningText(answers: QuizAnswers): string {
  const goalOption = findSelectedOption("goal", answers)
  const experienceOption = findSelectedOption("experience", answers)

  const goalPhrase = goalOption ? goalOption.label.toLowerCase() : "your goals"
  const expPhrase = experienceOption ? experienceOption.label.toLowerCase() : "your experience level"

  return `Based on wanting to ${goalPhrase} and being at a ${expPhrase} stage, ` +
         `this path gives you the most direct route forward.`
}

function findSelectedOption(questionId: string, answers: QuizAnswers) {
  const question = QUIZ_QUESTIONS.find(q => q.id === questionId)
  const answer = answers[questionId]
  if (!question || !answer) return null
  const id = Array.isArray(answer) ? answer[0] : answer
  return question.options.find(o => o.id === id) ?? null
}
