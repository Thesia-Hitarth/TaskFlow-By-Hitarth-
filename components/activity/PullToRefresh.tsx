"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Only trigger when scrolled to the very top
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (startY.current === 0) return;
    currentY.current = e.touches[0].clientY;
    const delta = currentY.current - startY.current;

    if (delta > 60 && !isRefreshing) {
      setIsPulling(true);
    }
  }, [isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (isPulling && !isRefreshing) {
      setIsPulling(false);
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (err) {
        console.error("Refresh failed:", err);
      } finally {
        setIsRefreshing(false);
      }
    }
    startY.current = 0;
    currentY.current = 0;
  }, [isPulling, isRefreshing, onRefresh]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className="relative w-full">
      {(isPulling || isRefreshing) && (
        <div className="flex justify-center items-center py-4 transition-all duration-300 animate-in fade-in-0 slide-in-from-top-4">
          <div className="bg-card border border-border px-4 py-2.5 rounded-full shadow-md flex items-center gap-2">
            <Loader2 size={16} className="animate-spin text-accent" />
            <span className="text-xs font-bold text-text-secondary select-none">
              {isRefreshing ? "Refreshing..." : "Pull to refresh"}
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
