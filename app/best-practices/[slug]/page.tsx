import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bestPractices } from "@/lib/best-practices-data";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bestPractices.map((bp) => ({ slug: bp.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bp = bestPractices.find((b) => b.slug === slug);
  if (!bp) return {};
  return {
    title: `${bp.title} — task-flow-by-hitarth`,
    description: bp.description,
  };
}

export default async function BestPracticePage({ params }: PageProps) {
  const { slug } = await params;
  const bp = bestPractices.find((b) => b.slug === slug);
  if (!bp) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Back Link */}
        <Link
          href="/best-practices"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent font-semibold transition-colors"
        >
          ← All Best Practices
        </Link>

        {/* Tag Badges */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          <span
            className="text-xs text-text-secondary border border-border bg-card rounded-full px-3 py-0.5 uppercase tracking-wide font-bold transition-colors"
          >
            {bp.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4 leading-tight tracking-tight">
          {bp.icon} {bp.title}
        </h1>

        {/* Description */}
        <p className="text-text-secondary font-medium text-base sm:text-lg mt-5 leading-relaxed">
          {bp.description}
        </p>

        {/* Topics Covered Box */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-xs">
          <h2 className="text-text-primary font-bold text-lg mb-4 tracking-tight">Topics Covered</h2>
          <ul className="space-y-3">
            {bp.topics.map((topic) => (
              <li key={topic} className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent shrink-0" />
                <span className="text-text-primary font-semibold text-sm leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Box Callout */}
        <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-5 text-sm text-text-secondary font-medium leading-relaxed flex items-start gap-2.5">
          <span className="text-base select-none">💡</span>
          <div>
            Detailed written guides for each topic are coming soon. In the meantime, the topics above
            outline exactly what to study — search our{" "}
            <Link href="/guides" className="text-accent hover:underline font-bold">
              Guides
            </Link>{" "}
            for related articles.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
