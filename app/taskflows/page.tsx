"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskflowCard from "@/components/TaskflowCard";
import { taskflows, TaskflowType } from "@/lib/taskflows-data";

type FilterTab = "all" | TaskflowType;

export default function TaskflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredTaskflows = useMemo(() => {
    return taskflows.filter((tf) => {
      const matchesSearch = tf.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || tf.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <header className="pb-6">
          <h1 className="text-3xl font-bold text-white">
            Developer Taskflows
          </h1>
          <p className="text-muted mt-2">
            Community created taskflows to help you choose your path
          </p>
        </header>

        {/* Search Bar */}
        <div className="mt-6 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search taskflows..."
            className="w-full bg-[#1e1e1e] border border-border rounded-lg px-4 py-2.5 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors text-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {/* All tab */}
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
              activeTab === "all"
                ? "bg-amber-500 text-black"
                : "bg-[#1e1e1e] text-[#737373] border border-border hover:text-white hover:border-[#737373]"
            }`}
          >
            All
          </button>
          {/* Role based tab */}
          <button
            onClick={() => setActiveTab("role")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
              activeTab === "role"
                ? "bg-amber-500 text-black"
                : "bg-[#1e1e1e] text-[#737373] border border-border hover:text-white hover:border-[#737373]"
            }`}
          >
            Role Based
          </button>
          {/* Skill based tab */}
          <button
            onClick={() => setActiveTab("skill")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
              activeTab === "skill"
                ? "bg-amber-500 text-black"
                : "bg-[#1e1e1e] text-[#737373] border border-border hover:text-white hover:border-[#737373]"
            }`}
          >
            Skill Based
          </button>
        </div>

        {/* Results Grid */}
        <div className="mt-8">
          {filteredTaskflows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTaskflows.map((tf) => (
                <TaskflowCard key={tf.slug} taskflow={tf} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted">No taskflows found for your search.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
