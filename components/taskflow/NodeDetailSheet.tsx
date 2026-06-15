"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, CircleDot, X } from "lucide-react";
import { TaskflowContentNode, NodeStatus } from "@/lib/taskflow-content/types";

interface Props {
  node: TaskflowContentNode | null;
  status: NodeStatus;
  onStatusChange: (status: NodeStatus) => void;
  onClose: () => void;
}

export default function NodeDetailSheet({ node, status, onStatusChange, onClose }: Props) {
  return (
    <Sheet open={!!node} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="bg-surface border-border text-text-primary w-full sm:max-w-md transition-colors duration-200">
        <SheetHeader>
          <SheetTitle className="text-text-primary text-xl font-bold tracking-tight">
            {node?.label || "Node Details"}
          </SheetTitle>
          <SheetDescription className="text-text-secondary mt-2 text-sm leading-relaxed font-medium">
            {node?.description || "Details and resources for the selected roadmap step."}
          </SheetDescription>
        </SheetHeader>

        {node && (
          <>

            {node.links && node.links.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-sm font-bold text-text-primary mb-2">Resources</p>
                {node.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5 text-sm text-text-primary hover:border-accent hover:text-accent bg-card/40 transition-colors duration-200"
                  >
                    <span className="font-semibold">{link.title}</span>
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            )}

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm font-bold text-text-primary mb-3">Mark as</p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  className={status === "done" ? "bg-green-600 hover:bg-green-700 text-white shadow-xs cursor-pointer font-semibold" : "bg-transparent border border-border text-text-primary hover:border-green-500 cursor-pointer font-semibold"}
                  onClick={() => onStatusChange(status === "done" ? "pending" : "done")}
                >
                  <Check className="h-4 w-4 mr-1" /> Done
                </Button>
                <Button
                  size="sm"
                  className={status === "in-progress" ? "bg-yellow-600 hover:bg-yellow-700 text-white shadow-xs cursor-pointer font-semibold" : "bg-transparent border border-border text-text-primary hover:border-yellow-500 cursor-pointer font-semibold"}
                  onClick={() => onStatusChange(status === "in-progress" ? "pending" : "in-progress")}
                >
                  <CircleDot className="h-4 w-4 mr-1" /> In Progress
                </Button>
                <Button
                  size="sm"
                  className={status === "skipped" ? "bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer font-semibold" : "bg-transparent border border-border text-text-primary hover:border-red-500 cursor-pointer font-semibold"}
                  onClick={() => onStatusChange(status === "skipped" ? "pending" : "skipped")}
                >
                  <X className="h-4 w-4 mr-1" /> Skip
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

