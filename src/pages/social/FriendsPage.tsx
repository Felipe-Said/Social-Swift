import { Users } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function FriendsPage() {
  return (
    <AppSectionPage
      eyebrow="Social"
      title="Amigos"
      description="Veja conexoes, acompanhe pessoas proximas e mantenha seu circulo social organizado dentro da plataforma."
      icon={Users}
      primaryActionLabel="Ver Solicitacoes"
      primaryActionHref="/app/social/solicitacoes"
      secondaryActionLabel="Ir para Perfil"
      secondaryActionHref="/app/social/perfil"
      highlights={[
        "Espaco para lista de contatos e status de relacionamento.",
        "Pode evoluir para sugestoes de conexoes e favoritos.",
        "Ja encaixada no fluxo social principal do app.",
      ]}
    />
  );
}
