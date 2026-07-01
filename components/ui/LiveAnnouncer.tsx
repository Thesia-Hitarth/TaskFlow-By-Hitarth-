"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const LiveAnnouncerContext = createContext<(message: string) => void>(() => {});

export function LiveAnnouncerProvider({ children }: { children: React.ReactNode }) {
  const [announcement, setAnnouncement] = useState("");

  const announce = useCallback((message: string) => {
    setAnnouncement(""); // Reset to trigger change announcement
    setTimeout(() => {
      setAnnouncement(message);
    }, 50);
  }, []);

  return (
    <LiveAnnouncerContext.Provider value={announce}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </LiveAnnouncerContext.Provider>
  );
}

export const useAnnounce = () => useContext(LiveAnnouncerContext);
