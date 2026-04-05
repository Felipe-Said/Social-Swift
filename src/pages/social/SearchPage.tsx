import { Search } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function SearchPage() {
  return (
    <AppSectionPage
      eyebrow="Social"
      title="Buscar"
      description="Encontre perfis, posts, servicos e assuntos relevantes do Social Swift em um unico lugar."
      icon={Search}
      primaryActionLabel="Voltar ao Feed"
      primaryActionHref="/app/social/feed"
      secondaryActionLabel="Abrir Marketplace"
      secondaryActionHref="/app/marketplace"
      highlights={[
        "Busca global por pessoas, publicacoes e ofertas.",
        "Espaco pronto para filtros, tendencias e historico recente.",
        "Mantem a navegacao consistente com o restante do app.",
      ]}
    />
  );
}
