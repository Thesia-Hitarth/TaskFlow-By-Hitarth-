"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import AuthButtons from "./AuthButtons";
import SearchCommand from "./SearchCommand";
import { useTheme } from "@/app/providers";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isTaskflowActive =
    pathname.startsWith("/taskflows") ||
    pathname.startsWith("/projects") ||
    (pathname !== "/" &&
      !pathname.startsWith("/guides") &&
      !pathname.startsWith("/best-practices") &&
      !pathname.startsWith("/compare") &&
      !pathname.startsWith("/playground") &&
      !pathname.startsWith("/dashboard") &&
      !pathname.startsWith("/profile") &&
      !pathname.startsWith("/signin"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full h-[56px] flex items-center justify-between px-4 sm:px-8 transition-all duration-300 ${scrolled
      ? "bg-surface/85 backdrop-blur-md border-b border-border shadow-xs"
      : "bg-transparent border-b border-transparent"
      }`}>
      {/* Left: Logo & Search */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-text-primary font-bold text-lg hover:opacity-95 transition-opacity">
          TaskFlow
        </Link>
        <SearchCommand />
      </div>

      {/* Center: Nav links (Desktop only) */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/taskflows"
          className={`transition-all text-sm font-semibold pb-1 border-b-2 ${isTaskflowActive
            ? "text-text-primary border-accent"
            : "text-text-secondary hover:text-text-primary border-transparent"
            }`}
        >
          Taskflows
        </Link>
        <Link
          href="/guides"
          className={`transition-all text-sm font-semibold pb-1 border-b-2 ${pathname.startsWith("/guides")
            ? "text-text-primary border-accent"
            : "text-text-secondary hover:text-text-primary border-transparent"
            }`}
        >
          Guides
        </Link>
        <Link
          href="/best-practices"
          className={`transition-all text-sm font-semibold pb-1 border-b-2 ${pathname.startsWith("/best-practices")
            ? "text-text-primary border-accent"
            : "text-text-secondary hover:text-text-primary border-transparent"
            }`}
        >
          Best Practices
        </Link>
        <Link
          href="/compare"
          className={`transition-all text-sm font-semibold pb-1 border-b-2 ${pathname.startsWith("/compare")
            ? "text-text-primary border-accent"
            : "text-text-secondary hover:text-text-primary border-transparent"
            }`}
        >
          Compare
        </Link>
        <Link
          href="/playground"
          className={`transition-all text-sm font-semibold pb-1 border-b-2 ${pathname.startsWith("/playground")
            ? "text-text-primary border-accent"
            : "text-text-secondary hover:text-text-primary border-transparent"
            }`}
        >
          Playground
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
          {!mounted ? (
            <div className="h-[18px] w-[18px]" />
          ) : theme === "light" ? (
            <Moon className="h-[18px] w-[18px] transition-transform duration-200 hover:-rotate-12" />
          ) : (
            <Sun className="h-[18px] w-[18px] transition-transform duration-200 hover:rotate-45" />
          )}
        </Button>

        <div className="hidden md:flex items-center justify-end w-[200px]">
          <AuthButtons />
        </div>
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-text-secondary hover:text-text-primary cursor-pointer w-9 h-9 rounded-lg" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface border-border text-text-primary w-full max-w-[280px] p-6 flex flex-col gap-5 transition-colors duration-200">
              <SheetTitle className="text-text-primary font-bold text-lg border-b border-border pb-3">
                TaskFlow
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation links for mobile viewports
              </SheetDescription>
              <nav className="flex flex-col gap-4 mt-2">
                <Link
                  href="/taskflows"
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-bold py-1.5 transition-colors ${isTaskflowActive
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  Taskflows
                </Link>
                <Link
                  href="/guides"
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-bold py-1.5 transition-colors ${pathname.startsWith("/guides")
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  Guides
                </Link>
                <Link
                  href="/best-practices"
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-bold py-1.5 transition-colors ${pathname.startsWith("/best-practices")
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  Best Practices
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-bold py-1.5 transition-colors ${pathname.startsWith("/compare")
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  Compare
                </Link>
                <Link
                  href="/playground"
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-bold py-1.5 transition-colors ${pathname.startsWith("/playground")
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  Playground
                </Link>
              </nav>
              <div className="h-[1px] bg-border my-2" />
              <div className="flex flex-col gap-3 mt-auto pb-4" onClick={() => setMenuOpen(false)}>
                <AuthButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
