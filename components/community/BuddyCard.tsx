"use client"

import { useState, useTransition } from "react"
import { sendBuddyRequest, acceptBuddyRequest, rejectBuddyRequest } from "@/lib/actions/buddies"
import { UserPlus, Check, X, Loader2 } from "lucide-react"
import { UserAvatar } from "../ui/UserAvatar"

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
  connectionState?: "none" | "sent" | "received"
  connectionId?: string
}

export function BuddyCard({
  user,
  roadmapId,
  connectionState = "none",
  connectionId,
}: BuddyCardProps) {
  const [statusState, setStatusState] = useState<"none" | "sent" | "received" | "active" | "declined">(connectionState)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleConnect() {
    if (statusState !== "none") return
    setError(null)
    startTransition(async () => {
      const result = await sendBuddyRequest(user.id, roadmapId)
      if (result.success) {
        setStatusState("sent")
      } else if (result.error) {
        setError(result.error)
        if (result.error.includes("exists")) {
          setStatusState("sent")
        }
      }
    })
  }

  async function handleAccept() {
    if (!connectionId) return
    setError(null)
    startTransition(async () => {
      const result = await acceptBuddyRequest(connectionId)
      if (result.success) {
        setStatusState("active")
      } else if (result.error) {
        setError(result.error)
      }
    })
  }

  async function handleDecline() {
    if (!connectionId) return
    setError(null)
    startTransition(async () => {
      const result = await rejectBuddyRequest(connectionId)
      if (result.success) {
        setStatusState("declined")
      } else if (result.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-4 transition-all hover:border-accent/10">
      <div className="flex items-center gap-3.5 min-w-0">
        <UserAvatar
          src={user.image}
          name={user.name}
          username={user.username}
          className="w-11 h-11"
          size={44}
        />
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
        {isPending ? (
          <div className="flex h-10 items-center px-4">
            <Loader2 className="w-4 h-4 animate-spin text-text-secondary/60" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {statusState === "none" && (
              <button
                onClick={handleConnect}
                className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2.5 rounded-xl bg-accent text-black hover:bg-amber-600 transition-all cursor-pointer select-none active:scale-98"
              >
                <UserPlus size={13.5} />
                <span>Connect</span>
              </button>
            )}

            {statusState === "sent" && (
              <button
                disabled
                className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20 cursor-default select-none"
              >
                <span>Request Sent</span>
              </button>
            )}

            {statusState === "received" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAccept}
                  className="flex items-center gap-1 text-xs font-extrabold px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all cursor-pointer select-none active:scale-98"
                  title="Accept request"
                >
                  <Check size={13.5} />
                  <span>Accept</span>
                </button>
                <button
                  onClick={handleDecline}
                  className="flex items-center gap-1 text-xs font-extrabold px-3 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all cursor-pointer select-none active:scale-98"
                  title="Decline request"
                >
                  <X size={13.5} />
                  <span>Decline</span>
                </button>
              </div>
            )}

            {statusState === "active" && (
              <span className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2.5 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/10 cursor-default">
                <Check size={13.5} />
                <span>Connected</span>
              </span>
            )}

            {statusState === "declined" && (
              <span className="text-xs font-bold text-text-secondary/50 px-4 py-2.5 cursor-default">
                Declined
              </span>
            )}
          </div>
        )}

        {error && (
          <span className="text-[10px] text-red-500 font-semibold mt-1">{error}</span>
        )}
      </div>
    </div>
  )
}
