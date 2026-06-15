export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  roadmapSlug?: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
}

export const guides: GuideMeta[] = [
  {
    slug: "understanding-closures-in-javascript",
    title: "Understanding Closures in JavaScript",
    description: "What closures actually are, why they matter, and the classic loop pitfall every developer hits once.",
    roadmapSlug: "javascript",
    tags: ["JavaScript", "Fundamentals"],
    readingTime: "5 min read",
    publishedAt: "2026-01-12",
  },
  {
    slug: "css-flexbox-vs-grid",
    title: "CSS Flexbox vs Grid: When to Use Which",
    description: "The one-sentence rule that tells you which layout system to reach for, plus how they work together.",
    roadmapSlug: "frontend",
    tags: ["CSS", "Layout"],
    readingTime: "4 min read",
    publishedAt: "2026-01-20",
  },
  {
    slug: "rest-vs-graphql",
    title: "REST vs GraphQL: A Practical Comparison",
    description: "Over-fetching, caching, type safety, and how to actually decide between the two for your API.",
    roadmapSlug: "backend",
    tags: ["APIs", "Backend"],
    readingTime: "5 min read",
    publishedAt: "2026-02-02",
  },
  {
    slug: "docker-for-beginners",
    title: "Docker for Beginners: Core Concepts Explained",
    description: "Images, containers, Dockerfiles, and Compose — the mental model that makes Docker click.",
    roadmapSlug: "docker",
    tags: ["Docker", "DevOps"],
    readingTime: "6 min read",
    publishedAt: "2026-02-14",
  },
  {
    slug: "git-branching-strategies",
    title: "Git Branching Strategies Explained",
    description: "Git Flow, GitHub Flow, and Trunk-Based Development compared — and how to pick one for your team.",
    roadmapSlug: "git-github",
    tags: ["Git", "Workflow"],
    readingTime: "5 min read",
    publishedAt: "2026-02-25",
  },
  {
    slug: "understanding-big-o-notation",
    title: "Understanding Big-O Notation",
    description: "What Big-O actually measures, with real code examples for every common complexity class.",
    roadmapSlug: "computer-science",
    tags: ["CS Fundamentals", "Algorithms"],
    readingTime: "6 min read",
    publishedAt: "2026-03-05",
  },
  {
    slug: "what-is-cors",
    title: "What is CORS and Why Does It Matter?",
    description: "The Same-Origin Policy, preflight requests, and how to actually fix a CORS error.",
    roadmapSlug: "backend",
    tags: ["Security", "Backend"],
    readingTime: "5 min read",
    publishedAt: "2026-03-18",
  },
  {
    slug: "typescript-generics",
    title: "Getting Started with TypeScript Generics",
    description: "Why generics exist, how to write your first generic function, and where they show up in everyday code.",
    roadmapSlug: "typescript",
    tags: ["TypeScript"],
    readingTime: "5 min read",
    publishedAt: "2026-03-29",
  },
];
