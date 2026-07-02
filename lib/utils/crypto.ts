import { createHmac, timingSafeEqual } from "crypto";

export function safeCompare(a: string | null | undefined, b: string | null | undefined): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (!a || !b) return false;

  const hashA = createHmac("sha256", "timing-safe-salt").update(a).digest();
  const hashB = createHmac("sha256", "timing-safe-salt").update(b).digest();

  return timingSafeEqual(hashA, hashB);
}
