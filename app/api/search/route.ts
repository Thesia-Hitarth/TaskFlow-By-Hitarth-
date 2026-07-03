import { NextResponse } from "next/server";
import { searchGuides } from "@/lib/guides/search";
import { isValidIP } from "@/lib/utils/ip";
import { limitSearch } from "@/lib/ai/rateLimit";

export async function GET(request: Request) {
  let ip = request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0].trim()
    || "127.0.0.1";

  if (!isValidIP(ip)) {
    ip = "unknown";
  }

  const { success } = await limitSearch(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many search requests. Please try again later." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  try {
    const results = searchGuides(q);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to execute search index:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
