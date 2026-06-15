export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <div className="h-4 w-40 bg-card border border-border rounded animate-pulse" />
      <div className="h-10 w-72 bg-card border border-border rounded mt-4 animate-pulse" />
      <div className="h-4 w-96 bg-card border border-border rounded mt-2 animate-pulse" />
      <div className="h-[60vh] w-full bg-surface/30 border border-border/50 rounded-xl mt-8 animate-pulse" />
    </div>
  );
}
