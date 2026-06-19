"use client";

// BUG-014: Per-route error boundary for the /guides route segment.
import Link from "next/link";
import { useEffect } from "react";

export default function GuidesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[guides error boundary]", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-background transition-colors duration-200">
      <span className="text-5xl mb-4" role="img" aria-label="warning">⚠️</span>
      <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
        Failed to load guides
      </h1>
      <p className="text-text-secondary mt-3 max-w-sm font-medium">
        An unexpected error occurred while loading guides.
      </p>
      {error.digest && (
        <p className="text-xs text-text-secondary/60 mt-2 font-mono">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex gap-4 mt-6">
        <button
          onClick={reset}
          className="rounded-xl border border-border px-5 py-2.5 text-text-primary hover:border-accent hover:bg-card transition-all duration-200 font-semibold cursor-pointer active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl bg-accent text-black px-5 py-2.5 hover:bg-amber-600 transition-all duration-200 font-semibold active:scale-[0.98]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
