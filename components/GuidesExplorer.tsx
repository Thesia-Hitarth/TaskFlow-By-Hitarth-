"use client";

import { useState, useMemo, useEffect, startTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import GuideCard from "@/components/GuideCard";
import { GuideFrontmatter } from "@/lib/guides/types";
import { Search, Clock, SlidersHorizontal } from "lucide-react";

type GuideCardData = GuideFrontmatter & { slug: string };
type SortOption = "newest" | "shortest";

interface GuidesExplorerProps {
  guides: GuideCardData[];
}

export default function GuidesExplorer({ guides }: GuidesExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state synchronization parameters
  const urlTag = searchParams.get("tag") ?? "all";
  const urlDifficulty = searchParams.get("difficulty") ?? "all";
  const urlSort = searchParams.get("sort") ?? "newest";
  const urlQuery = searchParams.get("q") ?? "";

  // Local state
  const [activeTag, setActiveTag] = useState(urlTag);
  const [activeDifficulty, setActiveDifficulty] = useState(urlDifficulty);
  const [sortBy, setSortBy] = useState<SortOption>(urlSort as SortOption);
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  // Sync state if URL changes externally
  useEffect(() => {
    setActiveTag(urlTag);
    setActiveDifficulty(urlDifficulty);
    setSortBy(urlSort as SortOption);
    setSearchQuery(urlQuery);
  }, [urlTag, urlDifficulty, urlSort, urlQuery]);

  // Derive unique tags dynamically
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    guides.forEach((g) => g.tags.forEach((t) => tagSet.add(t.toLowerCase())));
    return Array.from(tagSet).sort();
  }, [guides]);

  // Update URL Search Parameters
  const updateUrl = (params: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  // Filtered and Sorted guides
  const filteredAndSorted = useMemo(() => {
    let result = guides;

    // Filter by tag
    if (activeTag !== "all") {
      result = result.filter((g) =>
        g.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
      );
    }

    // Filter by difficulty
    if (activeDifficulty !== "all") {
      result = result.filter((g) => g.difficulty === activeDifficulty);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "shortest") {
        return a.readTime - b.readTime;
      }
      // default: newest (by publishedAt string)
      return b.publishedAt.localeCompare(a.publishedAt);
    });

    return result;
  }, [guides, activeTag, activeDifficulty, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and Sort Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-4 border-b border-border/40">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateUrl({ q: e.target.value });
            }}
            placeholder="Search guides by title, description or tag..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-text-primary placeholder-text-secondary focus:outline-hidden focus:border-accent transition-colors text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-xs text-text-secondary flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5" /> Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => {
              const val = e.target.value as SortOption;
              setSortBy(val);
              updateUrl({ sort: val });
            }}
            className="bg-card border border-border rounded-xl px-3 py-2 text-text-primary focus:outline-hidden focus:border-accent text-sm font-semibold cursor-pointer"
          >
            <option value="newest">Newest Guides</option>
            <option value="shortest">Shortest Read</option>
          </select>
        </div>
      </div>

      {/* Filter Options */}
      <div className="space-y-4">
        {/* Tags filter pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-text-secondary/60 uppercase tracking-widest block">
            Filter by Technology
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTag("all");
                updateUrl({ tag: "all" });
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer ${
                activeTag === "all"
                  ? "bg-accent/10 border border-accent/40 text-accent font-bold"
                  : "bg-card border border-border text-text-secondary hover:bg-card/85"
              }`}
            >
              All Tech
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  updateUrl({ tag });
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer ${
                  activeTag === tag
                    ? "bg-accent/10 border border-accent/40 text-accent font-bold"
                    : "bg-card border border-border text-text-secondary hover:bg-card/85"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-text-secondary/60 uppercase tracking-widest block">
            Difficulty
          </span>
          <div className="flex flex-wrap gap-2">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setActiveDifficulty(d);
                  updateUrl({ difficulty: d });
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer ${
                  activeDifficulty === d
                    ? "bg-accent/10 border border-accent/40 text-accent font-bold"
                    : "bg-card border border-border text-text-secondary hover:bg-card/85"
                }`}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid view of guide cards */}
      <div className="pt-4">
        {filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSorted.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-text-secondary/40 mb-3" />
            <p className="text-text-primary font-bold text-base">No guides match these filters.</p>
            <p className="text-text-secondary/80 text-xs mt-1 max-w-xs mx-auto">
              Try adjusting your query or filter pills to discover related content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
