// components/projects/ProjectSubmissionForm.tsx
"use client"

import { useState, useEffect } from "react"
import { submitProject, getProjectSubmission } from "@/lib/actions/projects"
import { Check, AlertCircle, Loader2 } from "lucide-react"

export function ProjectSubmissionForm({ projectId }: { projectId: string }) {
  const [repoUrl, setRepoUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingInitial, setLoadingInitial] = useState(true)

  // Fetch initial submission progress on mount
  useEffect(() => {
    let active = true
    async function fetchSubmission() {
      try {
        const sub = await getProjectSubmission(projectId)
        if (active && sub) {
          setRepoUrl(sub.repoUrl || "")
          setLiveUrl(sub.liveUrl || "")
          setDescription(sub.description || "")
          setSubmitted(true)
        }
      } catch (err) {
        console.error("Failed to load project submission:", err)
      } finally {
        if (active) setLoadingInitial(false)
      }
    }
    fetchSubmission()
    return () => {
      active = false
    }
  }, [projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const result = await submitProject(projectId, { repoUrl, liveUrl, description })
    setIsPending(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error || "Failed to submit project. Please try again.")
    }
  }

  if (loadingInitial) {
    return (
      <div className="mt-10 p-5 rounded-2xl border border-border bg-card/20 flex justify-center items-center">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
        <span className="text-xs text-text-secondary font-medium ml-2">Loading submission data...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 p-6 rounded-2xl border border-border bg-card/20 space-y-4">
      <div className="border-b border-border/60 pb-3">
        <h2 className="font-bold text-text-primary text-base">Submit your project</h2>
        <p className="text-xs text-text-secondary font-medium mt-1">
          {submitted 
            ? "You have already submitted this project. Feel free to update your links below." 
            : "Done building? Share your code repository and live deployment link below."}
        </p>
      </div>

      {submitted && (
        <div className="p-3.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-2">
          <Check size={14} /> Submission successfully registered!
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <Field 
        label="GitHub Repository URL" 
        value={repoUrl} 
        onChange={setRepoUrl} 
        required 
        placeholder="https://github.com/your-username/my-weather-app" 
      />
      
      <Field 
        label="Live Demo URL (optional)" 
        value={liveUrl} 
        onChange={setLiveUrl} 
        placeholder="https://my-weather-app.vercel.app" 
      />

      <div>
        <label className="text-xs font-semibold text-text-secondary">
          Brief description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1.5 w-full px-3.5 py-2 text-xs rounded-xl border border-border bg-background hover:border-accent/40 focus:border-accent text-text-primary outline-hidden transition-all placeholder:text-text-secondary/50 font-medium leading-relaxed"
          placeholder="What was challenging? What did you learn?"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || !repoUrl}
        className="w-full py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
      >
        {isPending && <Loader2 size={13} className="animate-spin" />}
        {isPending ? "Submitting..." : submitted ? "Update Submission" : "Submit Project"}
      </button>
    </form>
  )
}

function Field({ label, value, onChange, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-text-secondary">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3.5 py-2 text-xs rounded-xl border border-border bg-background hover:border-accent/40 focus:border-accent text-text-primary outline-hidden transition-all placeholder:text-text-secondary/50 font-medium"
      />
    </div>
  )
}
