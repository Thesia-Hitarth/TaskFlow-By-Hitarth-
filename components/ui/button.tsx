import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    let variantStyles = "";
    if (variant === "default") {
      variantStyles = "bg-accent text-black hover:bg-amber-600";
    } else if (variant === "outline") {
      variantStyles = "border border-border text-text-primary hover:border-accent hover:text-white bg-transparent";
    } else if (variant === "ghost") {
      variantStyles = "text-muted hover:text-white bg-transparent";
    }

    let sizeStyles = "";
    if (size === "default") {
      sizeStyles = "h-10 px-4 py-2 text-sm";
    } else if (size === "sm") {
      sizeStyles = "h-9 rounded-md px-3 text-xs";
    } else if (size === "lg") {
      sizeStyles = "h-11 rounded-md px-8 text-base";
    } else if (size === "icon") {
      sizeStyles = "h-10 w-10";
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
