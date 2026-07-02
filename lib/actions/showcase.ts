"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { taskflows } from "@/lib/taskflows-data"

const SubmitProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description cannot exceed 500 characters."),
  liveUrl: z
    .string()
    .url("Live URL must be a valid URL.")
    .optional()
    .or(z.literal("")),
  repoUrl: z
    .string()
    .url("Repository URL must be a valid URL.")
    .optional()
    .or(z.literal("")),
  roadmapId: z.string().min(1, "Please select a learning path."),
  tags: z.array(z.string()).max(5, "You can add at most 5 tags."),
})

export async function submitProject(input: z.infer<typeof SubmitProjectSchema>) {
  const session = await auth()
  if (!session?.user?.id) return { error: "You must be signed in to submit." }

  const parsed = SubmitProjectSchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  // Check if roadmapId is valid
  const isValidRoadmap = taskflows.some(tf => tf.slug === parsed.data.roadmapId)
  if (!isValidRoadmap) return { error: "Invalid learning path selected." }

  try {
    await prisma.showcaseProject.create({
      data: {
        title: parsed.data.title.trim(),
        description: parsed.data.description.trim(),
        liveUrl: parsed.data.liveUrl || null,
        repoUrl: parsed.data.repoUrl || null,
        roadmapId: parsed.data.roadmapId,
        tags: parsed.data.tags,
        authorId: session.user.id,
        isApproved: false, // Requires admin review
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to submit showcase project:", error)
    return { error: "Database error. Failed to submit project." }
  }
}

export async function upvoteProject(projectId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated. Sign in to upvote." }

  try {
    const project = await prisma.showcaseProject.findUnique({
      where: { id: projectId },
      select: { authorId: true },
    })

    if (!project) {
      return { error: "Project not found." }
    }

    if (project.authorId === session.user.id) {
      return { error: "You cannot upvote your own project." }
    }

    await prisma.showcaseUpvote.create({
      data: {
        projectId,
        userId: session.user.id,
      },
    })
    revalidatePath("/showcase")
    return { success: true }
  } catch {
    return { error: "You have already upvoted this project." }
  }
}
