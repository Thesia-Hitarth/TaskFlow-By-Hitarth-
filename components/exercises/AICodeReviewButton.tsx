"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { getAICodeReview } from "@/lib/actions/ai"

interface Props {
  exerciseTitle: string
  code: string
}

export function AICodeReviewButton({ exerciseTitle, code }: Props) {
  const [review, setReview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReview = async () => {
    if (isLoading) return
    setIsLoading(true)
    setError(null)
    setReview(null)

    try {
      const result = await getAICodeReview(exerciseTitle, code)
      if (result.success && result.review) {
        setReview(result.review)
      } else {
        setError(result.error || "Failed to generate code review feedback.")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred."
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4 border-t border-border/40 pt-4 w-full">
      {review ? (
        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 animate-fadeIn">
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
              Gemini Code Review
            </span>
          </div>
          <div className="text-xs text-text-secondary leading-relaxed font-semibold whitespace-pre-wrap">
            {review}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2">
          <button
            onClick={handleReview}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 hover:bg-accent hover:text-black disabled:opacity-50 text-accent transition-all text-xs font-bold rounded-lg cursor-pointer"
          >
            {isLoading ? <Loader2 size={12} className="animate-spin text-accent" /> : <Sparkles size={12} />}
            {isLoading ? "Reviewing..." : "Get AI Feedback on solution"}
          </button>
          {error && (
            <p className="text-[10px] text-red-500 font-semibold mt-1">
              ⚠️ {error}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
