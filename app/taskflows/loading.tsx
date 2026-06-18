// BUG-018: Taskflows listing page loading skeleton
export default function Loading() {
  return (
    <main className="flex-1 bg-background py-12 px-4 sm:px-8 max-w-7xl mx-auto transition-colors duration-200">
      {/* Page heading */}
      <div className="h-10 w-56 rounded-xl bg-border animate-pulse mb-4" />
      <div className="h-5 w-96 rounded-lg bg-border animate-pulse mb-10" />

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-border animate-pulse" />
        ))}
      </div>
    </main>
  );
}
