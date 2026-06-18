// BUG-018: Guides listing page loading skeleton
export default function Loading() {
  return (
    <main className="flex-1 bg-background py-12 px-4 sm:px-8 max-w-7xl mx-auto transition-colors duration-200">
      <div className="h-10 w-48 rounded-xl bg-border animate-pulse mb-4" />
      <div className="h-5 w-80 rounded-lg bg-border animate-pulse mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 rounded-2xl bg-border animate-pulse" />
        ))}
      </div>
    </main>
  );
}
