// BUG-004: Auth middleware to protect dashboard and progress API routes.
//
// IMPORTANT: next-auth v5 beta (5.0.0-beta.31) with the PrismaAdapter uses
// jose library functions that require Node.js APIs (DecompressionStream) not
// available in the Edge runtime. We must configure this middleware to run in
// the Node.js runtime instead.
//
// In production, this middleware runs as a Node.js serverless function on Vercel
// (not as an Edge Function) when the runtime is set to "nodejs".

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use Node.js runtime to avoid Edge-incompatible APIs from jose/@auth/core
export const runtime = "nodejs";

export default auth((req: NextRequest & { auth: { user?: { id?: string } } | null }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Protect /dashboard/* routes — redirect to sign-in if not authenticated
  if (pathname.startsWith("/dashboard") && !session?.user) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Protect /api/progress/* routes — short-circuit with JSON 401 if not authenticated
  if (pathname.startsWith("/api/progress") && !session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Protect all /dashboard/* routes
    "/dashboard/:path*",
    // Protect progress API mutations
    "/api/progress/:path*",
  ],
};
