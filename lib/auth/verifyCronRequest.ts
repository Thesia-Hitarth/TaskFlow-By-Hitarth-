import { safeCompare } from "@/lib/utils/crypto";

export function verifyCronRequest(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";
  const cronSecret = process.env.CRON_SECRET;

  const host = request.headers.get("host") ?? "";
  const isLocalDev = isDev && (host.startsWith("localhost") || host.startsWith("127.0.0.1"));

  if (!cronSecret) {
    return isLocalDev;
  }

  if (!authHeader) {
    return false;
  }

  const expectedHeader = `Bearer ${cronSecret}`;
  return safeCompare(authHeader, expectedHeader);
}
