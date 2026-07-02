export type ResourceType = "video" | "article" | "interactive" | "docs" | "book" | "course";

export interface Resource {
  id: string; // unique within the node, e.g. "flexbox-froggy"
  type: ResourceType;
  title: string;
  url: string;
  description: string; // 1–2 sentences max
  provider?: string;   // e.g. "MDN", "YouTube", "CSS-Tricks"
  duration?: string;   // e.g. "30 min", "6 min read"
  free: boolean;
  recommended?: boolean; // marks 1-2 "top picks" per node (shown first)
  addedAt?: string;
}

export interface NodeResources {
  nodeId: string;
  roadmapId: string;
  resources: Resource[];
}
