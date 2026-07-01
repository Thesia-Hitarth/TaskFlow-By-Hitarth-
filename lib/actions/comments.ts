"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// ── Validation schema ───────────────────────────────────────────
const CommentSchema = z.object({
  body: z
    .string()
    .min(3, "Comment must be at least 3 characters.")
    .max(2000, "Comment cannot exceed 2000 characters."),
  nodeTarget: z.string().optional().nullable(),
  guideTarget: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
})

// ── Create a comment ────────────────────────────────────────────
export async function createComment(input: z.infer<typeof CommentSchema>) {
  const session = await auth()
  if (!session?.user?.id) return { error: "You must be signed in to comment." }

  const parsed = CommentSchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  // Require exactly one target (or parentId reply which implicitly inherits target)
  if (!input.nodeTarget && !input.guideTarget && !input.parentId) {
    return { error: "Comment must be attached to a node, guide, or parent comment." }
  }

  let finalNodeTarget = input.nodeTarget
  let finalGuideTarget = input.guideTarget

  // If it's a reply, resolve the targets from the parent if not specified
  if (input.parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: input.parentId },
      select: { nodeTarget: true, guideTarget: true },
    })
    if (!parent) return { error: "Parent comment not found." }
    finalNodeTarget = finalNodeTarget || parent.nodeTarget
    finalGuideTarget = finalGuideTarget || parent.guideTarget
  }

  // Rate limiting: max 10 comments per user per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const recentCount = await prisma.comment.count({
    where: { authorId: session.user.id, createdAt: { gte: oneHourAgo } },
  })
  if (recentCount >= 10) {
    return { error: "You're posting too fast. Please wait before commenting again." }
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        body: input.body.trim(),
        authorId: session.user.id,
        nodeTarget: finalNodeTarget,
        guideTarget: finalGuideTarget,
        parentId: input.parentId,
      },
      include: {
        author: { select: { id: true, name: true, image: true, username: true } },
        votes: true,
        replies: {
          include: {
            author: { select: { id: true, name: true, image: true, username: true } },
            votes: true,
          },
        },
      },
    })

    // Revalidate target paths
    if (finalNodeTarget) {
      const [roadmapId] = finalNodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (finalGuideTarget) {
      revalidatePath(`/guides/${finalGuideTarget}`)
    }

    return { comment }
  } catch (error) {
    console.error("Failed to create comment:", error)
    return { error: "Failed to post comment due to database error." }
  }
}

// ── Delete a comment ─────────────────────────────────────────────
export async function deleteComment(commentId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { authorId: true, nodeTarget: true, guideTarget: true },
  })

  if (!comment) return { error: "Comment not found." }
  
  // Allow the author or an admin to delete the comment
  const isAdmin = session.user.email === process.env.ADMIN_EMAIL || session.user.email === "admin@taskflow.dev"
  if (comment.authorId !== session.user.id && !isAdmin) {
    return { error: "You are not authorized to delete this comment." }
  }

  try {
    // Soft delete: hide content to maintain tree structure
    await prisma.comment.update({
      where: { id: commentId },
      data: { isHidden: true, body: "[deleted]" },
    })

    if (comment.nodeTarget) {
      const [roadmapId] = comment.nodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (comment.guideTarget) {
      revalidatePath(`/guides/${comment.guideTarget}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to delete comment:", error)
    return { error: "Failed to delete comment." }
  }
}

// ── Fetch comments ───────────────────────────────────────────────
export async function getComments(target: {
  nodeTarget?: string | null
  guideTarget?: string | null
}) {
  const whereClause: {
    parentId: null
    nodeTarget?: string
    guideTarget?: string
  } = {
    parentId: null,
  }

  if (target.nodeTarget) {
    whereClause.nodeTarget = target.nodeTarget
  } else if (target.guideTarget) {
    whereClause.guideTarget = target.guideTarget
  } else {
    return []
  }

  try {
    const comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        author: { select: { id: true, name: true, image: true, username: true } },
        votes: true,
        replies: {
          include: {
            author: { select: { id: true, name: true, image: true, username: true } },
            votes: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: [
        { isAccepted: "desc" },
        { createdAt: "desc" },
      ],
    })

    return comments
  } catch (error) {
    console.error("Failed to fetch comments:", error)
    return []
  }
}

// ── Upvote a comment ─────────────────────────────────────────────
export async function voteComment(commentId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId, isHidden: false },
    select: { id: true, authorId: true, nodeTarget: true, guideTarget: true },
  })
  if (!comment) return { error: "Comment not found." }

  if (comment.authorId === session.user.id) {
    return { error: "You cannot upvote your own comment." }
  }

  try {
    await prisma.commentVote.create({
      data: { commentId, userId: session.user.id, value: 1 },
    })

    if (comment.nodeTarget) {
      const [roadmapId] = comment.nodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (comment.guideTarget) {
      revalidatePath(`/guides/${comment.guideTarget}`)
    }

    return { success: true }
  } catch {
    return { error: "Already voted." }
  }
}

// ── Accept answer ────────────────────────────────────────────────
export async function acceptAnswer(commentId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { nodeTarget: true, guideTarget: true, parentId: true },
  })
  if (!comment) return { error: "Comment not found." }
  if (comment.parentId) return { error: "Replies cannot be marked as accepted." }

  const threadWhere = comment.nodeTarget
    ? { nodeTarget: comment.nodeTarget, parentId: null }
    : { guideTarget: comment.guideTarget, parentId: null }

  try {
    await prisma.comment.updateMany({
      where: { ...threadWhere, isAccepted: true },
      data: { isAccepted: false },
    })

    await prisma.comment.update({
      where: { id: commentId },
      data: { isAccepted: true },
    })

    if (comment.nodeTarget) {
      const [roadmapId] = comment.nodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (comment.guideTarget) {
      revalidatePath(`/guides/${comment.guideTarget}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to accept answer:", error)
    return { error: "Database error." }
  }
}

// ── Report a comment ─────────────────────────────────────────────
export async function reportComment(
  commentId: string,
  reason: "spam" | "harassment" | "off_topic" | "misinformation"
) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  try {
    await prisma.commentReport.create({
      data: { commentId, reporterId: session.user.id, reason },
    })
    
    // Auto-hide if 3+ reports come in
    const reportCount = await prisma.commentReport.count({ where: { commentId } })
    if (reportCount >= 3) {
      await prisma.comment.update({
        where: { id: commentId },
        data: { isHidden: true },
      })
    }
    
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { nodeTarget: true, guideTarget: true },
    })
    
    if (comment) {
      if (comment.nodeTarget) {
        const [roadmapId] = comment.nodeTarget.split(":")
        revalidatePath(`/${roadmapId}`)
      }
      if (comment.guideTarget) {
        revalidatePath(`/guides/${comment.guideTarget}`)
      }
    }
    
    return { success: true }
  } catch {
    return { error: "You have already reported this comment." }
  }
}
