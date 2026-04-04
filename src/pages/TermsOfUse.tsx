import { motion } from "framer-motion";
import { ArrowLeft, FileText, Shield, Users, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-strong border-b border-border/50 px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/signup">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-text">Termos de Uso</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Introduction */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-brand" />
              <h2 className="text-xl font-bold text-text">Termos de Uso do Social Swift</h2>
            </div>
            <p className="text-text-dim">
              Bem-vindo ao Social Swift! Estes termos de uso regem o uso da nossa plataforma social 
              integrada com sistema de pagamentos e criptomoedas.
            </p>
            <p className="text-sm text-text-dim/70 mt-2">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </GlassCard>

          {/* Sections */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">1. Aceitação dos Termos</h3>
              </div>
              <p className="text-text-dim mb-3">
                Ao criar uma conta no Social Swift, você concorda em cumprir estes termos de uso. 
                Se você não concorda com qualquer parte destes termos, não deve usar nossa plataforma.
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Você deve ter pelo menos 18 anos para usar a plataforma</li>
                <li>Você é responsável por manter a confidencialidade de sua conta</li>
                <li>Você deve fornecer informações verdadeiras e atualizadas</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">2. Uso da Plataforma</h3>
              </div>
              <p className="text-text-dim mb-3">
                O Social Swift é uma plataforma social que permite interações, compartilhamento de conteúdo 
                e transações financeiras através de criptomoedas.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-text mb-2">Conteúdo Permitido:</h4>
                  <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                    <li>Fotos e vídeos pessoais</li>
                    <li>Posts e comentários respeitosos</li>
                    <li>Conteúdo relacionado a negócios e empreendedorismo</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-2">Conteúdo Proibido:</h4>
                  <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                    <li>Conteúdo ofensivo, discriminatório ou ilegal</li>
                    <li>Spam ou conteúdo promocional excessivo</li>
                    <li>Informações falsas ou enganosas</li>
                    <li>Conteúdo que viole direitos de terceiros</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">3. Transações Financeiras</h3>
              </div>
              <p className="text-text-dim mb-3">
                O Social Swift oferece funcionalidades de pagamento através de criptomoedas (Swift Coin, USDT) 
                e moeda tradicional (Real).
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Você é responsável por todas as transações realizadas em sua conta</li>
                <li>Transações são irreversíveis após confirmação</li>
                <li>Taxas podem ser aplicadas conforme nossa política de taxas</li>
                <li>Reservamo-nos o direito de suspender transações suspeitas</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">4. Privacidade e Dados</h3>
              <p className="text-text-dim mb-3">
                Respeitamos sua privacidade e protegemos seus dados pessoais conforme nossa 
                Política de Privacidade.
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Coletamos apenas dados necessários para o funcionamento da plataforma</li>
                <li>Seus dados são protegidos com criptografia</li>
                <li>Você pode solicitar a exclusão de seus dados a qualquer momento</li>
                <li>Não vendemos seus dados pessoais para terceiros</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">5. Modificações dos Termos</h3>
              <p className="text-text-dim">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão comunicadas através da plataforma ou por email. 
                O uso continuado da plataforma após as modificações constitui aceitação dos novos termos.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">6. Contato</h3>
              <p className="text-text-dim">
                Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco através 
                do email: <span className="text-brand font-medium">suporte@socialswift.com</span>
              </p>
            </GlassCard>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center pt-6">
            <Button variant="outline" asChild>
              <Link to="/signup">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Cadastro
              </Link>
            </Button>
            <Button asChild>
              <Link to="/politicas/privacidade">
                Política de Privacidade
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
