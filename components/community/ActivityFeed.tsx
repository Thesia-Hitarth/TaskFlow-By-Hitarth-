import { prisma } from "@/lib/prisma"
import { formatTimeAgo } from "@/lib/utils"
import Link from "next/link"

export async function ActivityFeed() {
  // Fetch recent completed progress nodes
  const recentProgress = await prisma.userProgress.findMany({
    where: {
      status: "done",
      user: { username: { not: null } },
    },
    orderBy: { updatedAt: "desc" },
    take: 15,
    select: {
      nodeId: true,
      taskflowSlug: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
    },
  })

  // Fetch recent approved showcase projects
  const recentProjects = await prisma.showcaseProject.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
    },
  })

  type FeedUser = {
    name: string | null
    username: string | null
    image: string | null
  }

  type FeedItem =
    | { type: "progress"; user: FeedUser; nodeId: string; taskflowSlug: string; time: Date }
    | { type: "project"; user: FeedUser; projectId: string; title: string; time: Date }

  const feed: FeedItem[] = [
    ...recentProgress.map(p => ({
      type: "progress" as const,
      user: p.user,
      nodeId: p.nodeId,
      taskflowSlug: p.taskflowSlug,
      time: p.updatedAt,
    })),
    ...recentProjects.map(p => ({
      type: "project" as const,
      user: p.author,
      projectId: p.id,
      title: p.title,
      time: p.createdAt,
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 15)

  if (feed.length === 0) {
    return (
      <div className="p-8 text-center border border-border border-dashed rounded-2xl bg-card/10">
        <p className="text-sm text-text-secondary/50 italic font-medium">
          No recent community activity.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {feed.map((item, idx) => {
        const userProfileUrl = item.user.username ? `/u/${item.user.username}` : "#"

        return (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-card border border-border hover:border-accent/10 transition-all text-left"
          >
            {item.user.image ? (
              <img
                src={item.user.image}
                alt={item.user.name || "User"}
                className="w-8 h-8 rounded-full border border-border object-cover shrink-0 mt-0.5"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0 mt-0.5">
                {(item.user.name || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-secondary font-medium leading-relaxed">
                {item.user.username ? (
                  <Link
                    href={userProfileUrl}
                    className="font-extrabold text-text-primary hover:text-accent transition-colors"
                  >
                    {item.user.name || item.user.username}
                  </Link>
                ) : (
                  <span className="font-extrabold text-text-primary">
                    {item.user.name || "Anonymous"}
                  </span>
                )}
                {" "}
                {item.type === "progress" ? (
                  <>
                    completed{" "}
                    <span className="font-bold text-text-primary capitalize">
                      {item.nodeId.replace(/-/g, " ")}
                    </span>{" "}
                    on the{" "}
                    <span className="font-bold text-text-primary capitalize">
                      {item.taskflowSlug.replace(/-/g, " ")}
                    </span>{" "}
                    path.
                  </>
                ) : (
                  <>
                    submitted a project:{" "}
                    <Link
                      href={`/showcase`}
                      className="font-bold text-accent hover:underline"
                    >
                      {item.title}
                    </Link>
                  </>
                )}
              </p>
              <p className="text-[10px] text-text-secondary/50 font-bold mt-1 uppercase">
                {formatTimeAgo(item.time)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
