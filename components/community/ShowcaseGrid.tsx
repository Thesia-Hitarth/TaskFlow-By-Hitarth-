"use client"

import { useState } from "react"
import { upvoteProject } from "@/lib/actions/showcase"
import { ExternalLink, Github, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { UserAvatar } from "../ui/UserAvatar"

interface ShowcaseProjectWithMeta {
  id: string
  title: string
  description: string
  liveUrl: string | null
  repoUrl: string | null
  thumbnailUrl: string | null
  roadmapId: string
  tags: string[]
  createdAt: Date
  author: {
    name: string | null
    username: string | null
    image: string | null
  }
  _count: {
    upvotes: number
  }
}

export function ShowcaseGrid({ projects }: { projects: ShowcaseProjectWithMeta[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map(project => (
        <ShowcaseCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16 border border-border border-dashed rounded-2xl bg-card/20">
          <p className="text-lg font-bold text-text-primary mb-2">No projects found</p>
          <p className="text-sm text-text-secondary/60 font-medium">Be the first to submit a project for this path!</p>
        </div>
      )}
    </div>
  )
}

function ShowcaseCard({ project }: { project: ShowcaseProjectWithMeta }) {
  const [votes, setVotes] = useState(project._count.upvotes)
  const [voted, setVoted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpvote() {
    if (voted) return
    setError(null)
    const res = await upvoteProject(project.id)
    if (res.success) {
      setVotes(v => v + 1)
      setVoted(true)
    } else if (res.error) {
      setError(res.error)
      if (res.error.includes("already")) {
        setVoted(true)
      }
    }
  }

  const profileUrl = project.author.username ? `/u/${project.author.username}` : "#"

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-accent/20 transition-all duration-300 group flex flex-col justify-between">
      <div>
        {/* Thumbnail Preview Area */}
        <Link
          href={`/showcase/${project.id}`}
          className="aspect-video bg-border flex items-center justify-center text-4xl relative overflow-hidden select-none block"
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              width={384}
              height={216}
              unoptimized={true}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
          ) : (
            <span className="group-hover:scale-110 transition-transform duration-300">🚀</span>
          )}
        </Link>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <UserAvatar
              src={project.author.image}
              name={project.author.name}
              username={project.author.username}
              className="w-5 h-5"
              size={20}
            />
            {project.author.username ? (
              <Link
                href={profileUrl}
                className="text-[11px] font-bold text-text-secondary hover:text-accent transition-colors"
              >
                {project.author.name || project.author.username}
              </Link>
            ) : (
              <span className="text-[11px] font-bold text-text-secondary">
                {project.author.name || "Anonymous"}
              </span>
            )}
            <span className="text-[10px] text-accent/80 font-extrabold uppercase bg-accent/5 px-2 py-0.5 rounded ml-auto">
              {project.roadmapId.replace(/-/g, " ")}
            </span>
          </div>

          <Link
            href={`/showcase/${project.id}`}
            className="font-extrabold text-text-primary text-base mb-1.5 truncate block hover:text-accent transition-colors"
          >
            {project.title}
          </Link>
          <p className="text-xs text-text-secondary/70 leading-relaxed font-medium line-clamp-3 mb-4">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[9px] font-bold px-2 py-0.5 bg-border/40 text-text-secondary rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 mt-auto border-t border-border/20 flex flex-col gap-2">
        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={handleUpvote}
            disabled={voted}
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer",
              voted
                ? "bg-accent/10 text-accent"
                : "bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent"
            )}
          >
            <ThumbsUp size={12.5} className={cn(voted && "fill-accent/10")} />
            <span>{votes}</span>
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-text-secondary/75 hover:text-accent transition-colors"
              >
                <ExternalLink size={12.5} />
                <span>Live</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-text-secondary/75 hover:text-accent transition-colors"
              >
                <Github size={12.5} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        {error && !error.includes("already") && (
          <p className="text-[10px] text-red-500 font-semibold mt-1">{error}</p>
        )}
      </div>
    </div>
  )
}
