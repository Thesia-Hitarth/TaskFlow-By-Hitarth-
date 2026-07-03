"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { updateStreak } from "@/lib/streak/updateStreak"
import { getProjectById } from "@/lib/projects/getAllProjects"
import { httpUrlSchema } from "@/lib/utils/url"
import { z } from "zod"

interface SubmissionData {
  repoUrl: string
  liveUrl?: string
  description?: string
}

const ProjectSubmissionSchema = z.object({
  projectId: z.string().min(1, "Project ID is required.").refine(
    (id) => getProjectById(id) !== null,
    { message: "Invalid project ID." }
  ),
  repoUrl: httpUrlSchema,
  liveUrl: httpUrlSchema.optional().or(z.literal("")),
  description: z.string().max(1000, "Description cannot exceed 1000 characters.").optional().or(z.literal("")),
})

export async function submitProject(projectId: string, data: SubmissionData) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: "Unauthorized" }

  const parsed = ProjectSubmissionSchema.safeParse({ projectId, ...data })
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

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

    // Log daily consistency activity and update streak
    await updateStreak(session.user.id)

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
