import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Developer Taskflows",
  description: "Community created taskflows, guides and articles to help developers grow in their career.",
};

export default function RootLayout({
  children,
  ...rest
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
