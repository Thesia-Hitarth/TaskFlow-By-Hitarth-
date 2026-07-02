"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  username?: string | null;
  className?: string;
  size?: number; // width/height in px
}

export function UserAvatar({ src, name, username, className, size = 32 }: UserAvatarProps) {
  const [error, setError] = useState(false);

  // Reset error state if src changes (e.g. user signs in/out or updates profile)
  useEffect(() => {
    setError(false);
  }, [src]);

  // Fallback letter if name or username is available
  const fallbackText = (name || username || "").trim().slice(0, 1).toUpperCase();

  // If there's an image URL and no loading error occurred yet, render the image
  if (src && !error) {
    return (
      <Image
        src={src}
        alt={name || "User Avatar"}
        width={size}
        height={size}
        onError={() => setError(true)}
        unoptimized={true}
        className={cn("rounded-full border border-border object-cover shrink-0 select-none", className)}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }

  // Fallback 1: Letter-based placeholder
  if (fallbackText) {
    const fontSize = size > 48 ? "text-lg" : size > 32 ? "text-sm" : size >= 28 ? "text-xs" : "text-[8px]";
    return (
      <div
        className={cn(
          "rounded-full bg-border flex items-center justify-center text-text-secondary font-bold shrink-0 select-none border border-border",
          fontSize,
          className
        )}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {fallbackText}
      </div>
    );
  }

  // Fallback 2: Default icon-based placeholder (same as Navbar)
  const iconSize = size > 48 ? "h-6 w-6" : size > 32 ? "h-5 w-5" : "h-4 w-4";
  return (
    <div
      className={cn(
        "rounded-full bg-surface border border-border flex items-center justify-center shrink-0 select-none",
        className
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <User className={cn("text-text-secondary", iconSize)} />
    </div>
  );
}
