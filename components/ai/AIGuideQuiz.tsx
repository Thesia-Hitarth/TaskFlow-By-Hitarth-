"use client"

import { useState } from "react"
import { Sparkles, Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import { generateGuideQuiz } from "@/lib/actions/ai"

interface Props {
  guideSlug: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface QuizData {
  questions: QuizQuestion[]
}

export function AIGuideQuiz({ guideSlug }: Props) {
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)
    setQuiz(null)
    setSelectedAnswers({})
    setSubmitted(false)

    try {
      const result = await generateGuideQuiz(guideSlug)
      if (result.success && result.quiz) {
        setQuiz(result.quiz as QuizData)
      } else {
        setError(result.error || "Failed to generate quiz. Please try again.")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred."
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }))
  }

  const score = quiz?.questions?.filter((q, i) => selectedAnswers[i] === q.correctIndex).length ?? 0

  return (
    <div className="w-full mt-10 border-t border-border/60 pt-8 transition-all duration-200">
      {!quiz ? (
        <div className="p-6 sm:p-8 rounded-3xl border border-dashed border-accent/30 bg-accent/5/10 text-center relative overflow-hidden">
          <Sparkles size={24} className="text-accent mx-auto mb-3 animate-pulse" />
          <h4 className="text-sm font-extrabold text-text-primary uppercase tracking-wider mb-2">
            AI-Powered Practice Quiz
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed font-semibold max-w-md mx-auto mb-5">
            Solidify your learning! Gemini can scan this guide and instantly compose a 5-question comprehension quiz tailored to what you just read.
          </p>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2.5 bg-accent hover:bg-amber-600 disabled:opacity-55 text-black text-xs font-bold rounded-xl transition-all shadow-md shadow-accent/15 inline-flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? <Loader2 size={13} className="animate-spin text-black" /> : <Sparkles size={13} />}
            {isLoading ? "Generating Questions..." : "Generate AI Quiz"}
          </button>
          {error && (
            <p className="text-xs text-red-500 font-semibold mt-3">
              ⚠️ {error}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <div>
              <h4 className="text-base font-extrabold text-text-primary flex items-center gap-2">
                <Sparkles size={16} className="text-accent" /> AI Practice Quiz
              </h4>
              <p className="text-xs text-text-secondary font-semibold mt-0.5">
                Select an option for each question and submit to verify.
              </p>
            </div>
            {submitted && (
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="p-2 border border-border rounded-xl hover:border-accent/40 text-text-secondary hover:text-accent transition-all cursor-pointer inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-card shadow-sm"
              >
                <RefreshCw size={10} /> Regenerate
              </button>
            )}
          </div>

          <div className="space-y-6">
            {quiz.questions.map((q, qi) => (
              <div key={qi} className="p-5 rounded-2xl border border-border bg-card/40 transition-all duration-200">
                <p className="text-sm font-bold text-text-primary leading-normal mb-3.5 flex items-start gap-2">
                  <span className="font-mono text-xs text-text-secondary/60 mt-0.5">{qi + 1}.</span>
                  <span>{q.question}</span>
                </p>

                <div className="space-y-2">
                  {q.options.map((option: string, oi: number) => {
                    const isSelected = selectedAnswers[qi] === oi
                    const isCorrect = oi === q.correctIndex
                    const showResult = submitted

                    let btnClass = "w-full text-left px-4 py-3 text-xs font-semibold rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer "
                    if (!showResult) {
                      btnClass += isSelected
                        ? "border-accent bg-accent/10 text-text-primary font-bold ring-2 ring-accent/25"
                        : "border-border bg-background/45 text-text-secondary hover:border-accent/40 hover:bg-card"
                    } else {
                      if (isCorrect) {
                        btnClass += "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 font-bold"
                      } else if (isSelected && !isCorrect) {
                        btnClass += "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                      } else {
                        btnClass += "border-border bg-background/25 text-text-secondary/40 opacity-60"
                      }
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => handleSelect(qi, oi)}
                        disabled={submitted}
                        className={btnClass}
                      >
                        <span>{option}</span>
                        {showResult && isCorrect && <CheckCircle2 size={13} className="text-green-500 shrink-0 ml-2" />}
                        {showResult && isSelected && !isCorrect && <XCircle size={13} className="text-red-500 shrink-0 ml-2" />}
                      </button>
                    )
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-3 rounded-xl bg-surface border border-border text-[11px] text-text-secondary font-semibold leading-relaxed">
                    <strong className="text-text-primary font-extrabold mr-1">Explanation:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
              className="w-full py-3 bg-accent hover:bg-amber-600 disabled:opacity-40 text-black text-xs font-extrabold rounded-xl transition-all shadow-md shadow-accent/15 cursor-pointer active:scale-[0.98]"
            >
              Submit Solutions
            </button>
          ) : (
            <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-inner">
              <p className="text-lg font-extrabold text-text-primary">
                Final Score: <strong className="text-accent">{score} / {quiz.questions.length}</strong>
              </p>
              <p className="text-xs text-text-secondary font-semibold mt-1">
                {score === quiz.questions.length
                  ? "Flawless score! You fully comprehend this guide. 🏆"
                  : score >= 3
                  ? "Great job! A bit more review and you will master it completely."
                  : "Keep studying. Try reading through the content again and retake the quiz."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
