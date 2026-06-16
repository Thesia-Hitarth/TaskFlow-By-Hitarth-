import { notFound } from "next/navigation";
import Link from "next/link";
import { bestPractices } from "@/lib/best-practices-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bestPractices.map((bp) => ({ slug: bp.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const bp = bestPractices.find((b) => b.slug === slug);
  if (!bp) return {};
  return {
    title: `${bp.title} — TaskFlow`,
    description: bp.description,
  };
}

export default async function BestPracticePage({ params }: PageProps) {
  const { slug } = await params;
  const bp = bestPractices.find((b) => b.slug === slug);
  if (!bp) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 pt-12 pb-20">
      <Link
        href="/best-practices"
        className="text-sm text-[#737373] hover:text-amber-500 transition-colors"
      >
        ← All Best Practices
      </Link>

      <div className="mt-6 flex items-start gap-4">
        <span className="text-5xl">{bp.icon}</span>
        <div>
          <span className="text-xs text-amber-500 font-medium uppercase tracking-wider">
            {bp.category}
          </span>
          <h1 className="text-3xl font-bold text-white mt-0.5">{bp.title}</h1>
        </div>
      </div>

      <p className="text-[#737373] mt-4 text-base leading-relaxed">
        {bp.description}
      </p>

      {/* Topics */}
      <div className="mt-8 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
        <h2 className="text-white font-semibold mb-4 text-lg">Topics Covered</h2>
        <ul className="space-y-3">
          {bp.topics.map((topic) => (
            <li key={topic} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[#e5e5e5] text-sm">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coming soon notice */}
      <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="text-sm text-[#a3a3a3]">
          💡 Detailed written guides for each topic are coming soon. In the
          meantime, search our{" "}
          <Link href="/guides" className="text-amber-500 hover:underline">
            Guides
          </Link>{" "}
          for related articles.
        </p>
      </div>
    </main>
  );
}
