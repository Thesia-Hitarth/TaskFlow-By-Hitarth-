import { cookies } from "next/headers";

export async function getUserTimezone(): Promise<string> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("user-timezone")?.value || "UTC";
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
