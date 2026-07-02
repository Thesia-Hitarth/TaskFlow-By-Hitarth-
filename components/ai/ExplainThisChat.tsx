"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, Send, X, Loader2 } from "lucide-react"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

const SUGGESTED_PROMPTS = [
  "Explain like I'm 10",
  "Give me real-world examples",
  "What's a common beginner mistake here?",
]

interface Props {
  roadmapId: string
  nodeId: string
  nodeLabel: string
  onClose: () => void
}

export function ExplainThisChat({ roadmapId, nodeId, nodeLabel, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleClose = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    onClose()
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    setMessages(prev => [...prev, { role: "user", content: text }])
    setInput("")
    setIsLoading(true)
    setError(null)

    // Add an empty assistant message placeholder that we'll fill in chunk by chunk
    setMessages(prev => [...prev, { role: "assistant", content: "" }])

    try {
      const response = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmapId, nodeId, question: text }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const errMsg = await response.text()
        throw new Error(errMsg || "Rate limit exceeded or server error.")
      }

      if (!response.body) {
        throw new Error("No response body received.")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })

        // Update the last message (the assistant's response) in place
        setMessages(prev => {
          const next = [...prev]
          next[next.length - 1] = { role: "assistant", content: accumulated }
          return next
        })
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // Ignored since the request was explicitly cancelled
        return
      }
      console.error("[Explain Chat Error]", err)
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(msg)
      // Remove the last empty assistant placeholder on failure
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-gradient-to-r from-accent/10 to-transparent">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent animate-pulse" />
          <span className="text-sm font-extrabold text-text-primary">
            Ask AI: {nodeLabel}
          </span>
        </div>
        <button type="button" onClick={handleClose} aria-label="Close chat" className="p-1 rounded-lg hover:bg-surface border border-transparent hover:border-border text-text-secondary cursor-pointer">
          <X size={15} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-[300px] min-h-[180px]">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/60">Suggested questions:</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-background border border-border text-text-secondary hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary transition-all font-semibold cursor-pointer"
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[90%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-medium ${
              msg.role === "user"
                ? "ml-auto bg-accent text-black rounded-br-none shadow-sm shadow-accent/10 font-bold"
                : "mr-auto bg-surface border border-border text-text-primary rounded-bl-none"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.content === "" && (
          <div className="mr-auto px-3.5 py-2.5 rounded-2xl rounded-bl-none bg-surface border border-border flex items-center gap-2">
            <Loader2 size={12} className="animate-spin text-accent" />
            <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Consulting Gemini...</span>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-500 px-3.5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl font-semibold">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
        className="flex items-center gap-2 px-4 py-3 border-t border-border/60 bg-surface/30"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this topic..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-background text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent disabled:opacity-60 font-semibold"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Send query"
          className="p-2 rounded-xl bg-accent text-black hover:bg-amber-600 disabled:opacity-40 transition-all cursor-pointer font-bold shrink-0"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}
