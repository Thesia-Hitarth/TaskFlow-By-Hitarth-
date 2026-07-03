import "@/lib/env";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SkipLink } from "@/components/ui/SkipLink";
import { BottomNav } from "@/components/layout/BottomNav";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { SITE_URL } from "@/lib/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TaskFlow",
    template: "%s | TaskFlow",
  },
  description:
    "Community created taskflows, guides and articles to help developers grow in their career.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TaskFlow",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    title: "TaskFlow",
    description:
      "Community created taskflows, guides and articles to help developers grow in their career.",
    type: "website",
    siteName: "TaskFlow",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") || "";

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                  if (tz) {
                    document.cookie = "user-timezone=" + encodeURIComponent(tz) + "; path=/; max-age=31536000; SameSite=Lax";
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
        <SkipLink />
        <Providers>
          <div className="flex-1 pb-16 md:pb-0 flex flex-col">
            {children}
          </div>
          <BottomNav />
          <ServiceWorkerRegistration />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
