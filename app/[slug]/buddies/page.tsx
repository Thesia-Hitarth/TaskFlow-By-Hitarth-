import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { BuddyCard } from "@/components/community/BuddyCard"
import { taskflows } from "@/lib/taskflows-data"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"

interface BuddiesPageProps {
  params: Promise<{ slug: string }>
}

export default async function BuddiesPage({ params }: BuddiesPageProps) {
  const { slug } = await params
  const taskflow = taskflows.find(tf => tf.slug === slug)
  if (!taskflow) notFound()

  const session = await auth()
  if (!session?.user?.id) redirect("/signin")

  const userId = session.user.id

  // Find other users on this roadmap with similar progress
  const candidates = await prisma.user.findMany({
    where: {
      id: { not: userId },
      username: { not: null },
      progress: {
        some: { taskflowSlug: slug, status: "done" },
      },
      // Exclude users with already active connections
      NOT: {
        OR: [
          { buddyConnections1: { some: { userId2: userId, roadmapId: slug, status: "active" } } },
          { buddyConnections2: { some: { userId1: userId, roadmapId: slug, status: "active" } } },
        ],
      },
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      streakDays: true,
      _count: {
        select: {
          progress: {
            where: { taskflowSlug: slug, status: "done" },
          },
        },
      },
    },
    take: 20,
  })

  // Fetch connections for current user on this roadmap to show connection states
  const connections = await prisma.studyBuddyConnection.findMany({
    where: {
      roadmapId: slug,
      OR: [
        { userId1: userId },
        { userId2: userId },
      ],
    },
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-2xl mx-auto flex flex-col transition-colors duration-200">
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-accent mb-6 select-none uppercase tracking-wide"
        >
          <ArrowLeft size={13} />
          <span>Back to {taskflow.title} Roadmap</span>
        </Link>

        <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-border">
          <Users size={24} className="text-accent" />
          <h1 className="text-2xl font-black tracking-tight">
            Find a Study Buddy
          </h1>
        </div>

        <p className="text-text-secondary text-sm font-semibold mb-8 leading-relaxed">
          Connect with other learners working on the <strong className="capitalize">{taskflow.title}</strong> path. 
          Share progress, motivate each other, and stay accountable!
        </p>

        <div className="space-y-4">
          {candidates.length === 0 ? (
            <div className="p-12 text-center border border-border border-dashed rounded-2xl bg-card/20">
              <p className="text-base text-text-secondary/50 italic font-medium">
                No potential study buddies found on this path right now. Check back later!
              </p>
            </div>
          ) : (
            candidates.map(candidate => {
              const conn = connections.find(
                c =>
                  (c.userId1 === candidate.id && c.userId2 === userId) ||
                  (c.userId1 === userId && c.userId2 === candidate.id)
              );

              let connectionState: "none" | "sent" | "received" = "none";
              let connectionId: string | undefined;

              if (conn && conn.status === "pending") {
                connectionId = conn.id;
                connectionState = conn.userId1 === userId ? "sent" : "received";
              }

              return (
                <BuddyCard
                  key={candidate.id}
                  user={candidate as unknown as {
                    id: string;
                    name: string | null;
                    username: string | null;
                    image: string | null;
                    streakDays: number;
                    _count: {
                      progress: number;
                    };
                  }}
                  roadmapId={slug}
                  connectionState={connectionState}
                  connectionId={connectionId}
                />
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
