import { cn } from "@/lib/utils";

interface ProgressRingProps {
  percent: number; // 0–100
  size?: number; // outer diameter in px (default 64)
  strokeWidth?: number; // ring thickness (default 6)
  className?: string;
  showLabel?: boolean; // show % in center (default true)
  color?: string; // Tailwind color class for the filled arc
}

export function ProgressRing({
  percent,
  size = 64,
  strokeWidth = 6,
  className,
  showLabel = true,
  color = "stroke-amber-500",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90" // start fill at 12 o'clock
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border dark:text-[#2a2a2a]"
        />
        {/* Filled arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(color, "transition-all duration-700 ease-out")}
        />
      </svg>

      {showLabel && (
        <span className="absolute text-xs font-bold text-text-primary">
          {percent}%
        </span>
      )}
    </div>
  );
}
