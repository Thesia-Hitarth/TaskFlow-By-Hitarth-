"use client";

import { BADGE_DEFINITIONS } from "@/lib/badges/definitions";
import { Lock } from "lucide-react";

interface EarnedBadge {
  badgeId: string;
  awardedAt: string | Date;
}

interface BadgeGridProps {
  badges: EarnedBadge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  // Map earned badges by ID for quick O(1) lookup
  const earnedMap = new Map(badges.map((b) => [b.badgeId, b.awardedAt]));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {Object.values(BADGE_DEFINITIONS).map((def) => {
        const isEarned = earnedMap.has(def.id);
        const earnedAt = earnedMap.get(def.id);

        return (
          <div
            key={def.id}
            title={`${def.name}: ${def.description}${
              isEarned
                ? `\nUnlocked on ${new Date(earnedAt!).toLocaleDateString()}`
                : "\nLocked — Complete requirements to unlock!"
            }`}
            className={`relative flex flex-col items-center justify-center p-4 border rounded-2xl transition-all duration-300 ${
              isEarned
                ? "bg-card border-amber-500/20 shadow-md hover:shadow-lg dark:hover:shadow-black/30 scale-100"
                : "bg-surface/30 border-border/60 opacity-50 grayscale hover:opacity-75 scale-95"
            }`}
          >
            {/* Lock Overlay for locked badges */}
            {!isEarned && (
              <div className="absolute top-2.5 right-2.5 text-text-secondary/40">
                <Lock className="h-3 w-3" />
              </div>
            )}

            {/* Badge Icon */}
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-300 mb-3 ${
                isEarned
                  ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 text-amber-500 scale-100 rotate-0 group-hover:rotate-6"
                  : "bg-card/40 border-border/40 text-text-secondary"
              }`}
            >
              <span className="text-3xl select-none">{def.emoji}</span>
            </div>

            {/* Badge Info */}
            <span className="text-xs font-bold text-text-primary text-center truncate w-full">
              {def.name}
            </span>
            <p className="text-[10px] text-text-secondary text-center mt-1 leading-normal line-clamp-2 w-full font-medium">
              {def.description}
            </p>

            {isEarned && earnedAt && (
              <span className="text-[9px] text-amber-500/80 font-semibold mt-2 select-none uppercase tracking-wide">
                Unlocked
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
