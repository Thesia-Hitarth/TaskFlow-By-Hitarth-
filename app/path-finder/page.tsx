// app/path-finder/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { PathFinderQuiz } from "@/components/onboarding/PathFinderQuiz"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PathFinderPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6">
        <PathFinderQuiz isOverlay={false} onClose={() => router.push("/")} />
      </main>
      <Footer />
    </div>
  )
}
