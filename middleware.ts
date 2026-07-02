// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Use Node.js runtime to avoid Edge-incompatible APIs from jose/@auth/core
export const runtime = "nodejs";

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isLoggedIn = !!session?.user;
  const hasUsername = !!(session?.user as any)?.username;

  // Protect routes — redirect to sign-in if not authenticated
  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname === "/showcase/submit" ||
    pathname.startsWith("/admin");

  if (isProtectedPath && !isLoggedIn) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Admin route protection - only allow matches to ADMIN_EMAIL
  if (pathname.startsWith("/admin")) {
    const userEmail = session?.user?.email;
    const adminEmail = process.env.ADMIN_EMAIL || "hitarththesia123@gmail.com";
    if (!userEmail || userEmail !== adminEmail) {
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

  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/showcase/submit",
    "/admin/:path*",
    "/api/progress/:path*",
  ],
};
