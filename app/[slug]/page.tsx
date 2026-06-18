import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { taskflows } from "@/lib/taskflows-data";
import { taskflowContent } from "@/lib/taskflow-content";
import { guides } from "@/lib/guides-data";
import GuideCard from "@/components/GuideCard";
import LazyTaskflowDiagram from "@/components/taskflow/LazyTaskflowDiagram";
import { notFound } from "next/navigation";
import RoadmapProgressBar from "@/components/roadmap/RoadmapProgressBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return taskflows.map((tf) => ({
    slug: tf.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const taskflow = taskflows.find((tf) => tf.slug === slug);
  if (!taskflow) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const title = `${taskflow.title} Taskflow 2026 — task-flow-by-hitarth`;
  const description =
    taskflow.description || `Step by step guide to becoming a ${taskflow.title} developer.`;

  // BUG-020: Dynamic OG metadata per taskflow so social share links show
  // the correct title instead of the site-wide "Developer Taskflows" default.
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


export default async function TaskflowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const taskflow = taskflows.find((tf) => tf.slug === slug);
  if (!taskflow) notFound();
  const content = taskflowContent[slug];

  const title = taskflow.title;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col transition-colors duration-200">
        {/* Breadcrumb */}
        <nav className="text-text-secondary text-sm" aria-label="Breadcrumb font-medium">
          <Link href="/taskflows" className="hover:text-text-primary transition-colors">
            All Taskflows
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-text-primary font-semibold">{title}</span>
        </nav>

        {/* Header */}
        <header className="mt-4 pb-6 border-b border-border">
          <h1 className="text-4xl font-extrabold text-text-primary leading-tight tracking-tight">
            {title} Developer Taskflow
          </h1>
          <p className="text-text-secondary mt-2 font-semibold">
            {taskflow?.description || `Step by step guide to becoming a ${title} developer`}
          </p>
        </header>

        {content && (
          <div className="mt-8">
            <RoadmapProgressBar slug={slug} totalNodes={content.nodes.length} />
          </div>
        )}

        {/* Interactive Diagram or Placeholder Box */}
        {content ? (
          <div className="mt-10">
            <LazyTaskflowDiagram content={content} />
          </div>
        ) : (
          <div className="mt-10 bg-card border border-border border-dashed rounded-xl h-96 w-full flex flex-col items-center justify-center text-center px-4">
            <p className="text-text-secondary text-lg font-bold">
              Interactive taskflow diagram coming soon
            </p>
            <p className="text-text-secondary/60 text-sm mt-2">
              Check back soon
            </p>
          </div>
        )}

        {/* Related Guides */}
        {guides.filter((g) => g.roadmapSlug === slug).length > 0 && (
          <div className="mt-12 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guides
                .filter((g) => g.roadmapSlug === slug)
                .map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/taskflows"
            className="text-accent hover:underline inline-flex items-center gap-1.5 text-sm font-bold"
          >
            &larr; Back to all taskflows
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

