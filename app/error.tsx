"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-background transition-colors duration-200">
      <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Something went wrong</h1>
      <p className="text-text-secondary mt-3 max-w-md font-semibold">{error.message}</p>
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
