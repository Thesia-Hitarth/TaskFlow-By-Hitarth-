import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — TaskFlow",
  description: "See what's new and what's been updated in TaskFlow.",
};

import { changelogEntries } from "@/lib/changelog-data";

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
          Changelog
        </h1>
        <p className="text-text-secondary mt-2 font-medium">
          A record of everything that&apos;s been added, updated, or improved in TaskFlow.
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
