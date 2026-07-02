import { createHmac, timingSafeEqual } from "crypto";

export function safeCompare(a: string | null | undefined, b: string | null | undefined): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (!a || !b) return false;

  // HMAC with a static key is used here strictly to pad/normalize both inputs
  // to an identical length before calling timingSafeEqual, preventing timing attacks.
  // This is NOT used for secure key derivation or signature signing.
  const hashA = createHmac("sha256", "timing-safe-comparison-normalizer").update(a).digest();
  const hashB = createHmac("sha256", "timing-safe-comparison-normalizer").update(b).digest();

  return timingSafeEqual(hashA, hashB);
}
