import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Users, TrendingUp, Coins, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SwiftButton } from "@/components/ui/swift-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Rede Social Privada",
    description: "Posts, stories, chats e conexões em um ambiente premium e seguro."
  },
  {
    icon: CreditCard,
    title: "Gateway Integrado",
    description: "Aceite pagamentos por cartão, PIX e boleto com as melhores taxas."
  },
  {
    icon: Coins,
    title: "Swift Coin",
    description: "Moeda nativa com swap interno e liquidez garantida."
  },
  {
    icon: TrendingUp,
    title: "Saques e Vendas",
    description: "Gestão completa de liquidez com aprovação inteligente."
  },
  {
    icon: Shield,
    title: "Painel & Taxas",
    description: "Métricas avançadas e controle total da sua operação."
  },
  {
    icon: Zap,
    title: "Integrações",
    description: "APIs, checkout, TypeBot, quiz e muito mais em um só lugar."
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-strong border-b border-border/50 px-4 lg:px-6 h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-lg text-text">Social Swift</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-brand text-white btn-pill">
              Criar conta
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 lg:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-text leading-tight">
            Social Swift
          </h1>
          <p className="text-xl lg:text-2xl text-text-dim max-w-2xl mx-auto">
            Sua vida social e financeira, no mesmo lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-brand text-white btn-pill text-lg px-8 py-3">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <SwiftButton size="lg" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-4 lg:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-lg text-text-dim max-w-2xl mx-auto">
              Uma plataforma completa que combina rede social premium com gateway financeiro avançado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <GlassCard hover className="p-6 h-full">
                  <feature.icon className="h-10 w-10 text-brand mb-4" />
                  <h3 className="text-xl font-semibold text-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-dim">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 lg:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <GlassCard strong className="p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg text-text-dim mb-8 max-w-2xl mx-auto">
              Junte-se à comunidade de empreendedores que já transformaram seus negócios com o Social Swift.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gradient-brand text-white btn-pill">
                  Criar conta grátis
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="btn-pill">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="glass-strong border-t border-border/50 px-4 lg:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-lg text-text">Social Swift</span>
              </div>
              <p className="text-text-dim text-sm">
                A plataforma que une social e financeiro.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-text mb-4">Legal</h4>
              <div className="space-y-2">
                <Link to="/politicas/privacidade" className="block text-text-dim hover:text-brand text-sm">
                  Política de Privacidade
                </Link>
                <Link to="/politicas/termos" className="block text-text-dim hover:text-brand text-sm">
                  Termos de Uso
                </Link>
                <Link to="/politicas/cookies" className="block text-text-dim hover:text-brand text-sm">
                  Política de Cookies
                </Link>
                <Link to="/compliance-aml" className="block text-text-dim hover:text-brand text-sm">
                  Compliance AML
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text mb-4">Produto</h4>
              <div className="space-y-2">
                <a href="#" className="block text-text-dim hover:text-brand text-sm">Social</a>
                <a href="#" className="block text-text-dim hover:text-brand text-sm">Gateway</a>
                <a href="#" className="block text-text-dim hover:text-brand text-sm">Swift Coin</a>
                <a href="#" className="block text-text-dim hover:text-brand text-sm">API</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text mb-4">Contato</h4>
              <div className="space-y-2">
                <a href="mailto:contato@socialswift.com" className="block text-text-dim hover:text-brand text-sm">
                  contato@socialswift.com
                </a>
                <a href="tel:+5511999999999" className="block text-text-dim hover:text-brand text-sm">
                  +55 11 99999-9999
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 mt-8 text-center">
            <p className="text-text-dim text-sm">
              © 2024 Social Swift. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}