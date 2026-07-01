import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { hideComment } from "@/lib/actions/admin"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AlertCircle, EyeOff, Shield } from "lucide-react"

export default async function AdminReportsPage() {
  const session = await auth()
  const adminEmail = process.env.ADMIN_EMAIL || "admin@taskflow.dev"
  
  if (session?.user?.email !== adminEmail && session?.user?.email !== "admin@taskflow.dev") {
    redirect("/")
  }

  const flagged = await prisma.comment.findMany({
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
  })

  async function handleHide(formData: FormData) {
    "use server"
    const commentId = formData.get("commentId") as string
    if (commentId) {
      await hideComment(commentId)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col transition-colors duration-200">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
          <Shield size={24} className="text-red-500" />
          <h1 className="text-2xl font-black tracking-tight">Reported Comments</h1>
        </div>

        <div className="space-y-6">
          {flagged.map(comment => (
            <div
              key={comment.id}
              className={`border rounded-2xl p-6 bg-card transition-all duration-200 ${
                comment.isHidden ? "border-border/40 opacity-60" : "border-red-500/20 shadow-sm"
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

              {!comment.isHidden ? (
                <form action={handleHide}>
                  <input type="hidden" name="commentId" value={comment.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer select-none"
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
          ))}

          {flagged.length === 0 && (
            <div className="p-12 text-center border border-border border-dashed rounded-2xl bg-card/20">
              <p className="text-base text-text-secondary/50 italic font-medium">
                No reported comments. The community is clean! ✓
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
