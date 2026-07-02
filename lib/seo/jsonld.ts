// lib/seo/jsonld.ts

export function roadmapJsonLd(roadmap: { title: string; description: string; slug: string; estimatedTime?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${roadmap.title} Developer Roadmap`,
    "description": roadmap.description || `Step by step guide to becoming a ${roadmap.title} developer.`,
    "url": `https://task-flow-by-hitarth.vercel.app/${roadmap.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "TaskFlow",
      "url": "https://task-flow-by-hitarth.vercel.app"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": roadmap.estimatedTime || "6 months"
    }
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
    "url": `https://task-flow-by-hitarth.vercel.app/guides/${guide.slug}`,
    "datePublished": guide.publishedAt,
    "dateModified": guide.updatedAt || guide.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "TaskFlow"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TaskFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://task-flow-by-hitarth.vercel.app/favicon.ico"
      }
    }
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
      "item": item.url
    }))
  };
}

export function showcaseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "TaskFlow Community Showcase",
    "description": "Browse and discover web development projects built by fellow learners on TaskFlow.",
    "url": "https://task-flow-by-hitarth.vercel.app/showcase"
  };
}

export function activityJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Community Activity Feed",
    "description": "Real-time updates of guide completions and project submissions on the TaskFlow platform.",
    "url": "https://task-flow-by-hitarth.vercel.app/activity"
  };
}
