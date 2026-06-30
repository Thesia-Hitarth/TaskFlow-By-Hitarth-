import Link from "next/link";
import { Clock, Calendar, BookOpen } from "lucide-react";

interface GuideCardProps {
  guide: {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    publishedAt: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    readTime?: number;
    readingTime?: string; // fallback for old data structures
  };
}

const DIFFICULTY_COLORS = {
  beginner: "bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  intermediate: "bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  advanced: "bg-rose-500/10 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
};

export default function GuideCard({ guide }: GuideCardProps) {
  // Resolve read time dynamically
  const displayReadTime = guide.readTime
    ? `${guide.readTime} min read`
    : guide.readingTime || "5 min read";

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group relative rounded-2xl border border-border bg-card p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-accent/40 transition-all duration-300"
    >
      <div>
        {/* Badges Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Difficulty Badge */}
          {guide.difficulty ? (
            <span
              className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider ${
                DIFFICULTY_COLORS[guide.difficulty] || DIFFICULTY_COLORS.beginner
              }`}
            >
              {guide.difficulty}
            </span>
          ) : (
            <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider bg-card text-text-secondary border border-border">
              Guide
            </span>
          )}

          {/* Reading Time */}
          <span className="flex items-center gap-1 text-[11px] text-text-secondary/70 font-semibold">
            <Clock className="h-3 w-3 text-accent/80" /> {displayReadTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-text-primary font-extrabold group-hover:text-accent transition-colors duration-200 text-base leading-snug line-clamp-2">
          {guide.title}
        </h3>

        {/* Description Excerpt */}
        <p className="text-xs text-text-secondary mt-2 line-clamp-2 leading-relaxed font-medium">
          {guide.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/40 text-[11px] text-text-secondary">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-text-secondary/60">
          <Calendar className="h-3 w-3 shrink-0" />
          {guide.publishedAt}
        </div>
        <span className="text-accent group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5 font-bold">
          Read Guide <BookOpen className="h-3.5 w-3.5 ml-0.5" />
        </span>
      </div>
    </Link>
  );
}
