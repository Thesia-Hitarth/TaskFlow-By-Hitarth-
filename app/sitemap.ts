import type { MetadataRoute } from "next";
import { taskflows } from "@/lib/taskflows-data";
import { guides } from "@/lib/guides-data";
import { bestPractices } from "@/lib/best-practices-data";
import { SITE_URL } from "@/lib/config/site";

const siteUrl = SITE_URL;

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

  const bestPracticeUrls = bestPractices.map((bp) => ({
    url: `${siteUrl}/best-practices/${bp.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: siteUrl, changeFrequency: "daily" as const, priority: 1 },
    { url: `${siteUrl}/taskflows`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${siteUrl}/guides`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${siteUrl}/best-practices`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/compare`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${siteUrl}/changelog`, changeFrequency: "weekly" as const, priority: 0.4 },
    { url: `${siteUrl}/showcase`, changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${siteUrl}/suggest`, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${siteUrl}/playground`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${siteUrl}/path-finder`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    ...taskflowUrls,
    ...guideUrls,
    ...bestPracticeUrls,
  ];
}
