"use client";

import { useTransition } from "react";
import { voteSuggestion } from "@/lib/actions/suggestions";

interface Suggestion {
  id: string;
  title: string;
  description: string | null;
  type: string;
  upvotes: number;
  status: string;
  createdAt: Date;
  hasVoted: boolean;
}

export function SuggestionList({ suggestions }: { suggestions: Suggestion[] }) {
  const [isPending, startTransition] = useTransition();

  const handleVote = (id: string) => {
    startTransition(async () => {
      await voteSuggestion(id);
    });
  };

  if (suggestions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center text-text-secondary">
        No requests yet. Be the first to suggest content!
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      {suggestions.map((item) => (
        <div
          key={item.id}
          className="bg-card border border-border rounded-2xl p-5 shadow-xs flex items-start gap-4 hover:border-accent/40 transition-colors"
        >
          {/* Vote box */}
          <button
            onClick={() => handleVote(item.id)}
            disabled={isPending}
            className={`w-12 h-14 shrink-0 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
              item.hasVoted
                ? "border-accent bg-accent/10 text-accent font-bold scale-[1.02]"
                : "border-border hover:border-accent/50 text-text-secondary"
            }`}
          >
            <span className="text-xs">▲</span>
            <span className="text-sm font-bold font-mono">{item.upvotes}</span>
          </button>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-surface border border-border/80 text-text-secondary">
                {item.type}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  item.status === "done"
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : item.status === "planned"
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    : "bg-surface border border-border/80 text-text-muted"
                }`}
              >
                {item.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-text-primary mb-1 truncate">{item.title}</h4>
            {item.description && (
              <p className="text-xs text-text-secondary line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
