import { prisma } from "@/lib/prisma"
import { ShowcaseGrid } from "@/components/community/ShowcaseGrid"
import { getRoadmapMetaAll } from "@/lib/roadmaps"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { headers } from "next/headers"
import { ArrowRight, Sparkles } from "lucide-react"
import { ShowcaseProjectWithMeta } from "@/types/community"
import { showcaseJsonLd } from "@/lib/seo/jsonld"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community Showcase | TaskFlow",
  description: "Browse and discover web development projects built by fellow learners on TaskFlow, or showcase your own portfolio.",
}

interface ShowcasePageProps {
  searchParams: Promise<{ roadmap?: string; sort?: string }>
}

export default async function ShowcasePage({ searchParams }: ShowcasePageProps) {
  const resolvedParams = await searchParams
  const rawRoadmap = resolvedParams.roadmap
  const rawSort = resolvedParams.sort
  const nonce = (await headers()).get("x-nonce") || "";

  const roadmaps = getRoadmapMetaAll()
  const validRoadmaps = new Set(roadmaps.map(r => r.slug))
  const roadmap = rawRoadmap && validRoadmaps.has(rawRoadmap) ? rawRoadmap : undefined
  const sort = rawSort === "newest" ? "newest" : "popular"

  const projects = await prisma.showcaseProject.findMany({
    where: {
      isApproved: true,
      ...(roadmap ? { roadmapId: roadmap } : {}),
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
      _count: {
        select: {
          upvotes: true,
        },
      },
    },
    orderBy: sort === "newest"
      ? { createdAt: "desc" }
      : { upvotes: { _count: "desc" } },
    take: 30,
  })

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(showcaseJsonLd()),
        }}
      />
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-5xl mx-auto flex flex-col transition-colors duration-200">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Sparkles size={12} />
              <span>Project Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Community Showcase
            </h1>
            <p className="text-text-secondary text-sm mt-2 font-semibold">
              Get inspired by projects built by fellow learners, or showcase your own portfolio!
            </p>
          </div>
          <Link
            href="/showcase/submit"
            className="inline-flex items-center gap-2 bg-accent hover:bg-amber-600 text-black text-sm font-extrabold px-5 py-3 rounded-xl shadow-md transition-all shrink-0 active:scale-98 select-none"
          >
            <span>Submit Project</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-text-secondary/70 mb-3 uppercase tracking-wider select-none">Filter by roadmap path</h4>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin">
            <Link
              href="/showcase"
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all border select-none shrink-0 ${
                !roadmap
                  ? "bg-text-primary text-background border-text-primary"
                  : "bg-surface text-text-secondary border-border hover:border-accent hover:text-accent"
              }`}
            >
              All Paths
            </Link>
            {roadmaps.map(r => (
              <Link
                key={r.slug}
                href={`/showcase?roadmap=${r.slug}${sort ? `&sort=${sort}` : ""}`}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all border capitalize select-none shrink-0 ${
                  roadmap === r.slug
                    ? "bg-text-primary text-background border-text-primary"
                    : "bg-surface text-text-secondary border-border hover:border-accent hover:text-accent"
                }`}
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Sorting Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <Link
            href={`/showcase${roadmap ? `?roadmap=${roadmap}` : ""}`}
            className={`text-xs font-bold pb-3 transition-colors border-b-2 uppercase tracking-wider select-none ${
              !sort || sort === "popular"
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary/60 hover:text-text-primary"
            }`}
          >
            Most Popular
          </Link>
          <Link
            href={`/showcase?sort=newest${roadmap ? `&roadmap=${roadmap}` : ""}`}
            className={`text-xs font-bold pb-3 transition-colors border-b-2 uppercase tracking-wider select-none ${
              sort === "newest"
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary/60 hover:text-text-primary"
            }`}
          >
            Newest
          </Link>
        </div>

        {/* Projects Grid */}
        <ShowcaseGrid projects={projects as ShowcaseProjectWithMeta[]} />

      </main>
      <Footer />
    </>
  )
}
