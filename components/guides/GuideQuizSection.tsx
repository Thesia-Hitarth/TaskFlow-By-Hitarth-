"use client"

import { useState } from "react"
import GuideQuiz from "@/components/GuideQuiz"
import { AIGuideQuiz } from "@/components/ai/AIGuideQuiz"
import { Sparkles, ClipboardList } from "lucide-react"

import { QuizQuestion } from "@/lib/guides-quiz-data"

interface Props {
  guideSlug: string
  staticQuestions?: QuizQuestion[]
}

export function GuideQuizSection({ guideSlug, staticQuestions }: Props) {
  const [mode, setMode] = useState<"static" | "ai">(staticQuestions ? "static" : "ai")

  return (
    <div className="w-full">
      {staticQuestions && (
        <div className="flex bg-card border border-border p-1 rounded-xl mb-6 gap-1 max-w-xs mx-auto shadow-sm">
          <button
            onClick={() => setMode("static")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              mode === "static"
                ? "bg-accent text-black font-bold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <ClipboardList size={11} /> Standard Quiz
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              mode === "ai"
                ? "bg-accent text-black font-bold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Sparkles size={11} /> AI Quiz
          </button>
        </div>
      )}

      {mode === "static" && staticQuestions ? (
        <GuideQuiz guideSlug={guideSlug} questions={staticQuestions} />
      ) : (
        <AIGuideQuiz guideSlug={guideSlug} />
      )}
    </div>
  )
}
