export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full animate-pulse">
      <div className="h-4 w-40 bg-border rounded" />
      <div className="h-10 w-72 bg-border rounded mt-4" />
      <div className="h-4 w-96 bg-border rounded mt-2" />
      <div className="h-[60vh] w-full bg-surface/30 border border-border rounded-xl mt-8" />
    </div>
  );
}
