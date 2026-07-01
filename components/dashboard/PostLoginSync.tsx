"use client";

import { useEffect } from "react";
import { syncAnonymousProgress } from "@/lib/progress/anonymousProgress";

export function PostLoginSync() {
  useEffect(() => {
    syncAnonymousProgress().catch(console.error);
  }, []);

  return null;
}
