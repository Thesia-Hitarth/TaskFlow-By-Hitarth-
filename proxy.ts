import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/api/progress"];
const sessionCookieNames = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtected || hasSessionCookie(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(signInUrl);
}

function hasSessionCookie(request: NextRequest) {
  return sessionCookieNames.some((name) => Boolean(request.cookies.get(name)?.value));
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/progress/:path*"],
};
