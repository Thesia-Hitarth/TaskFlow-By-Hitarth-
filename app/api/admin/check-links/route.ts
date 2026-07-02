import { NextRequest, NextResponse } from "next/server";
import { getAllRoadmapIds, getRoadmap } from "@/lib/roadmaps";
import { getResourcesForNode } from "@/lib/resources";

import { safeCompare } from "@/lib/utils/crypto";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";
  const cronSecret = process.env.CRON_SECRET;

  const host = request.headers.get("host") ?? "";
  const isLocalDev = isDev && (host.startsWith("localhost") || host.startsWith("127.0.0.1"));

  if (!isLocalDev) {
    const expectedHeader = cronSecret ? `Bearer ${cronSecret}` : null;
    if (!cronSecret || !authHeader || !safeCompare(authHeader, expectedHeader)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const broken: { roadmapId: string; nodeId: string; resourceId: string; url: string; status: number; error?: string }[] = [];
  const roadmapIds = getAllRoadmapIds();

  for (const roadmapId of roadmapIds) {
    const roadmap = getRoadmap(roadmapId);
    if (!roadmap) continue;

    for (const node of roadmap.nodes) {
      const resources = await getResourcesForNode(roadmapId, node.id);
      
      const links = node.links || [];
      const combined = [
        ...resources,
        ...links.map((l) => ({ id: l.url, url: l.url })),
      ];

      for (const resource of combined) {
        if (!resource.url) continue;
        try {
          const res = await fetch(resource.url, {
            method: "HEAD",
            signal: AbortSignal.timeout(5000), // 5s timeout per link
          });
          if (res.status >= 400) {
            broken.push({
              roadmapId,
              nodeId: node.id,
              resourceId: resource.id || resource.url,
              url: resource.url,
              status: res.status,
            });
          }
        } catch (err) {
          broken.push({
            roadmapId,
            nodeId: node.id,
            resourceId: resource.id || resource.url,
            url: resource.url,
            status: 0,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }
  }

  if (broken.length > 0) {
    console.warn(`[Link Health] ${broken.length} broken links found:`, broken);
  }

  return NextResponse.json({ checked: "complete", brokenCount: broken.length, broken });
}
