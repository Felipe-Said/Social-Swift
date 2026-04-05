import * as React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type AvatarGroupContextValue = {
  index: number;
};

const AvatarGroupTooltipContext = React.createContext<AvatarGroupContextValue | null>(null);

export function AvatarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <TooltipProvider delayDuration={120}>
      <div className={cn("flex items-center", className)}>
        {items.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
            className={cn(index > 0 && "-ml-3")}
          >
            <AvatarGroupTooltipContext.Provider value={{ index }}>
              {child}
            </AvatarGroupTooltipContext.Provider>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function AvatarGroupTooltip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AvatarGroupTooltipContext);
  if (!context) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="absolute inset-0 z-10 rounded-full" />
      </TooltipTrigger>
      <TooltipContent className={cn("text-xs", className)}>{children}</TooltipContent>
    </Tooltip>
  );
}
