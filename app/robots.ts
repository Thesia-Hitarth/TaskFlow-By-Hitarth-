import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://task-flow-by-hitarth.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/admin/", "/_next/", "/setup", "/unsubscribe", "/u/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
