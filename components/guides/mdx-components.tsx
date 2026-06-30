import React from "react";
import { AlertTriangle, Lightbulb, Info, CheckCircle } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

export const mdxComponents = {
  // Override default <pre> for code highlighting + copy button
  pre: CodeBlock,

  // Tip Callout Box
  Tip: ({ children }: { children: React.ReactNode }) => (
    <div className="not-prose flex gap-3 p-4 my-5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-text-primary">
      <Lightbulb className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
      <div className="text-sm text-text-secondary/90 leading-relaxed font-medium">
        {children}
      </div>
    </div>
  ),

  // Warning Callout Box
  Warning: ({ children }: { children: React.ReactNode }) => (
    <div className="not-prose flex gap-3 p-4 my-5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-text-primary">
      <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
      <div className="text-sm text-text-secondary/90 leading-relaxed font-medium">
        {children}
      </div>
    </div>
  ),

  // Note Callout Box
  Note: ({ children }: { children: React.ReactNode }) => (
    <div className="not-prose flex gap-3 p-4 my-5 rounded-xl bg-slate-500/5 border border-border text-text-primary">
      <Info className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
      <div className="text-sm text-text-secondary/90 leading-relaxed font-medium">
        {children}
      </div>
    </div>
  ),

  // KeyTakeaway Callout Box
  KeyTakeaway: ({ children }: { children: React.ReactNode }) => (
    <div className="not-prose flex gap-3 p-4 my-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-text-primary">
      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
      <div className="text-sm text-text-secondary/95 leading-relaxed font-bold">
        {children}
      </div>
    </div>
  ),
};
