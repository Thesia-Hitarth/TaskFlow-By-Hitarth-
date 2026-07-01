import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-slate-200 dark:bg-zinc-800 animate-pulse rounded-lg",
        className
      )}
      {...props}
    />
  );
}
