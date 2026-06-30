export type GuideDifficulty = "beginner" | "intermediate" | "advanced";

export interface GuideFrontmatter {
  title: string;                    // "Understanding CSS Flexbox"
  description: string;              // One sentence, used in cards + SEO meta
  tags: string[];                   // ["css", "layout", "fundamentals"]
  difficulty: GuideDifficulty;
  readTime: number;                 // minutes, computed or manually set
  publishedAt: string;              // ISO date "2026-01-15"
  updatedAt?: string;               // ISO date, if revised after publish
  relatedRoadmaps: string[];        // ["frontend", "css"] — roadmap IDs this guide supports
  relatedNodes?: string[];          // ["css-flexbox"] — specific node IDs (Section 12 of Roadmap doc)
  prerequisites?: string[];         // slugs of guides that should be read first
  series?: string;                  // "javascript-mastery" — groups guides into a series
  seriesOrder?: number;             // 1, 2, 3... position within the series
  author?: string;                  // defaults to site owner if omitted
  coverImage?: string;              // optional OG/card image path
}
