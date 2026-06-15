export interface BestPracticeCard {
  slug: string;
  category: string;
  title: string;
  description: string;
  topics: string[];
  icon: string; // emoji icon for the card
}

export const bestPractices: BestPracticeCard[] = [
  {
    slug: "code-quality",
    category: "Code Quality",
    title: "Writing Clean, Maintainable Code",
    description: "Principles and conventions that keep your codebase readable and easy to change.",
    topics: ["Clean code principles", "Naming conventions", "DRY & SOLID", "Code reviews"],
    icon: "✨",
  },
  {
    slug: "git-version-control",
    category: "Git & Version Control",
    title: "Version Control Best Practices",
    description: "Commit conventions, branching models, and PR etiquette that scale with your team.",
    topics: ["Conventional Commits", "Branching strategy", "PR etiquette", "Git hooks"],
    icon: "🌿",
  },
  {
    slug: "security",
    category: "Security",
    title: "Security Fundamentals for Developers",
    description: "The baseline security habits every developer should build before shipping code.",
    topics: ["Never hardcode secrets", "Input validation", "HTTPS/SSL", "OWASP Top 10"],
    icon: "🔐",
  },
  {
    slug: "performance",
    category: "Performance",
    title: "Web Performance Best Practices",
    description: "Techniques to make your app fast for users and green in Core Web Vitals.",
    topics: ["Lazy loading", "Caching strategies", "Avoid premature optimization", "Core Web Vitals"],
    icon: "⚡",
  },
  {
    slug: "testing",
    category: "Testing",
    title: "Testing Strategies That Actually Work",
    description: "How to think about test coverage without wasting time on low-value tests.",
    topics: ["Unit vs integration vs E2E", "The test pyramid", "TDD basics", "Test naming"],
    icon: "🧪",
  },
  {
    slug: "api-design",
    category: "API Design",
    title: "Designing APIs Developers Love",
    description: "RESTful conventions, versioning, and error handling that make APIs predictable.",
    topics: ["RESTful conventions", "API versioning", "Error response standards", "Pagination"],
    icon: "🔌",
  },
  {
    slug: "documentation",
    category: "Documentation",
    title: "Writing Docs That Get Read",
    description: "README structure, inline comments, and JSDoc patterns that save future-you hours.",
    topics: ["README best practices", "Inline comments", "JSDoc/TSDoc", "Changelog format"],
    icon: "📝",
  },
  {
    slug: "accessibility",
    category: "Accessibility",
    title: "Building Accessible Web Apps",
    description: "Semantic HTML, ARIA, keyboard navigation, and contrast — the fundamentals of a11y.",
    topics: ["Semantic HTML", "ARIA labels", "Keyboard navigation", "Contrast ratios"],
    icon: "♿",
  },
  {
    slug: "ci-cd",
    category: "CI/CD",
    title: "CI/CD Pipeline Best Practices",
    description: "Automate your way from commit to production without breaking things.",
    topics: ["Automate tests on PRs", "Lint checks in CI", "Deployment pipelines", "Rollback strategy"],
    icon: "🚀",
  },
  {
    slug: "devops",
    category: "DevOps",
    title: "DevOps Fundamentals for Developers",
    description: "The 12-factor app, environment configs, and container hygiene every dev should know.",
    topics: ["12-factor app", "Environment configs", "Container best practices", "Secrets management"],
    icon: "🛠️",
  },
];
