import { Skeleton } from "@/components/ui/Skeleton";

export function GuideCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card/45 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-border">
        <Skeleton className="h-4.5 w-12 rounded-full" />
        <Skeleton className="h-4.5 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function GuideGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <GuideCardSkeleton key={i} />
      ))}
    </div>
  );
}
