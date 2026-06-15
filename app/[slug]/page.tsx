import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { taskflows } from "@/lib/taskflows-data";
import TaskflowDiagram from "@/components/taskflow/TaskflowDiagram";
import { taskflowContent } from "@/lib/taskflow-content";
import { guides } from "@/lib/guides-data";
import GuideCard from "@/components/GuideCard";

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
  return {
    title: `${taskflow?.title || "Developer"} Taskflow 2026 — taskflow.sh`,
    description: taskflow?.description || "Step by step guide to learning.",
  };
}

export default async function TaskflowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const taskflow = taskflows.find((tf) => tf.slug === slug);
  const content = taskflowContent[slug];
  
  const title = taskflow?.title || slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col">
        {/* Breadcrumb */}
        <nav className="text-muted text-sm" aria-label="Breadcrumb">
          <Link href="/taskflows" className="hover:text-white transition-colors">
            All Taskflows
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-white">{title}</span>
        </nav>

        {/* Header */}
        <header className="mt-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            {title} Developer Taskflow
          </h1>
          <p className="text-muted mt-2">
            {taskflow?.description || `Step by step guide to becoming a ${title} developer`}
          </p>
        </header>

        {/* Interactive Diagram or Placeholder Box */}
        {content ? (
          <div className="mt-10">
            <TaskflowDiagram content={content} />
          </div>
        ) : (
          <div className="mt-10 bg-surface border border-border rounded-xl h-96 w-full flex flex-col items-center justify-center text-center px-4">
            <p className="text-muted text-lg font-medium">
              Interactive taskflow diagram coming in Phase 2
            </p>
            <p className="text-muted/60 text-sm mt-2">
              Check back soon
            </p>
          </div>
        )}

        {/* Related Guides */}
        {guides.filter((g) => g.roadmapSlug === slug).length > 0 && (
          <div className="mt-12 pt-10 border-t border-border/40">
            <h2 className="text-xl font-bold text-white mb-6">Related Guides</h2>
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
        <div className="mt-8">
          <Link
            href="/taskflows"
            className="text-accent hover:underline inline-flex items-center gap-1 text-sm font-medium"
          >
            &larr; Back to all taskflows
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
