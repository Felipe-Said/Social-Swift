import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SwiftCoinPriceProps {
  className?: string;
}

export function SwiftCoinPrice({ className }: SwiftCoinPriceProps) {
  const [price, setPrice] = useState(0.5823); // Preço em USDT
  const [change, setChange] = useState(2.34); // Variação em %
  const [isPositive, setIsPositive] = useState(true);

  useEffect(() => {
    // Simular flutuação de preço
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 0.01; // Variação de -0.005 a +0.005
      const newPrice = price + variation;
      const newChange = ((newPrice - 0.5823) / 0.5823) * 100;
      
      setPrice(Math.max(0.4, Math.min(0.8, newPrice))); // Manter entre 0.4 e 0.8 USDT
      setChange(Number(newChange.toFixed(2)));
      setIsPositive(newChange >= 0);
    }, 5000);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <GlassCard className={className}>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="ios-caption uppercase tracking-[0.18em]">Asset</p>
            <h3 className="text-sm font-semibold text-text">Swift Coin</h3>
          </div>
          <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
            isPositive ? 'text-green-500' : 'text-red-500'
          } ${isPositive ? 'bg-green-500/12' : 'bg-red-500/12'}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? '+' : ''}{change}%
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="ios-title text-[1.35rem] font-semibold text-text">
            {price.toFixed(4)} USDT
          </div>
          <div className="text-xs text-text-dim">
            Lastreado em USDT
          </div>
        </div>

        <motion.div 
          className="h-1 bg-border/30 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className={`h-full rounded-full ${
              isPositive ? 'bg-green-500' : 'bg-red-500'
            }`}
            initial={{ width: "50%" }}
            animate={{ 
              width: `${Math.max(10, Math.min(90, 50 + change * 2))}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </GlassCard>
  );
}
