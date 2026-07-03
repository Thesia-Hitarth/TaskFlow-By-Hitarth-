// app/compare/page.tsx
import { ComparisonPicker } from "@/components/compare/ComparisonPicker"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compare Learning Paths — TaskFlow",
  description: "Compare multiple developer learning paths side-by-side to choose the right engineering roadmap for your career.",
}

interface Props {
  searchParams: Promise<{ a?: string; b?: string; c?: string }>
}

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Compare Paths</h1>
        <p className="text-text-secondary mt-2 font-medium">
          See two (or three) learning paths side by side to decide what&apos;s right for you.
        </p>
        <div className="mt-8">
          <ComparisonPicker
            initialA={params.a ?? "frontend"}
            initialB={params.b ?? "backend"}
          />
        </div>
        <div className="mt-12 text-center py-6 border-t border-border bg-card/25 rounded-2xl">
          <p className="text-sm text-text-secondary font-medium">Still not sure which direction to take?</p>
          <Link href="/path-finder" className="mt-1.5 inline-block text-sm font-bold text-accent hover:underline">
            Take the 2-minute path finder quiz instead &rarr;
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
