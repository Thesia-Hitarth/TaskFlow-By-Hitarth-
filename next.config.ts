import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  transpilePackages: ["next-auth", "@auth/core"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Prevent XSS by restricting content sources
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js inline scripts (theme toggle, hydration) + Monaco CDN scripts
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              // Styles: self + inline + Monaco CDN styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs (common in Next.js Image)
              "img-src 'self' data: blob: https:",
              // Connect: API calls + Vercel analytics/speed-insights
              "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              // Workers for ReactFlow and practice runs
              "worker-src 'self' blob:",
              // Frames: allow self + sandboxed visual iframe previews
              "frame-src 'self' data: blob:",
              // Object: disallow all plugins
              "object-src 'none'",
              // Base URI restricted
              "base-uri 'self'",
              // Form action restricted to self
              "form-action 'self'",
            ].join("; "),
          },
          // HSTS: enforce HTTPS for 1 year
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Permissions policy: limit access to sensitive browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
