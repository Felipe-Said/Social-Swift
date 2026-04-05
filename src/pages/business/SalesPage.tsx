import { CreditCard } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function SalesPage() {
  return (
    <AppSectionPage
      eyebrow="Meu Negocio"
      title="Vendas"
      description="Monitore pedidos pagos, faturamento e desempenho comercial com uma base pronta para expansao."
      icon={CreditCard}
      primaryActionLabel="Ir para Taxas"
      primaryActionHref="/app/taxas"
      secondaryActionLabel="Abrir Marketplace"
      secondaryActionHref="/app/marketplace"
      highlights={[
        "Pensada para historico comercial e visao operacional.",
        "Facilita futura integracao com gateways e pedidos reais.",
        "Remove o placeholder generico da navegacao.",
      ]}
    />
  );
}
