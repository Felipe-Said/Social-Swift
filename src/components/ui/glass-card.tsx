import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className, strong = false, hover = false }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass",
        strong && "glass-strong",
        hover && "hover-lift",
        className
      )}
    >
      {children}
    </div>
  );
}