import { SITE_URL } from "@/lib/config/site";

export function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) {
    // If no Origin header, only permit safe GET/HEAD/OPTIONS requests (same-origin / direct calls)
    const method = req.method.toUpperCase();
    return method === "GET" || method === "HEAD" || method === "OPTIONS";
  }
  return origin === SITE_URL;
}


