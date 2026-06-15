import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guides } from "@/lib/guides-data";
import { Clock, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — taskflow.sh`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const filePath = path.join(process.cwd(), "content/guides", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const source = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Back Link */}
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-amber-500 transition-colors"
        >
          ← All Guides
        </Link>

        {/* Tag Badges */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {guide.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs text-text-secondary border border-border bg-surface rounded-full px-3 py-0.5 uppercase tracking-wide font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight tracking-tight">
          {guide.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-4 text-xs sm:text-sm text-muted font-medium pb-8 border-b border-border/50">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-500" />
            {guide.readingTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {guide.publishedAt}
          </span>
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mt-8 leading-relaxed">
          <MDXRemote source={source} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
