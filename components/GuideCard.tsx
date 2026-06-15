import Link from "next/link";
import { GuideMeta } from "@/lib/guides-data";
import { Clock, Calendar, BookOpen } from "lucide-react";

export default function GuideCard({ guide }: { guide: GuideMeta }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group relative rounded-xl border border-border bg-surface hover:bg-card hover:border-amber-500/30 transition-all duration-300 p-5 flex flex-col justify-between shadow-md hover:shadow-lg hover:shadow-black/20"
    >
      <div>
        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-text-secondary border border-border bg-background rounded-full px-2 py-0.5 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-white font-bold group-hover:text-amber-500 transition-colors duration-200 text-base line-clamp-1">
          {guide.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
          {guide.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/40 text-[11px] text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="h-3 w-3 text-amber-500" />
            {guide.readingTime}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="h-3 w-3" />
            {guide.publishedAt}
          </span>
        </div>
        <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5 font-semibold">
          Read Guide <BookOpen className="h-3 w-3 ml-0.5" />
        </span>
      </div>
    </Link>
  );
}
