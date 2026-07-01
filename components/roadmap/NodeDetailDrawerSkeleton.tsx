import { Skeleton } from "@/components/ui/Skeleton";

export function NodeDetailDrawerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-4.5 w-16 rounded-full" />
          <Skeleton className="h-4.5 w-24 rounded-full" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4.5 w-full" />
        <Skeleton className="h-4.5 w-5/6" />
      </div>
      <div className="space-y-3 pt-2">
        <Skeleton className="h-4 w-28" />
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
