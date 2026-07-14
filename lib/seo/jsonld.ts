import { SITE_URL } from "@/lib/config/site";

export function roadmapJsonLd(roadmap: { title: string; description: string; slug: string; estimatedTime?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${roadmap.title} Developer Roadmap`,
    "description": roadmap.description || `Step by step guide to becoming a ${roadmap.title} developer.`,
    "url": `${SITE_URL}/${roadmap.slug}`,
    "image": `${SITE_URL}/icon.png`,
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
  author?: string;
  coverImage?: string;
}) {
  const authorName = guide.author || "TaskFlow";
  const authorType = guide.author ? "Person" : "Organization";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.description,
    "url": `${SITE_URL}/guides/${guide.slug}`,
    "image": guide.coverImage ? `${SITE_URL}${guide.coverImage}` : `${SITE_URL}/icon.png`,
    "datePublished": guide.publishedAt,
    "dateModified": guide.updatedAt || guide.publishedAt,
    "author": {
      "@type": authorType,
      "name": authorName,
    },
    "publisher": {
      "@type": "Organization",
      "name": "TaskFlow",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/icon.png`,
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
