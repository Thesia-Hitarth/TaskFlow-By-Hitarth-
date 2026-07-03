import { prisma } from "@/lib/prisma"
import { hideComment, deleteCommentPermanently } from "@/lib/actions/admin"
import { AlertCircle, EyeOff, Shield } from "lucide-react"
import Link from "next/link"

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminReportsPage({ searchParams }: PageProps) {

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const skip = (page - 1) * 10;

  const [flagged, totalCount] = await Promise.all([
    prisma.comment.findMany({
      where: { reports: { some: {} } },
      include: {
        author: { select: { name: true, email: true, username: true } },
        reports: {
          select: {
            reason: true,
            reporter: { select: { name: true, username: true } },
          },
        },
      },
      orderBy: { reports: { _count: "desc" } },
      take: 10,
      skip,
    }),
    prisma.comment.count({
      where: { reports: { some: {} } },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / 10));

  async function handleHide(formData: FormData) {
    "use server"
    const commentId = formData.get("commentId") as string
    if (commentId) {
      await hideComment(commentId)
    }
  }

  async function handleDelete(formData: FormData) {
    "use server"
    const commentId = formData.get("commentId") as string
    if (commentId) {
      await deleteCommentPermanently(commentId)
    }
  }

  return (
    <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col transition-colors duration-200">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
          <Shield size={24} className="text-red-500" />
          <h1 className="text-2xl font-black tracking-tight">Reported Comments</h1>
        </div>

        <div className="space-y-6">
          {flagged.map(comment => (
            <div
              key={comment.id}
              className={`border rounded-2xl p-6 bg-card transition-all duration-200 ${comment.isHidden ? "border-border/40 opacity-60" : "border-red-500/20 shadow-sm"
                }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-bold text-text-primary">
                    Author: {comment.author.name || "Anonymous"} (@{comment.author.username || "no_username"})
                  </p>
                  <p className="text-xs text-text-secondary/60 font-semibold mt-0.5">
                    Email: {comment.author.email || "N/A"}
                  </p>
                </div>
                <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">
                  <AlertCircle size={13} />
                  <span>{comment.reports.length} report(s)</span>
                </div>
              </div>

              <div className="bg-background rounded-xl p-4 border border-border text-sm text-text-secondary font-medium leading-relaxed mb-4 whitespace-pre-wrap">
                {comment.body}
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">Report Reasons:</h4>
                <ul className="space-y-1 text-xs font-medium text-text-secondary">
                  {comment.reports.map((report, idx) => (
                    <li key={idx} className="list-disc list-inside">
                      <strong className="text-red-500">{report.reason}</strong> flagged by{" "}
                      <span>{report.reporter.name || "Anonymous"} (@{report.reporter.username || "no_username"})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
                <div>
                  {!comment.isHidden ? (
                    <form action={handleHide}>
                      <input type="hidden" name="commentId" value={comment.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer select-none"
                      >
                        <EyeOff size={14} />
                        <span>Hide Comment</span>
                      </button>
                    </form>
                  ) : (
                    <div className="text-xs text-text-secondary/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <EyeOff size={14} />
                      <span>Hidden by Administrator</span>
                    </div>
                  )}
                </div>

                <form action={handleDelete}>
                  <input type="hidden" name="commentId" value={comment.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer select-none active:scale-[0.98]"
                  >
                    <span>Delete Permanently</span>
                  </button>
                </form>
              </div>
            </div>
          ))}

          {flagged.length === 0 && (
            <div className="p-12 text-center border border-border border-dashed rounded-2xl bg-card/20">
              <p className="text-base text-text-secondary/50 italic font-medium">
                No reported comments. The community is clean! ✓
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            <Link
              href={`/admin/reports?page=${page - 1}`}
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
              href={`/admin/reports?page=${page + 1}`}
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
  )
}
