// components/PathRecommender.tsx
"use client"

import { useState } from "react"
import { PathFinderQuiz } from "./onboarding/PathFinderQuiz"

export default function PathRecommender() {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-700/5 via-transparent to-transparent opacity-50" />
      <div className="relative z-10">
        <p className="text-xl font-extrabold text-text-primary tracking-tight">
          Not sure where to start?
        </p>
        <p className="text-sm text-text-secondary mt-1.5 mb-5 font-medium max-w-lg mx-auto leading-relaxed">
          Answer 5 quick questions and our scoring engine will recommend the perfect, customized learning path for your career goals.
        </p>
        <button
          onClick={() => setShowQuiz(true)}
          className="rounded-xl bg-accent hover:bg-amber-600 text-black text-sm font-bold px-6 py-3 transition-all cursor-pointer shadow-lg shadow-accent/15 hover:shadow-accent/20 active:scale-[0.98]"
        >
          Find My Path →
        </button>
      </div>

      {showQuiz && <PathFinderQuiz onClose={() => setShowQuiz(false)} />}
    </div>
  )
}
