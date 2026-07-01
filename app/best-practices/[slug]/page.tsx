import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bestPractices } from "@/lib/best-practices-data";
import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import { CommentSection } from "@/components/community/CommentSection";
import { getComments } from "@/lib/actions/comments";
import { CommentWithAuthor } from "@/types/community";

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

  const initialComments = await getComments({ guideTarget: `best-practice-${slug}` });

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Back Link */}
        <Link
          href="/best-practices"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent font-semibold transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Best Practices
        </Link>

        {/* Category Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-accent border border-accent/20 bg-accent/5 rounded-full px-3 py-0.5 uppercase tracking-wide font-bold">
            {bp.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4 leading-tight tracking-tight">
          {bp.icon} {bp.title}
        </h1>

        {/* Description */}
        <p className="text-text-secondary font-medium text-base sm:text-lg mt-3 leading-relaxed">
          {bp.description}
        </p>

        {/* If detailed rules are defined, render the checklist */}
        {bp.rules && bp.rules.length > 0 ? (
          <div className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-text-primary border-b border-border/60 pb-2">
              Recommended Standards Checklist
            </h2>
            <div className="space-y-6">
              {bp.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-text-primary text-base leading-snug">
                        {rule.rule}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1.5 leading-relaxed font-medium">
                        {rule.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Do / Don't Code Snippets */}
                  {(rule.doExample || rule.dontExample) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/40">
                      {rule.doExample && (
                        <div className="flex flex-col p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-text-primary">
                          <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2 block">
                            ✅ DO
                          </span>
                          <pre className="text-xs p-3 font-mono rounded-lg overflow-x-auto bg-surface border border-border/50 text-text-primary">
                            <code>{rule.doExample}</code>
                          </pre>
                        </div>
                      )}
                      {rule.dontExample && (
                        <div className="flex flex-col p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-text-primary">
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2 block">
                            {"❌ DON'T"}
                          </span>
                          <pre className="text-xs p-3 font-mono rounded-lg overflow-x-auto bg-surface border border-border/50 text-text-primary">
                            <code>{rule.dontExample}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Fallback view for categories still under construction */
          <>
            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-xs">
              <h2 className="text-text-primary font-bold text-lg mb-4 tracking-tight">
                Topics Covered
              </h2>
              <ul className="space-y-3">
                {bp.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0" />
                    <span className="text-text-primary font-semibold text-sm leading-relaxed">
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-5 text-sm text-text-secondary font-medium leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
              <div>
                Detailed written standards and rules checklists for this category are coming soon.
                In the meantime, study the topics listed above and browse our{" "}
                <Link href="/guides" className="text-accent hover:underline font-bold">
                  Guides
                </Link>{" "}
                for related articles.
              </div>
            </div>
          </>
        )}
        {/* Comments Section */}
        <CommentSection
          initialComments={initialComments as CommentWithAuthor[]}
          guideTarget={`best-practice-${slug}`}
        />
      </main>
      <Footer />
    </div>
  );
}
