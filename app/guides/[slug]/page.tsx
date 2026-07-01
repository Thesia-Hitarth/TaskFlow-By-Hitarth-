import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Calendar } from "lucide-react";
import { GuideQuizSection } from "@/components/guides/GuideQuizSection";
import { guidesQuizData } from "@/lib/guides-quiz-data";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { checkAndAwardBadges } from "@/lib/badges/checkBadges";
import { taskflowContent } from "@/lib/taskflow-content";
import { CommentSection } from "@/components/community/CommentSection";
import { getComments } from "@/lib/actions/comments";
import { CommentWithAuthor } from "@/types/community";

// New components & helpers
import { getGuideBySlug, getAllGuides } from "@/lib/guides/getAllGuides";
import { mdxComponents } from "@/components/guides/mdx-components";
import GuideReadingProgress from "@/components/guides/GuideReadingProgress";
import CompletionPrompt from "@/components/guides/CompletionPrompt";
import SeriesNavigator from "@/components/guides/SeriesNavigator";
import RelatedRoadmapLink from "@/components/guides/RelatedRoadmapLink";
import { guideJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allGuides = getAllGuides();
  return allGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: `${guide.frontmatter.title} — task-flow-by-hitarth`,
    description: guide.frontmatter.description,
    openGraph: {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      url: `${siteUrl}/guides/${slug}`,
      type: "article",
      publishedTime: guide.frontmatter.publishedAt,
      tags: guide.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { frontmatter, content } = guide;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://task-flow-by-hitarth.vercel.app";

  const session = await auth();
  if (session?.user?.id) {
    try {
      await prisma.guideView.upsert({
        where: {
          userId_guideSlug: {
            userId: session.user.id,
            guideSlug: slug,
          },
        },
        create: {
          userId: session.user.id,
          guideSlug: slug,
        },
        update: {},
      });
      await checkAndAwardBadges(session.user.id, "guides");
    } catch (e) {
      console.error("Failed to log guide view:", e);
    }
  }
  const initialComments = await getComments({ guideTarget: slug });

  // Resolve node label for completion prompt if linked
  const primaryRoadmap = frontmatter.relatedRoadmaps?.[0];
  const primaryNode = frontmatter.relatedNodes?.[0];
  let nodeLabel = frontmatter.title;
  if (primaryRoadmap && primaryNode) {
    const flowContent = taskflowContent[primaryRoadmap];
    const matchingNode = flowContent?.nodes.find((n) => n.id === primaryNode);
    if (matchingNode) {
      nodeLabel = matchingNode.label;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            guideJsonLd({
              title: frontmatter.title,
              description: frontmatter.description,
              slug,
              publishedAt: frontmatter.publishedAt,
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
              { name: "Guides", url: `${siteUrl}/guides` },
              { name: frontmatter.title, url: `${siteUrl}/guides/${slug}` },
            ])
          ),
        }}
      />
      <GuideReadingProgress />
      <Navbar />
      <main id="main-content" className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Back Link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors font-semibold"
        >
          ← All Guides
        </Link>

        {/* Series Navigator widget */}
        {frontmatter.series && (
          <div className="mt-6">
            <SeriesNavigator seriesId={frontmatter.series} currentSlug={slug} />
          </div>
        )}

        {/* Related Roadmap Pill */}
        {frontmatter.relatedRoadmaps && frontmatter.relatedRoadmaps.length > 0 && (
          <RelatedRoadmapLink
            roadmapIds={frontmatter.relatedRoadmaps}
            nodeIds={frontmatter.relatedNodes}
          />
        )}

        {/* Tag Badges */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {frontmatter.tags.map((tag) => (
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
          {frontmatter.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-4 text-xs sm:text-sm text-text-secondary font-semibold pb-8 border-b border-border/50">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {frontmatter.readTime} min read
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {frontmatter.publishedAt}
          </span>
        </div>

        {/* Article Content with .prose style classes */}
        <article className="prose max-w-none mt-8 leading-relaxed">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        {/* Completion Prompt for Roadmap linkage */}
        {primaryRoadmap && primaryNode && (
          <CompletionPrompt
            roadmapId={primaryRoadmap}
            nodeId={primaryNode}
            nodeLabel={nodeLabel}
          />
        )}

        {/* Quiz block */}
        {(() => {
          const quiz = guidesQuizData.find((q) => q.guideSlug === slug);
          return (
            <div className="mt-12 pt-8 border-t border-border/60">
              <GuideQuizSection
                guideSlug={slug}
                staticQuestions={quiz?.questions}
              />
            </div>
          );
        })()}

        {/* Comments Section */}
        <CommentSection
          initialComments={initialComments as CommentWithAuthor[]}
          guideTarget={slug}
        />
      </main>
      <Footer />
    </div>
  );
}
