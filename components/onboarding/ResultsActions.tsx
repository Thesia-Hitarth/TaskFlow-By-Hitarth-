// components/onboarding/ResultsActions.tsx
"use client"

import Link from "next/link"

export function ResultsActions() {
  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <Link
        href="/path-finder"
        className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary border border-border bg-card rounded-xl hover:bg-surface transition-colors cursor-pointer"
      >
        Retake Quiz
      </Link>
      <Link
        href="/taskflows"
        className="px-4 py-2 text-sm font-bold text-black bg-accent hover:bg-amber-600 rounded-xl transition-colors cursor-pointer"
      >
        Explore All Paths
      </Link>
    </div>
  )
}
