import "@/lib/env";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SkipLink } from "@/components/ui/SkipLink";
import { BottomNav } from "@/components/layout/BottomNav";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
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
