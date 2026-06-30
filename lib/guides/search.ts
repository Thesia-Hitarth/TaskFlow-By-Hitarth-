import Fuse from "fuse.js";
import { getAllGuides } from "./getAllGuides";

export interface SearchableGuide {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string; // plain-text stripped of MDX, for matching body content
}

let fuseInstance: Fuse<SearchableGuide> | null = null;

function stripMdx(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, "") // remove code blocks
    .replace(/<[A-Z][^>]*>/g, "")   // remove custom components
    .replace(/[#*`_>\[\]]/g, "")     // remove markdown syntax characters
    .slice(0, 2000);                 // limit index size per file
}

export function getSearchIndex(): Fuse<SearchableGuide> {
  if (fuseInstance) return fuseInstance;

  const guides = getAllGuides();
  const searchable: SearchableGuide[] = guides.map((g) => ({
    slug: g.slug,
    title: g.frontmatter.title,
    description: g.frontmatter.description,
    tags: g.frontmatter.tags,
    content: stripMdx(g.content),
  }));

  fuseInstance = new Fuse(searchable, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "tags", weight: 0.3 },
      { name: "description", weight: 0.15 },
      { name: "content", weight: 0.05 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });

  return fuseInstance;
}

export function searchGuides(query: string) {
  if (!query.trim()) return [];
  return getSearchIndex().search(query).map((result) => result.item);
}
