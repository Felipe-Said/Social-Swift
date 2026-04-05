import { Building2 } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function ProjectsPage() {
  return (
    <AppSectionPage
      eyebrow="Meu Negocio"
      title="Projetos"
      description="Organize iniciativas, entregas, clientes e metas em uma pagina propria dentro da area de negocio."
      icon={Building2}
      primaryActionLabel="Abrir Dashboard"
      primaryActionHref="/app/dashboard"
      secondaryActionLabel="Ver Vendas"
      secondaryActionHref="/app/vendas"
      highlights={[
        "Base pronta para roadmap, pipeline e acompanhamento de entregas.",
        "Mantem o item do menu lateral com destino definido.",
        "Facilita a expansao para gestao comercial e operacional.",
      ]}
    />
  );
}
