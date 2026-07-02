# TaskFlow — Developer Taskflows & Guides Platform

> Community-created taskflows, guides, and articles to help developers plan and grow their careers.

**Live deployment:** [task-flow-by-hitarth.vercel.app](https://task-flow-by-hitarth.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Auth | next-auth v5 (beta) — GitHub & Google OAuth |
| Database | PostgreSQL via [Neon](https://neon.tech) |
| ORM | Prisma 6 |
| UI | React 19, Tailwind CSS v4, Radix UI |
| Diagrams | @xyflow/react (React Flow) |
| Content | MDX via next-mdx-remote |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel (serverless) |

---

## Prerequisites

- **Node.js** ≥ 20 (LTS recommended)
- **npm** ≥ 10
- A **PostgreSQL** database (Neon free tier works great)
- A **GitHub OAuth App** and/or **Google OAuth credentials**

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Thesia-Hitarth/TaskFlow-By-Hitarth-.git
cd TaskFlow-By-Hitarth-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Your PostgreSQL connection string (Neon: Settings → Connection string) |
| `AUTH_SECRET` | Run `openssl rand -base64 32` in your terminal |
| `AUTH_TRUST_HOST` | Set to `true` for any non-localhost deployment |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for local, your domain in production |
| `SMTP_HOST` | SMTP server host address (e.g. `smtp.gmail.com` for Gmail) |
| `SMTP_PORT` | SMTP port (e.g., `587` for STARTTLS, `465` for SSL/TLS) |
| `SMTP_SECURE` | Secure connection flag (`"true"` for port 465, `"false"` for 587) |
| `SMTP_USER` | SMTP username / credentials login email address |
| `SMTP_PASS` | SMTP password (or generated App Password for Gmail/Zoho) |
| `EMAIL_FROM` | Sender address header (e.g. `TaskFlow <your-email@gmail.com>`) |
| `CRON_SECRET` | Auth secret verifying secure Vercel Cron endpoint runs |
| `ADMIN_EMAIL` | Principal administrator email allowed to access `/admin` dashboard |

> **GitHub OAuth callback URL:** `http://localhost:3000/api/auth/callback/github`
> **Google OAuth redirect URI:** `http://localhost:3000/api/auth/callback/google`

### 4. Set up the database

Run Prisma migrations to create all tables (includes EmailQueue, ResourceVote, ContentRequest & ContentRequestVote):

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client (also runs automatically on `npm install`):

```bash
npx prisma generate
```

To view/edit data in a browser UI:

```bash
npx prisma studio
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/                  # Next.js App Router pages
  [slug]/             # Taskflow detail pages (e.g. /frontend, /backend)
  admin/              # Admin dashboard metrics and configuration
  suggest/            # Content suggestion upvote board
  unsubscribe/        # Email preferences center
  guides/             # Guide listing and detail pages
  best-practices/     # Best practices pages
  compare/            # Technology comparison page
  api/                # API routes
    auth/             # NextAuth v5 route handler
    progress/         # User progress save/load
    subscribe/        # Double-opt-in subscriber route
    email/            # Email queue & weekly digest crons processing
    admin/            # Broken link checker health crons
components/           # Shared React components
  taskflow/           # ReactFlow diagram components
  roadmap/            # Progress bar components
  email/              # Unsubscribe configuration form
  admin/              # SVG charts and admin statistics widgets
  suggestions/        # Content requests upvoting list and forms
  ui/                 # Primitive UI components (Button, Sheet, NotificationBell, etc.)
lib/                  # Data, utilities, and business logic
  email/              # Nodemailer client and transactional templates (base, welcome, milestones, etc.)
  analytics/          # Client-side custom analytics event wrappers
  admin/              # Database stats aggregations helpers
  resources/          # Curated node external resources registry configurations
  actions/            # Server actions (notifications, resources, suggestions, subscribe)
  prisma.ts           # Prisma client singleton
content/              # MDX guide files
  guides/             # One .mdx file per guide
prisma/               # Database schema and migrations
  schema.prisma       # Prisma schema definition
middleware.ts         # Auth & admin email middleware route protection
auth.ts               # NextAuth v5 configuration and signup event hook
```

---

## Adding a New Taskflow

1. **Add metadata** to `lib/taskflows-data.ts`:
   ```ts
   { slug: "my-role", title: "My Role", description: "...", type: "role" }
   ```

2. **Add diagram content** in `lib/taskflow-content/`:
   Create a new file `my-role.ts` with `nodes` and `edges` arrays, then export it from `lib/taskflow-content/index.ts`.

3. The route `/{slug}` is dynamically generated — no new page file needed.

---

## Adding a New Guide

1. **Add metadata** to `lib/guides-data.ts`.
2. **Create the content** at `content/guides/{slug}.mdx`.
3. Optionally add quiz questions to `lib/guides-quiz-data.ts`.

---

## Deployment (Vercel)

1. Import the GitHub repository in the [Vercel dashboard](https://vercel.com/new).
2. Set all environment variables from `.env.example` in **Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_SITE_URL` to your Vercel deployment URL.
4. Ensure `DATABASE_URL` points to your production database.
5. Vercel automatically runs `npm install` (which triggers `prisma generate`) on each deploy.

> **Important:** `AUTH_SECRET` and `AUTH_TRUST_HOST=true` must be set in Vercel or authentication will not work.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Lint all files with ESLint |
| `npx prisma studio` | Open Prisma database browser |
| `npx prisma migrate dev` | Apply schema changes to dev database |

---

## Contributing

Contributions are welcome! To add a new taskflow or guide:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-taskflow`
3. Follow the steps in "Adding a New Taskflow" or "Adding a New Guide"
4. Open a Pull Request

---

## License

MIT © [Hitarth Thesia](https://hitarththesia.vercel.app/)
