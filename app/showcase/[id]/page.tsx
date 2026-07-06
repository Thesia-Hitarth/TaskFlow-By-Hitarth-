import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CommentSection } from "@/components/community/CommentSection"
import { getComments } from "@/lib/actions/comments"
import { formatTimeAgo } from "@/lib/utils"
import { isSafeHttpUrl } from "@/lib/utils/url"
import { ArrowLeft, ExternalLink, Github, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { CommentWithAuthor } from "@/types/community"
import { UserAvatar } from "@/components/ui/UserAvatar"
import { Metadata } from "next"

interface ShowcaseDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ShowcaseDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await prisma.showcaseProject.findUnique({
    where: { id },
    select: { title: true, description: true, isApproved: true },
  })
  if (!project || !project.isApproved) return {}
  return {
    title: `${project.title} — Community Showcase`,
    description: project.description.slice(0, 160),
  }
}

export default async function ShowcaseProjectDetailPage({ params }: ShowcaseDetailPageProps) {
  const { id } = await params

  const project = await prisma.showcaseProject.findUnique({
    where: { id },
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
  })

  if (!project || !project.isApproved) {
    notFound()
  }

  // Fetch comments for this showcase project
  const initialComments = await getComments({ guideTarget: `showcase-${id}` })

  const authorProfileUrl = project.author.username ? `/u/${project.author.username}` : "#"

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-3xl mx-auto flex flex-col transition-colors duration-200">
        
        {/* Back link */}
        <Link
          href="/showcase"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-accent mb-6 select-none uppercase tracking-wide"
        >
          <ArrowLeft size={13} />
          <span>Back to Showcase</span>
        </Link>

        {/* Project Info Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {project.roadmapId.replace(/-/g, " ")}
            </span>
            <span className="text-text-secondary/40 text-xs font-semibold">
              Submitted {formatTimeAgo(project.createdAt)}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary mb-3">
            {project.title}
          </h1>

          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/60">
            <UserAvatar
              src={project.author.image}
              name={project.author.name}
              username={project.author.username}
              className="w-8 h-8"
              size={32}
            />
            <div>
              <p className="text-xs font-semibold text-text-secondary/65 leading-none">Created by</p>
              {project.author.username ? (
                <Link
                  href={authorProfileUrl}
                  className="text-sm font-bold text-text-primary hover:text-accent transition-colors mt-1 inline-block"
                >
                  {project.author.name || project.author.username}
                </Link>
              ) : (
                <span className="text-sm font-bold text-text-primary mt-1 inline-block">
                  {project.author.name || "Anonymous"}
                </span>
              )}
            </div>
          </div>

          <div className="text-sm text-text-secondary leading-relaxed font-medium mb-6 whitespace-pre-wrap">
            {project.description}
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-bold px-2.5 py-1 bg-border/50 text-text-secondary rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* URLs & Vote Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/40">
            <div className="flex gap-4">
              {project.liveUrl && isSafeHttpUrl(project.liveUrl) && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-accent hover:bg-amber-600 text-black text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer select-none"
                >
                  <ExternalLink size={14} />
                  <span>Visit Live App</span>
                </a>
              )}
              {project.repoUrl && isSafeHttpUrl(project.repoUrl) && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-accent px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm font-bold text-text-secondary/70">
              <ThumbsUp size={16} />
              <span>{project._count.upvotes} Upvotes</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection
          initialComments={initialComments as CommentWithAuthor[]}
          guideTarget={`showcase-${id}`}
        />

      </main>
      <Footer />
    </>
  )
}
