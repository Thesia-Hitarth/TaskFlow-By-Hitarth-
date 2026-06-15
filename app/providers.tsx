"use client";
import { SessionProvider } from "next-auth/react";
import ProgressSync from "../components/ProgressSync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProgressSync />
      {children}
    </SessionProvider>
  );
}
