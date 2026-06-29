"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ReactFlow, Background, Node, Edge, NodeMouseHandler, ReactFlowProvider, useReactFlow, MiniMap, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TaskflowContent, TaskflowContentNode } from "@/lib/taskflow-content/types";
import { useTaskflowProgress } from "@/lib/taskflow-progress";
import { NodeStatus } from "@/lib/taskflow-content/types";
import MilestoneNode from "./nodes/MilestoneNode";
import SubtopicNode from "./nodes/SubtopicNode";
import NodeDetailSheet from "./NodeDetailSheet";
import TaskflowLegend from "./TaskflowLegend";
import * as Tooltip from "@radix-ui/react-tooltip";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

interface TaskflowDiagramProps {
  content: TaskflowContent;
}

// Define OUTSIDE the component, at module level (BUG-30)
const NODE_TYPES = { milestone: MilestoneNode, subtopic: SubtopicNode };

// Dynamic fallback metadata generator for nodes
function getNodeMetadata(node: TaskflowContentNode, index: number, total: number) {
  // 1. Difficulty fallback
  let difficulty: "beginner" | "intermediate" | "advanced" = "beginner";
  const ratio = index / total;
  if (ratio > 0.7) {
    difficulty = "advanced";
  } else if (ratio > 0.3) {
    difficulty = "intermediate";
  }
  if (node.difficulty) {
    difficulty = node.difficulty;
  }

  // 2. Estimated Time fallback
  let estimatedTime = "2–4 hours";
  if (node.kind === "milestone") {
    estimatedTime = difficulty === "beginner" ? "4–6 hours" : difficulty === "intermediate" ? "6–10 hours" : "10–15 hours";
  } else {
    estimatedTime = difficulty === "beginner" ? "1–2 hours" : difficulty === "intermediate" ? "2–4 hours" : "4–6 hours";
  }
  if (node.estimatedTime) {
    estimatedTime = node.estimatedTime;
  }

  // 3. Why Learn This fallback
  let whyLearn = node.whyLearn || node.description;
  if (!whyLearn) {
    whyLearn = `Mastering ${node.label} is essential for building a solid foundation in this pathway and executing modern development standards.`;
  }

  // 4. Outcomes fallback
  let outcomes = node.outcomes;
  if (!outcomes || outcomes.length === 0) {
    outcomes = [
      `Understand the fundamental concepts of ${node.label}.`,
      `Learn how to apply ${node.label} in practical projects.`,
      `Analyze common patterns and avoid typical pitfalls.`,
    ];
  }

  return {
    difficulty,
    estimatedTime,
    whyLearn,
    outcomes,
  };
}

export default function TaskflowDiagram({ content }: TaskflowDiagramProps) {
  return (
    <Tooltip.Provider delayDuration={150}>
      <ReactFlowProvider>
        <TaskflowDiagramInner content={content} />
      </ReactFlowProvider>
    </Tooltip.Provider>
  );
}

