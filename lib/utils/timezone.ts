import { cookies } from "next/headers";

/**
 * Validates that a string is a recognized IANA timezone identifier.
 * Unknown or attacker-supplied values are rejected and fall back to UTC.
 */
function isValidIANATimezone(tz: string): boolean {
  if (!tz || tz.length > 64) return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export async function getUserTimezone(): Promise<string> {
  try {
    const cookieStore = await cookies();
    const tz = cookieStore.get("user-timezone")?.value;
    if (tz && isValidIANATimezone(tz)) return tz;
    return "UTC";
  } catch {
    return "UTC";
  }
}

export function getLocalDateString(date: Date, timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formatter.formatToParts(date);
    const month = parts.find((p) => p.type === "month")?.value;
    const day = parts.find((p) => p.type === "day")?.value;
    const year = parts.find((p) => p.type === "year")?.value;
    return `${year}-${month}-${day}`;
  } catch {
    return date.toISOString().split("T")[0];
  }
}

export function getLocalHours(date: Date, timezone: string): number {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hourVal = parts.find((p) => p.type === "hour")?.value;
    return hourVal ? parseInt(hourVal, 10) : date.getUTCHours();
  } catch {
    return date.getUTCHours();
  }
}
