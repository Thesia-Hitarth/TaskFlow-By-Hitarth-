"use client"

import { useState, useTransition } from "react"
import { sendBuddyRequest } from "@/lib/actions/buddies"
import { UserPlus, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface BuddyCardProps {
  user: {
    id: string
    name: string | null
    username: string | null
    image: string | null
    streakDays: number
    _count: {
      progress: number
    }
  }
  roadmapId: string
}

export function BuddyCard({ user, roadmapId }: BuddyCardProps) {
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleRequest() {
    if (sent) return
    setError(null)
    startTransition(async () => {
      const result = await sendBuddyRequest(user.id, roadmapId)
      if (result.success) {
        setSent(true)
      } else if (result.error) {
        setError(result.error)
        if (result.error.includes("exists")) {
          setSent(true)
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-4 transition-all hover:border-accent/10">
      <div className="flex items-center gap-3.5 min-w-0">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="w-11 h-11 rounded-full border border-border object-cover shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-border flex items-center justify-center text-text-secondary text-sm font-bold shrink-0">
            {(user.name || user.username || "U").charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-extrabold text-sm text-text-primary truncate">
            {user.name || user.username}
          </p>
          <p className="text-xs text-text-secondary/60 font-semibold mt-0.5 truncate">
            @{user.username} · 🔥 {user.streakDays}-day streak · 📚 {user._count.progress} done
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <button
          onClick={handleRequest}
          disabled={sent || isPending}
          className={cn(
            "flex items-center gap-1.5 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none active:scale-98",
            sent
              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/10 cursor-default"
              : "bg-accent text-black hover:bg-amber-600"
          )}
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : sent ? (
            <>
              <Check size={13.5} />
              <span>Requested</span>
            </>
          ) : (
            <>
              <UserPlus size={13.5} />
              <span>Connect</span>
            </>
          )}
        </button>
        {error && !error.includes("exists") && (
          <span className="text-[10px] text-red-500 font-semibold">{error}</span>
        )}
      </div>
    </div>
  )
}
