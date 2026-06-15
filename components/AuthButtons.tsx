"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || status === "loading") {
    return <div className="h-9 w-20 rounded-md bg-surface animate-pulse" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors py-1.5 px-3 rounded-md hover:bg-surface"
        >
          <LayoutDashboard className="h-4 w-4 text-amber-500" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="h-8 w-8 rounded-full border border-border"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center">
            <User className="h-4 w-4 text-text-secondary" />
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/signin">
        <Button variant="ghost" className="text-sm hover:bg-surface text-text-secondary hover:text-text-primary">
          Sign In
        </Button>
      </Link>
      <Link href="/signin">
        <Button className="bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold shadow-md shadow-amber-500/10">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

