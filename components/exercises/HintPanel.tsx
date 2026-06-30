// components/exercises/HintPanel.tsx
"use client"

import { useState } from "react"
import { Lightbulb, ChevronDown, X } from "lucide-react"

export function HintPanel({ hints }: { hints: string[] }) {
  const [revealedCount, setRevealedCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = () => {
    if (revealedCount === 0) {
      setRevealedCount(1)
      setIsOpen(true)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const revealNext = () => {
    setRevealedCount(prev => Math.min(prev + 1, hints.length))
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        className="flex items-center gap-1.5 text-sm font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors cursor-pointer"
      >
        <Lightbulb size={14} />
        {revealedCount === 0 ? "Get a hint" : `Hint ${revealedCount}/${hints.length}`}
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && revealedCount > 0 && (
        <div className="absolute left-0 bottom-full mb-2 w-72 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/90 border border-yellow-200 dark:border-yellow-900/60 shadow-lg z-20 transition-all select-text">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600/80 dark:text-yellow-400/80">
              Hints ({revealedCount}/{hints.length})
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-200 cursor-pointer"
              aria-label="Close hints"
            >
              <X size={14} />
            </button>
          </div>
          
          <ol className="space-y-2 text-xs text-yellow-900 dark:text-yellow-200 list-decimal list-inside pr-1">
            {hints.slice(0, revealedCount).map((hint, i) => (
              <li key={i} className="leading-relaxed list-item">{hint}</li>
            ))}
          </ol>
          
          {revealedCount < hints.length && (
            <button
              type="button"
              onClick={revealNext}
              className="mt-3 text-xs font-bold text-yellow-600 dark:text-yellow-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              Show next hint →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
