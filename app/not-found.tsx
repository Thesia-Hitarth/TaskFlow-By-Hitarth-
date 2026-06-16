import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-background transition-colors duration-200">
        <h1 className="text-6xl font-extrabold text-text-primary tracking-tight">404</h1>
        <p className="text-text-secondary mt-3 font-semibold">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-6 rounded-xl border border-border px-5 py-2 text-text-primary hover:border-accent hover:bg-card transition-all duration-200 font-semibold active:scale-[0.98]"
        >
          Back to home
        </Link>
      </main>
  );
}
