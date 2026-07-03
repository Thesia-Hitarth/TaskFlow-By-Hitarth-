"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error boundary]", error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background transition-colors duration-200">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">A critical error occurred</h1>
        <p className="text-text-secondary mt-3 max-w-md font-semibold">
          {process.env.NEXT_PUBLIC_SENTRY_DSN
            ? "The application crashed critically. We have notified our engineers."
            : "The application crashed critically. Please try resetting or refreshing."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-accent text-black px-5 py-2.5 hover:bg-amber-600 transition-all duration-200 font-semibold active:scale-[0.98] cursor-pointer"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
