// components/onboarding/PathFinderQuiz.tsx
"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { X, ChevronLeft } from "lucide-react"
import { QUIZ_QUESTIONS, type QuizOptionId } from "@/lib/onboarding/quizConfig"
import { buildRecommendation, type QuizAnswers } from "@/lib/onboarding/scoreQuiz"
import { saveQuizResult } from "@/lib/actions/onboarding"

export function PathFinderQuiz({ onClose, isOverlay = true }: { onClose: () => void; isOverlay?: boolean }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = QUIZ_QUESTIONS[currentStep]
  const isLastStep = currentStep === QUIZ_QUESTIONS.length - 1
  const currentAnswer = answers[question.id]

  const handleSelect = useCallback((optionId: QuizOptionId) => {
    if (question.allowMultiple) {
      setAnswers(prev => {
        const existing = (prev[question.id] as QuizOptionId[]) ?? []
        const next = existing.includes(optionId)
          ? existing.filter(id => id !== optionId)
          : [...existing, optionId]
        return { ...prev, [question.id]: next }
      })
    } else {
      setAnswers(prev => ({ ...prev, [question.id]: optionId }))
      if (!isLastStep) {
        setTimeout(() => setCurrentStep(s => s + 1), 200) // brief delay so selection highlight is visible
      }
    }
  }, [question, isLastStep])

  const handleNext = async () => {
    if (!isLastStep) {
      setCurrentStep(s => s + 1)
      return
    }

    // Final step (multi-select doesn't auto-advance, so "See My Path" is an explicit click)
    setIsSubmitting(true)
    try {
      const recommendation = buildRecommendation(answers)
      await saveQuizResult(answers, recommendation)
      router.push(`/path-finder/results?primary=${recommendation.primary.roadmapId}`)
    } catch (e) {
      console.error("Failed to save recommendations", e)
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      onClose()
    } else {
      setCurrentStep(s => s - 1)
    }
  }

  const isOptionSelected = (optionId: string) => {
    if (question.allowMultiple) {
      return ((currentAnswer as QuizOptionId[]) ?? []).includes(optionId)
    }
    return currentAnswer === optionId
  }

  const quizCard = (
    <div className="w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl flex flex-col h-[90vh] max-h-[700px] overflow-hidden">
      {/* Progress bar + close */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-border">
        <div className="flex-1 flex items-center gap-1.5">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i <= currentStep ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">
          Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-surface border border-transparent hover:border-border text-text-secondary cursor-pointer">
          <X size={18} />
        </button>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-text-primary mb-2 tracking-tight">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-center text-sm text-text-secondary font-medium mb-6">{question.subtitle}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {question.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isOptionSelected(option.id)
                    ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                    : "border-border bg-background hover:border-accent/40 hover:bg-surface"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl" role="img" aria-label={option.label}>{option.emoji}</span>
                  <div>
                    <p className="font-bold text-text-primary text-sm leading-snug">{option.label}</p>
                    {option.sublabel && (
                      <p className="text-xs text-text-secondary font-medium mt-0.5">{option.sublabel}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between px-6 py-5 border-t border-border bg-surface/50">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm font-bold text-text-secondary hover:text-text-primary border border-transparent hover:border-border px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {/* Only show explicit Next/Submit button for multi-select steps or last step */}
        {(question.allowMultiple || isLastStep) && (
          <button
            onClick={handleNext}
            disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0) || isSubmitting}
            className="px-5 py-2.5 bg-accent hover:bg-amber-600 disabled:opacity-40 text-black text-sm font-bold rounded-xl transition-all cursor-pointer active:scale-[0.98] shadow-md shadow-accent/10"
          >
            {isLastStep ? (isSubmitting ? "Finding your path..." : "See My Path →") : "Next"}
          </button>
        )}
      </div>
    </div>
  )

  if (isOverlay) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
        {quizCard}
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center py-4">
      {quizCard}
    </div>
  )
}
