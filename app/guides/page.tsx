"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides-data";

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = useMemo(() => {
    return guides.filter((g) => {
      const query = searchQuery.toLowerCase();
      return (
        g.title.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        g.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-200">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <header className="pb-6 border-b border-border mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Guides</h1>
          <p className="text-text-secondary mt-2 font-medium">In-depth articles to deepen your understanding</p>
        </header>

        {/* Search Bar */}
        <div className="mt-6 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder-text-secondary focus:outline-hidden focus:border-accent transition-colors text-sm font-medium"
          />
        </div>

        {/* Results Grid */}
        <div className="mt-8">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
              <p className="text-text-secondary font-medium">No guides found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

