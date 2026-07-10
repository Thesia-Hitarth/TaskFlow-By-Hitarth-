// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import type { Session } from "next-auth";

// Use Node.js runtime to avoid Edge-incompatible APIs from jose/@auth/core
export const runtime = "nodejs";

import { NextRequest } from "next/server";

interface AuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth((req: AuthRequest) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isLoggedIn = !!session?.user;
  const hasUsername = !!session?.user?.username;

  // Protect routes — redirect to sign-in if not authenticated
  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/showcase/submit") ||
    pathname.startsWith("/admin");

  if (isProtectedPath && !isLoggedIn) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    if (!isAdmin(session)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Redirect authenticated users without a username to /setup
  const isSetupPage = pathname === "/setup";
  if (isLoggedIn && !hasUsername && !isSetupPage && isProtectedPath) {
    return NextResponse.redirect(new URL("/setup", req.url));
  }

  // Protect /api/progress/* routes — short-circuit with JSON 401 if not authenticated
  if (pathname.startsWith("/api/progress") && !isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Generate dynamic CSP nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  // Allow the request to proceed and set headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const isPlayground = pathname.startsWith("/playground");
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'sha256-n46vPwSWuMC0W703pBofImv82Z26xo4LXymv0E9caPk='",
    isPlayground ? "'unsafe-eval'" : "",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com"
  ].filter(Boolean).join(" ");

  const cspHeader = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://avatars.githubusercontent.com https://lh3.googleusercontent.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "worker-src 'self' blob:",
    "frame-src 'self' data: blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|assets|images|api/auth).*)",
  ],
};
