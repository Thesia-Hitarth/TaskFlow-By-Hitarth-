"use client"

import { useState, useCallback, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { Play, RotateCcw, Share2, Check, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { encodeSnippet, decodeSnippet } from "@/lib/playground/shareSnippet"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const CodeEditor = dynamic(() => import("@/components/exercises/CodeEditor").then(m => m.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-xl bg-card border border-border animate-pulse flex items-center justify-center text-sm text-text-secondary/50">
      Loading playground editor...
    </div>
  ),
})

const DEFAULT_CODE = `// JavaScript Playground
// Write your code here and see console output!

const users = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true }
];

console.log("Active users:");
users
  .filter(u => u.active)
  .forEach(u => console.log("- " + u.name));
`

function PlaygroundPageInner() {
  const searchParams = useSearchParams()
  const [code, setCode] = useState(DEFAULT_CODE)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle")

  // Load code from search param if available
  useEffect(() => {
    const codeParam = searchParams.get("code")
    if (codeParam) {
      const decoded = decodeSnippet(codeParam)
      if (decoded) setCode(decoded)
    }
  }, [searchParams])

  const handleRun = useCallback(() => {
    setIsRunning(true)
    setOutput([])

    const worker = new Worker("/workers/playground-runner.worker.js")
    const collected: string[] = []

    worker.onmessage = (e) => {
      if (e.data.type === "log") {
        collected.push(e.data.message)
      }
      if (e.data.type === "done") {
        setOutput(collected)
        setIsRunning(false)
        worker.terminate()
      }
      if (e.data.type === "error") {
        collected.push(`⚠️ Runtime Error: ${e.data.message}`)
        setOutput(collected)
        setIsRunning(false)
        worker.terminate()
      }
    }

    worker.onerror = (e) => {
      const msg = e.message || "Failed to load or execute worker script (check browser Console for CSP violations)";
      collected.push(`⚠️ Web Worker Error: ${msg}`)
      setOutput(collected)
      setIsRunning(false)
      worker.terminate()
    }

    worker.postMessage({ code })
  }, [code])

  const handleShare = () => {
    const encoded = encodeSnippet(code)
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encoded}`
    navigator.clipboard.writeText(shareUrl)
    setShareStatus("copied")
    setTimeout(() => setShareStatus("idle"), 2000)
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-background text-text-primary px-4 sm:px-8 py-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">JavaScript Playground</h1>
            <p className="text-xs text-text-secondary font-medium mt-1">
              A sandboxed scratchpad to experiment with JavaScript scripts. No account needed.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCode(DEFAULT_CODE)}
              className="px-3 py-2 border border-border text-text-secondary hover:text-text-primary hover:bg-card text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw size={13} /> Reset
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-2 border border-border text-text-secondary hover:text-text-primary hover:bg-card text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
            >
              {shareStatus === "copied" ? (
                <>
                  <Check size={13} className="text-green-500" />
                  <span className="text-green-500 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span>Share</span>
                </>
              )}
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-60"
            >
              {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
              {isRunning ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <div className="bg-card/40 rounded-2xl border border-border overflow-hidden p-4">
              <CodeEditor value={code} onChange={setCode} language="javascript" height="500px" />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col h-full min-h-[400px] lg:min-h-[534px]">
            <div className="flex-1 rounded-2xl border border-border bg-slate-950 dark:bg-slate-950/80 p-4 font-mono text-xs overflow-y-auto text-slate-100 flex flex-col justify-between">
              <div className="space-y-1.5 select-text overflow-y-auto">
                {output.length === 0 ? (
                  <p className="text-slate-500 italic">Click &quot;Run&quot; to see console outputs here.</p>
                ) : (
                  output.map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap leading-relaxed border-b border-slate-900/50 pb-1 last:border-0">
                      {line}
                    </p>
                  ))
                )}
              </div>
              <div className="text-[10px] text-slate-600 font-sans mt-4 text-right select-none">
                Console logs are captured in a sandboxed Web Worker.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-between transition-colors duration-200">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-background text-text-secondary/70">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
            <span className="text-xs font-semibold">Loading playground…</span>
          </div>
        </div>
      }>
        <PlaygroundPageInner />
      </Suspense>
      <Footer />
    </div>
  )
}
