"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextThemes } from "next-themes";
import { LiveAnnouncerProvider } from "@/components/ui/LiveAnnouncer";
import ProgressSync from "../components/ProgressSync";
import { loader } from "@monaco-editor/react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useNextThemes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Warm up/preload Monaco Editor assets in the background for fast editor initialization
    if (typeof window !== "undefined") {
      loader.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.48.0/min/vs",
        },
      });
      loader.init().catch((err) => {
        console.warn("Monaco Editor background preloading skipped or failed:", err);
      });
    }
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Safe fallback to "dark" during hydration/SSR
  const activeTheme = mounted ? (resolvedTheme as Theme) || "dark" : "dark";

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeProvider>
          <LiveAnnouncerProvider>
            <ProgressSync />
            {children}
          </LiveAnnouncerProvider>
        </ThemeProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}

