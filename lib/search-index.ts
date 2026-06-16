import { taskflows } from "./taskflows-data";
import { guides } from "./guides-data";
import { bestPractices } from "./best-practices-data";

export interface SearchItem {
  type: "taskflow" | "guide" | "best-practice";
  title: string;
  description: string;
  href: string;
}

export const searchIndex: SearchItem[] = [
  ...taskflows.map((t) => ({
    type: "taskflow" as const,
    title: t.title,
    description: t.description,
    href: `/${t.slug}`,
  })),
  ...guides.map((g) => ({
    type: "guide" as const,
    title: g.title,
    description: g.description,
    href: `/guides/${g.slug}`,
  })),
  ...bestPractices.map((bp) => ({
    type: "best-practice" as const,
    title: bp.title,
    description: bp.description,
    href: `/best-practices/${bp.slug}`,
  })),
  { type: "taskflow" as const, title: "Compare Paths", description: "Compare two roadmaps side by side to find the right one for you.", href: "/compare" },
  { type: "guide" as const, title: "Changelog", description: "See everything that has been added and updated in TaskFlow.", href: "/changelog" },
];
