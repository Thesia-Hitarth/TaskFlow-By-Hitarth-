"use client";

// MED-006: Dashboard loading skeleton to prevent blank flash on navigation.
// This matches the structure of the dashboard page so the layout doesn't shift.
export default function DashboardLoading() {
  return (
    <div className="flex-1 bg-background py-12 px-4 sm:px-8 max-w-4xl mx-auto w-full animate-pulse">
      {/* Heading */}
      <div className="h-9 bg-card rounded-xl w-48 mb-1" />
      <div className="h-4 bg-card rounded w-72 mb-8" />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-28 bg-card rounded-2xl border border-border"
          />
        ))}
      </div>

      {/* Activity heatmap placeholder */}
      <div className="h-48 bg-card rounded-2xl border border-border mb-8" />

      {/* Recent activity list */}
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-card rounded-xl border border-border" />
        ))}
      </div>
    </div>
  );
}
