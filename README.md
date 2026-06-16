# TaskFlow

> Community-created taskflows, guides, and best practices to help developers grow in their careers.

**Live site:** [task-flow-by-hitarth.vercel.app](https://task-flow-by-hitarth.vercel.app)

---

## What is TaskFlow?

TaskFlow is an interactive developer learning platform featuring:

- **Roadmaps** — Step-by-step visual paths for 30+ roles and skills
  (Frontend, Backend, DevOps, AI Engineer, JavaScript, Python, and more)
- **Guides** — In-depth articles on core concepts (closures, Big-O, Docker,
  CORS, TypeScript generics, and more)
- **Best Practices** — Curated checklists for code quality, security,
  testing, accessibility, CI/CD, and DevOps
- **Progress Tracking** — Mark nodes as Done / In Progress / Skipped,
  saved to localStorage
- **Search** — Ctrl+K command palette searching all roadmaps, guides,
  and best practices
- **Path Recommender** — 5-question quiz that recommends the right roadmap
  for you
- **Guide Quizzes** — Self-check questions at the end of every guide article

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Diagrams | React Flow (@xyflow/react) |
| Content | MDX (next-mdx-remote) |
| Database | Prisma (PostgreSQL) |
| Auth | NextAuth.js |
| Deployment | Vercel |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm or pnpm
- PostgreSQL database (for auth features)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Thesia-Hitarth/TaskFlow-By-Hitarth-.git
cd TaskFlow-By-Hitarth-

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# 4. Set up the database
npx prisma migrate dev

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
app/                   # Next.js App Router pages
  [slug]/              # Individual roadmap pages
  guides/              # Guides listing + individual guide pages
  best-practices/      # Best Practices listing + detail pages
  compare/             # Side-by-side roadmap comparison
  changelog/           # What's new page
components/
  roadmap/             # Roadmap diagram, progress bar, node components
  GuideQuiz.tsx        # Quiz component for guide pages
  PathRecommender.tsx  # Homepage path recommendation quiz
  SearchCommand.tsx    # Ctrl+K search palette
  Navbar.tsx
  Footer.tsx
lib/
  roadmaps-data.ts     # All roadmap metadata
  guides-data.ts       # All guide metadata
  best-practices-data.ts
  roadmap-content/     # Full node/edge data for interactive diagrams
  progress.ts          # localStorage progress tracking hook
content/
  guides/              # MDX files for each guide article
prisma/
  schema.prisma        # Database schema
```

---

## Author

**Hitarth Thesia**

- Portfolio: [hitarththesia.vercel.app](https://hitarththesia.vercel.app)
- GitHub: [@Thesia-Hitarth](https://github.com/Thesia-Hitarth)
- LinkedIn: [hitarth-thesia-2043b0170](https://www.linkedin.com/in/hitarth-thesia-2043b0170/)

---

## Contributing

Contributions are welcome! To add a new roadmap, guide, or best practice:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/add-rust-roadmap`
3. Make your changes following the existing data structure patterns
4. Open a pull request with a clear description

---

## License

MIT
```
