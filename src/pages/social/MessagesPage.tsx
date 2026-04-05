import { MessageCircle } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function MessagesPage() {
  return (
    <AppSectionPage
      eyebrow="Social"
      title="Mensagens"
      description="Centralize conversas privadas, contatos importantes e notificacoes de atendimento nesta area."
      icon={MessageCircle}
      primaryActionLabel="Ir para Amigos"
      primaryActionHref="/app/social/amigos"
      secondaryActionLabel="Voltar ao Feed"
      secondaryActionHref="/app/social/feed"
      highlights={[
        "Preparada para inbox individual e grupos.",
        "Boa base para integrar chat em tempo real depois.",
        "Mantem o item do menu lateral com destino proprio.",
      ]}
    />
  );
}
