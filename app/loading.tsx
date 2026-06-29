export default function Loading() {
  return (
    <main className="flex-1 bg-background transition-colors duration-200">
      {/* Hero skeleton */}
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
        <div className="h-16 w-3/4 max-w-lg rounded-xl bg-border animate-pulse" />
        <div className="h-5 w-2/3 max-w-md rounded-lg bg-border animate-pulse" />
        <div className="h-5 w-1/2 max-w-sm rounded-lg bg-border animate-pulse" />
        <div className="flex gap-2 mt-4 w-full max-w-md">
          <div className="flex-1 h-10 rounded-md bg-border animate-pulse" />
          <div className="w-40 h-10 rounded-xl bg-border animate-pulse" />
        </div>
      </section>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="h-8 w-48 rounded-lg bg-border animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-border animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
