import Link from "next/link";
import { GuideMeta } from "@/lib/guides-data";
import { Clock, Calendar, BookOpen } from "lucide-react";

export default function GuideCard({ guide }: { guide: GuideMeta }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group relative rounded-xl border border-border bg-card hover:bg-surface/50 hover:border-accent/40 transition-all duration-300 p-5 flex flex-col justify-between shadow-xs hover:shadow-md"
    >
      <div>
        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-text-secondary border border-border bg-background rounded-full px-2.5 py-0.5 uppercase tracking-wide transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-text-primary font-bold group-hover:text-accent transition-colors duration-200 text-base line-clamp-1">
          {guide.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed font-medium">
          {guide.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/40 text-[11px] text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {guide.readingTime}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {guide.publishedAt}
          </span>
        </div>
        <span className="text-accent group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5 font-bold">
          Read Guide <BookOpen className="h-3.5 w-3.5 ml-0.5" />
        </span>
      </div>
    </Link>
  );
}

