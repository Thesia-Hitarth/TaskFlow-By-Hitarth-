import type { NextConfig } from "next";

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
              // Next.js inline scripts (theme toggle, hydration)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              // Styles: self + inline (Tailwind/styled-components)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs (common in Next.js Image)
              "img-src 'self' data: blob: https:",
              // Connect: API calls + Vercel analytics/speed-insights
              "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              // Workers for ReactFlow
              "worker-src 'self' blob:",
              // Frames: disallow all
              "frame-src 'none'",
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

export default nextConfig;
