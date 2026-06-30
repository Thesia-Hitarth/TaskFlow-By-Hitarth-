export type NodeKind = "milestone" | "subtopic";
export type NodeStatus = "pending" | "done" | "in-progress" | "skipped";
export type NodeDifficulty = "beginner" | "intermediate" | "advanced";

export interface ResourceLink {
  title: string;
  url: string;
  type?: "video" | "article" | "interactive" | "docs" | "book";
  duration?: string;
  free?: boolean;
  recommended?: boolean;
  description?: string;
}

export interface TaskflowContentNode {
  id: string;
  kind: NodeKind;
  parentId?: string;
  label: string;
  description: string;
  links?: ResourceLink[];
  position: { x: number; y: number };
  difficulty?: NodeDifficulty;
  estimatedTime?: string;
  whyLearn?: string;
  outcomes?: string[];
  isOptional?: boolean;
  prerequisites?: string[];
  relatedGuides?: { slug: string; title: string; readTime: number }[];
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

