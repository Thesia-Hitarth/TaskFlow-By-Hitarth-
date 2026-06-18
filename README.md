# TaskFlow

Community-created taskflows, guides, and best practices to help developers grow in their careers.

Live site: https://task-flow-by-hitarth.vercel.app

## Features

- Roadmaps: step-by-step visual paths for roles and skills.
- Guides: MDX articles for core developer concepts.
- Best Practices: curated checklists for quality, security, testing, accessibility, CI/CD, and DevOps.
- Progress Tracking: local progress plus authenticated database sync.
- Search: Ctrl+K command palette across taskflows, guides, and best practices.
- Path Recommender: five-question quiz that suggests a roadmap.
- Guide Quizzes: self-check questions on guide pages.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Diagrams | React Flow (`@xyflow/react`) |
| Content | MDX (`next-mdx-remote`) |
| Database | Prisma with PostgreSQL |
| Auth | NextAuth.js |
| Deployment | Vercel |

## Local Setup

Prerequisites:

- Node.js 20.9 or newer
- npm
- PostgreSQL database for auth and synced progress

Setup:

```bash
npm install
cp .env.example .env.local
npx prisma migrate dev
npm run dev
```

Required environment variables:

```env
DATABASE_URL=postgresql://user:password@host:5432/taskflow
AUTH_SECRET=your-32-plus-character-secret
AUTH_TRUST_HOST=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GITHUB_ID=your-github-oauth-app-id
GITHUB_SECRET=your-github-oauth-app-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Generate an auth secret with:

```bash
openssl rand -base64 32
```

## Common Commands

```bash
npm run dev
npm run dev:turbo
npm run lint
npm run build
npx prisma migrate dev
npx prisma generate
```

`npm run dev` uses Webpack for local stability on Windows. `npm run dev:turbo`
keeps the default Next.js 16 Turbopack dev server available for debugging or
when the local Turbopack panic is resolved upstream.

## Project Structure

```text
app/                    Next.js App Router pages, API routes, metadata files
components/             Shared UI, search, diagrams, quizzes, navigation
content/guides/         MDX guide content
lib/                    Taskflow data, guide data, progress helpers, Prisma
lib/taskflow-content/   Node and edge data for interactive diagrams
prisma/schema.prisma    Database schema
```

## Adding Content

Add a taskflow by creating metadata in `lib/taskflows-data.ts` and full node data in `lib/taskflow-content/`.

Add a guide by creating an MDX file in `content/guides/` and adding metadata in `lib/guides-data.ts`.

Add a best-practice page by updating `lib/best-practices-data.ts`; the existing dynamic route handles the detail page.

## Production Notes

- Configure `AUTH_SECRET`, `AUTH_TRUST_HOST=true`, and `DATABASE_URL` in Vercel.
- Keep `NEXT_PUBLIC_SITE_URL` set to the deployed origin for metadata and same-origin API checks.
- Database sessions expire after 30 days; schedule cleanup for expired `Session` rows in production.

## Author

Hitarth Thesia

- Portfolio: https://hitarththesia.vercel.app/
- GitHub: https://github.com/Thesia-Hitarth
- LinkedIn: https://www.linkedin.com/in/hitarth-thesia-2043b0170/
