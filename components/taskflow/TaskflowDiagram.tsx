"use client";

import { useState, useCallback, useMemo } from "react";
import { ReactFlow, Background, Controls, Node, Edge, NodeMouseHandler } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TaskflowContent, TaskflowContentNode } from "@/lib/taskflow-content/types";
import { useTaskflowProgress } from "@/lib/taskflow-progress";
import { NodeStatus } from "@/lib/taskflow-content/types";
import MilestoneNode from "./nodes/MilestoneNode";
import SubtopicNode from "./nodes/SubtopicNode";
import NodeDetailSheet from "./NodeDetailSheet";
import TaskflowProgressBar from "./TaskflowProgressBar";
import TaskflowLegend from "./TaskflowLegend";

const nodeTypes = { milestone: MilestoneNode, subtopic: SubtopicNode };

interface TaskflowDiagramProps {
  content: TaskflowContent;
}

export default function TaskflowDiagram({ content }: TaskflowDiagramProps) {
  const { progress, updateStatus } = useTaskflowProgress(content.slug);
  const [selected, setSelected] = useState<TaskflowContentNode | null>(null);

  const nodes: Node[] = useMemo(
    () =>
      content.nodes.map((n) => ({
        id: n.id,
        type: n.kind,
        position: n.position,
        data: { label: n.label, status: progress[n.id] ?? "pending" },
      })),
    [content.nodes, progress]
  );

  const edges: Edge[] = useMemo(
    () =>
      content.edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        style: { stroke: "#2a2a2a", strokeWidth: 2 },
      })),
    [content.edges]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const original = content.nodes.find((n) => n.id === node.id) ?? null;
      setSelected(original);
    },
    [content.nodes]
  );

  const doneCount = Object.values(progress).filter((s) => s === "done").length;

  return (
    <div>
      <TaskflowProgressBar done={doneCount} total={content.nodes.length} />
      <TaskflowLegend />
      <div className="h-[80vh] w-full rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          fitView
        >
          <Background color="#2a2a2a" gap={24} />
          <Controls className="[&>button]:bg-[#1e1e1e] [&>button]:border-[#2a2a2a] [&>button]:text-white [&>button]:cursor-pointer [&>button:hover]:bg-zinc-800" />
        </ReactFlow>
      </div>
      <NodeDetailSheet
        node={selected}
        status={selected ? progress[selected.id] ?? "pending" : "pending"}
        onStatusChange={(status: NodeStatus) => selected && updateStatus(selected.id, status)}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
