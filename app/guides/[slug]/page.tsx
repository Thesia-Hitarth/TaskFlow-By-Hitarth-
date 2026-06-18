import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guides } from "@/lib/guides-data";
import { Clock, Calendar } from "lucide-react";
import GuideQuiz from "@/components/GuideQuiz";
import { guidesQuizData } from "@/lib/guides-quiz-data";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // BUG-020: Dynamic OG tags per guide page so social shares show the correct
  // title, description, and URL instead of the site-wide defaults.
  return {
    title: `${guide.title} — task-flow-by-hitarth`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${siteUrl}/guides/${slug}`,
      type: "article",
      publishedTime: guide.publishedAt,
      tags: guide.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
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
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Back Link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors font-semibold"
        >
          ← All Guides
        </Link>

        {/* Tag Badges */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-secondary border border-border bg-card rounded-full px-3 py-0.5 uppercase tracking-wide font-bold transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4 leading-tight tracking-tight">
          {guide.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-4 text-xs sm:text-sm text-text-secondary font-semibold pb-8 border-b border-border/50">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {guide.readingTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {guide.publishedAt}
          </span>
        </div>

        {/* Article Content */}
        <article className="prose max-w-none mt-8 leading-relaxed">
          <MDXRemote source={source} />
        </article>

        {/* Quiz block */}
        {(() => {
          const quiz = guidesQuizData.find((q) => q.guideSlug === slug);
          return quiz ? (
            <GuideQuiz guideSlug={slug} questions={quiz.questions} />
          ) : null;
        })()}
      </main>
      <Footer />
    </div>
  );
}

