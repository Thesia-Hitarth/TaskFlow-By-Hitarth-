import Link from "next/link";
import { getAllGuides } from "@/lib/guides/getAllGuides";
import { GUIDE_SERIES } from "@/lib/guides/series";
import { BookOpen } from "lucide-react";

interface SeriesNavigatorProps {
  seriesId: string;
  currentSlug: string;
}

export default function SeriesNavigator({
  seriesId,
  currentSlug,
}: SeriesNavigatorProps) {
  const series = GUIDE_SERIES[seriesId];
  if (!series) return null;

  // Filter and sort guides belonging to the series
  const partsInSeries = getAllGuides()
    .filter((g) => g.frontmatter.series === seriesId)
    .sort((a, b) => (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0));

  if (partsInSeries.length <= 1) return null;

  return (
    <div className="mb-8 p-5 rounded-2xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4.5 w-4.5 text-accent" />
        <h4 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">
          {series.title}
        </h4>
      </div>
      <p className="text-xs text-text-secondary mb-4 font-medium">
        {series.description}
      </p>
      
      <div className="space-y-1.5 border-l border-border/80 pl-3 ml-2">
        {partsInSeries.map((part, index) => {
          const isCurrent = part.slug === currentSlug;
          return (
            <div key={part.slug} className="relative flex items-center">
              {/* Active Indicator dot */}
              {isCurrent && (
                <span className="absolute -left-[16.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
              )}
              <Link
                href={`/guides/${part.slug}`}
                className={`text-xs font-semibold hover:text-accent transition-colors block py-0.5 ${
                  isCurrent
                    ? "text-accent font-extrabold"
                    : "text-text-secondary"
                }`}
              >
                Part {index + 1}: {part.frontmatter.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
