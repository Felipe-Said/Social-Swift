import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/stores/auth";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithApple, isLoading, error, clearError } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const result = await signIn({ email, password });
    
    if (result.success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Social Swift",
      });
      navigate("/app/social/feed");
    } else {
      toast({
        title: "Erro no login",
        description: result.error || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    const result = await signInWithGoogle();
    
    if (result.success) {
      toast({
        title: "Redirecionando para Google...",
        description: "Complete o login em uma nova janela",
      });
    } else {
      toast({
        title: "Erro no login",
        description: result.error || "Não foi possível fazer login com Google.",
        variant: "destructive",
      });
    }
  };

  const handleAppleLogin = async () => {
    clearError();
    const result = await signInWithApple();
    
    if (result.success) {
      toast({
        title: "Redirecionando para Apple...",
        description: "Complete o login em uma nova janela",
      });
    } else {
      toast({
        title: "Erro no login",
        description: result.error || "Não foi possível fazer login com Apple.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="glass-strong border-b border-border/50 px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-lg text-text">Social Swift</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <GlassCard strong className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-text">Entrar</h1>
              <p className="text-text-dim">
                Acesse sua conta no Social Swift
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full btn-pill"
                onClick={handleAppleLogin}
                disabled={isLoading}
              >
                <div className="w-5 h-5 mr-2 bg-black dark:bg-white rounded-sm"></div>
                Continuar com Apple
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full btn-pill"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <div className="w-5 h-5 mr-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-sm"></div>
                Continuar com Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-bg px-2 text-text-dim">ou</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass border-border/30 focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass border-border/30 focus:border-brand focus:ring-1 focus:ring-brand pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-text-dim" />
                    ) : (
                      <Eye className="h-4 w-4 text-text-dim" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-border/30 text-brand focus:ring-1 focus:ring-brand"
                  />
                  <span className="text-text-dim">Lembrar de mim</span>
                </label>
                <Link to="/forgot-password" className="text-brand hover:underline">
                  Esqueci minha senha
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full gradient-brand text-white btn-pill"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-text-dim">Não tem uma conta? </span>
              <Link to="/signup" className="text-brand hover:underline font-medium">
                Criar conta
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}