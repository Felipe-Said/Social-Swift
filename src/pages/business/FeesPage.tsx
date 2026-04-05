import { Percent } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function FeesPage() {
  return (
    <AppSectionPage
      eyebrow="Meu Negocio"
      title="Taxas"
      description="Consulte custos operacionais, comissoes e regras aplicadas as movimentacoes da sua operacao."
      icon={Percent}
      primaryActionLabel="Ver Projetos"
      primaryActionHref="/app/projetos"
      secondaryActionLabel="Abrir Dashboard"
      secondaryActionHref="/app/dashboard"
      highlights={[
        "Ideal para centralizar regras de cobranca e comissoes.",
        "Pronta para receber tabelas, comparativos e alertas.",
        "Ajuda a deixar a area de negocio mais completa.",
      ]}
    />
  );
}
