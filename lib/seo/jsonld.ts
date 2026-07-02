// lib/seo/jsonld.ts
// SITE_URL is derived from NEXT_PUBLIC_SITE_URL so preview and staging deployments
// inject the correct canonical URLs into JSON-LD structured data.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://task-flow-by-hitarth.vercel.app";

export function roadmapJsonLd(roadmap: { title: string; description: string; slug: string; estimatedTime?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${roadmap.title} Developer Roadmap`,
    "description": roadmap.description || `Step by step guide to becoming a ${roadmap.title} developer.`,
    "url": `${SITE_URL}/${roadmap.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "TaskFlow",
      "url": SITE_URL,
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": roadmap.estimatedTime || "6 months",
    },
  };
}

export function guideJsonLd(guide: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.description,
    "url": `${SITE_URL}/guides/${guide.slug}`,
    "datePublished": guide.publishedAt,
    "dateModified": guide.updatedAt || guide.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "TaskFlow",
    },
    "publisher": {
      "@type": "Organization",
      "name": "TaskFlow",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`,
      },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function showcaseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "TaskFlow Community Showcase",
    "description": "Browse and discover web development projects built by fellow learners on TaskFlow.",
    "url": `${SITE_URL}/showcase`,
  };
}

export function activityJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Community Activity Feed",
    "description": "Real-time updates of guide completions and project submissions on the TaskFlow platform.",
    "url": `${SITE_URL}/activity`,
  };
}
