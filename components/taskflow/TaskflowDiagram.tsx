"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ReactFlow, Background, Node, Edge, NodeMouseHandler, ReactFlowProvider, useReactFlow, useViewport, Controls } from "@xyflow/react";
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
import { getNextNode } from "@/lib/roadmap/getNextNode";
import { fireCelebration, fireBadgeCelebration } from "@/lib/ui/confetti";
import { BadgeToast } from "@/components/ui/BadgeToast";

interface TaskflowDiagramProps {
  content: TaskflowContent;
}

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
  const [unlockedBadgeId, setUnlockedBadgeId] = useState<string | null>(null);

  const nextRecommendedNode = useMemo(() => {
    return getNextNode(content.nodes, content.edges, progress);
  }, [content.nodes, content.edges, progress]);

  const nextRecommendedParent = useMemo(() => {
    if (!nextRecommendedNode || !nextRecommendedNode.parentId) return null;
    return content.nodes.find((n) => n.id === nextRecommendedNode.parentId) || null;
  }, [nextRecommendedNode, content.nodes]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [collapsedMilestones, setCollapsedMilestones] = useState<Set<string>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Dynamically enable pan/scroll-lock only when user has zoomed in past the default fit level
  const { zoom } = useViewport();
  const isZoomedIn = zoom > 1.05; // threshold just above 1x to avoid floating-point edge cases

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

  // Helper to compute milestone status dynamically based on nested subtopics
  const getMilestoneStatus = useCallback((milestoneId: string): NodeStatus => {
    const children = content.nodes.filter(child => child.parentId === milestoneId && child.kind === "subtopic");
    if (children.length > 0) {
      const childStatuses = children.map(child => progress[child.id] ?? "pending");
      const allDone = childStatuses.every(s => s === "done");
      const allPending = childStatuses.every(s => s === "pending");
      if (allDone) return "done";
      if (allPending) return "pending";
      return "in-progress";
    }
    return (progress[milestoneId] ?? "pending") as NodeStatus;
  }, [content.nodes, progress]);

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

    return milestonePrereqs.some(prereqId => {
      const status = getMilestoneStatus(prereqId);
      return status !== "done";
    });
  }, [content.nodes, content.edges, getMilestoneStatus]);

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
      }, 200);
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

  // Construct Nodes with Enriched Metadata, Scaled Spacing & Filter out hidden subtopics completely
  const nodes: Node[] = useMemo(() => {
    const visibleNodes: Node[] = [];
    content.nodes.forEach((n, idx) => {
      // If it's a subtopic, check if its parent milestone is collapsed
      const isCollapsed = n.kind === "subtopic" && n.parentId ? collapsedMilestones.has(n.parentId) : false;
      if (isCollapsed) return; // Do not include in ReactFlow nodes array!

      const metadata = getNodeMetadata(n, idx, content.nodes.length);
      const locked = isNodeLocked(n.id);
      const posX = n.position?.x ?? 0;
      const posY = n.position?.y ?? 0;
      const scaledY = posY * 1.6;

      visibleNodes.push({
        id: n.id,
        type: n.kind,
        position: { x: posX, y: scaledY },
        data: {
          label: n.label,
          status: n.kind === "milestone" ? getMilestoneStatus(n.id) : (progress[n.id] ?? "pending"),
          difficulty: metadata.difficulty,
          estimatedTime: metadata.estimatedTime,
          resourceCount: n.links?.length ?? 0,
          isOptional: n.isOptional ?? false,
          isLocked: locked,
          isCollapsed: collapsedMilestones.has(n.id),
          onToggleCollapse: n.kind === "milestone" ? (e: React.MouseEvent) => toggleCollapse(n.id, e) : undefined,
        },
      });
    });
    return visibleNodes;
  }, [content.nodes, progress, isNodeLocked, collapsedMilestones, toggleCollapse, getMilestoneStatus]);

  // Construct Edges with Dynamic Progression Coloring & filter out hidden ones
  const edges: Edge[] = useMemo(() => {
    // Build set of visible node IDs for fast O(1) lookup
    const visibleNodeIds = new Set(nodes.map(n => n.id));

    // 1. Milestone-to-milestone connections
    const baseEdges = content.edges
      .filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map((e) => {
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

    // 2. Milestone-to-subtopic connections (assigned explicitly via parentId)
    const flowEdges: Edge[] = [];
    for (const node of content.nodes) {
      if (node.kind === "subtopic" && node.parentId) {
        // Only render edge if both milestone and subtopic are visible!
        if (!visibleNodeIds.has(node.parentId) || !visibleNodeIds.has(node.id)) {
          continue;
        }

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
  }, [content.edges, content.nodes, progress, nodes]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const original = content.nodes.find((n) => n.id === node.id) ?? null;
      if (original && !isNodeLocked(node.id)) {
        setSelected(original);
      }
    },
    [content.nodes, isNodeLocked]
  );



  // Compute dynamic status to pass to detail sheet (e.g. for milestones)
  const selectedStatus = useMemo(() => {
    if (!selected) return "pending" as NodeStatus;
    if (selected.kind === "milestone") {
      return getMilestoneStatus(selected.id);
    }
    return (progress[selected.id] ?? "pending") as NodeStatus;
  }, [selected, progress, getMilestoneStatus]);

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

  const handleStatusChange = useCallback(async (nodeId: string, newStatus: NodeStatus) => {
    const result = await updateStatus(nodeId, newStatus);
    if (newStatus === "done" && result?.success) {
      // Confetti burst for completion!
      fireCelebration();

      // Show badge unlock toast if any were earned
      if (result.badgesAwarded && result.badgesAwarded.length > 0) {
        // Extra celebrate confetti for badges
        fireBadgeCelebration();
        setUnlockedBadgeId(result.badgesAwarded[0]);
      }
    }
  }, [updateStatus]);

  return (
    <div className="relative space-y-4">
      {/* 1. Legend Row */}
      <div className="border-b border-border/55 pb-1">
        <TaskflowLegend />
      </div>

      {/* 2. Action Toolbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card/50 border border-border/60 p-3 rounded-xl shadow-xs">
        {nextRecommendedNode ? (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0">
            <span className="text-text-secondary">Next recommended:</span>
            <span className="text-amber-500 font-bold truncate max-w-[180px] sm:max-w-[320px]" title={nextRecommendedParent ? `${nextRecommendedParent.label} > ${nextRecommendedNode.label}` : nextRecommendedNode.label}>
              {nextRecommendedParent ? (
                <>
                  <span className="opacity-75 text-amber-500/80 font-normal">{nextRecommendedParent.label}</span>
                  <span className="mx-1 text-amber-500/60 font-normal">&gt;</span>
                  <span>{nextRecommendedNode.label}</span>
                </>
              ) : (
                nextRecommendedNode.label
              )}
            </span>
            <button
              onClick={() => setSelected(nextRecommendedNode)}
              className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-md hover:bg-amber-600 transition-colors ml-1 cursor-pointer font-bold shrink-0"
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

      {/* Outer container is always mounted so ResizeObserver can measure its width */}
      <div
        ref={containerRef}
        style={{ height: `${calculatedHeight}px` }}
        className="w-full rounded-xl border border-border/50 bg-surface/30 overflow-hidden relative transition-colors duration-200"
      >
        {/* Only mount ReactFlow AFTER container dimensions are known — prevents all NaN SVG errors */}
        {containerWidth > 0 ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            onNodeClick={onNodeClick}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            zoomOnScroll={false}
            zoomOnPinch
            zoomOnDoubleClick={false}
            panOnDrag={isZoomedIn}
            panOnScroll={false}
            preventScrolling={isZoomedIn}
            proOptions={{ hideAttribution: true }}
            fitView
            fitViewOptions={{
              padding: 0.1,
              minZoom: 0.1,
              maxZoom: 2,
            }}
          >
            <Background color="var(--color-border)" gap={24} />
            <Controls
              showInteractive={false}
              position="bottom-left"
              className="!bg-card !border-border !text-text-primary fill-text-primary"
            />

            {/* Context-aware hint badge */}
            <div
              className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-2.5 py-1 text-[10px] text-text-secondary pointer-events-none select-none transition-all duration-300"
            >
              {isZoomedIn ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3 1h4M3 9h4M1 3v4M9 3v4M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Drag to pan · Use ⊞ to reset
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 7.5v2M3.5 6.5L2 8M6.5 6.5L8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Zoom in to explore · Drag to pan
                </>
              )}
            </div>
          </ReactFlow>
        ) : (
          /* Loading skeleton — shown for one frame until ResizeObserver fires */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-text-secondary/50">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              <span className="text-xs font-medium">Loading roadmap…</span>
            </div>
          </div>
        )}
      </div>

      <NodeDetailSheet
        node={selected}
        status={selectedStatus}
        onStatusChange={(status: NodeStatus) => selected && handleStatusChange(selected.id, status)}
        onClose={() => setSelected(null)}
        onNavigate={handleNavigate}
        hasPrev={hasPrev}
        hasNext={hasNext}
        difficulty={selectedMetadata?.difficulty}
        estimatedTime={selectedMetadata?.estimatedTime}
        whyLearn={selectedMetadata?.whyLearn}
        outcomes={selectedMetadata?.outcomes}
      />

      <BadgeToast
        badgeId={unlockedBadgeId}
        onDismiss={() => setUnlockedBadgeId(null)}
      />
    </div>
  );
}


