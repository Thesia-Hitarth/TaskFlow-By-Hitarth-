"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface CommentFormProps {
  onSubmit: (body: string) => Promise<void>
  isPending: boolean
  userImage?: string | null
  placeholder?: string
  initialValue?: string
  onCancel?: () => void
  compact?: boolean
}

export function CommentForm({
  onSubmit,
  isPending,
  userImage,
  placeholder = "Write a comment...",
  initialValue = "",
  onCancel,
  compact = false,
}: CommentFormProps) {
  const [body, setBody] = useState(initialValue)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const charCount = body.length
  const isOverLimit = charCount > 2000
  const canSubmit = body.trim().length >= 3 && !isOverLimit && !isPending

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    await onSubmit(body.trim())
    setBody("")
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-3", compact ? "items-start" : "")}>
      {userImage && !compact && (
        <img
          src={userImage}
          alt="Your avatar"
          className="w-9 h-9 rounded-full shrink-0 border border-border mt-1 object-cover"
        />
      )}
      <div className="flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder={placeholder}
          rows={compact ? 2 : 3}
          maxLength={2100}
          onKeyDown={e => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          className={cn(
            "w-full rounded-xl border border-border bg-card",
            "px-4 py-3 text-sm text-text-primary",
            "placeholder:text-text-secondary/35",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "resize-none transition-all duration-200",
            isOverLimit && "ring-2 ring-red-500/50 border-red-500"
          )}
        />

        <div className="flex items-center justify-between mt-2">
          <span className={cn(
            "text-xs font-semibold select-none",
            charCount > 1800 ? (isOverLimit ? "text-red-500" : "text-amber-500") : "text-text-secondary/40"
          )}>
            {charCount}/2000
          </span>

          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold text-text-secondary/65 hover:text-text-primary px-3 py-1.5 rounded-lg hover:bg-border/40 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                "text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer active:scale-98 select-none",
                canSubmit
                  ? "bg-accent text-black hover:bg-amber-600 shadow-sm"
                  : "bg-surface border border-border text-text-secondary/40 cursor-not-allowed"
              )}
            >
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
