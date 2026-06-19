"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ReactFlow, Background, Node, Edge, NodeMouseHandler, ReactFlowProvider, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TaskflowContent, TaskflowContentNode } from "@/lib/taskflow-content/types";
import { useTaskflowProgress } from "@/lib/taskflow-progress";
import { NodeStatus } from "@/lib/taskflow-content/types";
import MilestoneNode from "./nodes/MilestoneNode";
import SubtopicNode from "./nodes/SubtopicNode";
import NodeDetailSheet from "./NodeDetailSheet";
import TaskflowLegend from "./TaskflowLegend";

interface TaskflowDiagramProps {
  content: TaskflowContent;
}

// Define OUTSIDE the component, at module level (BUG-30)
const NODE_TYPES = { milestone: MilestoneNode, subtopic: SubtopicNode };

export default function TaskflowDiagram({ content }: TaskflowDiagramProps) {
  return (
    <ReactFlowProvider>
      <TaskflowDiagramInner content={content} />
    </ReactFlowProvider>
  );
}

function TaskflowDiagramInner({ content }: TaskflowDiagramProps) {
  const { progress, updateStatus } = useTaskflowProgress(content.slug);

  const [selected, setSelected] = useState<TaskflowContentNode | null>(null);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const { fitView } = useReactFlow();

  // Calculate layout bounds to scale container height responsively
  const { diagramWidth, diagramHeight } = useMemo(() => {
    if (!content.nodes.length) return { diagramWidth: 600, diagramHeight: 600 };

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    content.nodes.forEach((node) => {
      const w = node.kind === "milestone" ? 180 : 170;
      const h = node.kind === "milestone" ? 60 : 45;

      if (node.position.x < minX) minX = node.position.x;
      if (node.position.x + w > maxX) maxX = node.position.x + w;
      if (node.position.y < minY) minY = node.position.y;
      if (node.position.y + h > maxY) maxY = node.position.y + h;
    });

    const width = maxX - minX;
    const height = maxY - minY;

    return {
      diagramWidth: width + 60,  // Add padding margins
      diagramHeight: height + 60, // Add padding margins
    };
  }, [content.nodes]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    setContainerWidth(el.clientWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const calculatedHeight = useMemo(() => {
    if (!containerWidth || !diagramWidth) return diagramHeight;
    const scale = Math.min(1, containerWidth / diagramWidth);
    return Math.max(400, diagramHeight * scale); // Enforce minimum 400px (BUG-15)
  }, [containerWidth, diagramWidth, diagramHeight]);

  // Adjust zoom and viewport layout to fit container dimensions programmatically on resize
  useEffect(() => {
    if (containerWidth > 0 && calculatedHeight > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.05, minZoom: 0.1, maxZoom: 1 });
      }, 200); // 200ms debounce (BUG-14)
      return () => clearTimeout(timer);
    }
  }, [containerWidth, calculatedHeight, fitView]);

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

  const edges: Edge[] = useMemo(() => {
    // 1. Milestone-to-milestone connections
    const baseEdges = content.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: "bottom",
      targetHandle: "top",
      style: { strokeWidth: 2 },
    }));

    // 2. Milestone-to-subtopic connections (assigned dynamically based on sequence order in content nodes)
    const flowEdges: Edge[] = [];
    let currentMilestoneId = "";
    for (const node of content.nodes) {
      if (node.kind === "milestone") {
        currentMilestoneId = node.id;
      } else if (node.kind === "subtopic" && currentMilestoneId) {
        flowEdges.push({
          id: `edge-${currentMilestoneId}-${node.id}`,
          source: currentMilestoneId,
          target: node.id,
          sourceHandle: "right",
          targetHandle: "left",
          style: { strokeDasharray: "4 4", strokeWidth: 2 },
        });
      }
    }

    return [...baseEdges, ...flowEdges];
  }, [content.edges, content.nodes]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const original = content.nodes.find((n) => n.id === node.id) ?? null;
      setSelected(original);
    },
    [content.nodes]
  );

  return (
    <div>
      {/* Remove duplicate TaskflowProgressBar (BUG-05) */}
      <TaskflowLegend />
      <div 
        ref={containerRef}
        style={{ height: `${calculatedHeight}px` }}
        className="w-full rounded-xl border border-border/50 bg-surface/30 overflow-hidden relative transition-colors duration-200"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          onNodeClick={onNodeClick}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          fitView
          fitViewOptions={{
            padding: 0.05,
            minZoom: 0.1,
            maxZoom: 1,
          }}
        >
          <Background color="var(--color-border)" gap={24} />
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
