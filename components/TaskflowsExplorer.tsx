"use client";

import { useState, useMemo } from "react";
import TaskflowCard from "@/components/TaskflowCard";
import { taskflows, TaskflowType } from "@/lib/taskflows-data";

type FilterTab = "all" | TaskflowType;

export default function TaskflowsExplorer() {
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
    <div className="w-full">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        {/* Search Bar */}
        <div className="w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search taskflows..."
            className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder-text-secondary focus:outline-hidden focus:border-accent transition-colors text-sm font-medium"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {/* All tab */}
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors rounded-full cursor-pointer ${
              activeTab === "all"
                ? "bg-accent text-white dark:text-black shadow-xs"
                : "bg-card text-text-secondary border border-border hover:text-text-primary hover:border-accent/50"
            }`}
          >
            All
          </button>
          {/* Role based tab */}
          <button
            onClick={() => setActiveTab("role")}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors rounded-full cursor-pointer ${
              activeTab === "role"
                ? "bg-accent text-white dark:text-black shadow-xs"
                : "bg-card text-text-secondary border border-border hover:text-text-primary hover:border-accent/50"
            }`}
          >
            Role Based
          </button>
          {/* Skill based tab */}
          <button
            onClick={() => setActiveTab("skill")}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors rounded-full cursor-pointer ${
              activeTab === "skill"
                ? "bg-accent text-white dark:text-black shadow-xs"
                : "bg-card text-text-secondary border border-border hover:text-text-primary hover:border-accent/50"
            }`}
          >
            Skill Based
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="mt-8">
        {filteredTaskflows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTaskflows.map((tf) => (
              <TaskflowCard key={tf.slug} taskflow={tf} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
            <p className="text-text-secondary font-medium">No taskflows found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
