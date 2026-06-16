import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — TaskFlow",
  description: "See what's new and what's been updated in TaskFlow.",
};

const changelogEntries = [
  {
    date: "25 May, 2026",
    version: "v1.4",
    title: "Network Engineer Taskflow + Python Guides",
    changes: [
      "Added Network Engineer roadmap with full milestone structure",
      "Added Python learning path guide",
      "Bug fixes on mobile roadmap view",
    ],
  },
  {
    date: "26 Mar, 2026",
    version: "v1.3",
    title: "AI Engineer Taskflow Review",
    changes: [
      "Full review and update of the AI Engineer roadmap",
      "Added LLM and prompt engineering nodes",
      "Updated resource links across AI-related roadmaps",
    ],
  },
  {
    date: "27 Feb, 2026",
    version: "v1.2",
    title: "AI Content in Guides",
    changes: [
      "Added AI-focused articles to the Guides section",
      "Introduced tagging system for guide categories",
      "Performance improvements on the guides listing page",
    ],
  },
  {
    date: "31 Jan, 2026",
    version: "v1.1",
    title: "Community Reviews",
    changes: [
      "Incorporated community feedback across 8 roadmaps",
      "Fixed broken resource links",
      "Improved mobile navigation",
    ],
  },
  {
    date: "01 Jan, 2026",
    version: "v1.0",
    title: "Initial Launch",
    changes: [
      "Launched TaskFlow with 13 role-based roadmaps",
      "Launched with 19 skill-based roadmaps",
      "Guides system with 8 in-depth articles",
      "Search command palette (Ctrl+K)",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
          Changelog
        </h1>
        <p className="text-text-secondary mt-2 font-medium">
          A record of everything that's been added, updated, or improved in TaskFlow.
        </p>

        <div className="mt-10 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-8">
            {changelogEntries.map((entry, i) => (
              <div key={i} className="pl-8 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-text-secondary font-bold">
                    {entry.date}
                  </span>
                  <span className="text-[10px] font-bold border border-accent/30 text-accent rounded-full px-2 py-0.5 bg-accent/5">
                    {entry.version}
                  </span>
                </div>

                <h3 className="text-text-primary font-bold text-base">{entry.title}</h3>

                <ul className="mt-2 space-y-1">
                  {entry.changes.map((change, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary font-medium">
                      <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
