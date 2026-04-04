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
  const { signUp, signInWithGoogle, signInWithApple, isLoading, error, clearError } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
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
        title: "Aceite os termos de uso",
        description: "Para criar sua conta, você deve aceitar os Termos de Uso e Política de Privacidade.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await signUp({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao Social Swift",
      });
      navigate("/app/social/feed");
    } else {
      toast({
        title: "Erro ao criar conta",
        description: result.error || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignup = async () => {
    clearError();
    const result = await signInWithGoogle();
    
    if (result.success) {
      toast({
        title: "Redirecionando para Google...",
        description: "Complete o cadastro em uma nova janela",
      });
    } else {
      toast({
        title: "Erro no cadastro",
        description: result.error || "Não foi possível criar conta com Google.",
        variant: "destructive",
      });
    }
  };

  const handleAppleSignup = async () => {
    clearError();
    const result = await signInWithApple();
    
    if (result.success) {
      toast({
        title: "Redirecionando para Apple...",
        description: "Complete o cadastro em uma nova janela",
      });
    } else {
      toast({
        title: "Erro no cadastro",
        description: result.error || "Não foi possível criar conta com Apple.",
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
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="seu_username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="glass border-border/30 focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <p className="text-xs text-text-dim">
                  Este será seu @ no Social Swift
                </p>
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

              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    acceptedTerms 
                      ? 'bg-brand border-brand shadow-sm' 
                      : 'border-border/50 hover:border-brand hover:bg-muted/50'
                  }`}
                >
                  {acceptedTerms && <Check className="h-3 w-3 text-white" />}
                </button>
                <div className="text-sm text-text-dim leading-relaxed">
                  <span className="block">
                    Eu aceito os{" "}
                    <Link 
                      to="/politicas/termos" 
                      className="text-brand hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link 
                      to="/politicas/privacidade" 
                      className="text-brand hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidade
                    </Link>
                  </span>
                  <span className="text-xs text-text-dim/70 mt-1 block">
                    Ao criar uma conta, você concorda com nossos termos e políticas.
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full btn-pill transition-all duration-200 ${
                  !acceptedTerms 
                    ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                    : 'gradient-brand text-white hover:shadow-lg'
                }`}
                disabled={isLoading || !acceptedTerms}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Criando conta...
                  </div>
                ) : !acceptedTerms ? (
                  "Aceite os termos para continuar"
                ) : (
                  "Criar conta"
                )}
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