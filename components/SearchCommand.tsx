"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Map, FileText, ShieldCheck } from "lucide-react";

interface SearchItem {
  type: "roadmap" | "guide" | "best-practice";
  title: string;
  description: string;
  href: string;
}

// Static search index — add all roadmaps, guides, best practices here
const searchIndex: SearchItem[] = [
  // Roadmaps
  { type: "roadmap", title: "Frontend", description: "Step by step guide to becoming a modern frontend developer", href: "/frontend" },
  { type: "roadmap", title: "Backend", description: "Step by step guide to becoming a modern backend developer", href: "/backend" },
  { type: "roadmap", title: "Full Stack", description: "Step by step guide to becoming a modern full stack developer", href: "/full-stack" },
  { type: "roadmap", title: "DevOps", description: "Step by step guide to becoming a DevOps engineer", href: "/devops" },
  { type: "roadmap", title: "AI Engineer", description: "Step by step guide to becoming an AI engineer", href: "/ai-engineer" },
  { type: "roadmap", title: "Android", description: "Step by step guide to becoming an Android developer", href: "/android" },
  { type: "roadmap", title: "iOS", description: "Step by step guide to becoming an iOS developer", href: "/ios" },
  { type: "roadmap", title: "Cyber Security", description: "Step by step guide to becoming a cyber security engineer", href: "/cyber-security" },
  { type: "roadmap", title: "QA", description: "Step by step guide to becoming a QA engineer", href: "/qa" },
  { type: "roadmap", title: "MLOps", description: "Step by step guide to becoming an MLOps engineer", href: "/mlops" },
  { type: "roadmap", title: "Data Analyst", description: "Step by step guide to becoming a data analyst", href: "/data-analyst" },
  { type: "roadmap", title: "Network Engineer", description: "Step by step guide to becoming a network engineer", href: "/network-engineer" },
  { type: "roadmap", title: "JavaScript", description: "Step by step guide to learning JavaScript", href: "/javascript" },
  { type: "roadmap", title: "TypeScript", description: "Step by step guide to learning TypeScript", href: "/typescript" },
  { type: "roadmap", title: "React", description: "Step by step guide to learning React", href: "/react" },
  { type: "roadmap", title: "Node.js", description: "Step by step guide to learning Node.js", href: "/nodejs" },
  { type: "roadmap", title: "Python", description: "Step by step guide to learning Python", href: "/python" },
  { type: "roadmap", title: "SQL", description: "Step by step guide to learning SQL", href: "/sql" },
  { type: "roadmap", title: "Docker", description: "Step by step guide to learning Docker", href: "/docker" },
  { type: "roadmap", title: "Kubernetes", description: "Step by step guide to learning Kubernetes", href: "/kubernetes" },
  { type: "roadmap", title: "Git and GitHub", description: "Step by step guide to learning Git and GitHub", href: "/git-github" },
  { type: "roadmap", title: "Linux", description: "Step by step guide to learning Linux", href: "/linux" },
  { type: "roadmap", title: "AWS", description: "Step by step guide to learning AWS", href: "/aws" },
  { type: "roadmap", title: "System Design", description: "Step by step guide to learning system design", href: "/system-design" },
  { type: "roadmap", title: "Computer Science", description: "Step by step guide to learning computer science fundamentals", href: "/computer-science" },
  { type: "roadmap", title: "Next.js", description: "Step by step guide to learning Next.js", href: "/nextjs" },
  { type: "roadmap", title: "Vue", description: "Step by step guide to learning Vue.js", href: "/vue" },
  { type: "roadmap", title: "Rust", description: "Step by step guide to learning Rust", href: "/rust" },
  { type: "roadmap", title: "Go", description: "Step by step guide to learning Go", href: "/golang" },
  { type: "roadmap", title: "Java", description: "Step by step guide to learning Java", href: "/java" },
  { type: "roadmap", title: "C++", description: "Step by step guide to learning C++", href: "/cpp" },
  // Guides
  { type: "guide", title: "Understanding Closures in JavaScript", description: "What closures actually are, why they matter, and the classic loop pitfall every developer hits once.", href: "/guides/understanding-closures-in-javascript" },
  { type: "guide", title: "CSS Flexbox vs Grid", description: "The one-sentence rule that tells you which layout system to reach for.", href: "/guides/css-flexbox-vs-grid" },
  { type: "guide", title: "REST vs GraphQL", description: "Over-fetching, caching, type safety, and how to decide between the two.", href: "/guides/rest-vs-graphql" },
  { type: "guide", title: "Docker for Beginners", description: "Images, containers, Dockerfiles, and Compose — the mental model that makes Docker click.", href: "/guides/docker-for-beginners" },
  { type: "guide", title: "Git Branching Strategies", description: "Git Flow, GitHub Flow, and Trunk-Based Development compared.", href: "/guides/git-branching-strategies" },
  { type: "guide", title: "Understanding Big-O Notation", description: "What Big-O actually measures, with real code examples for every complexity class.", href: "/guides/understanding-big-o-notation" },
  { type: "guide", title: "What is CORS", description: "The Same-Origin Policy, preflight requests, and how to fix CORS errors.", href: "/guides/what-is-cors" },
  { type: "guide", title: "TypeScript Generics", description: "Why generics exist, how to write your first generic function.", href: "/guides/typescript-generics" },
  // Best Practices
  { type: "best-practice", title: "Writing Clean, Maintainable Code", description: "Principles and conventions that keep your codebase readable.", href: "/best-practices/code-quality" },
  { type: "best-practice", title: "Version Control Best Practices", description: "Commit conventions, branching models, and PR etiquette.", href: "/best-practices/git-version-control" },
  { type: "best-practice", title: "Security Fundamentals for Developers", description: "The baseline security habits every developer should build.", href: "/best-practices/security" },
  { type: "best-practice", title: "Web Performance Best Practices", description: "Techniques to make your app fast and green in Core Web Vitals.", href: "/best-practices/performance" },
  { type: "best-practice", title: "Testing Strategies That Actually Work", description: "How to think about test coverage without wasting time.", href: "/best-practices/testing" },
  { type: "best-practice", title: "Designing APIs Developers Love", description: "RESTful conventions, versioning, and error handling patterns.", href: "/best-practices/api-design" },
  { type: "best-practice", title: "Writing Docs That Get Read", description: "README structure, inline comments, and JSDoc patterns.", href: "/best-practices/documentation" },
  { type: "best-practice", title: "Building Accessible Web Apps", description: "Semantic HTML, ARIA, keyboard navigation, and contrast fundamentals.", href: "/best-practices/accessibility" },
  { type: "best-practice", title: "CI/CD Pipeline Best Practices", description: "Automate your way from commit to production without breaking things.", href: "/best-practices/ci-cd" },
  { type: "best-practice", title: "DevOps Fundamentals for Developers", description: "The 12-factor app, env configs, and container hygiene every dev should know.", href: "/best-practices/devops" },
];

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  const typeLabel: Record<string, string> = {
    roadmap: "Roadmap",
    guide: "Guide",
    "best-practice": "Best Practice",
  };

  const TypeIcon = ({ type }: { type: string }) => {
    if (type === "roadmap") return <Map className="h-4 w-4 shrink-0 text-[#737373]" />;
    if (type === "guide") return <FileText className="h-4 w-4 shrink-0 text-[#737373]" />;
    return <ShieldCheck className="h-4 w-4 shrink-0 text-[#737373]" />;
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#1e1e1e] px-3 py-1.5 text-sm text-[#737373] hover:border-amber-500 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline text-xs border border-[#2a2a2a] rounded px-1.5 py-0.5 font-mono">
          Ctrl K
        </kbd>
      </button>

      {/* Overlay + palette */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg mx-4 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-4 py-3">
              <Search className="h-4 w-4 text-[#737373] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roadmaps, guides, best practices..."
                className="flex-1 bg-transparent text-white placeholder-[#737373] outline-none text-sm"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="text-[#737373] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-[#737373]">
                  No results for "{query}"
                </p>
              )}
              {results.map((item) => (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-[#2a2a2a] transition-colors group"
                >
                  <TypeIcon type={item.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white font-medium truncate">{item.title}</p>
                      <span className="text-xs text-[#737373] border border-[#2a2a2a] rounded-full px-1.5 py-0.5 shrink-0">
                        {typeLabel[item.type]}
                      </span>
                    </div>
                    <p className="text-xs text-[#737373] truncate mt-0.5">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="border-t border-[#2a2a2a] px-4 py-2 flex gap-4 text-xs text-[#737373]">
              <span>↵ to navigate</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
