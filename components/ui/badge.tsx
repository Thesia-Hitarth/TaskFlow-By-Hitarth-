import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none";
  
  let variantStyles = "";
  if (variant === "default") {
    variantStyles = "bg-accent text-black hover:bg-amber-600";
  } else if (variant === "outline") {
    variantStyles = "text-text-primary border border-border";
  }

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`} {...props} />
  )
}
