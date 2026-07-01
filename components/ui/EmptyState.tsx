import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-3xl bg-card/20 min-h-[320px] transition-colors duration-200">
      <div className="p-4 rounded-2xl bg-accent/10 text-accent mb-4">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-text-primary mb-1.5 tracking-tight">{title}</h3>
      <p className="text-xs text-text-secondary max-w-xs mb-5 font-medium leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="font-extrabold text-xs tracking-wide">
          {action.label}
        </Button>
      )}
    </div>
  );
}
