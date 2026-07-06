import { NextRequest, NextResponse } from "next/server";
import { getAllRoadmapIds, getRoadmap } from "@/lib/roadmaps";
import { getResourcesForNode } from "@/lib/resources";

import { verifyCronRequest } from "@/lib/auth/verifyCronRequest";

export async function GET(request: NextRequest) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const itemsToCheck: { roadmapId: string; nodeId: string; resourceId: string; url: string }[] = [];
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
        itemsToCheck.push({
          roadmapId,
          nodeId: node.id,
          resourceId: resource.id || resource.url,
          url: resource.url,
        });
      }
    }
  }
  // Shuffle links to get random coverage and slice to 100 items to avoid serverless function timeouts
  for (let i = itemsToCheck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = itemsToCheck[i];
    itemsToCheck[i] = itemsToCheck[j];
    itemsToCheck[j] = temp;
  }
  const slicedItems = itemsToCheck.slice(0, 100);

  const broken: { roadmapId: string; nodeId: string; resourceId: string; url: string; status: number; error?: string }[] = [];
  const CONCURRENCY = 15;

  for (let i = 0; i < slicedItems.length; i += CONCURRENCY) {
    const batch = slicedItems.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (item) => {
        try {
          const res = await fetch(item.url, {
            method: "HEAD",
            signal: AbortSignal.timeout(3000), // 3s timeout per link
          });
          if (res.status >= 400) {
            broken.push({
              ...item,
              status: res.status,
            });
          }
        } catch (err) {
          broken.push({
            ...item,
            status: 0,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      })
    );
  }

  if (itemsToCheck.length > slicedItems.length) {
    console.warn(`[Link Health] Only checked a subset of links: ${slicedItems.length}/${itemsToCheck.length} checked. Review sitemap coverage or increase link check limit.`);
  }

  if (broken.length > 0) {
    console.warn(`[Link Health] ${broken.length} broken links found out of ${slicedItems.length} checked:`, broken);
  }

  return NextResponse.json({
    checked: "complete",
    totalLinksFound: itemsToCheck.length,
    checkedCount: slicedItems.length,
    brokenCount: broken.length,
    broken,
  });
}
