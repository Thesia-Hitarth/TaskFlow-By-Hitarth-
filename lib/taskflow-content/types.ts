export type NodeKind = "milestone" | "subtopic";
export type NodeStatus = "pending" | "done" | "in-progress" | "skipped";

export interface ResourceLink {
  title: string;
  url: string;
}

export interface TaskflowContentNode {
  id: string;
  kind: NodeKind;
  parentId?: string;
  label: string;
  description: string;
  links?: ResourceLink[];
  position: { x: number; y: number };
}

export interface TaskflowContentEdge {
  id: string;
  source: string;
  target: string;
}

export interface TaskflowContent {
  slug: string;
  title: string;
  nodes: TaskflowContentNode[];
  edges: TaskflowContentEdge[];
}
