"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Traverse down props.children to extract the inner code text
    const codeElement = React.Children.toArray(props.children)[0] as React.ReactElement<{ children?: React.ReactNode }>;
    const text = codeElement?.props?.children ?? "";
    
    navigator.clipboard.writeText(typeof text === "string" ? text : String(text));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code-block my-5 overflow-hidden rounded-xl border border-border bg-card">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface/80 hover:bg-card border border-border text-text-secondary opacity-0 group-hover/code-block:opacity-100 transition-opacity duration-200 z-10 cursor-pointer shadow-xs"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Pre element container */}
      <pre
        {...props}
        className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-surface"
      />
    </div>
  );
}
