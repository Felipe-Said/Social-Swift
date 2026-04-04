import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function PrivacyPolicy() {
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
          <h1 className="text-lg font-semibold text-text">Política de Privacidade</h1>
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
              <Shield className="h-6 w-6 text-brand" />
              <h2 className="text-xl font-bold text-text">Política de Privacidade do Social Swift</h2>
            </div>
            <p className="text-text-dim">
              Sua privacidade é fundamental para nós. Esta política explica como coletamos, 
              usamos e protegemos suas informações pessoais na plataforma Social Swift.
            </p>
            <p className="text-sm text-text-dim/70 mt-2">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </GlassCard>

          {/* Sections */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">1. Informações que Coletamos</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text mb-2">Informações Pessoais:</h4>
                  <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                    <li>Nome completo e nome de usuário</li>
                    <li>Endereço de email</li>
                    <li>Data de nascimento (opcional)</li>
                    <li>Localização (opcional)</li>
                    <li>Foto de perfil e banner</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-2">Informações de Uso:</h4>
                  <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                    <li>Posts, comentários e interações</li>
                    <li>Dados de navegação e preferências</li>
                    <li>Informações de dispositivo e localização</li>
                    <li>Logs de atividade e transações</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-2">Informações Financeiras:</h4>
                  <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                    <li>Saldos de criptomoedas (Swift Coin, USDT)</li>
                    <li>Histórico de transações</li>
                    <li>Informações de pagamento (processadas por terceiros seguros)</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">2. Como Usamos suas Informações</h3>
              </div>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar transações e pagamentos</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Comunicar atualizações e novidades</li>
                <li>Garantir a segurança da plataforma</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Analisar uso da plataforma para melhorias</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">3. Proteção de Dados</h3>
              </div>
              <p className="text-text-dim mb-3">
                Implementamos medidas de segurança robustas para proteger suas informações:
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Criptografia de ponta a ponta para dados sensíveis</li>
                <li>Autenticação de dois fatores disponível</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Acesso restrito a dados pessoais</li>
                <li>Backup seguro e regular dos dados</li>
                <li>Conformidade com LGPD (Lei Geral de Proteção de Dados)</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-semibold text-text">4. Seus Direitos</h3>
              </div>
              <p className="text-text-dim mb-3">
                Você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li><strong>Acesso:</strong> Solicitar uma cópia dos seus dados</li>
                <li><strong>Retificação:</strong> Corrigir dados incorretos ou incompletos</li>
                <li><strong>Exclusão:</strong> Solicitar a remoção dos seus dados</li>
                <li><strong>Portabilidade:</strong> Transferir seus dados para outro serviço</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento dos seus dados</li>
                <li><strong>Limitação:</strong> Restringir o processamento em certas circunstâncias</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">5. Compartilhamento de Informações</h3>
              <p className="text-text-dim mb-3">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
                <li>Em caso de fusão, aquisição ou reestruturação da empresa</li>
                <li>Para proteger nossos direitos legais ou segurança</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">6. Cookies e Tecnologias Similares</h3>
              <p className="text-text-dim mb-3">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência:
              </p>
              <ul className="list-disc list-inside text-text-dim space-y-1 ml-4">
                <li>Cookies essenciais para funcionamento da plataforma</li>
                <li>Cookies de análise para entender o uso da plataforma</li>
                <li>Cookies de preferências para personalizar sua experiência</li>
                <li>Você pode gerenciar suas preferências de cookies nas configurações</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">7. Retenção de Dados</h3>
              <p className="text-text-dim">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                os propósitos descritos nesta política, a menos que um período de retenção 
                mais longo seja exigido ou permitido por lei. Dados de transações financeiras 
                podem ser retidos por períodos mais longos para fins de auditoria e conformidade.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">8. Alterações nesta Política</h3>
              <p className="text-text-dim">
                Podemos atualizar esta política de privacidade periodicamente. Notificaremos 
                sobre mudanças significativas através da plataforma ou por email. Recomendamos 
                que revise esta política regularmente.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">9. Contato</h3>
              <p className="text-text-dim mb-3">
                Se você tiver dúvidas sobre esta política de privacidade ou quiser exercer 
                seus direitos, entre em contato conosco:
              </p>
              <div className="space-y-2 text-text-dim">
                <p><strong>Email:</strong> privacidade@socialswift.com</p>
                <p><strong>Telefone:</strong> (11) 99999-9999</p>
                <p><strong>Endereço:</strong> Rua das Flores, 123 - São Paulo, SP</p>
              </div>
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
              <Link to="/politicas/termos">
                Termos de Uso
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
