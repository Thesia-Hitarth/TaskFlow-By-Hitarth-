"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Loader2, Award } from "lucide-react"
import { getAIPathRecommendation } from "@/lib/actions/ai"

interface RecommendationData {
  primaryRoadmapId: string
  secondaryRoadmapId: string | null
  reasoning: string
  firstThreeActions: string[]
}

export function AIPathRecommender() {
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<RecommendationData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || isLoading) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await getAIPathRecommendation(description)
      if (response.success && response.recommendation) {
        setResult(response.recommendation)
      } else {
        setError(response.error || "Failed to generate recommendation.")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred."
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper to capitalize first letter of title
  const formatTitle = (slug: string) => {
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all duration-200">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Sparkles size={120} className="text-accent" />
      </div>

      <div className="flex items-center gap-2.5 mb-4">
        <Sparkles size={20} className="text-accent animate-pulse" />
        <h3 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
          AI Career Path Finder
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-semibold mb-6">
        Describe your coding background, career goals, area of interest (e.g. web, mobile, AI), and how much time you have. Gemini will build your customized roadmap starting points.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. I am a university student, I want to learn web development to build my own startup. I have 10 hours a week and know some basic Python..."
          rows={3}
          maxLength={500}
          disabled={isLoading}
          className="w-full px-4 py-3.5 text-sm rounded-2xl border border-border bg-background/55 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent disabled:opacity-60 font-semibold resize-none"
        />
        <div className="flex items-center justify-between text-xs text-text-secondary/60 font-bold px-1.5">
          <span>{description.length} / 500 characters</span>
          <button
            type="submit"
            disabled={isLoading || !description.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-amber-600 disabled:opacity-40 text-black text-xs font-bold rounded-xl transition-all shadow-md shadow-accent/15 cursor-pointer active:scale-[0.98]"
          >
            {isLoading ? <Loader2 size={13} className="animate-spin text-black" /> : <Sparkles size={13} />}
            {isLoading ? "Consulting AI..." : "Get Recommendation"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-semibold">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 rounded-2xl border-2 border-accent/20 bg-accent/5 transition-all duration-300 animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-accent" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">Recommended Path</span>
          </div>

          <h4 className="text-2xl font-extrabold text-text-primary tracking-tight">
            {formatTitle(result.primaryRoadmapId)} Developer
          </h4>
          
          <p className="text-sm text-text-secondary mt-3 leading-relaxed font-semibold border-b border-border/40 pb-5">
            {result.reasoning}
          </p>

          {result.secondaryRoadmapId && (
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <span className="text-accent">✨ Also consider:</span>
              <strong className="text-text-primary font-bold">{formatTitle(result.secondaryRoadmapId)}</strong>
            </div>
          )}

          <div className="mt-5 space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary/60">First 3 Milestones</p>
            <ol className="space-y-2">
              {result.firstThreeActions.map((action: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary font-semibold">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent/15 border border-accent/25 text-accent text-[10px] font-extrabold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{action}</span>
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={() => router.push(`/${result.primaryRoadmapId}`)}
            className="mt-6 w-full py-3 bg-accent hover:bg-amber-600 text-black text-xs font-extrabold rounded-xl transition-all shadow-md shadow-accent/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            Start Learning Path <Sparkles size={13} />
          </button>
        </div>
      )}
    </div>
  )
}
