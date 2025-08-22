import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/stores/auth";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Erro",
        description: "Você deve aceitar os termos de uso.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Mock signup - in real app would create account then login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao Social Swift",
      });
      navigate("/app/social/feed");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Conta criada com Google!",
        description: "Bem-vindo ao Social Swift",
      });
      navigate("/app/social/feed");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar conta com Google.",
        variant: "destructive",
      });
    }
  };

  const handleAppleSignup = async () => {
    try {
      await loginWithApple();
      toast({
        title: "Conta criada com Apple!",
        description: "Bem-vindo ao Social Swift",
      });
      navigate("/app/social/feed");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar conta com Apple.",
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
              <h1 className="text-2xl font-bold text-text">Criar Conta</h1>
              <p className="text-text-dim">
                Junte-se ao Social Swift
              </p>
            </div>

            {/* Social Signup Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full btn-pill"
                onClick={handleAppleSignup}
                disabled={isLoading}
              >
                <div className="w-5 h-5 mr-2 bg-black dark:bg-white rounded-sm"></div>
                Continuar com Apple
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full btn-pill"
                onClick={handleGoogleSignup}
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

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="glass border-border/30 focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="glass border-border/30 focus:border-brand focus:ring-1 focus:ring-brand pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-text-dim" />
                    ) : (
                      <Eye className="h-4 w-4 text-text-dim" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                  className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    acceptedTerms 
                      ? 'bg-brand border-brand' 
                      : 'border-border/50 hover:border-brand'
                  }`}
                >
                  {acceptedTerms && <Check className="h-3 w-3 text-white" />}
                </button>
                <div className="text-sm text-text-dim leading-relaxed">
                  Eu aceito os{" "}
                  <Link to="/politicas/termos" className="text-brand hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link to="/politicas/privacidade" className="text-brand hover:underline">
                    Política de Privacidade
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-brand text-white btn-pill"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-text-dim">Já tem uma conta? </span>
              <Link to="/login" className="text-brand hover:underline font-medium">
                Fazer login
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}