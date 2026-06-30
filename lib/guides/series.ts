export interface SeriesConfig {
  id: string;
  title: string;
  description: string;
}

export const GUIDE_SERIES: Record<string, SeriesConfig> = {
  "javascript-mastery": {
    id: "javascript-mastery",
    title: "JavaScript Mastery Series",
    description: "A deep dive from variables to async patterns.",
  },
  "css-layouts": {
    id: "css-layouts",
    title: "Modern CSS Layouts Series",
    description: "Master modern layouts using Flexbox, CSS Grid, and responsive strategies.",
  },
  "api-design": {
    id: "api-design",
    title: "Modern API Design Series",
    description: "Examine REST, GraphQL, security patterns, CORS, and performance headers.",
  },
};
