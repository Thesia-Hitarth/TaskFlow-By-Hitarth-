"use client";

import { useRouter } from "next/navigation";
import { PullToRefresh } from "./PullToRefresh";

export function ActivityPullToRefresh({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleRefresh = async () => {
    router.refresh();
    // A small artificial delay to show loader feedback
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {children}
    </PullToRefresh>
  );
}
