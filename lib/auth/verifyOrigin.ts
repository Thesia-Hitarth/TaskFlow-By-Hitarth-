import { SITE_URL } from "@/lib/config/site";

export function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // GET requests or requests without origin header are allowed
  return origin === SITE_URL;
}
