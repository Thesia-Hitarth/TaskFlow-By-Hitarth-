interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  change?: number;
  changeLabel?: string;
  small?: boolean;
  highlight?: boolean;
}

export function StatCard({
  label,
  value,
  icon,
  change,
  changeLabel,
  small,
  highlight,
}: StatCardProps) {
  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        highlight
          ? "border-rose-500/25 bg-rose-500/5 text-rose-500"
          : "border-border bg-card text-text-primary"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">
          {label}
        </span>
        <span className="text-xl" role="img" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className={`font-bold tracking-tight ${small ? "text-xl" : "text-3xl"}`}>
        {value.toLocaleString()}
      </div>
      {change !== undefined && changeLabel && (
        <p className="text-xs text-emerald-500 mt-2 font-medium">
          +{change} {changeLabel}
        </p>
      )}
    </div>
  );
}
