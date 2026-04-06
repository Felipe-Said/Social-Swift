import { FormEvent, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useAuth } from "@/stores/auth";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatCoin(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
  }).format(value);
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof WalletCards;
  tone: string;
}) {
  return (
    <div className="rounded-[28px] border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-5 shadow-[var(--shadow)]">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <Badge className="rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--text-dim))] hover:bg-[hsl(var(--accent))]">
          Atualizado agora
        </Badge>
      </div>
      <div className="mt-5 space-y-1.5">
        <p className="text-sm font-medium text-[hsl(var(--text-dim))]">{title}</p>
        <p className="text-3xl font-bold tracking-tight text-[hsl(var(--text))]">{value}</p>
        <p className="text-sm leading-6 text-[hsl(var(--text-dim))]">{description}</p>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  description,
  icon: Icon,
  actionLabel,
  children,
}: {
  title: string;
  description: string;
  icon: typeof Landmark;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-6 shadow-[var(--shadow)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--accent))] text-[hsl(var(--brand))]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-[hsl(var(--text))]">{title}</h2>
            <p className="max-w-2xl text-sm leading-6 text-[hsl(var(--text-dim))]">{description}</p>
          </div>
        </div>
        {actionLabel ? (
          <Badge className="rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--text-dim))] hover:bg-[hsl(var(--accent))]">
            {actionLabel}
          </Badge>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function WalletPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const availableBalance = 18420.55;
  const retainedBalance = 3210.24;
  const refundedBalance = 890.9;
  const monthlyTransferLimit = 50000;
  const transferProcessed = 21480.34;

  const [withdrawAmount, setWithdrawAmount] = useState("3500");
  const [bankData, setBankData] = useState({
    bank: "Banco Inter",
    agency: "0001",
    account: "874563-2",
    holder: user?.name || "Felipe Said",
    document: "123.456.789-00",
  });
  const [pixKey, setPixKey] = useState(user?.email || "saidlabsglobal@gmail.com");
  const [cryptoWallet, setCryptoWallet] = useState("0x84A7...A91D");

  const withdrawPreview = useMemo(() => {
    const parsed = Number(withdrawAmount.replace(",", "."));
    if (Number.isNaN(parsed) || parsed <= 0) {
      return 0;
    }
    return Math.min(parsed, availableBalance);
  }, [withdrawAmount]);

  const transferProgress = Math.min((transferProcessed / monthlyTransferLimit) * 100, 100);

  const handleWithdraw = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Solicitacao de saque criada",
      description: `O saque de ${formatCurrency(withdrawPreview)} entrou em analise financeira.`,
    });
  };

  const handleBankSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Dados bancarios atualizados",
      description: "Sua conta bancária principal foi salva com sucesso.",
    });
  };

  const handlePixSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Chave Pix salva",
      description: "Sua chave Pix foi vinculada a carteira para futuros saques.",
    });
  };

  const handleCryptoSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Carteira cripto atualizada",
      description: "Seu endereco de recebimento foi salvo com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 sm:px-4 lg:px-0 lg:py-4">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4">
        <section className="overflow-hidden rounded-[32px] border border-[hsl(var(--stroke-soft))] bg-[linear-gradient(135deg,hsl(var(--surface))_0%,hsl(var(--surface))_36%,hsl(var(--accent))_100%)] shadow-[var(--shadow-elevated)]">
          <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.35fr_0.9fr]">
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge className="rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--brand))] hover:bg-[hsl(var(--accent))]">
                  Carteira
                </Badge>
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--text))] sm:text-5xl">
                    Gestao financeira premium para seus fundos.
                  </h1>
                  <p className="max-w-3xl text-sm leading-7 text-[hsl(var(--text-dim))] sm:text-base">
                    Centralize saldos, liquidez, dados de saque e Swift Coins em uma experiencia
                    executiva pensada para operacao profissional.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[26px] border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-5">
                  <p className="text-sm text-[hsl(var(--text-dim))]">Disponivel para saque</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[hsl(var(--text))]">
                    {formatCurrency(availableBalance)}
                  </p>
                </div>
                <div className="rounded-[26px] border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-5">
                  <p className="text-sm text-[hsl(var(--text-dim))]">Swift Coins em carteira</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[hsl(var(--text))]">
                    {formatCoin(user?.swiftBalance ?? 0)}
                  </p>
                </div>
                <div className="rounded-[26px] border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-5">
                  <p className="text-sm text-[hsl(var(--text-dim))]">SLA medio de saque</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[hsl(var(--text))]">
                    24h
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] px-4 py-2 text-sm font-medium text-[hsl(var(--text))]">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Verificacao financeira ativa
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] px-4 py-2 text-sm font-medium text-[hsl(var(--text))]">
                  <Clock3 className="h-4 w-4 text-[hsl(var(--brand))]" />
                  Janela de repasse: diaria
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] px-4 py-2 text-sm font-medium text-[hsl(var(--text))]">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Perfil financeiro premium
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-6 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[hsl(var(--text-dim))]">Volume movimentado no mes</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-[hsl(var(--text))]">
                    {formatCurrency(transferProcessed)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--accent))] text-[hsl(var(--brand))]">
                  <Banknote className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[hsl(var(--text-dim))]">Uso do limite mensal</span>
                  <span className="font-semibold text-[hsl(var(--text))]">
                    {formatCurrency(transferProcessed)} / {formatCurrency(monthlyTransferLimit)}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-[hsl(var(--accent))]">
                  <div
                    className="h-3 rounded-full bg-[linear-gradient(135deg,hsl(var(--brand-glow))_0%,hsl(var(--brand))_100%)]"
                    style={{ width: `${transferProgress}%` }}
                  />
                </div>
              </div>

              <Separator className="my-6 bg-[hsl(var(--stroke-soft))]" />

              <div className="space-y-4">
                {[
                  {
                    label: "Conta principal",
                    value: `${bankData.bank} · Ag ${bankData.agency}`,
                    icon: Building2,
                  },
                  {
                    label: "Chave Pix",
                    value: pixKey || "Nao cadastrada",
                    icon: Landmark,
                  },
                  {
                    label: "Carteira cripto",
                    value: cryptoWallet || "Nao cadastrada",
                    icon: WalletCards,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-[22px] bg-[hsl(var(--accent))] px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--surface))] text-[hsl(var(--brand))]">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-[hsl(var(--text-dim))]">{item.label}</p>
                        <p className="truncate text-sm font-semibold text-[hsl(var(--text))]">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[hsl(var(--text-dim))]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Valor disponivel"
            value={formatCurrency(availableBalance)}
            description="Saldo pronto para solicitacao de saque imediato."
            icon={ArrowDownToLine}
            tone="bg-emerald-500/12 text-emerald-500"
          />
          <SummaryCard
            title="Valor retido"
            value={formatCurrency(retainedBalance)}
            description="Montante em janela de seguranca e conciliacao."
            icon={PiggyBank}
            tone="bg-amber-500/12 text-amber-500"
          />
          <SummaryCard
            title="Valores reembolsados"
            value={formatCurrency(refundedBalance)}
            description="Total devolvido ao cliente em operacoes recentes."
            icon={BadgeCheck}
            tone="bg-sky-500/12 text-sky-500"
          />
          <SummaryCard
            title="Swift Coins"
            value={`${formatCoin(user?.swiftBalance ?? 0)} SWIFT`}
            description="Posicao atual do usuario dentro do ecossistema Swift."
            icon={Sparkles}
            tone="bg-violet-500/12 text-violet-500"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <DetailCard
            title="Efetuar saque"
            description="Solicite saques com previsao de liquidação e conferência dos dados financeiros antes do envio."
            icon={ArrowDownToLine}
            actionLabel="Fluxo protegido"
          >
            <form className="grid gap-5" onSubmit={handleWithdraw}>
              <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
                <div className="rounded-[24px] bg-[hsl(var(--accent))] p-5">
                  <p className="text-sm text-[hsl(var(--text-dim))]">Valor solicitado</p>
                  <Input
                    value={withdrawAmount}
                    onChange={(event) => setWithdrawAmount(event.target.value)}
                    inputMode="decimal"
                    className="mt-3 h-14 rounded-[20px] border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] px-5 text-2xl font-bold tracking-tight"
                    placeholder="0,00"
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["500", "1500", "3500", "5000"].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setWithdrawAmount(value)}
                        className="rounded-full border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--text))] transition hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                      >
                        {formatCurrency(Number(value))}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] bg-[hsl(var(--accent))] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-[hsl(var(--text-dim))]">Resumo do repasse</p>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[hsl(var(--text-dim))]">Disponivel</span>
                      <span className="font-semibold text-[hsl(var(--text))]">{formatCurrency(availableBalance)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[hsl(var(--text-dim))]">Taxa operacional</span>
                      <span className="font-semibold text-[hsl(var(--text))]">R$ 4,90</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[hsl(var(--text-dim))]">Liquido previsto</span>
                      <span className="font-semibold text-[hsl(var(--text))]">
                        {formatCurrency(Math.max(withdrawPreview - 4.9, 0))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[hsl(var(--text-dim))]">Prazo</span>
                      <span className="font-semibold text-[hsl(var(--text))]">Ate 1 dia util</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="h-11 rounded-full px-6">
                  Solicitar saque
                </Button>
                <Button type="button" variant="outline" className="h-11 rounded-full px-6">
                  Ver historico de repasses
                </Button>
              </div>
            </form>
          </DetailCard>

          <DetailCard
            title="Compliance e carteira Swift"
            description="Visao institucional da saude da conta, repasses elegiveis e custodia do ecossistema."
            icon={ShieldCheck}
            actionLabel="Status premium"
          >
            <div className="grid gap-4">
              <div className="rounded-[24px] bg-[linear-gradient(135deg,hsl(var(--brand))_0%,hsl(var(--brand-glow))_100%)] p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/80">Swift Coin balance</p>
                    <p className="mt-2 text-4xl font-bold tracking-tight">
                      {formatCoin(user?.swiftBalance ?? 0)}
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Pronto para uso no ecossistema Social Swift.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Conta verificada", value: "Ativa", icon: ShieldCheck },
                  { label: "Metodo de saque", value: "Banco + Pix", icon: BriefcaseBusiness },
                  { label: "Risco operacional", value: "Baixo", icon: CheckCircle2 },
                  { label: "Ultima conciliacao", value: "Hoje", icon: Clock3 },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] bg-[hsl(var(--accent))] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--surface))] text-[hsl(var(--brand))]">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <p className="mt-4 text-sm text-[hsl(var(--text-dim))]">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-[hsl(var(--text))]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </DetailCard>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <DetailCard
            title="Dados bancarios"
            description="Cadastre ou atualize a conta de recebimento principal para saques e repasses automaticos."
            icon={Building2}
          >
            <form className="grid gap-4" onSubmit={handleBankSave}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  value={bankData.bank}
                  onChange={(event) => setBankData((current) => ({ ...current, bank: event.target.value }))}
                  placeholder="Banco"
                />
                <Input
                  value={bankData.agency}
                  onChange={(event) => setBankData((current) => ({ ...current, agency: event.target.value }))}
                  placeholder="Agencia"
                />
                <Input
                  value={bankData.account}
                  onChange={(event) => setBankData((current) => ({ ...current, account: event.target.value }))}
                  placeholder="Conta"
                />
                <Input
                  value={bankData.document}
                  onChange={(event) => setBankData((current) => ({ ...current, document: event.target.value }))}
                  placeholder="CPF ou CNPJ"
                />
              </div>
              <Input
                value={bankData.holder}
                onChange={(event) => setBankData((current) => ({ ...current, holder: event.target.value }))}
                placeholder="Titular"
              />
              <Button type="submit" className="h-11 rounded-full px-6 sm:w-fit">
                Salvar dados bancarios
              </Button>
            </form>
          </DetailCard>

          <DetailCard
            title="Chave Pix"
            description="Defina uma chave Pix para acelerar repasses e liquidações da sua carteira."
            icon={Landmark}
          >
            <form className="grid gap-4" onSubmit={handlePixSave}>
              <Input
                value={pixKey}
                onChange={(event) => setPixKey(event.target.value)}
                placeholder="Digite email, telefone, CPF ou chave aleatoria"
              />
              <div className="rounded-[22px] bg-[hsl(var(--accent))] p-4 text-sm leading-6 text-[hsl(var(--text-dim))]">
                Use uma chave valida e exclusiva para reduzir falhas de repasse e acelerar a conciliacao financeira.
              </div>
              <Button type="submit" className="h-11 rounded-full px-6 sm:w-fit">
                Salvar chave Pix
              </Button>
            </form>
          </DetailCard>

          <DetailCard
            title="Carteira cripto"
            description="Vincule o endereco para recebimento futuro em ativos digitais dentro do ecossistema."
            icon={WalletCards}
          >
            <form className="grid gap-4" onSubmit={handleCryptoSave}>
              <Input
                value={cryptoWallet}
                onChange={(event) => setCryptoWallet(event.target.value)}
                placeholder="Cole aqui o endereco da carteira"
              />
              <div className="rounded-[22px] bg-[hsl(var(--accent))] p-4 text-sm leading-6 text-[hsl(var(--text-dim))]">
                Confirme a rede antes de salvar. Enderecos incorretos podem inviabilizar o recebimento do ativo.
              </div>
              <Button type="submit" className="h-11 rounded-full px-6 sm:w-fit">
                Salvar carteira cripto
              </Button>
            </form>
          </DetailCard>
        </section>
      </div>
    </div>
  );
}
