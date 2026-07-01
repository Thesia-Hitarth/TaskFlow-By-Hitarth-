"use client";

import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, CircleDot, X, ChevronLeft, ChevronRight, Video, BookOpen, Dumbbell, BookMarked, Clock, Play } from "lucide-react";
import { TaskflowContentNode, NodeStatus } from "@/lib/taskflow-content/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getExercisesForNode } from "@/lib/exercises/getAllExercises";
import { FunctionExerciseRunner } from "@/components/exercises/FunctionExerciseRunner";
import { HtmlCssJsExerciseRunner } from "@/components/exercises/HtmlCssJsExerciseRunner";
import { ExplainThisChat } from "@/components/ai/ExplainThisChat";
import { Sparkles } from "lucide-react";
import { CommentSection } from "@/components/community/CommentSection";
import { getComments } from "@/lib/actions/comments";
import { CommentWithAuthor } from "@/types/community";

interface Props {
  node: TaskflowContentNode | null;
  status: NodeStatus;
  onStatusChange: (status: NodeStatus) => void;
  onClose: () => void;
  onNavigate?: (direction: "prev" | "next") => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  roadmapId?: string;
  // Enriched metadata from fallback generator
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
  whyLearn?: string;
  outcomes?: string[];
}

type TabType = "all" | "interactive" | "video" | "article" | "docs";

const RESOURCE_ICONS: Record<string, React.ReactNode> = {
  video: <Video className="h-4 w-4 text-red-500 shrink-0" />,
  article: <BookOpen className="h-4 w-4 text-blue-500 shrink-0" />,
  interactive: <Dumbbell className="h-4 w-4 text-purple-500 shrink-0" />,
  docs: <BookMarked className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />,
  book: <BookMarked className="h-4 w-4 text-amber-600 shrink-0" />,
};

// Heuristic function to determine resource type
function getLinkType(url: string, title: string): "video" | "article" | "interactive" | "docs" | "book" {
  const u = url.toLowerCase();
  const t = title.toLowerCase();

  if (u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com") || t.includes("video") || t.includes("course")) {
    return "video";
  }
  if (u.includes("github.com") || u.includes("codepen.io") || u.includes("codesandbox.io") || u.includes("stackblitz.com") || u.includes("leetcode") || u.includes("hackerrank") || t.includes("practice") || t.includes("exercise") || t.includes("challenge") || t.includes("game") || t.includes("froggy")) {
    return "interactive";
  }
  if (u.includes("docs") || u.includes("reference") || u.includes("developer.mozilla.org") || t.includes("documentation") || t.includes("reference") || t.includes("docs")) {
    return "docs";
  }
  if (t.includes("book") || t.includes("pdf")) {
    return "book";
  }
  return "article";
}

