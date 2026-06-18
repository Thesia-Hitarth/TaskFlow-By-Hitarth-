"use client";
import { useState, useEffect } from "react";
import { QuizQuestion } from "@/lib/guides-quiz-data";

interface Props {
  guideSlug: string;
  questions: QuizQuestion[];
}

const STORAGE_KEY = (slug: string) => `taskflow-quiz:${slug}`;

export default function GuideQuiz({ guideSlug, questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY(guideSlug));
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnswers(parsed.answers ?? {});
        setRevealed(parsed.revealed ?? {});
      }
    } catch {}
  }, [guideSlug]);

  function save(
    newAnswers: Record<string, number | null>,
    newRevealed: Record<string, boolean>
  ) {
    try {
      localStorage.setItem(
        STORAGE_KEY(guideSlug),
        JSON.stringify({ answers: newAnswers, revealed: newRevealed })
      );
    } catch {}
  }

  function handleSelect(questionId: string, optionIndex: number) {
    if (revealed[questionId]) return; // locked after reveal
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);
    save(newAnswers, revealed);
  }

  function handleReveal(questionId: string) {
    const newRevealed = { ...revealed, [questionId]: true };
    setRevealed(newRevealed);
    save(answers, newRevealed);
  }

  function handleReset() {
    setAnswers({});
    setRevealed({});
    try {
      localStorage.removeItem(STORAGE_KEY(guideSlug));
    } catch {}
  }

  const score = questions.filter(
    (q) => revealed[q.id] && answers[q.id] === q.correctIndex
  ).length;
  const allRevealed = questions.every((q) => revealed[q.id]);

  if (!mounted) return null;

  return (
    <div className="mt-12 border-t border-border pt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            Quiz Yourself
          </h2>
          <p className="text-sm text-text-secondary mt-0.5 font-medium">
            Test your understanding of this guide
          </p>
        </div>
        {allRevealed && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-text-primary">
              Score:{" "}
              <span className="text-accent">
                {score}/{questions.length}
              </span>
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-text-secondary hover:text-text-primary border border-border rounded-md px-3 py-1.5 transition-colors font-bold cursor-pointer"
            >
              Retake
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selected = answers[q.id] ?? null;
          const isRevealed = revealed[q.id] ?? false;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-sm font-semibold text-text-primary mb-3">
                <span className="text-text-secondary mr-2 font-mono">Q{qIndex + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((option, i) => {
                  let optionClass =
                    "w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors cursor-pointer font-medium ";

                  if (!isRevealed) {
                    optionClass +=
                      selected === i
                        ? "border-accent bg-accent/10 text-text-primary"
                        : "border-border text-text-secondary hover:border-accent/50 hover:text-text-primary";
                  } else {
                    if (i === q.correctIndex) {
                      optionClass +=
                        "border-green-500 bg-green-500/10 text-green-500 font-bold dark:text-green-400";
                    } else if (selected === i && i !== q.correctIndex) {
                      optionClass +=
                        "border-red-500 bg-red-500/10 text-red-500 font-bold dark:text-red-400";
                    } else {
                      optionClass +=
                        "border-border text-text-secondary opacity-50";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(q.id, i)}
                      disabled={isRevealed}
                      className={optionClass}
                    >
                      <span className="text-xs text-text-secondary mr-2 font-mono">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {!isRevealed && selected !== null && (
                <button
                  onClick={() => handleReveal(q.id)}
                  className="mt-3 text-xs bg-accent hover:bg-amber-600 text-black font-semibold rounded-md px-3 py-1.5 transition-colors cursor-pointer"
                >
                  Check Answer
                </button>
              )}

              {isRevealed && (
                <div className="mt-3 rounded-lg bg-surface border border-border px-3 py-2.5 text-xs text-text-secondary font-medium leading-relaxed">
                  <span className="text-text-primary font-bold mr-1">
                    {answers[q.id] === q.correctIndex ? "✓ Correct!" : "✗ Incorrect."}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allRevealed && (
        <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
          <p className="text-text-primary font-bold">
            You scored {score} out of {questions.length}
          </p>
          <p className="text-sm text-text-secondary mt-1 font-medium">
            {score === questions.length
              ? "Perfect score! You've mastered this topic. 🎉"
              : score >= Math.ceil(questions.length / 2)
              ? "Good work! Review the explanations above to solidify your understanding."
              : "Keep going — re-read the guide and try again!"}
          </p>
        </div>
      )}
    </div>
  );
}
