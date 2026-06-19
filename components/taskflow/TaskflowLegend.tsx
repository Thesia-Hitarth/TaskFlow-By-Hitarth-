"use client";

export default function TaskflowLegend() {
  const items = [
    { label: "Pending", className: "border-border bg-card/50" },
    { label: "Done", className: "border-green-500 bg-green-500/10" },
    { label: "In Progress", className: "border-yellow-500 bg-yellow-500/10" },
    { label: "Skipped", className: "border-red-500/40 bg-red-500/5" },
  ];
  return (
    <div className="flex flex-wrap gap-4 mb-4 text-xs sm:text-sm text-text-secondary font-semibold">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded border ${item.className}`} aria-hidden="true" role="presentation" />
          {item.label}
        </div>
      ))}
      <span className="text-text-secondary/60 font-medium">— click any node to view details</span>
    </div>
  );
}