export default function NodeDetailSheet({
  node,
  roadmapId,
  status,
  onStatusChange,
  onClose,
  onNavigate,
  hasPrev = false,
  hasNext = false,
  difficulty = "beginner",
  estimatedTime = "2–4 hours",
  whyLearn,
  outcomes = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [sheetTab, setSheetTab] = useState<"learn" | "practice">("learn");
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // Swipe-down-to-close logic on mobile
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = touchCurrentY.current - touchStartY.current;
    if (deltaY > 100) {
      onClose();
    }
    touchStartY.current = 0;
    touchCurrentY.current = 0;
  };

  // Load exercises for the active node
  const exercises = node && roadmapId ? getExercisesForNode(roadmapId, node.id) : [];

  // Reset tab when switching nodes
  useEffect(() => {
    setActiveTab("all");
    setSheetTab("learn");
    setSelectedExerciseId(null);
    setShowAIChat(false);
  }, [node?.id]);

  // Load comments for the active node
  const [nodeComments, setNodeComments] = useState<CommentWithAuthor[]>([]);
  useEffect(() => {
    if (node && roadmapId) {
      setNodeComments([]);
      getComments({ nodeTarget: `${roadmapId}:${node.id}` }).then((commentsList) => {
        setNodeComments((commentsList as CommentWithAuthor[]) || []);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.id, roadmapId]);

  const links = node?.links || [];
  
  // Enrich links with type heuristics
  const enrichedLinks = links.map(link => {
    const type = getLinkType(link.url, link.title);
    return {
      ...link,
      type,
      duration: link.duration || (type === "video" ? "10 min" : type === "interactive" ? "30 min" : "15 min read"),
      free: link.free !== false,
      recommended: link.recommended || links[0] === link,
      description: link.description || "Highly recommended community learning resource for this topic.",
    };
  });

  const filteredLinks = enrichedLinks.filter(
    link => activeTab === "all" || link.type === activeTab
  );

  const outcomesChecklist = outcomes.length > 0 ? outcomes : [
    `Understand the fundamental concepts of ${node?.label || "this topic"}.`,
    `Learn how to apply ${node?.label || "this topic"} in practical scenarios.`,
    `Review recommended resources and build simple exercises.`,
  ];

  return (
    <Sheet open={!!node} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "bg-surface border-border text-text-primary transition-colors duration-200 overflow-y-auto [&>button]:hidden",
          isMobile
            ? "w-full max-h-[85vh] rounded-t-3xl border-t border-border shadow-2xl"
            : "w-full sm:max-w-md md:max-w-lg h-full"
        )}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {isMobile && (
          <div className="flex justify-center pt-2 pb-1.5 shrink-0 select-none">
            <div className="w-12 h-1.5 rounded-full bg-border" />
          </div>
        )}
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-card text-text-secondary transition-colors"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>

          {onNavigate && (
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("prev")}
                disabled={!hasPrev}
                className="h-8 px-2.5 text-xs font-semibold cursor-pointer border-border hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-0.5" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("next")}
                disabled={!hasNext}
                className="h-8 px-2.5 text-xs font-semibold cursor-pointer border-border hover:border-accent hover:text-accent"
              >
                Next <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </Button>
            </div>
          )}
        </div>

        {node && (
          <div className="space-y-6">
            <SheetHeader className="text-left">
              <SheetTitle className="text-text-primary text-2xl font-bold tracking-tight">
                {node.label}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Detailed information, recommended reading materials, exercises, and community discussions for the learning path node: {node.label}.
              </SheetDescription>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                  difficulty === "beginner" && "text-green-600 bg-green-500/10 dark:text-green-400",
                  difficulty === "intermediate" && "text-yellow-600 bg-yellow-500/10 dark:text-yellow-400",
                  difficulty === "advanced" && "text-red-600 bg-red-500/10 dark:text-red-400"
                )}>
                  {difficulty}
                </span>
                <span className="text-xs text-text-secondary flex items-center gap-1 font-medium bg-card px-2 py-0.5 rounded-full border border-border">
                  <Clock className="h-3 w-3 text-text-secondary/60" /> {estimatedTime}
                </span>
                {node.isOptional && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-border text-text-secondary">
                    Optional
                  </span>
                )}
              </div>
            </SheetHeader>

            {/* Learn vs Practice Tabs */}
            {exercises.length > 0 && (
              <div className="flex border-b border-border/40 pb-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSheetTab("learn")}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider pb-1 border-b-2 cursor-pointer transition-colors",
                    sheetTab === "learn"
                      ? "border-accent text-accent"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  )}
                >
                  Learn
                </button>
                <button
                  type="button"
                  onClick={() => setSheetTab("practice")}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider pb-1 border-b-2 cursor-pointer transition-colors",
                    sheetTab === "practice"
                      ? "border-accent text-accent"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  )}
                >
                  Practice ({exercises.length})
                </button>
              </div>
            )}

            {sheetTab === "learn" ? (
              <>
                {/* Why Learn This */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                      Why Learn This?
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowAIChat(prev => !prev)}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-accent hover:underline cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3 animate-pulse text-accent" /> {showAIChat ? "Hide AI Assistant" : "Ask AI"}
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-medium">
                    {whyLearn || node.description}
                  </p>
                </div>

                {showAIChat ? (
                  <div className="pt-2">
                    <ExplainThisChat
                      roadmapId={roadmapId || ""}
                      nodeId={node.id}
                      nodeLabel={node.label}
                      onClose={() => setShowAIChat(false)}
                    />
                  </div>
                ) : (
                  <>
                    {/* Key Outcomes */}
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                        Key Outcomes
                      </h3>
                      <ul className="space-y-2">
                        {outcomesChecklist.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary font-medium">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-card text-accent mt-0.5">
                              {status === "done" ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />}
                            </span>
                            <span className={cn(status === "done" && "line-through text-text-secondary/60")}>
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Related Guides on TaskFlow */}
                    {node.relatedGuides && node.relatedGuides.length > 0 && (
                      <div data-tour="related-guides" className="space-y-3 pb-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                          Related Guides on TaskFlow
                        </h3>
                        <div className="space-y-2">
                          {node.relatedGuides.map((guide) => (
                            <Link
                              key={guide.slug}
                              href={`/guides/${guide.slug}`}
                              className="flex items-center justify-between p-3 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-accent/40 transition-all duration-200 group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-xs select-none">📖</span>
                                <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug truncate">
                                  {guide.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-text-secondary shrink-0 ml-2 bg-background border border-border px-2 py-0.5 rounded-full font-sans">
                                ⏱ {guide.readTime} min
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resources Section with Tabs */}
                    {enrichedLinks.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                          Resources ({enrichedLinks.length})
                        </h3>

                        {/* Categories Tab Bar */}
                        <div className="flex flex-wrap gap-1 border-b border-border/40 pb-2">
                          {(["all", "interactive", "video", "article", "docs"] as TabType[]).map((tab) => {
                            const count = tab === "all" ? enrichedLinks.length : enrichedLinks.filter(l => l.type === tab).length;
                            if (count === 0 && tab !== "all") return null;

                            const tabLabels: Record<TabType, string> = {
                              all: "All",
                              interactive: "🏋️ Practice",
                              video: "📹 Videos",
                              article: "📖 Articles",
                              docs: "📚 Docs",
                            };

                            return (
                              <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                  "px-2.5 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer",
                                  activeTab === tab
                                    ? "bg-accent/10 text-accent font-bold"
                                    : "bg-transparent text-text-secondary hover:bg-card"
                                )}
                              >
                                {tabLabels[tab]}
                              </button>
                            );
                          })}
                        </div>

                        {/* Resource List */}
                        <div className="space-y-2">
                          {filteredLinks.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 group text-left",
                                "hover:shadow-xs hover:-translate-y-[1px]",
                                link.recommended
                                  ? "border-accent/30 bg-accent/5"
                                  : "border-border bg-card/40"
                              )}
                              aria-label={`${link.title} (opens in new tab)`}
                            >
                              <div className="p-1.5 rounded-lg bg-surface border border-border mt-0.5">
                                {RESOURCE_ICONS[link.type] || <BookOpen className="h-4 w-4 text-text-secondary shrink-0" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug truncate">
                                    {link.title}
                                  </p>
                                  <ExternalLink className="h-3.5 w-3.5 text-text-secondary/60 shrink-0 mt-0.5" aria-hidden="true" />
                                </div>
                                <p className="text-xs text-text-secondary mt-1 font-medium leading-relaxed">
                                  {link.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  {link.free && (
                                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      Free
                                    </span>
                                  )}
                                  {link.recommended && (
                                    <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      Top Pick
                                    </span>
                                  )}
                                  {link.duration && (
                                    <span className="text-[10px] text-text-secondary/70 flex items-center gap-0.5 font-medium">
                                      ⏱ {link.duration}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Mark as Status Panel */}
                <div className="border-t border-border pt-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                    Status
                  </h3>
                  {node.kind === "milestone" ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "h-3 w-3 rounded-full border",
                          status === "done" && "bg-green-500 border-green-500",
                          status === "in-progress" && "bg-yellow-500 border-yellow-500 animate-pulse",
                          status === "skipped" && "bg-red-500 border-red-500",
                          status === "pending" && "border-border bg-transparent"
                        )} />
                        <span className="text-sm font-semibold capitalize text-text-primary">
                          {status === "pending" ? "Not Started" : status === "in-progress" ? "In Progress" : status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        This is a parent milestone. Its status is computed automatically based on the completion of its subtopics.
                      </p>
                    </div>
                  ) : (
                    <div data-tour="status-buttons" className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        className={cn(
                          "cursor-pointer font-bold rounded-lg border",
                          status === "done"
                            ? "bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-xs"
                            : "bg-transparent border-border text-text-primary hover:border-green-500 hover:bg-green-500/5"
                        )}
                        onClick={() => onStatusChange(status === "done" ? "pending" : "done")}
                      >
                        <Check className="h-4 w-4 mr-1.5" /> Completed
                      </Button>
                      <Button
                        size="sm"
                        className={cn(
                          "cursor-pointer font-bold rounded-lg border",
                          status === "in-progress"
                            ? "bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600 shadow-xs"
                            : "bg-transparent border-border text-text-primary hover:border-yellow-500 hover:bg-yellow-500/5"
                        )}
                        onClick={() => onStatusChange(status === "in-progress" ? "pending" : "in-progress")}
                      >
                        <CircleDot className="h-4 w-4 mr-1.5" /> In Progress
                      </Button>
                      <Button
                        size="sm"
                        className={cn(
                          "cursor-pointer font-bold rounded-lg border",
                          status === "skipped"
                            ? "bg-red-600 hover:bg-red-700 text-white border-red-600 shadow-xs"
                            : "bg-transparent border-border text-text-primary hover:border-red-500 hover:bg-red-500/5"
                        )}
                        onClick={() => onStatusChange(status === "skipped" ? "pending" : "skipped")}
                      >
                        <X className="h-4 w-4 mr-1.5" /> Skip
                      </Button>
                    </div>
                  )}
                </div>

                {/* Comments Section */}
                {node && roadmapId && (
                  <div className="border-t border-border pt-6">
                    <CommentSection
                      initialComments={nodeComments}
                      nodeTarget={`${roadmapId}:${node.id}`}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4 pt-2">
                {selectedExerciseId === null && exercises.length > 1 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-text-secondary font-medium">Select an exercise to practice:</p>
                    <div className="space-y-2">
                      {exercises.map((ex) => (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => setSelectedExerciseId(ex.id)}
                          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-all text-left group cursor-pointer"
                        >
                          <div>
                            <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                              <span>🏋️</span> {ex.title}
                            </p>
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-text-secondary/70 bg-background border border-border px-1.5 py-0.5 rounded mt-1.5 inline-block">
                              {ex.difficulty} • {ex.type === "function" ? "logic" : "visual"}
                            </span>
                          </div>
                          <Play size={14} className="text-text-secondary group-hover:text-accent transition-colors mr-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setSelectedExerciseId(null)}
                        className="mb-4 text-xs font-bold text-accent hover:underline cursor-pointer flex items-center gap-1"
                      >
                        ← Back to all exercises
                      </button>
                    )}
                    {(() => {
                      const activeEx = exercises.find(e => e.id === selectedExerciseId) || exercises[0];
                      if (activeEx.type === "function") {
                        return <FunctionExerciseRunner exercise={activeEx} onSolved={() => onStatusChange("done")} />;
                      } else {
                        return <HtmlCssJsExerciseRunner exercise={activeEx} onSolved={() => onStatusChange("done")} />;
                      }
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}


