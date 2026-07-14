export interface BestPracticeRule {
  rule: string;
  explanation: string;
  doExample?: string;
  dontExample?: string;
}

export interface BestPracticeCard {
  slug: string;
  category: string;
  title: string;
  description: string;
  topics: string[];
  icon: string; // emoji icon for the card
  rules?: BestPracticeRule[];
}

export const bestPractices: BestPracticeCard[] = [
  {
    slug: "css",
    category: "CSS",
    title: "CSS Best Practices",
    description: "Write CSS that stays modular, predictable, and maintainable as your project grows.",
    topics: ["BEM naming convention", "Avoiding specificity wars", "CSS Variables", "Flexbox & Grid alignment"],
    icon: "🎨",
    rules: [
      {
        rule: "Use a consistent naming convention (BEM recommended)",
        explanation: "Without a naming standard, class names collide, styles bleed, and specificity becomes unpredictable.",
        doExample: ".card {}\n.card__title {}\n.card__title--highlighted {}",
        dontExample: ".title2 {}\n.bold-red-text {}\n.my-custom-layout-box {}",
      },
      {
        rule: "Avoid deep nesting and ID selectors for styling",
        explanation: "ID selectors and deep element nesting create high specificity weights that are painful to override later. Keep nesting under 3 levels.",
        doExample: ".card .card__title { font-size: 1.25rem; }",
        dontExample: "#main-container .content-wrapper div.card article h3.title { font-size: 1.25rem; }",
      },
      {
        rule: "Use CSS custom properties for repeated values",
        explanation: "Define colors, spacing ratios, and border-radii as variables at the root level instead of copy-pasting hex codes.",
        doExample: ":root {\n  --color-primary: #d97706;\n}\n\n.button {\n  background-color: var(--color-primary);\n}",
        dontExample: ".button {\n  background-color: #d97706;\n}",
      },
      {
        rule: "Enforce display: flex or display: grid explicitly",
        explanation: "Never assume an element behaves as a flex/grid container without declaring display properties on the parent element.",
        doExample: ".container {\n  display: flex;\n  justify-content: center;\n}",
        dontExample: ".container {\n  /* missing display: flex */\n  justify-content: center;\n}",
      }
    ],
  },
  {
    slug: "javascript",
    category: "JavaScript",
    title: "JavaScript Best Practices",
    description: "Patterns that keep your JavaScript scripts readable, scope-safe, and bug-resistant.",
    topics: ["Variable block scopes", "Explicit error handling", "Strict equality checks", "Array helper methods"],
    icon: "🟨",
    rules: [
      {
        rule: "Prefer const and let over legacy var",
        explanation: "var is function-scoped and hoisted, which causes subtle variable leakage. const and let are block-scoped and predictable.",
        doExample: "const maxLimit = 100;\nlet currentCount = 0;",
        dontExample: "var maxLimit = 100;\nvar currentCount = 0;",
      },
      {
        rule: "Handle errors explicitly, never swallow them silently",
        explanation: "An empty catch block silences runtime exceptions, making debugging extremely difficult. Always log or recover.",
        doExample: "try {\n  const data = await fetchData();\n} catch (error) {\n  console.error('Fetch failed:', error);\n  showNotification('Network issue');\n}",
        dontExample: "try {\n  const data = await fetchData();\n} catch (e) {} // silently ignored",
      },
      {
        rule: "Use strict equality (===) instead of loose equality (==)",
        explanation: "Strict equality checks both value and type, preventing bugs due to silent type conversion (e.g. false == 0 is true).",
        doExample: "if (status === 200) { ... }",
        dontExample: "if (status == '200') { ... }",
      }
    ],
  },
  {
    slug: "git-version-control",
    category: "Git & Version Control",
    title: "Version Control Best Practices",
    description: "Commit conventions, atomic branches, and pull request workflows for clean team collaboration.",
    topics: ["Conventional Commits", "Atomic commit blocks", "Imperative mood formatting", "Branching workflows"],
    icon: "🌿",
    rules: [
      {
        rule: "Write commit messages in the imperative mood",
        explanation: "Commit messages should answer the sentence: 'If applied, this commit will [your message]'. E.g. 'Add login' not 'Added login'.",
        doExample: "feat: Add authentication validation logic",
        dontExample: "feat: Added validation to the login screen and fixed some styling bugs too",
      },
      {
        rule: "Keep commits small, atomic, and focused on one change",
        explanation: "A single commit containing feature logic, unrelated refactoring, and style fixes is hard to review, revert, or cherry-pick.",
        doExample: "Commit 1: refactor(auth): simplify login handler\nCommit 2: fix(auth): prevent email bypass on submit",
        dontExample: "Commit 1: refactor auth code and also fix the login validation bug",
      }
    ],
  },
  {
    slug: "react",
    category: "React",
    title: "React Best Practices",
    description: "Component patterns, stable state maps, and hooks execution rules for performant react applications.",
    topics: ["Focused components", "Prop drilling avoidance", "Stable keys list rendering", "Custom hooks creation"],
    icon: "⚛️",
    rules: [
      {
        rule: "Keep components small and focused on one responsibility",
        explanation: "Giant multi-purpose components are hard to test and maintain. Differentiate presentational rendering from state orchestration.",
        doExample: "const UserProfile = () => {\n  const user = useUser();\n  return <UserCard user={user} />;\n};",
        dontExample: "const UserProfile = () => {\n  /* 200 lines of data fetching, API parsing, and giant table rendering */\n};",
      },
      {
        rule: "Avoid prop drilling more than 2-3 levels deep",
        explanation: "Passing props down through intermediate components that don't use them couples components unnecessarily. Use context hooks or state managers.",
        doExample: "const user = useCurrentUser(); // retrieved via Context",
        dontExample: "<Header user={user} /> -> <Nav user={user} /> -> <UserMenu user={user} />",
      },
      {
        rule: "Always provide unique, stable keys in lists",
        explanation: "React uses key identifiers to track item insertions and sorting. Index keys degrade rendering speed and cause state bugs.",
        doExample: "users.map(user => <li key={user.id}>{user.name}</li>)",
        dontExample: "users.map((user, index) => <li key={index}>{user.name}</li>)",
      }
    ],
  },
  {
    slug: "api-design",
    category: "API Design",
    title: "Designing APIs Developers Love",
    description: "RESTful conventions, versioning, and error handling that make APIs predictable.",
    topics: ["RESTful nouns endpoints", "Consistent error shapes", "Resource versioning", "Pagination headers"],
    icon: "🔌",
    rules: [
      {
        rule: "Use plural nouns for resource endpoints, not verbs",
        explanation: "REST endpoints describe nouns (resources). The HTTP verb represents the action. Avoid putting verbs in the URL path.",
        doExample: "GET /users/42\nDELETE /users/42",
        dontExample: "GET /getUser?id=42\nPOST /deleteUser/42",
      },
      {
        rule: "Return consistent error response shapes",
        explanation: "A structured, standard error payload shape helps API clients handle error boundary displays gracefully.",
        doExample: "{\n  \"error\": {\n    \"code\": \"NOT_FOUND\",\n    \"message\": \"User not found\"\n  }\n}",
        dontExample: "{\n  \"status\": \"failed\",\n  \"reason\": \"no user\"\n}",
      }
    ],
  },
  {
    slug: "security",
    category: "Security",
    title: "Security Fundamentals",
    description: "Baseline security habits and validation checks every developer must implement.",
    topics: ["Never hardcode secrets", "Input validation", "HTTPS/SSL configurations", "OWASP Top 10 guidelines"],
    icon: "🔐",
    rules: [
      {
        rule: "Never commit API keys or database credentials to git",
        explanation: "Public or private git histories are scanned by bots. Always load credentials from environment variables.",
        doExample: "const dbUrl = process.env.DATABASE_URL;",
        dontExample: "const dbUrl = 'postgresql://postgres:secretpassword@localhost:5432/db';",
      },
      {
        rule: "Validate and sanitize all client inputs on the server",
        explanation: "Never trust client-side validation alone. Define strict schemas for all API payloads and query parameters using schemas (e.g., Zod) and validate them before processing.",
        doExample: "import { z } from 'zod';\n\nconst userSchema = z.object({\n  email: z.string().email(),\n  username: z.string().min(3).max(20),\n});\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  const cleanData = userSchema.parse(body);\n}",
        dontExample: "export async function POST(req: Request) {\n  const { email, username } = await req.json();\n  // Directly inserting unchecked data into queries or functions\n  const user = await db.user.create({ data: { email, username } });\n}",
      },
      {
        rule: "Enforce secure session cookie attributes (HttpOnly, Secure, SameSite)",
        explanation: "Prevent session tokens from being read by client-side scripts via HttpOnly, ensure they are sent only over HTTPS using Secure, and mitigate CSRF attacks using SameSite.",
        doExample: "// Server setting headers\nres.setHeader('Set-Cookie', [\n  'session_id=token123; Path=/; HttpOnly; Secure; SameSite=Lax'\n]);",
        dontExample: "// In client-side code\ndocument.cookie = 'session_id=token123; path=/;';\n// Insecure: accessible to scripts, sent over HTTP, vulnerable to CSRF",
      },
      {
        rule: "Use parameterized queries or ORMs to prevent SQL Injection",
        explanation: "Directly interpolating user input into raw database query strings allows attackers to manipulate queries. Always use ORM parameterization or prepared statements.",
        doExample: "const user = await prisma.user.findUnique({\n  where: { email: inputEmail }\n});",
        dontExample: "const user = await prisma.$queryRawUnsafe(\n  `SELECT * FROM User WHERE email = '${inputEmail}'`\n);",
      }
    ],
  },
  {
    slug: "performance",
    category: "Performance",
    title: "Web Performance Best Practices",
    description: "Techniques to optimize page render speed, minimize visual shifts, and load bundles efficiently.",
    topics: ["Lazy loading assets", "Caching strategies", "Core Web Vitals tuning", "Premature optimization avoidance"],
    icon: "⚡",
  },
  {
    slug: "testing",
    category: "Testing",
    title: "Testing Strategies That Work",
    description: "How to design high-value unit, integration, and E2E test blocks without wasting study time.",
    topics: ["Unit vs integration vs E2E", "The testing pyramid", "TDD fundamentals", "Clean test setups"],
    icon: "🧪",
  },
  {
    slug: "documentation",
    category: "Documentation",
    title: "Writing Clear Documentation",
    description: "README outlines, inline script comments, and JSDoc patterns that save hours of research.",
    topics: ["README layouts", "Inline code explanations", "JSDoc/TSDoc types", "Changelog formatting"],
    icon: "📝",
  },
  {
    slug: "accessibility",
    category: "Accessibility",
    title: "Building Accessible Web Apps",
    description: "Semantic HTML structure, ARIA helper tags, keyboard focus rings, and contrast checks.",
    topics: ["Semantic HTML", "ARIA labels", "Keyboard focus loops", "Contrast testing ratios"],
    icon: "♿",
  },
];
