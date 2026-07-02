import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { approveShowcaseProject, rejectShowcaseProject } from "@/lib/actions/admin"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Check, Trash2, Shield, Link2 } from "lucide-react"
import { isAdmin } from "@/lib/admin/auth"
import Link from "next/link"

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminShowcasePage({ searchParams }: PageProps) {
  const session = await auth()

  if (!isAdmin(session)) {
    redirect("/")
  }

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const skip = (page - 1) * 10;

  const [pending, totalCount] = await Promise.all([
    prisma.showcaseProject.findMany({
      where: { isApproved: false },
      include: {
        author: { select: { name: true, email: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      skip,
    }),
    prisma.showcaseProject.count({
      where: { isApproved: false },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / 10));

  async function handleApprove(formData: FormData) {
    "use server"
    const projectId = formData.get("projectId") as string
    if (projectId) {
      await approveShowcaseProject(projectId)
    }
  }

  async function handleReject(formData: FormData) {
    "use server"
    const projectId = formData.get("projectId") as string
    if (projectId) {
      await rejectShowcaseProject(projectId)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col transition-colors duration-200">

        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
          <Shield size={24} className="text-amber-500" />
          <h1 className="text-2xl font-black tracking-tight">Showcase Submissions</h1>
        </div>

        <div className="space-y-6">
          {pending.map(project => (
            <div
              key={project.id}
              className="border border-border/80 bg-card rounded-2xl p-6 shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-extrabold text-text-primary text-lg">{project.title}</h3>
                  <p className="text-xs text-text-secondary/60 font-semibold mt-0.5">
                    Submitted by {project.author.name || "Anonymous"} (@{project.author.username || "no_username"})
                  </p>
                </div>
                <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  {project.roadmapId.replace(/-/g, " ")}
                </div>
              </div>

              <div className="bg-background rounded-xl p-4 border border-border text-sm text-text-secondary font-medium leading-relaxed mb-4">
                {project.description}
              </div>

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-border text-text-secondary rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-6 text-xs font-semibold text-text-secondary">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent">
                    <Link2 size={14} />
                    <span>Live Demo: {project.liveUrl}</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent">
                    <Link2 size={14} />
                    <span>GitHub: {project.repoUrl}</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3">
                <form action={handleApprove}>
                  <input type="hidden" name="projectId" value={project.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer select-none"
                  >
                    <Check size={14} />
                    <span>Approve Submission</span>
                  </button>
                </form>

                <form action={handleReject}>
                  <input type="hidden" name="projectId" value={project.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-500/20 transition-colors cursor-pointer select-none"
                  >
                    <Trash2 size={14} />
                    <span>Reject & Delete</span>
                  </button>
                </form>
              </div>
            </div>
          ))}

          {pending.length === 0 && (
            <div className="p-12 text-center border border-border border-dashed rounded-2xl bg-card/20">
              <p className="text-base text-text-secondary/50 italic font-medium">
                No pending showcase submissions.
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            <Link
              href={`/admin/showcase?page=${page - 1}`}
              className={`px-4 py-2.5 rounded-xl border border-border text-xs font-bold transition-all ${
                page <= 1
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-card text-text-primary"
              }`}
            >
              &larr; Previous
            </Link>
            <span className="text-xs text-text-secondary font-bold">
              Page {page} of {totalPages}
            </span>
            <Link
              href={`/admin/showcase?page=${page + 1}`}
              className={`px-4 py-2.5 rounded-xl border border-border text-xs font-bold transition-all ${
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-card text-text-primary"
              }`}
            >
              Next &rarr;
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
