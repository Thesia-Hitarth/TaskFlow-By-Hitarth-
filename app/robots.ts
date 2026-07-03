import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/admin/", "/_next/", "/setup", "/unsubscribe", "/u/", "/showcase/submit"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
