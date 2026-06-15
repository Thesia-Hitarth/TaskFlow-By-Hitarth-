import { taskflows } from "./taskflows-data";
import { guides } from "./guides-data";

export interface SearchItem {
  type: "taskflow" | "guide";
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
];
