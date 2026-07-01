"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { Search, X, Map, FileText, ShieldCheck } from "lucide-react";
import { searchIndex, SearchItem } from "@/lib/search-index";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [dynamicGuides, setDynamicGuides] = useState<SearchItem[]>([]);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      // Focus after a tiny timeout to ensure portal mounting finishes
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Client-side local index for taskflows and best practices (excluding static guides)
  const localIndex = useMemo(() => {
    return searchIndex.filter((item) => item.type !== "guide");
  }, []);

  const fuse = useMemo(
    () => new Fuse(localIndex, { keys: ["title", "description"], threshold: 0.35 }),
    [localIndex]
  );

  // Fetch full-text matched guides in the background
  useEffect(() => {
    if (!query.trim()) {
      setDynamicGuides([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          const mapped: SearchItem[] = data.map((g: { slug: string; title: string; description: string }) => ({
            type: "guide",
            title: g.title,
            description: g.description,
            href: `/guides/${g.slug}`,
          }));
          setDynamicGuides(mapped);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Search fetch failed:", err);
        }
      }
    }, 150); // small debounce to avoid flooding API

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Combine instant local results and dynamic background search results
  const results = useMemo(() => {
    const localMatches = query
      ? fuse.search(query).map((r) => r.item)
      : localIndex;

    const guideMatches = query
      ? dynamicGuides
      : searchIndex.filter((item) => item.type === "guide");

    return [...localMatches, ...guideMatches].slice(0, 8);
  }, [query, localIndex, fuse, dynamicGuides]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMounted(true);

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab" && open && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-40 sm:w-56 md:w-72 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-sm text-text-secondary hover:border-accent/50 hover:text-text-primary transition-all duration-200 cursor-pointer text-left"
        aria-label="Open search command palette"
      >
        <Search className="h-4 w-4 text-text-secondary shrink-0" />
        <span className="truncate">Search...</span>
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/40 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              setOpen(false);
            }
          }}
          role="button"
          tabIndex={-1}
          aria-label="Close search overlay"
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="presentation"
          >
            {/* Input Header */}
            <div className="flex items-center gap-2 border-b border-border/80 px-4 py-3.5">
              <Search className="h-4 w-4 text-accent" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search taskflows, guides, and best practices..."
                className="flex-1 bg-transparent text-text-primary placeholder-text-secondary outline-none text-sm border-none focus:ring-0"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-card rounded-md transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-0.5 animate-in fade-in duration-300">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-text-secondary">No results found.</p>
              )}
              {results.map((item) => {
                const Icon = item.type === "taskflow" ? Map : item.type === "guide" ? FileText : ShieldCheck;
                return (
                  <button
                    key={item.href}
                    onClick={() => go(item.href)}
                    className="flex w-full items-start gap-3.5 rounded-xl px-3 py-2.5 text-left hover:bg-card border border-transparent hover:border-border/50 transition-all duration-150 cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-background border border-border text-text-secondary shrink-0">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">{item.title}</p>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Command Palette Footer */}
            <div className="flex items-center justify-between border-t border-border/50 px-4 py-2 bg-background/50 text-[10px] text-text-secondary">
              <span>Dynamic search enabled</span>
              <span className="flex items-center gap-1.5">
                <kbd className="border border-border rounded px-1 py-0.5">ESC</kbd> to close
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
