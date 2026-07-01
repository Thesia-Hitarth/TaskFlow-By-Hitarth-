import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProgressRing } from "@/components/ui/ProgressRing"
import { BadgeGrid } from "@/components/dashboard/BadgeGrid"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { formatTimeAgo } from "@/lib/utils"
import Link from "next/link"

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params
  const user = await getUserByUsername(username)
  if (!user) return { title: "User not found" }
  return {
    title: `${user.name || username} (@${user.username}) — TaskFlow`,
    description: user.bio || `${user.name || username}'s learning progress on TaskFlow.`,
  }
}

async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      streakDays: true,
      longestStreak: true,
      createdAt: true,
      badges: {
        include: { badge: true },
        orderBy: { awardedAt: "desc" },
      },
      activities: {
        orderBy: { date: "asc" },
        select: { date: true, count: true },
      },
      progress: {
        where: { status: "done" },
        select: { taskflowSlug: true },
      },
      comments: {
        where: { isHidden: false, parentId: null },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          body: true,
          nodeTarget: true,
          guideTarget: true,
          createdAt: true,
          votes: { select: { value: true } },
        },
      },
      showcaseProjects: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          title: true,
          thumbnailUrl: true,
          roadmapId: true,
          _count: { select: { upvotes: true } },
        },
      },
    },
  })
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  const user = await getUserByUsername(username)
  if (!user) notFound()

  // Calculate completed nodes per path
  const doneCount = user.progress.length
  const roadmapCounts = user.progress.reduce<Record<string, number>>((acc, p) => {
    acc[p.taskflowSlug] = (acc[p.taskflowSlug] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col transition-colors duration-200">
        
        {/* ── Profile Header ── */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 pb-8 border-b border-border text-center sm:text-left">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name ?? username}
              className="w-24 h-24 rounded-full border border-border shadow-sm shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary text-3xl font-bold shrink-0">
              {(user.name || username).charAt(0).toUpperCase()}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold text-text-primary leading-tight tracking-tight truncate">
              {user.name || username}
            </h1>
            <p className="text-text-secondary/70 text-sm font-semibold mt-1">@{user.username}</p>
            {user.bio ? (
              <p className="text-text-secondary mt-3 text-sm leading-relaxed max-w-2xl font-medium">
                {user.bio}
              </p>
            ) : (
              <p className="text-text-secondary/40 italic mt-3 text-sm font-medium">
                No bio provided yet.
              </p>
            )}
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 mt-4 text-xs font-semibold text-text-secondary">
              <span className="flex items-center gap-1">🔥 {user.streakDays}-day streak</span>
              <span className="flex items-center gap-1">📚 {doneCount} nodes completed</span>
              <span className="flex items-center gap-1" title={new Date(user.createdAt).toLocaleDateString()}>
                Joined {formatTimeAgo(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Active Paths ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-5 tracking-tight">Learning Paths</h2>
          {Object.keys(roadmapCounts).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(roadmapCounts).map(([roadmapId, done]) => (
                <div
                  key={roadmapId}
                  className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-accent/30 transition-all"
                >
                  <ProgressRing
                    percent={Math.min(100, Math.round((done / 31) * 100))}
                    size={52}
                    strokeWidth={5}
                    showLabel={true}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-primary capitalize truncate">
                      {roadmapId.replace(/-/g, " ")}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 font-medium">{done} topics completed</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center border border-border border-dashed rounded-2xl bg-card/20">
              <p className="text-sm text-text-secondary/60 font-medium">Has not started tracking any paths yet.</p>
            </div>
          )}
        </section>

        {/* ── Activity Heatmap ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-5 tracking-tight">Study Activity</h2>
          <ActivityHeatmap activities={user.activities} />
        </section>

        {/* ── Badges ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-5 tracking-tight">Badges</h2>
          {user.badges.length > 0 ? (
            <BadgeGrid badges={user.badges} />
          ) : (
            <div className="p-6 text-center border border-border border-dashed rounded-2xl bg-card/20">
              <p className="text-sm text-text-secondary/60 font-medium">No badges earned yet.</p>
            </div>
          )}
        </section>

        {/* ── Showcase Projects ── */}
        {user.showcaseProjects.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-text-primary mb-5 tracking-tight">Submitted Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.showcaseProjects.map(project => (
                <Link
                  key={project.id}
                  href={`/showcase/${project.id}`}
                  className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:border-accent/30 transition-all select-none"
                >
                  <div className="aspect-video bg-border flex items-center justify-center text-2xl relative overflow-hidden">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="group-hover:scale-110 transition-transform">🚀</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-text-primary text-sm group-hover:text-accent truncate">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-xs font-semibold text-text-secondary/70">
                      <span className="capitalize">{project.roadmapId.replace(/-/g, " ")}</span>
                      <span>👍 {project._count.upvotes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Recent Contributions ── */}
        {user.comments.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-5 tracking-tight">Recent Contributions</h2>
            <div className="space-y-3">
              {user.comments.map(c => (
                <div
                  key={c.id}
                  className="bg-card border border-border rounded-xl p-4 shadow-xs"
                >
                  <p className="text-sm text-text-secondary line-clamp-3 whitespace-pre-wrap leading-relaxed font-medium">
                    {c.body}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs font-bold text-text-secondary/60">
                    <span className="bg-border/40 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-wider">
                      {c.nodeTarget ? "Node" : "Guide"}
                    </span>
                    <span className="capitalize truncate max-w-[150px]">
                      {(c.nodeTarget || c.guideTarget || "").split(":").pop()?.replace(/-/g, " ")}
                    </span>
                    <span>•</span>
                    <span>{formatTimeAgo(c.createdAt)}</span>
                    <span>•</span>
                    <span>👍 {c.votes.reduce((s, v) => s + v.value, 0)} votes</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
