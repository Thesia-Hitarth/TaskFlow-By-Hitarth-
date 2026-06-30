import { NextResponse } from "next/server";
import { searchGuides } from "@/lib/guides/search";

export async function GET(request: Request) {
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
