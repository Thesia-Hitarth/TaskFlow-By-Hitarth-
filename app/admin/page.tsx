import { getPlatformStats } from "@/lib/admin/stats";
import { StatCard } from "@/components/admin/StatCard";
import { PopularRoadmapsChart } from "@/components/admin/PopularRoadmapsChart";
import { HardestNodesTable } from "@/components/admin/HardestNodesTable";
import { RecentSignupsTable } from "@/components/admin/RecentSignupsTable";
import { guides } from "@/lib/guides-data";
import { BroadcastGuideCard } from "@/components/admin/BroadcastGuideCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console — TaskFlow",
  description: "Monitor and moderate platform activities.",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const stats = await getPlatformStats();

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered Users"
          value={stats.totalUsers}
          icon="👥"
          change={stats.newUsersThisWeek}
          changeLabel="this week"
        />
        <StatCard
          label="Nodes Completed Today"
          value={stats.nodesCompletedToday}
          icon="✅"
        />
        <StatCard
          label="Active Paths (7d)"
          value={stats.activePaths7d}
          icon="🗺"
        />
        <StatCard
          label="Guides Read (7d)"
          value={stats.guidesRead7d}
          icon="📖"
        />
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular paths */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
            Most Active Paths (Completions Last 7 Days)
          </h3>
          <PopularRoadmapsChart data={stats.popularRoadmaps} />
        </div>

        {/* Hardest nodes */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-1">
            Hardest Topics (Highest In Progress, Never Completed)
          </h3>
          <p className="text-xs text-text-secondary mb-4">
            These nodes have users currently in progress, indicating potential content friction.
          </p>
          <HardestNodesTable data={stats.hardestNodes} />
        </div>
      </div>

      {/* Recent signups */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
          Recently Joined Learners
        </h3>
        <RecentSignupsTable users={stats.recentUsers} />
      </div>

      {/* Email Queue Status */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
          Email Mailing Queue status
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Pending Sending"
            value={stats.emailQueue.pending}
            icon="⏳"
            small
          />
          <StatCard
            label="Sent (Last 24h)"
            value={stats.emailQueue.sent24h}
            icon="✉️"
            small
          />
          <StatCard
            label="Failed Transmissions"
            value={stats.emailQueue.failed}
            icon="❌"
            small
            highlight={stats.emailQueue.failed > 0}
          />
        </div>
      </div>

      {/* Broadcast Guide Alert */}
      <BroadcastGuideCard guides={guides} />
    </div>
  );
}
