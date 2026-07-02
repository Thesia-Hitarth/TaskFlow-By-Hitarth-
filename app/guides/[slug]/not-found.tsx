// LOW-003: Guide-specific not-found page so 404s preserve the guides section
// Navbar/Footer context, rather than falling back to the root not-found.tsx.
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GuideNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main
        id="main-content"
        className="flex-grow flex flex-col items-center justify-center text-center px-4"
      >
        <p className="text-6xl mb-4">📖</p>
        <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">
          Guide Not Found
        </h1>
        <p className="text-text-secondary mt-3 font-semibold max-w-sm">
          This guide doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/guides"
          className="mt-6 rounded-xl border border-border px-5 py-2 text-text-primary hover:border-accent hover:bg-card transition-all duration-200 font-semibold active:scale-[0.98]"
        >
          ← Browse all guides
        </Link>
      </main>
      <Footer />
    </div>
  );
}
