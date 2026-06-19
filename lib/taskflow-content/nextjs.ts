import { TaskflowContent } from "./types";

export const nextjsTaskflow: TaskflowContent = {
  slug: "nextjs",
  title: "Next.js",
  nodes: [
    // 1. Fundamentals
    {
      id: "next-fundamentals",
      kind: "milestone",
      label: "Fundamentals",
      description: "Learn directory-based routing paths, page templates layouts, and React Server Components. Next.js extends React configurations to build optimized full stack web applications.",
      position: { x: 60, y: 0 }
    },
    {
      id: "next-app-router",
      kind: "subtopic",
      parentId: "next-fundamentals",
      label: "App Router",
      description: "The App Router handles web routing paths using nested folders structures. Study page files locations, layout boundaries, template files, dynamic routes configurations, and navigation hooks.",
      links: [{ title: "Next.js App Router Guide", url: "https://nextjs.org/docs/app" }],
      position: { x: 380, y: 0 }
    },
    {
      id: "next-pages-layouts",
      kind: "subtopic",
      parentId: "next-fundamentals",
      label: "Pages & Layouts",
      description: "Pages display view templates while Layouts wrap child pages with shared elements. Learn nested layouts design, state persistence, error boundaries, and loading screen integration.",
      links: [{ title: "Next.js Pages and Layouts Docs", url: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts" }],
      position: { x: 380, y: 55 }
    },
    {
      id: "next-server-components",
      kind: "subtopic",
      parentId: "next-fundamentals",
      label: "Server Components",
      description: "React Server Components (RSC) execute on servers to reduce browser bundle payloads. Study 'use client' scoping rules, importing client widgets inside server trees, data fetches, and hydration rules.",
      links: [{ title: "Next.js Server Components Docs", url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components" }],
      position: { x: 380, y: 110 }
    },

    // 2. Data Fetching
    {
      id: "next-data-fetching",
      kind: "milestone",
      label: "Data Fetching",
      description: "Manage database operations using Actions, configure page caching limits, and select route render modes.",
      position: { x: 60, y: 220 }
    },
    {
      id: "next-server-actions",
      kind: "subtopic",
      parentId: "next-data-fetching",
      label: "Server Actions",
      description: "Server Actions run asynchronous database updates directly from forms tags. Master securing server mutations, validating client fields (Zod), revalidating page caches, and handling loading statuses.",
      links: [{ title: "Next.js Server Actions Docs", url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" }],
      position: { x: 380, y: 220 }
    },
    {
      id: "next-fetch-caching",
      kind: "subtopic",
      parentId: "next-data-fetching",
      label: "Fetch Caching",
      description: "Next.js overrides fetch commands to cache request results. Learn revalidation intervals (Incremental Static Regeneration), caching options overrides, and opt-out routes configuration.",
      links: [{ title: "Next.js Data Fetching and Caching", url: "https://nextjs.org/docs/app/building-your-application/data-fetching/fetching" }],
      position: { x: 380, y: 275 }
    },
    {
      id: "next-static-dynamic",
      kind: "subtopic",
      parentId: "next-data-fetching",
      label: "Static vs Dynamic Rendering",
      description: "Static rendering builds pages during compile times, while dynamic routes compile per user query. Study dynamic function triggers (cookies, searchParams) and tuning route settings.",
      links: [{ title: "Next.js Rendering Modes Docs", url: "https://nextjs.org/docs/app/building-your-application/rendering" }],
      position: { x: 380, y: 330 }
    },

    // 3. Routing
    {
      id: "next-routing",
      kind: "milestone",
      label: "Routing",
      description: "Map parameter variables in paths, group layouts without altering path locations, and intercept server requests.",
      position: { x: 60, y: 440 }
    },
    {
      id: "next-dynamic-routes",
      kind: "subtopic",
      parentId: "next-routing",
      label: "Dynamic Routes",
      description: "Dynamic routes parse dynamic URL variables. Study folder brackets parsing ([id]), catching all subpaths ([...slug]), generating static paths variables (generateStaticParams), and reading page parameters.",
      links: [{ title: "Next.js Dynamic Routes Docs", url: "https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes" }],
      position: { x: 380, y: 440 }
    },
    {
      id: "next-route-groups",
      kind: "subtopic",
      parentId: "next-routing",
      label: "Route Groups",
      description: "Route groups organize folder locations without adding paths names in URLs. Learn folder naming via parentheses ((auth)), routing layouts nesting, and managing auth subpages layouts.",
      links: [{ title: "Next.js Route Groups Docs", url: "https://nextjs.org/docs/app/building-your-application/routing/route-groups" }],
      position: { x: 380, y: 495 }
    },
    {
      id: "next-middleware",
      kind: "subtopic",
      parentId: "next-routing",
      label: "Middleware",
      description: "Middleware intercepts incoming requests before routes resolve. Learn redirecting paths, adding custom HTTP request headers, inspecting session cookies, and route matching controls.",
      links: [{ title: "Next.js Middleware Docs", url: "https://nextjs.org/docs/app/building-your-application/routing/middleware" }],
      position: { x: 380, y: 550 }
    },

    // 4. Optimization
    {
      id: "next-optimization",
      kind: "milestone",
      label: "Optimization",
      description: "Optimize assets download sizes, prevent layout shifts, and inject search engine optimization meta headers.",
      position: { x: 60, y: 660 }
    },
    {
      id: "next-image-optimization",
      kind: "subtopic",
      parentId: "next-optimization",
      label: "Image Optimization",
      description: "The Image component wraps standard HTML img tags to compress files dynamically. Study layout shift prevention, serving modern image extensions (WebP, AVIF), and dynamic image sizing.",
      links: [{ title: "Next.js Image Component Docs", url: "https://nextjs.org/docs/app/building-your-application/optimizing/images" }],
      position: { x: 380, y: 660 }
    },
    {
      id: "next-font-optimization",
      kind: "subtopic",
      parentId: "next-optimization",
      label: "Font Optimization",
      description: "Next.js downloads Google or local font files during build times to pack them locally. Learn custom font inclusions, font display fallback configs, and using Tailwind class setups.",
      links: [{ title: "Next.js Font Optimization Docs", url: "https://nextjs.org/docs/app/building-your-application/optimizing/fonts" }],
      position: { x: 380, y: 715 }
    },
    {
      id: "next-metadata-api",
      kind: "subtopic",
      parentId: "next-optimization",
      label: "Metadata API",
      description: "The Metadata API injects HTML head parameters. Master static metadata configurations, dynamic metadata generation (generateMetadata), injecting social sharing cards, and managing sitemaps.",
      links: [{ title: "Next.js Metadata API Docs", url: "https://nextjs.org/docs/app/building-your-application/optimizing/metadata" }],
      position: { x: 380, y: 770 }
    },

    // 5. Deployment
    {
      id: "next-deployment",
      kind: "milestone",
      label: "Deployment",
      description: "Manage system env keys, bundle compilation packages, and host app runtimes on production edge servers.",
      position: { x: 60, y: 880 }
    },
    {
      id: "next-env-variables",
      kind: "subtopic",
      parentId: "next-deployment",
      label: "Environment Variables",
      description: "Environment variables isolate keys. Differentiate private server-only variable keys from client-exposed parameters prefixed with NEXT_PUBLIC, and manage local dev dot-env configurations.",
      links: [{ title: "Next.js Env Variables Docs", url: "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables" }],
      position: { x: 380, y: 880 }
    },
    {
      id: "next-vercel-deployment",
      kind: "subtopic",
      parentId: "next-deployment",
      label: "Vercel Deployment",
      description: "Vercel is the native cloud host for Next.js app builds. Learn connecting Git repositories setups, automated deploy configurations, rollbacks audits, analytics dashboards, and edge caching settings.",
      links: [{ title: "Vercel Next.js Deployment Guide", url: "https://nextjs.org/docs/app/building-your-application/deploying" }],
      position: { x: 380, y: 935 }
    },
    {
      id: "next-edge-runtime",
      kind: "subtopic",
      parentId: "next-deployment",
      label: "Edge Runtime",
      description: "The Edge Runtime runs server scripts globally near users. Study lightweight API executions, cold start mitigations, supported node APIs, and configuring routes runtime flags.",
      links: [{ title: "Next.js Edge Runtime Docs", url: "https://nextjs.org/docs/app/api-reference/edge" }],
      position: { x: 380, y: 990 }
    }
  ],
  edges: [
    { id: "e-next-fundamentals-next-data-fetching", source: "next-fundamentals", target: "next-data-fetching" },
    { id: "e-next-data-fetching-next-routing", source: "next-data-fetching", target: "next-routing" },
    { id: "e-next-routing-next-optimization", source: "next-routing", target: "next-optimization" },
    { id: "e-next-optimization-next-deployment", source: "next-optimization", target: "next-deployment" }
  ]
};
