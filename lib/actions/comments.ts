"use server"

import { auth } from "@/auth"
import { isAdmin } from "@/lib/admin/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { deleteCommentCascade } from "@/lib/comments/cascadeDelete"

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
      select: { nodeTarget: true, guideTarget: true, parentId: true },
    })
    if (!parent) return { error: "Parent comment not found." }

    // Prevent nested replies (replies to replies)
    if (parent.parentId !== null) {
      return { error: "Nested replies are not supported." }
    }

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
      if (finalGuideTarget.startsWith("best-practice-")) {
        const slug = finalGuideTarget.replace("best-practice-", "")
        revalidatePath(`/best-practices/${slug}`)
      } else {
        revalidatePath(`/guides/${finalGuideTarget}`)
      }
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
  if (comment.authorId !== session.user.id && !isAdmin(session)) {
    return { error: "You are not authorized to delete this comment." }
  }

  try {
    // Hard delete cascade: remove comment and all replies from database
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
    isHidden: boolean
  } = {
    parentId: null,
    isHidden: false,
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
      take: 100, // Capped to prevent OOM/network load under massive activity
      include: {
        author: { select: { id: true, name: true, image: true, username: true } },
        votes: true,
        replies: {
          where: { isHidden: false },
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
    const existing = await prisma.commentVote.findUnique({
      where: {
        commentId_userId: { commentId, userId: session.user.id }
      }
    });

    if (existing) {
      await prisma.commentVote.delete({
        where: { id: existing.id }
      });
    } else {
      await prisma.commentVote.create({
        data: { commentId, userId: session.user.id, value: 1 },
      });
    }

    if (comment.nodeTarget) {
      const [roadmapId] = comment.nodeTarget.split(":")
      revalidatePath(`/${roadmapId}`)
    }
    if (comment.guideTarget) {
      revalidatePath(`/guides/${comment.guideTarget}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to vote for comment:", error)
    return { error: "Database error. Failed to cast vote." }
  }
}

// ── Accept answer ────────────────────────────────────────────────
export async function acceptAnswer(commentId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated." }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { parentId: true, authorId: true, nodeTarget: true, guideTarget: true },
  })
  if (!comment) return { error: "Comment not found." }

  // Must be a reply
  if (!comment.parentId) {
    return { error: "Only replies can be marked as accepted answers." }
  }

  // Fetch parent comment to verify ownership
  const parent = await prisma.comment.findUnique({
    where: { id: comment.parentId },
    select: { authorId: true },
  })
  if (!parent) return { error: "Parent comment not found." }

  // Check if caller is author of the question (parent) or an admin
  if (parent.authorId !== session.user.id && !isAdmin(session)) {
    return { error: "Only the author of the question can accept an answer." }
  }

  try {
    // Clear accepted status for all sibling replies under the same parent
    // and set accepted status on this reply in a single transaction
    await prisma.$transaction([
      prisma.comment.updateMany({
        where: { parentId: comment.parentId, isAccepted: true },
        data: { isAccepted: false },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: { isAccepted: true },
      }),
    ]);

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

  const validReasons = ["spam", "harassment", "off_topic", "misinformation"];
  if (!validReasons.includes(reason)) {
    return { error: "Invalid report reason." };
  }

  // Prevent throwaway accounts (under 24 hours old with 0 progress) from reporting comments
  const reporter = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { createdAt: true, progress: { take: 1 } },
  });
  if (!reporter) return { error: "Reporter not found." };
  const ageInHours = (Date.now() - reporter.createdAt.getTime()) / (1000 * 60 * 60);
  if (ageInHours < 24 && reporter.progress.length === 0) {
    return { error: "Your account must be at least 24 hours old or have completed at least one taskflow node to report comments." };
  }

  try {
    await prisma.commentReport.create({
      data: { commentId, reporterId: session.user.id, reason },
    })
    
    // Auto-hide if 10+ reports come in
    const reportCount = await prisma.commentReport.count({ where: { commentId } })
    if (reportCount >= 10) {
      await prisma.comment.update({
        where: { id: commentId },
        data: { isHidden: true },
      })

      // Notify admins of the moderation action
      const admins = await prisma.user.findMany({
        where: { role: "admin" },
        select: { id: true },
      });
      if (admins.length > 0) {
        await prisma.notification.createMany({
          data: admins.map((admin) => ({
            userId: admin.id,
            type: "badge_earned", // general notification type mapped to DB schema string
            title: "Comment Auto-Hidden",
            message: `A comment was auto-hidden after receiving ${reportCount} reports.`,
            linkUrl: "/admin/reports",
            isRead: false,
          })),
        }).catch((err) => console.error("Failed to notify admins of comment auto-hide:", err));
      }
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
  } catch (error: unknown) {
    // P2002 = unique constraint violation — the user has already reported this comment
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return { error: "You have already reported this comment." }
    }
    console.error("Failed to report comment:", error)
    return { error: "Database error. Failed to submit report." }
  }
}
