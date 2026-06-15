import type { MetadataRoute } from "next";
import { taskflows } from "@/lib/taskflows-data";
import { guides } from "@/lib/guides-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const taskflowUrls = taskflows.map((t) => ({
    url: `${siteUrl}/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideUrls = guides.map((g) => ({
    url: `${siteUrl}/guides/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: siteUrl, changeFrequency: "daily" as const, priority: 1 },
    { url: `${siteUrl}/taskflows`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${siteUrl}/guides`, changeFrequency: "daily" as const, priority: 0.9 },
    ...taskflowUrls,
    ...guideUrls,
  ];
}
