"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { bestPractices } from "@/lib/best-practices-data";

export default function BestPracticesExplorer() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPractices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return bestPractices;
    
    return bestPractices.filter((bp) => {
      return (
        bp.title.toLowerCase().includes(query) ||
        bp.description.toLowerCase().includes(query) ||
        bp.category.toLowerCase().includes(query) ||
        bp.topics.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  return (
    <>
      {/* Search Input */}
      <div className="mt-6 max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search best practices..."
          className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder-text-secondary focus:outline-hidden focus:border-accent transition-colors text-sm font-medium"
        />
      </div>

      {/* Grid List */}
      <div className="mt-8">
        {filteredPractices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPractices.map((bp) => (
              <Link
                key={bp.slug}
                href={`/best-practices/${bp.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/50 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl mb-3" role="img" aria-label="category icon">{bp.icon}</div>
                  <span className="text-xs text-accent font-bold uppercase tracking-wider">
                    {bp.category}
                  </span>
                  <h3 className="text-text-primary font-bold mt-1.5 text-base group-hover:text-accent transition-colors">
                    {bp.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-medium mt-2 line-clamp-3 leading-relaxed">
                    {bp.description}
                  </p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {bp.topics.map((t) => (
                    <li
                      key={t}
                      className="text-[10px] text-text-secondary border border-border bg-background/50 rounded-full px-2.5 py-0.5 font-bold uppercase tracking-wide"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
            <p className="text-text-secondary font-medium">No best practices found.</p>
          </div>
        )}
      </div>
    </>
  );
}
