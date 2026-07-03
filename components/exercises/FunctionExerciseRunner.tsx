// components/exercises/FunctionExerciseRunner.tsx
"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { CheckCircle2, XCircle, Lock, Play, Loader2, Check } from "lucide-react"
import { useTestRunner, type TestResult } from "@/lib/exercises/useTestRunner"
import { HintPanel } from "./HintPanel"
import type { FunctionExercise } from "@/lib/exercises/types"
import { saveExerciseProgress, getExerciseProgress } from "@/lib/actions/exercises"
import { fireCelebration } from "@/lib/ui/confetti"
import { AICodeReviewButton } from "./AICodeReviewButton"

const CodeEditor = dynamic(() => import("./CodeEditor").then(m => m.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="h-[240px] rounded-xl bg-card border border-border animate-pulse flex items-center justify-center text-xs text-text-secondary/50">
      Loading editor...
    </div>
  ),
})

interface Props {
  exercise: FunctionExercise
  onSolved?: () => void  // callback to mark progress, trigger confetti, etc.
}

export function FunctionExerciseRunner({ exercise, onSolved }: Props) {
  const [code, setCode] = useState(exercise.starterCode)
  const [hasEverPassed, setHasEverPassed] = useState(false)
  const [dbStatus, setDbStatus] = useState<"loading" | "loaded" | "saving" | "saved">("loaded")
  const { runTests, isRunning, lastResult } = useTestRunner()

  // Load progress from DB on mount or when exercise changes
  useEffect(() => {
    let active = true
    async function loadProgress() {
      setDbStatus("loading")
      try {
        const attempt = await getExerciseProgress(exercise.id)
        if (active && attempt) {
          setCode(attempt.lastCode)
          if (attempt.status === "solved") {
            setHasEverPassed(true)
          }
        }
      } catch (err) {
        console.error("Error loading progress:", err)
      } finally {
        if (active) setDbStatus("loaded")
      }
    }
    loadProgress()
    return () => {
      active = false
    }
  }, [exercise.id, exercise.starterCode])

  const handleRun = async () => {
    // Only send VISIBLE test cases unless the user has already unlocked hidden ones
    // by passing all visible ones at least once previously in this session.
    const casesToRun = hasEverPassed
      ? exercise.testCases
      : exercise.testCases.filter(tc => !tc.hidden)

    const result = await runTests(code, casesToRun, exercise.functionName)

    if (result.success && result.results?.every(r => r.passed)) {
      setDbStatus("saving")
      if (!hasEverPassed) {
        setHasEverPassed(true)
        // Re-run including hidden tests now that visible ones passed
        const fullResult = await runTests(code, exercise.testCases, exercise.functionName)
        if (fullResult.success && fullResult.results?.every(r => r.passed)) {
          fireCelebration()
          await saveExerciseProgress(exercise.id, code, true)
          onSolved?.()
        } else {
          await saveExerciseProgress(exercise.id, code, false)
        }
      } else {
        fireCelebration()
        await saveExerciseProgress(exercise.id, code, true)
        onSolved?.()
      }
      setDbStatus("saved")
    } else {
      setDbStatus("saving")
      await saveExerciseProgress(exercise.id, code, false)
      setDbStatus("saved")
    }
  }

  const difficultyColor = {
    beginner: "text-green-600 bg-green-500/10 dark:text-green-400 border-green-500/20",
    intermediate: "text-yellow-600 bg-yellow-500/10 dark:text-yellow-400 border-yellow-500/20",
    advanced: "text-red-600 bg-red-500/10 dark:text-red-400 border-red-500/20",
  }[exercise.difficulty]

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card/40 transition-colors duration-200">

      {/* Header */}
      <div className="p-5 border-b border-border/60">
        <div className="flex items-center justify-between mb-2 gap-4">
          <h3 className="text-base font-bold text-text-primary truncate">{exercise.title}</h3>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${difficultyColor}`}>
            {exercise.difficulty}
          </span>
        </div>
        
        <div
          className="prose prose-sm dark:prose-invert max-w-none text-text-secondary text-xs leading-relaxed font-medium"
          dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(exercise.description) }}
        />
      </div>

      {/* Editor */}
      <div className="p-4 bg-background/50">
        <CodeEditor value={code} onChange={setCode} language="javascript" height="240px" />
      </div>

      {/* Actions */}
      <div className="px-5 pb-4 flex items-center justify-between border-b border-border/40 pt-2 bg-background/20">
        <HintPanel hints={exercise.hints} />
        
        <div className="flex items-center gap-3">
          {dbStatus === "saving" && (
            <span className="text-[10px] text-text-secondary/60 animate-pulse">Saving...</span>
          )}
          {dbStatus === "saved" && (
            <span className="text-[10px] text-green-500 flex items-center gap-1">
              <Check size={10} /> Progress saved
            </span>
          )}
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-60"
          >
            {isRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {isRunning ? "Running..." : "Run Tests"}
          </button>
        </div>
      </div>

      {/* Results */}
      {lastResult && (
        <div className="px-5 py-4 bg-background/30 border-t border-border/40">
          <ResultsPanel result={lastResult} totalTestCount={exercise.testCases.length} />
          {hasEverPassed && (
            <AICodeReviewButton exerciseTitle={exercise.title} code={code} />
          )}
        </div>
      )}
    </div>
  )
}

function ResultsPanel({ result, totalTestCount }: { result: ReturnType<typeof useTestRunner>["lastResult"]; totalTestCount: number }) {
  if (!result) return null

  if (result.globalError) {
    return (
      <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-semibold">
        {result.globalError}
      </div>
    )
  }

  const passedCount = result.results?.filter(r => r.passed).length ?? 0
  const allPassed = passedCount === result.results?.length
  const hiddenCount = totalTestCount - (result.results?.length ?? 0)

  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-2 p-3 rounded-lg border ${
        allPassed
          ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
          : "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      }`}>
        {allPassed ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
        <span className="text-xs font-bold">
          {passedCount} / {result.results?.length} tests passed
          {allPassed && " — All visible tests passed! 🎉"}
        </span>
      </div>

      <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
        {result.results?.map((tc, i) => (
          <TestCaseRow key={i} testCase={tc} />
        ))}
      </div>

      {hiddenCount > 0 && !allPassed && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-card/60 border border-border/60 text-[10px] text-text-secondary/60 font-semibold">
          <Lock size={12} /> {hiddenCount} hidden test{hiddenCount > 1 ? "s" : ""} — pass the visible ones first to unlock
        </div>
      )}
    </div>
  )
}

