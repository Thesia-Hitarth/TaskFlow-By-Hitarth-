"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isAdminUser } from "@/lib/admin/auth"
import { deleteCommentCascade } from "@/lib/comments/cascadeDelete"

export async function hideComment(commentId: string) {
  const isAuthorized = await isAdminUser()
  if (!isAuthorized) return { error: "Unauthorized. Admin privileges required." }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { nodeTarget: true, guideTarget: true },
    })

    if (!comment) return { error: "Comment not found." }

    await prisma.comment.update({
      where: { id: commentId },
      data: { isHidden: true },
    })

    if (comment.nodeTarget) {
      const [roadmapId] = comment.nodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (comment.guideTarget) {
      if (comment.guideTarget.startsWith("best-practice-")) {
        const slug = comment.guideTarget.replace("best-practice-", "")
        revalidatePath(`/best-practices/${slug}`)
      } else {
        revalidatePath(`/guides/${comment.guideTarget}`)
      }
    }

    revalidatePath("/admin/reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to hide comment:", error)
    return { error: "Database error." }
  }
}

export async function deleteCommentPermanently(commentId: string) {
  const isAuthorized = await isAdminUser()
  if (!isAuthorized) return { error: "Unauthorized. Admin privileges required." }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { nodeTarget: true, guideTarget: true },
    })

    if (!comment) return { error: "Comment not found." }

    await deleteCommentCascade(commentId)

    if (comment.nodeTarget) {
      const [roadmapId] = comment.nodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (comment.guideTarget) {
      if (comment.guideTarget.startsWith("best-practice-")) {
        const slug = comment.guideTarget.replace("best-practice-", "")
        revalidatePath(`/best-practices/${slug}`)
      } else {
        revalidatePath(`/guides/${comment.guideTarget}`)
      }
    }

    revalidatePath("/admin/reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete comment:", error)
    return { error: "Database error." }
  }
}

export async function approveShowcaseProject(projectId: string) {
  const isAuthorized = await isAdminUser()
  if (!isAuthorized) return { error: "Unauthorized. Admin privileges required." }

  try {
    await prisma.showcaseProject.update({
      where: { id: projectId },
      data: { isApproved: true },
    })

    revalidatePath("/showcase")
    revalidatePath("/admin/showcase")
    return { success: true }
  } catch (error) {
    console.error("Failed to approve project:", error)
    return { error: "Database error." }
  }
}

export async function rejectShowcaseProject(projectId: string) {
  const isAuthorized = await isAdminUser()
  if (!isAuthorized) return { error: "Unauthorized. Admin privileges required." }

  try {
    await prisma.showcaseProject.delete({
      where: { id: projectId },
    })

    revalidatePath("/admin/showcase")
    return { success: true }
  } catch (error) {
    console.error("Failed to reject project:", error)
    return { error: "Database error." }
  }
}
