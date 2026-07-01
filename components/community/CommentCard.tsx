"use client"

import { useState, useTransition } from "react"
import { ThumbsUp, Reply, Trash2, CheckCircle2, ChevronDown, ChevronUp, AlertOctagon } from "lucide-react"
import { cn, formatTimeAgo } from "@/lib/utils"
import { voteComment, acceptAnswer, reportComment, createComment } from "@/lib/actions/comments"
import { CommentForm } from "./CommentForm"
import { UserAvatar } from "../ui/UserAvatar"
import type { CommentWithAuthor, CommentReply } from "@/types/community"
import Link from "next/link"

interface CommentCardProps {
  comment: CommentWithAuthor | CommentReply
  currentUserId?: string
  nodeTarget?: string | null
  guideTarget?: string | null
  onDelete: (id: string) => void
  onVoteSuccess?: (id: string, newVoteCount: number, hasVoted: boolean) => void
  isReply?: boolean
}

export function CommentCard({
  comment,
  currentUserId,
  nodeTarget,
  guideTarget,
  onDelete,
  onVoteSuccess,
  isReply = false,
}: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [localVotes, setLocalVotes] = useState(
    comment.votes.reduce((sum, v) => sum + v.value, 0)
  )
  const [userHasVoted, setUserHasVoted] = useState(
    comment.votes.some(v => v.userId === currentUserId)
  )
  const [isPending, startTransition] = useTransition()

  const isAuthor = currentUserId === comment.authorId
  // Safely check replies for CommentWithAuthor (replies might not be present on CommentReply type)
  const replies = ("replies" in comment) ? (comment as CommentWithAuthor).replies : []
  const replyCount = replies.length

  async function handleVote() {
    if (!currentUserId || userHasVoted) return
    setLocalVotes(v => v + 1)
    setUserHasVoted(true)
    startTransition(async () => {
      const res = await voteComment(comment.id)
      if (res.error) {
        // Rollback on error
        setLocalVotes(v => v - 1)
        setUserHasVoted(false)
      } else if (onVoteSuccess) {
        onVoteSuccess(comment.id, localVotes + 1, true)
      }
    })
  }

  async function handleReplySubmit(body: string) {
    startTransition(async () => {
      const res = await createComment({
        body,
        nodeTarget: nodeTarget || null,
        guideTarget: guideTarget || null,
        parentId: comment.id,
      })
      if (!res.error) {
        setShowReplyForm(false)
        // Refresh page to load replies
        window.location.reload()
      }
    })
  }

  async function handleAccept() {
    if (!currentUserId || isPending) return
    startTransition(async () => {
      const res = await acceptAnswer(comment.id)
      if (res.success) {
        window.location.reload()
      } else if (res.error) {
        window.alert(res.error)
      }
    })
  }

  async function handleReport() {
    if (!currentUserId) return
    const reason = window.prompt(
      "Why are you reporting this comment?\nEnter: 'spam', 'harassment', 'off_topic', or 'misinformation'"
    )
    if (!reason) return
    
    const validReasons = ["spam", "harassment", "off_topic", "misinformation"]
    if (!validReasons.includes(reason.toLowerCase())) {
      window.alert("Invalid report reason. Please try again.")
      return
    }

    startTransition(async () => {
      const res = await reportComment(comment.id, reason.toLowerCase() as "spam" | "harassment" | "off_topic" | "misinformation")
      if (res.success) {
        window.alert("Thank you. The comment has been flagged for review.")
        window.location.reload()
      } else if (res.error) {
        window.alert(res.error)
      }
    })
  }

  // Format author profile link
  const profileUrl = comment.author.username ? `/u/${comment.author.username}` : "#"

  return (
    <div className={cn(
      "group w-full text-left",
      isReply && "pl-5 border-l-2 border-border mt-3"
    )}>
      <div className={cn(
        "bg-surface border border-border rounded-2xl p-4 transition-all duration-200",
        comment.isAccepted && "border-green-500 bg-green-500/5 dark:bg-green-500/10"
      )}>
        {/* Accepted Badge */}
        {comment.isAccepted && (
          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs font-extrabold mb-2.5">
            <CheckCircle2 size={14} className="fill-green-600/10" />
            Accepted Answer
          </div>
        )}

        {/* Header: Author Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <UserAvatar
              src={comment.author.image}
              name={comment.author.name}
              username={comment.author.username}
              className="w-7 h-7"
              size={28}
            />
            
            <div className="flex flex-col">
              {comment.author.username ? (
                <Link
                  href={profileUrl}
                  className="text-xs font-bold text-text-primary hover:text-accent transition-colors"
                >
                  {comment.author.name || comment.author.username}
                </Link>
              ) : (
                <span className="text-xs font-bold text-text-primary">
                  {comment.author.name || "Anonymous"}
                </span>
              )}
              <span className="text-[10px] text-text-secondary/50 font-medium">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Delete button (owner or admin) */}
            {isAuthor && (
              <button
                onClick={() => onDelete(comment.id)}
                title="Delete comment"
                className="p-1.5 text-text-secondary/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={13.5} />
              </button>
            )}
            {/* Report button */}
            {!isAuthor && currentUserId && (
              <button
                onClick={handleReport}
                title="Report comment"
                className="p-1.5 text-text-secondary/40 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <AlertOctagon size={13.5} />
              </button>
            )}
          </div>
        </div>

        {/* Body Text */}
        <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed font-medium">
          {comment.body}
        </p>

        {/* Action Bar */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/40 text-xs font-bold">
          {/* Vote Button */}
          <button
            onClick={handleVote}
            disabled={!currentUserId || userHasVoted || isPending}
            className={cn(
              "flex items-center gap-1.5 transition-colors cursor-pointer",
              userHasVoted
                ? "text-accent"
                : "text-text-secondary/50 hover:text-accent",
              (!currentUserId || userHasVoted) && "cursor-default"
            )}
          >
            <ThumbsUp size={13} className={cn(userHasVoted && "fill-accent/15")} />
            <span>{localVotes}</span>
          </button>

          {/* Reply Button */}
          {!isReply && currentUserId && (
            <button
              onClick={() => setShowReplyForm(v => !v)}
              className="flex items-center gap-1.5 text-text-secondary/50 hover:text-accent transition-colors cursor-pointer"
            >
              <Reply size={13} />
              Reply
            </button>
          )}

          {/* Accept Button */}
          {!isReply && currentUserId && !comment.isAccepted && (
            <button
              onClick={handleAccept}
              disabled={isPending}
              className="flex items-center gap-1.5 text-text-secondary/50 hover:text-green-600 transition-colors cursor-pointer"
              title="Mark as accepted answer"
            >
              <CheckCircle2 size={13} />
              Accept
            </button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="pl-5 mt-3">
          <CommentForm
            onSubmit={handleReplySubmit}
            isPending={isPending}
            onCancel={() => setShowReplyForm(false)}
            compact
            placeholder={`Reply to ${comment.author.name || "comment"}...`}
          />
        </div>
      )}

      {/* Nested Replies Rendering */}
      {replyCount > 0 && (
        <div className="mt-2.5">
          <button
            onClick={() => setShowReplies(v => !v)}
            className="flex items-center gap-1 text-[11px] font-bold text-text-secondary/50 hover:text-text-primary ml-5 mb-2.5 transition-colors cursor-pointer"
          >
            {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            <span>{replyCount} {replyCount === 1 ? "reply" : "replies"}</span>
          </button>

          {showReplies && (
            <div className="space-y-3">
              {replies.map((reply: CommentReply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  nodeTarget={nodeTarget}
                  guideTarget={guideTarget}
                  onDelete={onDelete}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
