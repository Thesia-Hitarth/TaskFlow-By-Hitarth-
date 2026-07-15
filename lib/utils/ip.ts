import { isIP } from "node:net";

export function isValidIP(ip: string): boolean {
  return isIP(ip) !== 0;
}

export function getClientIP(request: Request): string {
  let ip = request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0].trim()
    || "127.0.0.1";

  if (!isValidIP(ip)) {
    ip = "unknown";
  }
  return ip;
}