function TestCaseRow({ testCase }: { testCase: TestResult }) {
  return (
    <div className={`p-2.5 rounded-lg border text-xs leading-normal ${
      testCase.passed
        ? "border-green-500/10 bg-green-500/5 text-text-primary"
        : "border-red-500/10 bg-red-500/5 text-text-primary"
    }`}>
      <div className="flex items-start gap-2.5">
        {testCase.passed
          ? <CheckCircle2 size={12} className="text-green-500 shrink-0 mt-0.5" />
          : <XCircle size={12} className="text-red-500 shrink-0 mt-0.5" />
        }
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text-primary">{testCase.description}</p>
          {!testCase.passed && (
            <div className="mt-1 font-mono text-[10px] text-text-secondary bg-background/50 p-1.5 rounded-md border border-border/40 overflow-x-auto whitespace-pre">
              Expected: <code className="text-green-600 dark:text-green-400 font-bold">{JSON.stringify(testCase.expected)}</code>
              {"\n"}Got:      <code className="text-red-600 dark:text-red-400 font-bold">{testCase.error ?? JSON.stringify(testCase.actual)}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Minimal markdown renderer for exercise descriptions
function renderSimpleMarkdown(text: string): string {
  const escaped = escapeHtml(text.trim());
  const placeholders: string[] = [];

  // 1. Fenced code blocks (```lang\n...\n```)
  let processed = escaped.replace(/```(?:javascript|js|typescript|ts)?\n([\s\S]*?)\n```/g, (_, code) => {
    const id = placeholders.length;
    placeholders.push(`<pre class="bg-background/80 p-3 rounded-lg border border-border/40 font-mono text-[11px] overflow-x-auto whitespace-pre my-2">${code}</pre>`);
    return `\n\n__PLACEHOLDER_${id}__\n\n`;
  });

  // 2. Inline code blocks (`code`)
  processed = processed.replace(/`([^`]+)`/g, (_, code) => {
    const id = placeholders.length;
    placeholders.push(`<code class="bg-background/80 text-accent px-1.5 py-0.5 rounded border border-border/40 font-mono text-[11px]">${code}</code>`);
    return `__PLACEHOLDER_${id}__`;
  });

  // 3. Bold (**bold**)
  processed = processed.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // 4. Split by double-newlines to handle paragraphs and lists
  const blocks = processed.split(/\n\n+/);
  const htmlBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // If it is just a fenced code block placeholder
    if (/^__PLACEHOLDER_\d+__$/.test(trimmed)) {
      return trimmed;
    }

    // Handle list items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\. /.test(trimmed)) {
      const items = trimmed.split("\n").map(item => {
        const match = item.match(/^(?:-|\*|\d+\.)\s+(.*)$/);
        return match ? `<li class="ml-4 list-disc">${match[1]}</li>` : `<li>${item}</li>`;
      }).join("");
      return `<ul class="my-2 space-y-1">${items}</ul>`;
    }

    return `<p class="mt-2">${trimmed}</p>`;
  });

  let result = htmlBlocks.filter(Boolean).join("\n");

  // 5. Restore placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result = result.replaceAll(`__PLACEHOLDER_${i}__`, placeholders[i]);
  }

  return result;
}
