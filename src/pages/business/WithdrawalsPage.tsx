import { ArrowDownToLine } from "lucide-react";
import { AppSectionPage } from "@/pages/AppSectionPage";

export default function WithdrawalsPage() {
  return (
    <AppSectionPage
      eyebrow="Meu Negocio"
      title="Saques"
      description="Area dedicada para acompanhar retiradas, metodos de saque e status de processamento financeiro."
      icon={ArrowDownToLine}
      primaryActionLabel="Abrir Dashboard"
      primaryActionHref="/app/dashboard"
      secondaryActionLabel="Ver Vendas"
      secondaryActionHref="/app/vendas"
      highlights={[
        "Espaco pronto para historico e status de retiradas.",
        "Pode receber filtros por moeda e periodo.",
        "Mantem o fluxo financeiro do menu lateral completo.",
      ]}
    />
  );
}
