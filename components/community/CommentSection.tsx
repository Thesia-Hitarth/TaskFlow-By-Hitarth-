"use client"

import { useState, useOptimistic, useTransition, useEffect } from "react"
import { useSession } from "next-auth/react"
import { createComment, deleteComment } from "@/lib/actions/comments"
import { CommentCard } from "./CommentCard"
import { CommentForm } from "./CommentForm"
import { MessageSquare } from "lucide-react"
import type { CommentWithAuthor } from "@/types/community"
import Link from "next/link"

interface CommentSectionProps {
  initialComments: CommentWithAuthor[]
  nodeTarget?: string | null
  guideTarget?: string | null
}

export function CommentSection({
  initialComments,
  nodeTarget,
  guideTarget,
}: CommentSectionProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState(initialComments)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  // useOptimistic displays the new comment immediately
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: CommentWithAuthor) => [newComment, ...state]
  )

  async function handleSubmit(body: string) {
    if (!session?.user) return
    setError(null)

    // Build temporary optimistic comment
    const tempComment: CommentWithAuthor = {
      id: `temp-${Date.now()}`,
      body,
      authorId: session.user.id,
      nodeTarget: nodeTarget || null,
      guideTarget: guideTarget || null,
      parentId: null,
      isAccepted: false,
      isHidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: session.user.id,
        name: session.user.name ?? "You",
        image: session.user.image ?? null,
        username: (session.user as { username?: string | null }).username ?? null,
      },
      _count: { votes: 0 },
      replies: [],
    }

    startTransition(async () => {
      addOptimisticComment(tempComment)
      const res = await createComment({
        body,
        nodeTarget: nodeTarget || null,
        guideTarget: guideTarget || null,
      })

      if (res.error) {
        setError(res.error)
      } else if (res.comment) {
        // Replace temp comment with actual comment from DB
        setComments(prev => [
          res.comment as CommentWithAuthor,
          ...prev.filter(c => !c.id.startsWith("temp-")),
        ])
      }
    })
  }

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const res = await deleteComment(id)
      if (!res.error) {
        setComments(prev => prev.filter(c => c.id !== id))
      } else {
        window.alert(res.error)
      }
    }
  }

  return (
    <div className="mt-12 border-t border-border pt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={20} className="text-text-secondary/60" />
        <h3 className="font-extrabold text-lg text-text-primary tracking-tight">
          Discussion
          {optimisticComments.length > 0 && (
            <span className="ml-2.5 text-sm font-semibold text-text-secondary/50">
              ({optimisticComments.length})
            </span>
          )}
        </h3>
      </div>

      {/* Form (only shown to logged-in users) */}
      {session?.user ? (
        <CommentForm
          onSubmit={handleSubmit}
          isPending={isPending}
          userImage={session.user.image}
          placeholder="Ask a question, share a resource, or help someone who's stuck..."
        />
      ) : (
        <div className="bg-card border border-border rounded-xl px-5 py-4 text-sm font-medium text-text-secondary/70 mb-6 flex justify-between items-center">
          <span>Sign in to participate in the community discussion.</span>
          <Link
            href="/signin"
            className="text-accent hover:underline font-bold text-xs uppercase tracking-wider"
          >
            Sign In &rarr;
          </Link>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-bold mb-4">
          {error}
        </div>
      )}

      {/* List */}
      <div className="space-y-4 mt-8">
        {optimisticComments.length === 0 ? (
          <div className="p-8 text-center border border-border border-dashed rounded-2xl bg-card/10">
            <p className="text-sm text-text-secondary/50 italic font-medium">
              No comments yet. Start the conversation!
            </p>
          </div>
        ) : (
          optimisticComments.map(comment => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={session?.user?.id}
              nodeTarget={nodeTarget}
              guideTarget={guideTarget}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
