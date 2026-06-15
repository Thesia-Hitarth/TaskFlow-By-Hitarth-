"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl font-extrabold text-red-500 tracking-tight">Something went wrong</h1>
        <p className="text-text-secondary mt-3 max-w-md font-medium text-sm">
          {error.message || "An unexpected error occurred while rendering this page."}
        </p>
        <Button
          onClick={reset}
          variant="outline"
          className="mt-8 px-6 py-2.5 font-semibold transition-all"
        >
          Try again
        </Button>
      </main>
      <Footer />
    </div>
  );
}
