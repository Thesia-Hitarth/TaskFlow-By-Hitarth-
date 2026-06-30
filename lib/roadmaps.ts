import { taskflows, Taskflow } from "./taskflows-data";
import { taskflowContent } from "./taskflow-content";
import { TaskflowContentNode, TaskflowContentEdge } from "./taskflow-content/types";

export interface RoadmapConfig extends Taskflow {
  nodes: TaskflowContentNode[];
  edges: TaskflowContentEdge[];
  estimatedHoursTotal: number;
}

export function getRoadmap(id: string): RoadmapConfig | null {
  const flow = taskflows.find((t) => t.slug === id);
  const content = taskflowContent[id];
  if (!flow || !content) return null;

  // Compute total hours based on node estimations or fallback
  let estimatedHoursTotal = 0;
  for (const node of content.nodes) {
    if (node.kind === "subtopic") {
      const timeStr = node.estimatedTime || "";
      const match = timeStr.match(/(\d+)(?:-(\d+))?\s*(?:hrs|hours)/i);
      if (match) {
        const start = parseInt(match[1]);
        const end = match[2] ? parseInt(match[2]) : start;
        estimatedHoursTotal += Math.ceil((start + end) / 2);
      } else {
        estimatedHoursTotal += 3; // default fallback per subtopic node
      }
    }
  }

  if (estimatedHoursTotal === 0) {
    // Parse from taskflow level estimatedTime: e.g. "~6 months"
    const timeText = flow.estimatedTime || "";
    const monthsMatch = timeText.match(/~(\d+)\s+month/);
    if (monthsMatch) {
      estimatedHoursTotal = parseInt(monthsMatch[1]) * 30; // 30 hours per month
    } else {
      estimatedHoursTotal = 120; // global fallback
    }
  }

  return {
    ...flow,
    nodes: content.nodes,
    edges: content.edges,
    estimatedHoursTotal,
  };
}

export function getAllRoadmapIds(): string[] {
  return taskflows.map((t) => t.slug);
}

export function getRoadmapMetaAll(): Taskflow[] {
  return taskflows;
}

export function getNodeDetail(roadmapId: string, nodeId: string) {
  const content = taskflowContent[roadmapId];
  if (!content) return null;
  const node = content.nodes.find((n) => n.id === nodeId);
  if (!node) return null;

  return {
    ...node,
    estimatedTime: node.estimatedTime || "2-3 hrs",
    difficulty: node.difficulty || "beginner",
    whyLearn: node.whyLearn || node.description,
    outcomes: node.outcomes || [
      `Understand the core foundations of ${node.label}.`,
      `Learn practical application of ${node.label} in web projects.`,
      `Verify knowledge using community-curated tutorials.`
    ],
  };
}
