"use client";

import Link from "next/link";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import AuthButtons from "./AuthButtons";
import SearchCommand from "./SearchCommand";
import { useTheme } from "@/app/providers";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full h-[56px] bg-surface/85 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-8 transition-colors duration-200">
      {/* Left: Logo & Search */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-text-primary font-bold text-lg hover:opacity-95 transition-opacity">
          taskflow.sh
        </Link>
        <SearchCommand />
      </div>

      {/* Center: Nav links (Desktop only) */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/taskflows" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
          Taskflows
        </Link>
        <Link href="/guides" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
          Guides
        </Link>
        <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
          Best Practices
        </Link>
      </nav>

      {/* Right: Theme toggle, Auth buttons & Menu icon */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-text-secondary hover:text-text-primary cursor-pointer w-9 h-9 rounded-lg"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-[18px] w-[18px] transition-transform duration-200 hover:-rotate-12" />
          ) : (
            <Sun className="h-[18px] w-[18px] transition-transform duration-200 hover:rotate-45" />
          )}
        </Button>

        <div className="hidden sm:flex items-center gap-2">
          <AuthButtons />
        </div>
        <div className="sm:hidden">
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-text-primary cursor-pointer">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

