"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, BookOpen, Compass, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/",          icon: Home,      label: "Home" },
  { href: "/taskflows", icon: Map,       label: "Paths" },
  { href: "/guides",    icon: BookOpen,  label: "Guides" },
  { href: "/activity",  icon: Compass,   label: "Activity" },
  { href: "/showcase",  icon: Trophy,    label: "Showcase" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40
                 bg-surface border-t border-border
                 safe-bottom shadow-lg transition-colors duration-200"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-stretch justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center h-full w-full",
                  "transition-colors duration-150 active:bg-surface/50",
                  isActive
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
                <span className="text-[10px] font-bold mt-1 tracking-tight select-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
