// lib/actions/exercises.ts
"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function saveExerciseProgress(exerciseId: string, code: string, solved: boolean) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: "Unauthorized" }

  try {
    await prisma.exerciseAttempt.upsert({
      where: {
        userId_exerciseId: {
          userId: session.user.id,
          exerciseId,
        },
      },
      create: {
        userId: session.user.id,
        exerciseId,
        lastCode: code,
        status: solved ? "solved" : "attempted",
        solvedAt: solved ? new Date() : null,
        attemptCount: 1,
      },
      update: {
        lastCode: code,
        status: solved ? "solved" : "attempted",
        solvedAt: solved ? new Date() : undefined,
        attemptCount: { increment: 1 },
      },
    })
    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to save exercise progress:", error)
    return { success: false, error: "Database error" }
  }
}

export async function getExerciseProgress(exerciseId: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  try {
    return await prisma.exerciseAttempt.findUnique({
      where: {
        userId_exerciseId: {
          userId: session.user.id,
          exerciseId,
        },
      },
    })
  } catch (error: unknown) {
    console.error("Failed to get exercise progress:", error)
    return null
  }
}
