"use client"

import { useState, useTransition } from "react"
import { setUsername } from "@/lib/actions/profile"
import { Button } from "@/components/ui/button"

export default function ProfileSetupPage() {
  const [username, setUsernameInput] = useState("")
  const [bio, setBio] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Username validation: 3–20 chars, lowercase letters, numbers, hyphens only
  const usernameRegex = /^[a-z0-9-]{3,20}$/
  const isValidUsername = usernameRegex.test(username)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidUsername) return
    setError(null)
    startTransition(async () => {
      const result = await setUsername(username, bio)
      if (result.error) {
        setError(result.error)
      } else {
        // Successful username setup
        // Force full page navigation to let NextAuth reload session metadata
        window.location.href = "/dashboard"
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 sm:p-10 shadow-lg">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
          Set up your profile
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          Choose a unique username for your public profile page. This will be used in URLs and cannot be changed later.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username field */}
          <div>
            <label htmlFor="username-input" className="block text-sm font-semibold text-text-primary mb-2">
              Username
            </label>
            <div className="flex items-center rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent overflow-hidden transition-all duration-200">
              <span className="pl-3.5 pr-1.5 text-text-secondary/60 text-sm select-none font-medium">
                taskflow.dev/u/
              </span>
              <input
                id="username-input"
                value={username}
                onChange={e => setUsernameInput(e.target.value.toLowerCase())}
                placeholder="username"
                maxLength={20}
                className="flex-1 py-3 pr-3.5 text-sm bg-transparent text-text-primary placeholder:text-text-secondary/30 focus:outline-none"
                required
              />
            </div>
            {username && !isValidUsername && (
              <p className="text-xs text-red-500 mt-2 font-medium">
                3–20 chars. Only lowercase letters, numbers, and hyphens.
              </p>
            )}
          </div>

          {/* Bio field */}
          <div>
            <label htmlFor="bio-input" className="block text-sm font-semibold text-text-primary mb-2">
              Bio <span className="text-text-secondary/40 font-normal">(optional)</span>
            </label>
            <textarea
              id="bio-input"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell other learners about yourself. What are you studying?"
              maxLength={200}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none transition-all duration-200"
            />
            <p className="text-[10px] text-text-secondary/50 mt-1.5 text-right font-medium">
              {bio.length}/200
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-bold">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={!isValidUsername || isPending}
            className="w-full h-11"
          >
            {isPending ? "Creating Profile..." : "Create Profile"}
          </Button>
        </form>
      </div>
    </main>
  )
}
