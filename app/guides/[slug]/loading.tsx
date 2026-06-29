export default function Loading() {
  return (
    <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full bg-background transition-colors duration-200">
      {/* Back link */}
      <div className="h-4 w-24 rounded bg-border animate-pulse" />

      {/* Tags */}
      <div className="flex gap-2 mt-6">
        <div className="h-5 w-16 rounded-full bg-border animate-pulse" />
        <div className="h-5 w-20 rounded-full bg-border animate-pulse" />
      </div>

      {/* Title */}
      <div className="h-10 w-3/4 rounded-xl bg-border animate-pulse mt-4" />
      <div className="h-6 w-1/2 rounded-lg bg-border animate-pulse mt-2" />

      {/* Meta */}
      <div className="flex gap-4 mt-4 pb-8 border-b border-border/50">
        <div className="h-4 w-24 rounded bg-border animate-pulse" />
        <div className="h-4 w-24 rounded bg-border animate-pulse" />
      </div>

      {/* Article body */}
      <div className="mt-8 flex flex-col gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded bg-border animate-pulse ${i % 5 === 4 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </main>
  );
}
