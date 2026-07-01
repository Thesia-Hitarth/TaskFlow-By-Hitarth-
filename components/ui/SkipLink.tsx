"use client";

import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        fixed top-4 left-4 z-[9999] px-4 py-2 rounded-xl
        bg-accent text-black text-sm font-bold
        transform -translate-y-24 focus:translate-y-0
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  );
}
