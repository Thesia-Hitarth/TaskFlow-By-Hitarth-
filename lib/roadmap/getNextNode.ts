import { TaskflowContentNode, TaskflowContentEdge, NodeStatus } from "@/lib/taskflow-content/types";

export function getNextNode(
  nodes: TaskflowContentNode[],
  edges: TaskflowContentEdge[],
  statuses: Record<string, NodeStatus>
): TaskflowContentNode | null {
  // 1. Build a map of nodeId -> list of prerequisite node IDs
  const prereqs = new Map<string, Set<string>>();

  // Initialize sets for all subtopic nodes
  for (const node of nodes) {
    if (node.kind === "subtopic") {
      prereqs.set(node.id, new Set<string>());
    }
  }

  // Add prerequisites from edges
  for (const edge of edges) {
    const targetPrereqs = prereqs.get(edge.target);
    if (targetPrereqs) {
      targetPrereqs.add(edge.source);
    }
  }

  // Add prerequisites from explicit node property
  for (const node of nodes) {
    if (node.kind === "subtopic" && node.prerequisites) {
      const targetPrereqs = prereqs.get(node.id);
      if (targetPrereqs) {
        for (const pre of node.prerequisites) {
          targetPrereqs.add(pre);
        }
      }
    }
  }

  // 2. Find the first pending subtopic node whose prerequisites are all "done"
  for (const node of nodes) {
    // Only recommend subtopic nodes (milestones are container nodes)
    if (node.kind !== "subtopic") continue;

    const currentStatus = statuses[node.id] ?? "pending";
    if (currentStatus !== "pending") continue;

    const deps = prereqs.get(node.id);
    if (!deps || deps.size === 0) {
      // No prerequisites, this is immediately unblocked!
      return node;
    }

    // Check if all prerequisites are "done"
    let allPrereqsDone = true;
    for (const depId of deps) {
      const depStatus = statuses[depId] ?? "pending";
      if (depStatus !== "done") {
        allPrereqsDone = false;
        break;
      }
    }

    if (allPrereqsDone) {
      return node;
    }
  }

  // If no completely unblocked pending nodes are found, return first pending node as fallback
  for (const node of nodes) {
    if (node.kind === "subtopic" && (statuses[node.id] ?? "pending") === "pending") {
      return node;
    }
  }

  return null;
}
