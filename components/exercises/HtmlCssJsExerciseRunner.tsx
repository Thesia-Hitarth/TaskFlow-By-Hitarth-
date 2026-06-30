// components/exercises/HtmlCssJsExerciseRunner.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import type { HtmlCssJsExercise } from "@/lib/exercises/types"
import { HintPanel } from "./HintPanel"
import { saveExerciseProgress, getExerciseProgress } from "@/lib/actions/exercises"
import { Check } from "lucide-react"
import { AICodeReviewButton } from "./AICodeReviewButton"

const CodeEditor = dynamic(() => import("./CodeEditor").then(m => m.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] rounded-xl bg-card border border-border animate-pulse flex items-center justify-center text-xs text-text-secondary/50">
      Loading editor...
    </div>
  ),
})

interface Props {
  exercise: HtmlCssJsExercise
  onSolved?: () => void
}

export function HtmlCssJsExerciseRunner({ exercise, onSolved }: Props) {
  const [html, setHtml] = useState(exercise.starterHtml)
  const [css, setCss] = useState(exercise.starterCss)
  const [js, setJs] = useState(exercise.starterJs ?? "")
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({})
  const [dbStatus, setDbStatus] = useState<"loading" | "loaded" | "saving" | "saved">("loaded")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Load progress on mount
  useEffect(() => {
    let active = true
    async function loadProgress() {
      setDbStatus("loading")
      try {
        const attempt = await getExerciseProgress(exercise.id)
        if (active && attempt) {
          try {
            const parsed = JSON.parse(attempt.lastCode)
            if (parsed && typeof parsed === "object") {
              if (typeof parsed.html === "string") setHtml(parsed.html)
              if (typeof parsed.css === "string") setCss(parsed.css)
              if (typeof parsed.js === "string") setJs(parsed.js)
            }
          } catch {
            // fallback if it was not JSON
            setHtml(attempt.lastCode)
          }

          if (attempt.status === "solved") {
            // mark all checkboxed
            const initialChecked: Record<number, boolean> = {}
            exercise.successCriteria.forEach((_, i) => {
              initialChecked[i] = true
            })
            setCheckedCriteria(initialChecked)
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
  }, [exercise.id, exercise.starterHtml, exercise.starterCss, exercise.starterJs, exercise.successCriteria])

  // Debounce the preview update so the iframe doesn't rebuild on every single keystroke
  const srcDoc = useDebouncedSrcDoc(html, css, js, 400)

  // Handle checking a criteria
  const handleCriteriaChange = async (index: number, val: boolean) => {
    const updated = { ...checkedCriteria, [index]: val }
    setCheckedCriteria(updated)

    // If all are checked, mark as solved
    const allChecked = exercise.successCriteria.every((_, i) => updated[i])

    setDbStatus("saving")
    const serializedCode = JSON.stringify({ html, css, js })
    await saveExerciseProgress(exercise.id, serializedCode, allChecked)
    setDbStatus("saved")

    if (allChecked) {
      onSolved?.()
    }
  }

  // Trigger manual save of code
  const handleSaveCode = async () => {
    setDbStatus("saving")
    const allChecked = exercise.successCriteria.every((_, i) => checkedCriteria[i])
    const serializedCode = JSON.stringify({ html, css, js })
    await saveExerciseProgress(exercise.id, serializedCode, allChecked)
    setDbStatus("saved")
  }

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card/40 transition-colors duration-200">
      
      {/* Header */}
      <div className="p-5 border-b border-border/60">
        <div className="flex items-center justify-between mb-2 gap-4">
          <h3 className="text-base font-bold text-text-primary truncate">{exercise.title}</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border text-green-600 bg-green-500/10 dark:text-green-400 border-green-500/20">
            {exercise.difficulty}
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed font-medium">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border/40">
        {/* Editors */}
        <div className="border-r border-border/40 bg-background/30">
          <Tabs html={html} css={css} js={js} onHtml={setHtml} onCss={setCss} onJs={setJs} hasJs={!!exercise.starterJs} onCodeChanged={handleSaveCode} />
        </div>

        {/* Live preview */}
        <div className="bg-white dark:bg-white h-[400px] lg:h-auto min-h-[350px]">
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            sandbox="allow-scripts" // sandboxed — no same-origin access, no top navigation
            className="w-full h-full border-0 bg-white"
            title="Live preview"
          />
        </div>
      </div>

      {/* Success criteria checklist & actions */}
      <div className="p-5 flex flex-col md:flex-row justify-between gap-5 items-start">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/60 mb-2">Check your work</p>
          <ul className="space-y-2">
            {exercise.successCriteria.map((c, i) => (
              <li key={i} className="text-xs text-text-secondary flex items-start gap-2.5 font-medium">
                <input
                  type="checkbox"
                  id={`criteria-${exercise.id}-${i}`}
                  checked={!!checkedCriteria[i]}
                  onChange={(e) => handleCriteriaChange(i, e.target.checked)}
                  className="mt-0.5 accent-accent h-3.5 w-3.5 border-border rounded cursor-pointer"
                />
                <label htmlFor={`criteria-${exercise.id}-${i}`} className="cursor-pointer select-none leading-normal">
                  {c}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <HintPanel hints={exercise.hints} />
          <div className="flex items-center gap-2 mt-2">
            {dbStatus === "saving" && (
              <span className="text-[10px] text-text-secondary/60 animate-pulse">Saving code...</span>
            )}
            {dbStatus === "saved" && (
              <span className="text-[10px] text-green-500 flex items-center gap-1">
                <Check size={10} /> Saved
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveCode}
              className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-[10px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
            >
              Save Code
            </button>
          </div>
        </div>
      </div>
      {exercise.successCriteria.every((_, i) => checkedCriteria[i]) && (
        <div className="px-5 pb-5">
          <AICodeReviewButton
            exerciseTitle={exercise.title}
            code={`<!-- HTML -->\n${html}\n\n/* CSS */\n${css}${js ? `\n\n// JS\n${js}` : ""}`}
          />
        </div>
      )}
    </div>
  )
}

function useDebouncedSrcDoc(html: string, css: string, js: string, delayMs: number) {
  const [srcDoc, setSrcDoc] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              ${js}
            </script>
          </body>
        </html>
      `)
    }, delayMs)
    return () => clearTimeout(timer)
  }, [html, css, js, delayMs])

  return srcDoc
}

function Tabs({ html, css, js, onHtml, onCss, onJs, hasJs, onCodeChanged }: {
  html: string; css: string; js: string
  onHtml: (v: string) => void; onCss: (v: string) => void; onJs: (v: string) => void
  hasJs: boolean; onCodeChanged: () => void
}) {
  const [active, setActive] = useState<"html" | "css" | "js">("html")

  useEffect(() => {
    const timer = setTimeout(() => {
      onCodeChanged()
    }, 2000)
    return () => clearTimeout(timer)
  }, [html, css, js, onCodeChanged])

  return (
    <div>
      <div className="flex border-b border-border/40 bg-background/40">
        {(["html", "css", ...(hasJs ? ["js"] as const : [])] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
              active === tab
                ? "border-accent text-accent bg-background/60"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {active === "html" && <CodeEditor value={html} onChange={onHtml} language="html" height="350px" />}
      {active === "css" && <CodeEditor value={css} onChange={onCss} language="css" height="350px" />}
      {active === "js" && <CodeEditor value={js} onChange={onJs} language="javascript" height="350px" />}
    </div>
  )
}
