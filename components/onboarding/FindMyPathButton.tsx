// components/onboarding/FindMyPathButton.tsx
"use client"
import { useState } from "react"
import { PathFinderQuiz } from "./PathFinderQuiz"

export function FindMyPathButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [showQuiz, setShowQuiz] = useState(false)
  return (
    <>
      <button onClick={() => setShowQuiz(true)} className={className}>
        {children || "Find My Path →"}
      </button>
      {showQuiz && <PathFinderQuiz onClose={() => setShowQuiz(false)} />}
    </>
  )
}
