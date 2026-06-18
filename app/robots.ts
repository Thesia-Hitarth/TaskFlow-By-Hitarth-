import type { MetadataRoute } from "next";

// BUG-028: robots.ts already existed but was missing /signin from the disallow list.
// Search engines should not index auth pages or API routes.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/api/",
          "/signin",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