function TaskflowDiagramInner({ content }: TaskflowDiagramProps) {
  const { progress, updateStatus } = useTaskflowProgress(content.slug);
  const [selected, setSelected] = useState<TaskflowContentNode | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [collapsedMilestones, setCollapsedMilestones] = useState<Set<string>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Collapsible toggle handler
  const toggleCollapse = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid selecting node
    setCollapsedMilestones(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Recursive prerequisite checker
  const isNodeLocked = useCallback((nodeId: string): boolean => {
    const node = content.nodes.find(n => n.id === nodeId);
    if (!node) return false;

    // If it's a subtopic, check if its parent milestone is locked
    if (node.kind === "subtopic" && node.parentId) {
      return isNodeLocked(node.parentId);
    }

    // If it's a milestone, check if any of its incoming milestone prerequisites are not completed ("done")
    const milestonePrereqs = content.edges
      .filter(e => e.target === nodeId)
      .map(e => e.source)
      .filter(sourceId => {
        const src = content.nodes.find(n => n.id === sourceId);
        return src?.kind === "milestone";
      });

    return milestonePrereqs.some(prereqId => progress[prereqId] !== "done");
  }, [content.nodes, content.edges, progress]);

  // Calculate layout bounds to scale container height responsively with vertical stretch
  const { diagramWidth, diagramHeight } = useMemo(() => {
    if (!content.nodes.length) return { diagramWidth: 600, diagramHeight: 600 };

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    content.nodes.forEach((node) => {
      const posX = node.position?.x ?? 0;
      const posY = node.position?.y ?? 0;
      const w = node.kind === "milestone" ? 200 : 175;
      const h = node.kind === "milestone" ? 80 : 65;
      const scaledY = posY * 1.6; // Scale vertical coordinate

      if (posX < minX) minX = posX;
      if (posX + w > maxX) maxX = posX + w;
      if (scaledY < minY) minY = scaledY;
      if (scaledY + h > maxY) maxY = scaledY + h;
    });

    const width = isFinite(maxX - minX) ? maxX - minX : 600;
    const height = isFinite(maxY - minY) ? maxY - minY : 600;

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
    if (!containerWidth || !diagramWidth || isNaN(diagramWidth) || isNaN(diagramHeight) || diagramWidth === 0) {
      return 450;
    }
    const scale = Math.min(1, containerWidth / diagramWidth);
    const height = diagramHeight * scale;
    return isNaN(height) || !isFinite(height) ? 450 : Math.max(450, height);
  }, [containerWidth, diagramWidth, diagramHeight]);

  // Adjust zoom and viewport layout to fit container dimensions programmatically on resize
  useEffect(() => {
    if (containerWidth > 0 && calculatedHeight > 0 && !isNaN(calculatedHeight)) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.05, minZoom: 0.1, maxZoom: 1 });
      }, 200); // 200ms debounce (BUG-14)
      return () => clearTimeout(timer);
    }
  }, [containerWidth, calculatedHeight, fitView]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case "Escape":
          setSelected(null);
          break;
        case "0":
          fitView({ padding: 0.05, duration: 400 });
          break;
        case "+":
        case "=":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fitView, zoomIn, zoomOut]);

  // Construct Nodes with Enriched Metadata, Scaled Spacing & Filter hidden subtopics
  const nodes: Node[] = useMemo(
    () =>
      content.nodes.map((n, idx) => {
        const metadata = getNodeMetadata(n, idx, content.nodes.length);
        const locked = isNodeLocked(n.id);
        const isCollapsed = n.kind === "subtopic" && n.parentId ? collapsedMilestones.has(n.parentId) : false;
        const posX = n.position?.x ?? 0;
        const posY = n.position?.y ?? 0;
        const scaledY = posY * 1.6; // Vertical layout scaling to eliminate overlap

        return {
          id: n.id,
          type: n.kind,
          position: { x: posX, y: scaledY },
          hidden: isCollapsed,
          data: {
            label: n.label,
            status: progress[n.id] ?? "pending",
            difficulty: metadata.difficulty,
            estimatedTime: metadata.estimatedTime,
            resourceCount: n.links?.length ?? 0,
            isOptional: n.isOptional ?? false,
            isLocked: locked,
            isCollapsed: collapsedMilestones.has(n.id),
            onToggleCollapse: n.kind === "milestone" ? (e: React.MouseEvent) => toggleCollapse(n.id, e) : undefined,
          },
        };
      }),
    [content.nodes, progress, isNodeLocked, collapsedMilestones, toggleCollapse]
  );

  // Construct Edges with Dynamic Progression Coloring
  const edges: Edge[] = useMemo(() => {
    // 1. Milestone-to-milestone connections
    const baseEdges = content.edges.map((e) => {
      const status = progress[e.source] ?? "pending";
      let stroke = "var(--color-border)";
      let strokeWidth = 2;
      let animated = false;

      if (status === "done") {
        stroke = "#22c55e"; // emerald-500
        strokeWidth = 2.5;
      } else if (status === "in-progress") {
        stroke = "#eab308"; // yellow-500
        strokeWidth = 2;
        animated = true;
      } else if (status === "skipped") {
        stroke = "rgba(239, 68, 68, 0.4)"; // red-500 with opacity
        strokeWidth = 1.5;
      }

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: "bottom",
        targetHandle: "top",
        animated,
        style: {
          stroke,
          strokeWidth,
          transition: "stroke 0.4s ease, stroke-width 0.4s ease",
        },
      };
    });

    // 2. Milestone-to-subtopic connections (assigned explicitly via parentId) (BUG-32)
    const flowEdges: Edge[] = [];
    for (const node of content.nodes) {
      if (node.kind === "subtopic" && node.parentId) {
        const status = progress[node.parentId] ?? "pending";
        let stroke = "var(--color-border)";
        const strokeWidth = 2;
        let animated = false;

        if (status === "done") {
          stroke = "#22c55e"; // emerald-500
        } else if (status === "in-progress") {
          stroke = "#eab308"; // yellow-500
          animated = true;
        }

        flowEdges.push({
          id: `edge-${node.parentId}-${node.id}`,
          source: node.parentId,
          target: node.id,
          sourceHandle: "right",
          targetHandle: "left",
          animated,
          style: {
            strokeDasharray: "4 4",
            stroke,
            strokeWidth,
            transition: "stroke 0.4s ease, stroke-width 0.4s ease",
          },
        });
      }
    }

    return [...baseEdges, ...flowEdges];
  }, [content.edges, content.nodes, progress]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const original = content.nodes.find((n) => n.id === node.id) ?? null;
      if (original && !isNodeLocked(node.id)) {
        setSelected(original);
      }
    },
    [content.nodes, isNodeLocked]
  );

  // Topological recommendation calculator (Next suggested step banner)
  const nextRecommendedNode = useMemo(() => {
    const unfinished = content.nodes.find((n) => {
      const status = progress[n.id] ?? "pending";
      const isCompleted = status === "done" || status === "skipped";
      return !isCompleted && !isNodeLocked(n.id);
    });
    return unfinished || null;
  }, [content.nodes, progress, isNodeLocked]);

  // Drawer Next/Prev Navigation Calculations
  const selectedIndex = selected ? content.nodes.findIndex(n => n.id === selected.id) : -1;
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < content.nodes.length - 1;

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    if (!selected) return;
    const targetIndex = direction === "next" ? selectedIndex + 1 : selectedIndex - 1;
    const targetNode = content.nodes[targetIndex];
    if (targetNode && !isNodeLocked(targetNode.id)) {
      setSelected(targetNode);
    }
  }, [selectedIndex, content.nodes, selected, isNodeLocked]);

  // Fallback metadata details for selected node
  const selectedMetadata = useMemo(() => {
    if (!selected) return null;
    const idx = content.nodes.findIndex(n => n.id === selected.id);
    return getNodeMetadata(selected, idx, content.nodes.length);
  }, [selected, content.nodes]);

  // PNG Exporter
  const handleExportPng = useCallback(() => {
    const viewport = document.querySelector(".react-flow__viewport") as HTMLElement;
    if (!viewport) return;

    setIsExporting(true);
    toPng(viewport, {
      backgroundColor: "var(--background)",
      style: {
        transform: "translate(0px, 0px) scale(1)",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${content.slug}-roadmap.png`;
        link.href = dataUrl;
        link.click();
        setIsExporting(false);
      })
      .catch((err) => {
        console.error("PNG export failed:", err);
        setIsExporting(false);
      });
  }, [content.slug]);

  // Share progress URL encoder
  const handleShareProgress = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const serialized = btoa(JSON.stringify(progress));
      const shareUrl = `${window.location.origin}${window.location.pathname}?share=${serialized}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      });
    } catch (err) {
      console.error("Failed to share progress:", err);
    }
  }, [progress]);

  return (
    <div className="relative space-y-4">
      {/* 1. Legend Row */}
      <div className="border-b border-border/55 pb-1">
        <TaskflowLegend />
      </div>
      
      {/* 2. Action Toolbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card/50 border border-border/60 p-3 rounded-xl shadow-xs">
        {nextRecommendedNode ? (
          <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0">
            <span className="text-text-secondary">Next recommended:</span>
            <span className="text-accent font-bold truncate max-w-[140px] sm:max-w-[220px]" title={nextRecommendedNode.label}>
              {nextRecommendedNode.label}
            </span>
            <button
              onClick={() => setSelected(nextRecommendedNode)}
              className="text-[10px] bg-accent text-black px-2 py-0.5 rounded-md hover:bg-amber-600 transition-colors ml-1 cursor-pointer font-bold shrink-0"
            >
              Go →
            </button>
          </div>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPng}
            disabled={isExporting}
            className="h-8 px-3 text-xs font-semibold cursor-pointer border-border hover:border-accent hover:text-accent flex items-center gap-1.5 bg-background shrink-0"
          >
            📷 Export PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareProgress}
            className="h-8 px-3 text-xs font-semibold cursor-pointer border-border hover:border-accent hover:text-accent flex items-center gap-1.5 bg-background shrink-0"
          >
            {shareSuccess ? "✓ Copied!" : "🔗 Share Progress"}
          </Button>
        </div>
      </div>

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
          
          <MiniMap
            nodeColor={(node) => {
              const status = node.data.status ?? "pending";
              return {
                done: "#22c55e",
                "in-progress": "#eab308",
                skipped: "#ef4444",
                pending: "rgba(156, 163, 175, 0.3)",
              }[status as NodeStatus] ?? "rgba(156, 163, 175, 0.3)";
            }}
            style={{
              background: "var(--background)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              width: "120px",
              height: "90px",
            }}
            className="!bg-card !border-border shrink-0"
            position="bottom-right"
            zoomable
            pannable
          />

          <Controls
            showInteractive={false}
            position="bottom-left"
            className="!bg-card !border-border !text-text-primary fill-text-primary"
          />
        </ReactFlow>
      </div>

      <NodeDetailSheet
        node={selected}
        status={selected ? progress[selected.id] ?? "pending" : "pending"}
        onStatusChange={(status: NodeStatus) => selected && updateStatus(selected.id, status)}
        onClose={() => setSelected(null)}
        onNavigate={handleNavigate}
        hasPrev={hasPrev}
        hasNext={hasNext}
        difficulty={selectedMetadata?.difficulty}
        estimatedTime={selectedMetadata?.estimatedTime}
        whyLearn={selectedMetadata?.whyLearn}
        outcomes={selectedMetadata?.outcomes}
      />
    </div>
  );
}


