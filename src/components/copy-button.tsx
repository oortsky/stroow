"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CopyButtonProps = {
  value: string | Record<string, any> | number | boolean;
  className?: string;
  /** milliseconds the "copied" state stays true (default: 2000) */
  timeout?: number;
  "aria-label"?: string;
  /** Custom success message for toast */
  successMessage?: string;
  /** Custom error message for toast */
  errorMessage?: string;
  /** Size variant for button and icon */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export function CopyButton({
  value,
  className,
  timeout = 2000,
  "aria-label": ariaLabel = "Copy to clipboard",
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy to clipboard",
  size = "md"
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const text = React.useMemo(() => {
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }, [value]);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default behavior and stop event propagation
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast.success(successMessage);

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), timeout);
    }
  };

  // Size configurations
  const sizeConfig = {
    xs: {
      button: "h-4 w-4",
      icon: "h-2.5 w-2.5"
    },
    sm: {
      button: "h-6 w-6", 
      icon: "h-3 w-3"
    },
    md: {
      button: "h-8 w-8",
      icon: "h-4 w-4"
    },
    lg: {
      button: "h-10 w-10",
      icon: "h-5 w-5"
    },
    xl: {
      button: "h-12 w-12",
      icon: "h-6 w-6"
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(
        // Circle shape with flexible dimensions
        sizeConfig[size].button,
        "rounded-full p-0",
        // Ghost button styling with hover effects
        "hover:bg-muted/80 hover:text-foreground",
        // Smooth transitions
        "transition-all duration-200 ease-in-out",
        // Focus states
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Success state styling
        copied &&
          "bg-green-100 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-950",
        className
      )}
      aria-label={ariaLabel}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className={cn(
          sizeConfig[size].icon,
          "text-green-600 dark:text-green-400"
        )} />
      ) : (
        <Copy className={cn(
          sizeConfig[size].icon,
          "text-muted-foreground hover:text-foreground transition-colors"
        )} />
      )}
    </Button>
  );
}