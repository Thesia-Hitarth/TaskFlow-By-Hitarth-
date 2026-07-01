import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { taskflows } from "@/lib/taskflows-data";
import { taskflowContent } from "@/lib/taskflow-content";
import GuideCard from "@/components/GuideCard";
import LazyTaskflowDiagram from "@/components/taskflow/LazyTaskflowDiagram";
import { notFound } from "next/navigation";
import RoadmapProgressBar from "@/components/roadmap/RoadmapProgressBar";
import { getAllGuides } from "@/lib/guides/getAllGuides";
import { getRelatedGuidesForNode } from "@/lib/guides/getRelatedGuidesForNode";
import { getProjectsForRoadmap } from "@/lib/projects/getAllProjects";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { WelcomeTour } from "@/components/onboarding/WelcomeTour";
import { roadmapJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400; // rebuild at most once per 24 hours

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
  const title = `${taskflow.title} Taskflow 2026`;
  const description =
    taskflow.description || `Step by step guide to becoming a ${taskflow.title} developer.`;

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://task-flow-by-hitarth.vercel.app";

  // Fetch whether user has seen welcome tour
  const session = await auth();
  let hasSeenTour = false;
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hasSeenTour: true },
    });
    hasSeenTour = user?.hasSeenTour ?? false;
  }

  // Enrich nodes with related guides on the server
  const enrichedNodes = content
    ? content.nodes.map((node) => ({
        ...node,
        relatedGuides: getRelatedGuidesForNode(slug, node.id),
      }))
    : [];

  const enrichedContent = content
    ? {
        ...content,
        nodes: enrichedNodes,
      }
    : null;

  const title = taskflow.title;
  const headingSuffix = taskflow.type === "role" ? "Developer Taskflow" : "Taskflow";

  const allGuides = getAllGuides();
  const roadmapRelatedGuides = allGuides.filter((g) =>
    g.frontmatter.relatedRoadmaps.includes(slug)
  );

  const roadmapProjects = getProjectsForRoadmap(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            roadmapJsonLd({
              title,
              description: taskflow?.description || "",
              slug,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: siteUrl },
              { name: "Taskflows", url: `${siteUrl}/taskflows` },
              { name: title, url: `${siteUrl}/${slug}` },
            ])
          ),
        }}
      />
      <Navbar />
      <main id="main-content" className="flex-1 bg-background py-12 px-4 sm:px-8 w-full max-w-4xl mx-auto flex flex-col transition-colors duration-200">
        <nav className="text-text-secondary text-sm font-medium" aria-label="Breadcrumb">
          <Link href="/taskflows" className="hover:text-text-primary transition-colors">
            All Taskflows
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-text-primary font-semibold">{title}</span>
        </nav>

        {/* Header */}
        <header className="mt-4 pb-6 border-b border-border">
          <h1 className="text-4xl font-extrabold text-text-primary leading-tight tracking-tight">
            {title} {headingSuffix}
          </h1>
          <p className="text-text-secondary mt-2 font-semibold">
            {taskflow?.description || `Step by step guide to learning ${title}`}
          </p>
        </header>

        {enrichedContent && (
          <div className="mt-8">
            <RoadmapProgressBar slug={slug} nodes={enrichedContent.nodes} />
          </div>
        )}

        {/* Interactive Diagram or Placeholder Box */}
        {enrichedContent ? (
          <div className="mt-10">
            <LazyTaskflowDiagram content={enrichedContent} />
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

        {/* Project Challenges */}
        {roadmapProjects.length > 0 && (
          <div className="mt-12 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">Project Challenges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmapProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group block p-5 rounded-2xl border border-border bg-card/20 hover:bg-card/40 hover:border-accent/40 transition-all select-none"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {p.difficulty}
                    </span>
                    <span className="text-[10px] text-text-secondary font-medium">
                      ⏱ {p.estimatedTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors mt-3 text-base">
                    {p.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Guides */}
        {roadmapRelatedGuides.length > 0 && (
          <div className="mt-12 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmapRelatedGuides.map((g) => (
                <GuideCard
                  key={g.slug}
                  guide={{
                    slug: g.slug,
                    title: g.frontmatter.title,
                    description: g.frontmatter.description,
                    tags: g.frontmatter.tags,
                    publishedAt: g.frontmatter.publishedAt,
                    difficulty: g.frontmatter.difficulty,
                    readTime: g.frontmatter.readTime,
                  }}
                />
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
      <WelcomeTour hasSeenTour={hasSeenTour} />
    </>
  );
}
