// app/path-finder/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PathFinderQuiz } from "@/components/onboarding/PathFinderQuiz"
import { AIPathRecommender } from "@/components/ai/AIPathRecommender"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Sparkles, ClipboardList } from "lucide-react"

export default function PathFinderPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"quiz" | "ai">("quiz")

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
        {/* Toggle Mode Tab */}
        <div className="flex bg-card border border-border p-1.5 rounded-2xl mb-8 gap-2 shadow-md">
          <button
            onClick={() => setMode("quiz")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              mode === "quiz"
                ? "bg-accent text-black shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <ClipboardList size={14} /> Structured Quiz
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              mode === "ai"
                ? "bg-accent text-black shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Sparkles size={14} /> Describe Yourself (AI)
          </button>
        </div>

        {/* Content Panel */}
        <div className="w-full flex justify-center min-h-[500px]">
          {mode === "quiz" ? (
            <PathFinderQuiz isOverlay={false} onClose={() => router.push("/")} />
          ) : (
            <div className="w-full max-w-2xl">
              <AIPathRecommender />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
