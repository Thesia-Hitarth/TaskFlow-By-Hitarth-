import { z } from "zod";

export const httpUrlSchema = z.string().trim().url({ message: "Must be a valid URL." }).refine(
  (val) => {
    try {
      const parsed = new URL(val);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  },
  { message: "URL must start with http:// or https://" }
);

export function isSafeHttpUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
