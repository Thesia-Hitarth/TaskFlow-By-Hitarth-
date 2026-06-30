// lib/actions/projects.ts
"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface SubmissionData {
  repoUrl: string
  liveUrl?: string
  description?: string
}

export async function submitProject(projectId: string, data: SubmissionData) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: "Unauthorized" }

  try {
    await prisma.projectSubmission.upsert({
      where: {
        userId_projectId: {
          userId: session.user.id,
          projectId,
        },
      },
      create: {
        userId: session.user.id,
        projectId,
        repoUrl: data.repoUrl,
        liveUrl: data.liveUrl || null,
        description: data.description || null,
      },
      update: {
        repoUrl: data.repoUrl,
        liveUrl: data.liveUrl || null,
        description: data.description || null,
      },
    })
    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to submit project:", error)
    return { success: false, error: "Database error" }
  }
}

export async function getProjectSubmission(projectId: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  try {
    return await prisma.projectSubmission.findUnique({
      where: {
        userId_projectId: {
          userId: session.user.id,
          projectId,
        },
      },
    })
  } catch (error: unknown) {
    console.error("Failed to get project submission:", error)
    return null
  }
}
