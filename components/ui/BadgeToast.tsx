"use client";

import { useEffect, useState } from "react";
import { X, Trophy } from "lucide-react";
import { BADGE_DEFINITIONS } from "@/lib/badges/definitions";

interface BadgeToastProps {
  badgeId: string | null;
  onDismiss: () => void;
}

export function BadgeToast({ badgeId, onDismiss }: BadgeToastProps) {
  const badge = badgeId ? BADGE_DEFINITIONS[badgeId] : null;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (badgeId) {
      setVisible(true);
      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        // Wait for exit transition before calling onDismiss
        setTimeout(onDismiss, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badgeId, onDismiss]);

  if (!badge) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[999] max-w-sm w-full bg-surface border border-border shadow-2xl rounded-2xl p-4 flex gap-4 items-center transition-all duration-300 transform ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 rounded-2xl border border-amber-500/20">
        <span className="text-3xl relative z-10">{badge.emoji}</span>
        <Trophy className="absolute -top-1 -right-1 h-4 w-4 text-amber-500 animate-bounce" />
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest leading-none">
          Badge Unlocked!
        </span>
        <h4 className="text-sm font-black text-text-primary mt-1 truncate">
          {badge.name}
        </h4>
        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
          {badge.description}
        </p>
      </div>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onDismiss, 300);
        }}
        className="flex-shrink-0 p-1 rounded-lg text-text-secondary/60 hover:text-text-primary hover:bg-card transition-colors cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
