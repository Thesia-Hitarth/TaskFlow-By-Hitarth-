"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL || ""
].filter(Boolean)

async function isAdminUser() {
  const session = await auth()
  if (!session?.user?.email) return false
  return ADMIN_EMAILS.includes(session.user.email)
}

async function deleteCommentCascade(commentId: string) {
  const replies = await prisma.comment.findMany({
    where: { parentId: commentId },
    select: { id: true },
  })

  for (const reply of replies) {
    await deleteCommentCascade(reply.id)
  }

  await prisma.commentReport.deleteMany({
    where: { commentId },
  })

  await prisma.commentVote.deleteMany({
    where: { commentId },
  })

  await prisma.comment.delete({
    where: { id: commentId },
  })
}

export async function hideComment(commentId: string) {
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
