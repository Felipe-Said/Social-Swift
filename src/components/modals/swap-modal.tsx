import { useState } from "react";
import { ArrowUpDown, Coins, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SwapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SwapModal({ open, onOpenChange }: SwapModalProps) {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("SWIFT");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSwap = async () => {
    if (!amount) return;
    
    setIsProcessing(true);
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Transação realizada!",
      description: `Swap de ${amount} ${fromCurrency} para ${toCurrency} processado com sucesso.`,
    });
    
    setIsProcessing(false);
    setAmount("");
    onOpenChange(false);
  };

  const handleBuy = async () => {
    if (!amount) return;
    
    setIsProcessing(true);
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Compra realizada!",
      description: `Compra de ${amount} Swift Coins processada com sucesso.`,
    });
    
    setIsProcessing(false);
    setAmount("");
    onOpenChange(false);
  };

  const exchangeRate = fromCurrency === "BRL" ? 3.15 : 0.32;
  const estimatedReceive = amount ? (parseFloat(amount) * exchangeRate).toFixed(2) : "0.00";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-text">Swift Coin</DialogTitle>
          <DialogDescription className="text-text-dim">
            Compre ou faça swap de Swift Coins
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass">
            <TabsTrigger value="buy" className="data-[state=active]:bg-brand data-[state=active]:text-white">
              Comprar
            </TabsTrigger>
            <TabsTrigger value="swap" className="data-[state=active]:bg-brand data-[state=active]:text-white">
              Swap
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="buy-amount">Valor (BRL)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-dim" />
                  <Input
                    id="buy-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 glass border-border/30 focus:border-brand"
                  />
                </div>
              </div>

              <GlassCard className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-dim text-sm">Você receberá</span>
                  <div className="text-right">
                    <p className="font-semibold text-brand">{estimatedReceive} SC</p>
                    <p className="text-xs text-text-dim">Taxa: R$ 3,15 / SC</p>
                  </div>
                </div>
              </GlassCard>

              <Button
                onClick={handleBuy}
                disabled={!amount || isProcessing}
                className="w-full gradient-brand text-white btn-pill"
              >
                {isProcessing ? "Processando..." : "Comprar Swift Coin"}
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="swap" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>De</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 glass border-border/30 focus:border-brand"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setFromCurrency(fromCurrency === "BRL" ? "SWIFT" : "BRL")}
                      className="glass px-4"
                    >
                      {fromCurrency}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFromCurrency(toCurrency);
                      setToCurrency(fromCurrency);
                    }}
                    className="rounded-full glass hover:bg-brand/20"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Para</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={estimatedReceive}
                      readOnly
                      className="flex-1 glass border-border/30 bg-muted/50"
                    />
                    <Button
                      variant="outline"
                      disabled
                      className="glass px-4"
                    >
                      {toCurrency}
                    </Button>
                  </div>
                </div>
              </div>

              <GlassCard className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-dim">Taxa de câmbio</span>
                    <span className="text-text">1 {fromCurrency} = {exchangeRate} {toCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-dim">Taxa de transação</span>
                    <span className="text-text">0.1%</span>
                  </div>
                </div>
              </GlassCard>

              <Button
                onClick={handleSwap}
                disabled={!amount || isProcessing}
                className="w-full gradient-brand text-white btn-pill"
              >
                {isProcessing ? "Processando..." : "Realizar Swap"}
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}