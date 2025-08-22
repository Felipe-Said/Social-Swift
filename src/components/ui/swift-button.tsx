import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SwapModal } from "@/components/modals/swap-modal";

interface SwiftButtonProps {
  mode?: "buy" | "swap";
  size?: "sm" | "default" | "lg";
  className?: string;
  onClick?: () => void;
}

export function SwiftButton({ mode = "buy", size = "default", className, onClick }: SwiftButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const isSwap = mode === "swap";
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(true);
    }
  };
  
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleClick}
          size={size}
          className={cn(
            "gradient-brand btn-pill text-white font-semibold shadow-glow",
            "hover:shadow-glow-lg transition-all duration-300",
            "flex items-center gap-2",
            size === "sm" && "text-sm px-3 py-1.5",
            size === "lg" && "text-lg px-6 py-3",
            className
          )}
        >
          {isSwap ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <Coins className="h-4 w-4" />
          )}
          {isSwap ? "Swap Swift" : "Buy Swift"}
        </Button>
      </motion.div>
      
      <SwapModal 
        open={showModal} 
        onOpenChange={setShowModal}
      />
    </>
  );
}