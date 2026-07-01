"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { submitProject } from "@/lib/actions/showcase"
import { taskflows } from "@/lib/taskflows-data"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SubmitProjectPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    liveUrl: "",
    repoUrl: "",
    roadmapId: "",
    tags: "",
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.title || !form.description || !form.roadmapId) {
      setError("Please fill out all required fields.")
      return
    }

    startTransition(async () => {
      const tagsArray = form.tags
        .split(",")
        .map(t => t.trim().toLowerCase())
        .filter(t => t.length > 0)
        .slice(0, 5)

      const result = await submitProject({
        title: form.title,
        description: form.description,
        liveUrl: form.liveUrl || "",
        repoUrl: form.repoUrl || "",
        roadmapId: form.roadmapId,
        tags: tagsArray,
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSubmitted(true)
        setTimeout(() => {
          router.push("/showcase")
          router.refresh()
        }, 3000)
      }
    })
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background text-text-primary py-12 px-4 sm:px-8 w-full max-w-xl mx-auto flex flex-col transition-colors duration-200">
        <Link
          href="/showcase"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-accent mb-6 select-none uppercase tracking-wide"
        >
          <ArrowLeft size={13} />
          <span>Back to Showcase</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold tracking-tight mb-2 text-text-primary">
            Submit Your Project
          </h1>
          <p className="text-xs text-text-secondary font-medium mb-6">
            Share what you built! Projects will be reviewed by an administrator before appearing in the public gallery.
          </p>

          {submitted ? (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 size={48} className="text-green-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-text-primary">Submission Successful!</h3>
              <p className="text-sm text-text-secondary font-medium">
                Your project has been submitted for review. Redirecting you back to the Showcase...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title-input" className="block text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title-input"
                  value={form.title}
                  onChange={e => update("title", e.target.value)}
                  placeholder="e.g. My Weather App"
                  maxLength={100}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary font-medium transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="desc-input" className="block text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="desc-input"
                  value={form.description}
                  onChange={e => update("description", e.target.value)}
                  placeholder="What is this project about? What tech stack did you use, and what did you learn?"
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary font-medium resize-none transition-all"
                  required
                />
                <p className="text-[10px] text-text-secondary/50 text-right mt-1 font-bold">
                  {form.description.length}/500
                </p>
              </div>

              {/* Learning Path */}
              <div>
                <label htmlFor="roadmap-input" className="block text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">
                  Which path were you learning? <span className="text-red-500">*</span>
                </label>
                <select
                  id="roadmap-input"
                  value={form.roadmapId}
                  onChange={e => update("roadmapId", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary font-medium transition-all"
                  required
                >
                  <option value="">Select a learning path...</option>
                  {taskflows.map(tf => (
                    <option key={tf.slug} value={tf.slug}>
                      {tf.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Live Demo URL */}
              <div>
                <label htmlFor="live-input" className="block text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">
                  Live Demo URL
                </label>
                <input
                  id="live-input"
                  type="url"
                  value={form.liveUrl}
                  onChange={e => update("liveUrl", e.target.value)}
                  placeholder="https://myproject.vercel.app"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary font-medium transition-all"
                />
              </div>

              {/* Code Repository URL */}
              <div>
                <label htmlFor="repo-input" className="block text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">
                  GitHub Repository URL
                </label>
                <input
                  id="repo-input"
                  type="url"
                  value={form.repoUrl}
                  onChange={e => update("repoUrl", e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary font-medium transition-all"
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags-input" className="block text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">
                  Tags <span className="text-text-secondary/40 font-normal normal-case">(comma-separated, max 5)</span>
                </label>
                <input
                  id="tags-input"
                  value={form.tags}
                  onChange={e => update("tags", e.target.value)}
                  placeholder="react, typescript, tailwind"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary font-medium transition-all"
                />
              </div>

              {error && (
                <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-bold">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11"
              >
                {isPending ? "Submitting..." : "Submit for Review"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
