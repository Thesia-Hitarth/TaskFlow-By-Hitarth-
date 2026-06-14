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
      <SheetContent side="right" className="bg-[#1a1a1a] border-[#2a2a2a] text-[#e5e5e5] w-full sm:max-w-md">
        {node && (
          <>
            <SheetHeader>
              <SheetTitle className="text-white">{node.label}</SheetTitle>
              <SheetDescription className="text-[#737373] mt-2">{node.description}</SheetDescription>
            </SheetHeader>

            {node.links && node.links.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium text-white mb-2">Resources</p>
                {node.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md border border-[#2a2a2a] px-3 py-2 text-sm text-[#e5e5e5] hover:border-amber-500 hover:text-amber-500 transition-colors"
                  >
                    {link.title}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}

            <div className="mt-8 border-t border-[#2a2a2a] pt-6">
              <p className="text-sm font-medium text-white mb-3">Mark as</p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  className={status === "done" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-transparent border border-[#2a2a2a] text-[#e5e5e5] hover:border-green-500"}
                  onClick={() => onStatusChange(status === "done" ? "pending" : "done")}
                >
                  <Check className="h-4 w-4 mr-1" /> Done
                </Button>
                <Button
                  size="sm"
                  className={status === "in-progress" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "bg-transparent border border-[#2a2a2a] text-[#e5e5e5] hover:border-yellow-500"}
                  onClick={() => onStatusChange(status === "in-progress" ? "pending" : "in-progress")}
                >
                  <CircleDot className="h-4 w-4 mr-1" /> In Progress
                </Button>
                <Button
                  size="sm"
                  className={status === "skipped" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-transparent border border-[#2a2a2a] text-[#e5e5e5] hover:border-red-500"}
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
