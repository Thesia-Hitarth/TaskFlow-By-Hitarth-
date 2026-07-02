import type { Resource, NodeResources } from "./types";

const RESOURCE_MODULES: Record<string, () => Promise<{ [key: string]: NodeResources }>> = {
  "frontend:css-flexbox": () => import("./frontend/css-flexbox"),
  "frontend:css-grid": () => import("./frontend/css-grid"),
};

export async function getResourcesForNode(roadmapId: string, nodeId: string): Promise<Resource[]> {
  const key = `${roadmapId}:${nodeId}`;
  const loader = RESOURCE_MODULES[key];
  if (!loader) return [];

  try {
    const resModule = await loader();
    const exportName = nodeId.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const data = resModule[exportName] ?? Object.values(resModule)[0];
    return data?.resources ?? [];
  } catch (error) {
    console.error(`Failed to load resources for ${key}`, error);
    return [];
  }
}

export { getResourcesForNode as default };
