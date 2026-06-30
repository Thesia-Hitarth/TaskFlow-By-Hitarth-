// app/path-finder/results/page.tsx
import { getRoadmap, getNodeDetail } from "@/lib/roadmaps"
import { estimateTimelineWeeks } from "@/lib/onboarding/estimateTimeline"
import { getLatestQuizResult } from "@/lib/actions/onboarding"
import { ResultsActions } from "@/components/onboarding/ResultsActions"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ArrowRight, Clock, Award } from "lucide-react"

interface Props {
  searchParams: Promise<{ primary?: string }>
}

export default async function PathFinderResultsPage({ searchParams }: Props) {
  const params = await searchParams
  const quizResult = await getLatestQuizResult() // reads from DB (logged in) or cookie (logged out)

  const primaryRoadmapId = params.primary ?? quizResult?.primaryRoadmapId ?? "frontend"
  const roadmap = getRoadmap(primaryRoadmapId)

  if (!roadmap) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-text-secondary font-medium">Roadmap not found.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const timelineWeeks = quizResult
    ? estimateTimelineWeeks(primaryRoadmapId, quizResult.timeCommitment)
    : estimateTimelineWeeks(primaryRoadmapId, "part-time")

  const timeLabel = quizResult?.timeCommitment ?? "part-time"

  // First 5 nodes in topological order — gives a concrete, non-overwhelming starting checklist
  const firstFiveNodes = roadmap.nodes
    .filter(n => n.kind === "subtopic")
    .slice(0, 5)
    .map(n => getNodeDetail(primaryRoadmapId, n.id))
    .filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-5xl" role="img" aria-label="party popper">🎉</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-4">
            We found your path!
          </h1>
          <p className="text-text-secondary font-medium mt-2">
            Based on your responses, here is your customized career recommendation.
          </p>
        </div>

        {/* Primary recommendation card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-700/10 via-orange-600/5 to-transparent dark:from-amber-500/15 dark:via-orange-500/5 dark:to-transparent border-2 border-accent/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Award size={120} className="text-accent" />
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
            Primary Recommendation
          </span>
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">{roadmap.title}</h2>
          <p className="text-base text-text-secondary mt-3 leading-relaxed font-medium">
            {quizResult?.reasoning || `Based on your profile, starting with the ${roadmap.title} path gives you the most direct route forward to build your technical foundations.`}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-text-secondary font-bold">
            <span className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-xl">
              <Clock className="h-4 w-4 text-accent" />
              Estimated: ~{timelineWeeks} weeks ({timeLabel})
            </span>
            <span className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-xl capitalize">
              <Award className="h-4 w-4 text-accent" />
              Difficulty: {roadmap.difficulty || "Beginner"}
            </span>
          </div>

          <div className="mt-8">
            <a
              href={`/${primaryRoadmapId}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-amber-600 text-black text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-accent/15 active:scale-[0.98]"
            >
              Start This Path <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Secondary suggestion, if scored close enough */}
        {quizResult?.secondaryRoadmapId && (
          <div className="flex items-center justify-between mt-5 px-6 py-4 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="sparkles">✨</span>
              <p className="text-sm font-semibold text-text-primary">
                Also consider: <strong className="text-accent">{getRoadmap(quizResult.secondaryRoadmapId)?.title}</strong>
              </p>
            </div>
            <a href={`/${quizResult.secondaryRoadmapId}`} className="text-sm font-bold text-accent hover:underline whitespace-nowrap">
              View Path →
            </a>
          </div>
        )}

        {/* First 5 steps checklist */}
        {firstFiveNodes.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Your first 5 steps</h3>
            <div className="space-y-3">
              {firstFiveNodes.map((node, i) => node && (
                <div key={node.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-accent/20 transition-all">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-extrabold shrink-0 border border-accent/25">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{node.label}</p>
                    <p className="text-xs text-text-secondary truncate mt-0.5">{node.description}</p>
                  </div>
                  <span className="text-xs text-text-secondary font-semibold shrink-0 bg-background border border-border px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock size={11} /> {node.estimatedTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ResultsActions />
      </main>
      <Footer />
    </div>
  )
}
