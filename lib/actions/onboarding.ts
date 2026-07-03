// lib/actions/onboarding.ts
"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { Prisma } from "@prisma/client"
import type { QuizAnswers, QuizRecommendation } from "@/lib/onboarding/scoreQuiz"

import { z } from "zod"

const QuizAnswersSchema = z.record(z.string(), z.string().or(z.array(z.string())))

export async function saveQuizResult(answers: QuizAnswers, recommendation: QuizRecommendation) {
  const session = await auth()
  
  const parsedAnswers = QuizAnswersSchema.safeParse(answers)
  if (!parsedAnswers.success) {
    throw new Error("Invalid quiz answers format.")
  }

  const timeCommitment = (answers["time"] as string) ?? "part-time"

  const result = await prisma.quizResult.create({
    data: {
      userId: session?.user?.id ?? null,
      answers: answers as Prisma.InputJsonValue, // Prisma Json field
      primaryRoadmapId: recommendation.primary.roadmapId,
      secondaryRoadmapId: recommendation.secondary?.roadmapId ?? null,
      reasoning: recommendation.reasoning,
      timeCommitment,
    },
  })

  // For anonymous (logged-out) users, stashing the result ID in a cookie
  // so the results page can read it back without requiring login.
  if (!session?.user?.id) {
    const cookieStore = await cookies()
    cookieStore.set("taskflow_quiz_result", result.id, { maxAge: 60 * 60 * 24 * 30, path: "/" }) // 30 days
  }

  return result
}

export async function getLatestQuizResult() {
  const session = await auth()

  if (session?.user?.id) {
    return prisma.quizResult.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })
  }

  // Anonymous fallback — read the cookie set above
  const cookieStore = await cookies()
  const resultId = cookieStore.get("taskflow_quiz_result")?.value
  if (!resultId) return null

  return prisma.quizResult.findUnique({ where: { id: resultId } })
}

export async function markTourSeen() {
  const session = await auth()
  if (!session?.user?.id) return
  await prisma.user.update({
    where: { id: session.user.id },
    data: { hasSeenTour: true },
  })
}
