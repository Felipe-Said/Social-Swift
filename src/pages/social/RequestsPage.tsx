import { UserPlus } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function RequestsPage() {
  return (
    <AppSectionPage
      eyebrow="Social"
      title="Solicitacoes"
      description="Gerencie pedidos de conexao, aprovacoes pendentes e novas oportunidades de relacionamento."
      icon={UserPlus}
      primaryActionLabel="Abrir Amigos"
      primaryActionHref="/app/social/amigos"
      secondaryActionLabel="Voltar ao Feed"
      secondaryActionHref="/app/social/feed"
      highlights={[
        "Ponto unico para aprovar, recusar ou revisar convites.",
        "Pronto para futuras acoes rapidas em lote.",
        "Evita rotas vazias no submenu social.",
      ]}
    />
  );
}
