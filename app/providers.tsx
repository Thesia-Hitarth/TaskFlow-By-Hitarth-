"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextThemes } from "next-themes";
import { LiveAnnouncerProvider } from "@/components/ui/LiveAnnouncer";
import ProgressSync from "../components/ProgressSync";

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

