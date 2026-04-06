import { FormEvent, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  Banknote,
  Building2,
  Coins,
  CreditCard,
  Landmark,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useAuth } from "@/stores/auth";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
  }).format(value);
}

const activityRows = [
  {
    id: "REP-2404",
    title: "Saque bancario solicitado",
    amount: 4200,
    status: "Processando",
    date: "Hoje, 10:24",
  },
  {
    id: "REP-2398",
    title: "Transferencia Pix concluida",
    amount: 1850.5,
    status: "Concluido",
    date: "Ontem, 18:07",
  },
  {
    id: "REF-1142",
    title: "Reembolso processado",
    amount: 320,
    status: "Concluido",
    date: "Ontem, 09:12",
  },
  {
    id: "REP-2384",
    title: "Repasse cripto em analise",
    amount: 6900,
    status: "Em analise",
    date: "04 abr, 15:32",
  },
];

function MiniMetric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-background px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function WalletPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const availableBalance = 18420.55;
  const retainedBalance = 3210.24;
  const refundedBalance = 890.9;
  const swiftCoins = user?.swiftBalance ?? 0;
  const monthlyLimit = 50000;
  const processedThisMonth = 21480.34;
  const processingFee = 4.9;

  const [withdrawAmount, setWithdrawAmount] = useState("3500");
  const [withdrawDestination, setWithdrawDestination] = useState("bank");
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
  }, [availableBalance, withdrawAmount]);

  const netPreview = Math.max(withdrawPreview - processingFee, 0);
  const progressValue = Math.min((processedThisMonth / monthlyLimit) * 100, 100);

  const handleWithdraw = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Saque criado",
      description: `Solicitacao de ${formatCurrency(withdrawPreview)} enviada para analise.`,
    });
  };

  const handleBankSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Dados bancarios salvos",
      description: "A conta principal foi atualizada com sucesso.",
    });
  };

  const handlePixSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Chave Pix salva",
      description: "Sua chave Pix agora esta vinculada a carteira.",
    });
  };

  const handleCryptoSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Carteira cripto salva",
      description: "O endereco de recebimento foi atualizado.",
    });
  };

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 sm:px-4 lg:px-0 lg:py-4">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 sm:gap-5">
        <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,hsl(var(--card))_0%,hsl(var(--card))_58%,hsl(var(--accent))_100%)] shadow-[var(--shadow-elevated)]">
            <CardHeader className="gap-4 p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    Carteira
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    Conta apta para saque
                  </Badge>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Compliance financeiro ativo
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-end">
                <div className="space-y-3">
                  <CardDescription className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    Fundos do usuario
                  </CardDescription>
                  <CardTitle className="text-3xl leading-tight tracking-tight sm:text-5xl">
                    {formatCurrency(availableBalance)}
                  </CardTitle>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Saldo disponivel para saque com controle de valores retidos,
                    reembolsos e recebimento por banco, Pix ou carteira cripto.
                  </p>
                </div>

                <div className="rounded-2xl border bg-background/85 p-4 backdrop-blur">
                  <p className="text-sm text-muted-foreground">Swift Coins</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {formatNumber(swiftCoins)}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Coins className="h-4 w-4 text-primary" />
                    Posicao atual no ecossistema
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid gap-3 border-t bg-background/35 p-5 sm:grid-cols-3 sm:p-7">
              <MiniMetric
                label="Disponivel"
                value={formatCurrency(availableBalance)}
                description="Pronto para saque imediato."
              />
              <MiniMetric
                label="Retido"
                value={formatCurrency(retainedBalance)}
                description="Em janela de seguranca."
              />
              <MiniMetric
                label="Reembolsado"
                value={formatCurrency(refundedBalance)}
                description="Movimentacoes devolvidas."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 sm:p-6">
              <CardDescription>Volume processado no mes</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(processedThisMonth)}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-5 pt-0 sm:p-6 sm:pt-0">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Limite mensal</span>
                <span className="font-medium">{formatCurrency(monthlyLimit)}</span>
              </div>
              <Progress value={progressValue} className="h-2.5" />
              <p className="text-sm leading-6 text-muted-foreground">
                {progressValue.toFixed(0)}% do limite mensal ja foi conciliado.
              </p>
              <Separator />
              <div className="grid gap-3">
                {[
                  {
                    icon: Building2,
                    label: "Conta bancaria",
                    value: `${bankData.bank} - ag ${bankData.agency}`,
                  },
                  {
                    icon: Landmark,
                    label: "Chave Pix",
                    value: pixKey || "Nao cadastrada",
                  },
                  {
                    icon: WalletCards,
                    label: "Carteira cripto",
                    value: cryptoWallet || "Nao cadastrada",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border bg-muted/20 px-4 py-3"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="truncate font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
          <Card>
            <CardHeader className="p-5 sm:p-6">
              <CardTitle className="text-xl">Efetuar saque</CardTitle>
              <CardDescription>
                Configure o valor, o destino e confira o liquido antes de enviar.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleWithdraw}>
                <div className="grid gap-4 md:grid-cols-[1fr_240px]">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Valor do saque</label>
                    <Input
                      value={withdrawAmount}
                      onChange={(event) => setWithdrawAmount(event.target.value)}
                      placeholder="0,00"
                      inputMode="decimal"
                      className="h-12 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Destino</label>
                    <Select
                      value={withdrawDestination}
                      onValueChange={setWithdrawDestination}
                    >
                      <SelectTrigger className="h-12 rounded-2xl">
                        <SelectValue placeholder="Selecione o destino" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="bank">Conta bancaria</SelectItem>
                          <SelectItem value="pix">Pix</SelectItem>
                          <SelectItem value="crypto">Carteira cripto</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2 sm:flex sm:flex-wrap">
                  {["500", "1500", "3500", "5000"].map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setWithdrawAmount(amount)}
                      className="justify-center rounded-full"
                    >
                      {formatCurrency(Number(amount))}
                    </Button>
                  ))}
                </div>

                <div className="grid gap-3 rounded-2xl border bg-muted/20 p-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">Disponivel</span>
                      <span className="font-medium">
                        {formatCurrency(availableBalance)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">Taxa operacional</span>
                      <span className="font-medium">
                        {formatCurrency(processingFee)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">Liquido previsto</span>
                      <span className="font-medium">{formatCurrency(netPreview)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">Prazo</span>
                      <span className="font-medium">Ate 1 dia util</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" className="h-11 sm:min-w-44">
                    <ArrowDownToLine data-icon="inline-start" />
                    Solicitar saque
                  </Button>
                  <Button type="button" variant="outline" className="h-11 sm:min-w-44">
                    <Banknote data-icon="inline-start" />
                    Ver historico
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 sm:p-6">
              <CardTitle className="text-xl">Movimentacoes recentes</CardTitle>
              <CardDescription>
                Ultimos saques, reembolsos e repasses da sua carteira.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <div className="hidden divide-y rounded-2xl border md:block">
                {activityRows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[1.1fr_0.75fr_0.65fr_0.7fr] gap-4 px-5 py-4"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{row.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{row.id}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{row.date}</div>
                    <div>
                      <Badge
                        variant={row.status === "Concluido" ? "secondary" : "outline"}
                        className="rounded-full"
                      >
                        {row.status}
                      </Badge>
                    </div>
                    <div className="text-right font-medium">
                      {formatCurrency(row.amount)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:hidden">
                {activityRows.map((row) => (
                  <div key={row.id} className="rounded-2xl border bg-background p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium">{row.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{row.id}</p>
                      </div>
                      <Badge
                        variant={row.status === "Concluido" ? "secondary" : "outline"}
                        className="shrink-0 rounded-full"
                      >
                        {row.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">{row.date}</span>
                      <span className="font-medium">{formatCurrency(row.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="p-5 sm:p-6">
            <CardTitle className="text-xl">Dados de recebimento</CardTitle>
            <CardDescription>
              Cadastre banco, Pix e carteira cripto no mesmo fluxo, com comportamento responsivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
            <Tabs defaultValue="bank" className="flex flex-col gap-4">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl p-1">
                <TabsTrigger value="bank" className="rounded-xl">
                  Banco
                </TabsTrigger>
                <TabsTrigger value="pix" className="rounded-xl">
                  Pix
                </TabsTrigger>
                <TabsTrigger value="crypto" className="rounded-xl">
                  Cripto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bank" className="mt-0">
                <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                  <form className="grid gap-4" onSubmit={handleBankSave}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        value={bankData.bank}
                        onChange={(event) =>
                          setBankData((current) => ({
                            ...current,
                            bank: event.target.value,
                          }))
                        }
                        placeholder="Banco"
                      />
                      <Input
                        value={bankData.agency}
                        onChange={(event) =>
                          setBankData((current) => ({
                            ...current,
                            agency: event.target.value,
                          }))
                        }
                        placeholder="Agencia"
                      />
                      <Input
                        value={bankData.account}
                        onChange={(event) =>
                          setBankData((current) => ({
                            ...current,
                            account: event.target.value,
                          }))
                        }
                        placeholder="Conta"
                      />
                      <Input
                        value={bankData.document}
                        onChange={(event) =>
                          setBankData((current) => ({
                            ...current,
                            document: event.target.value,
                          }))
                        }
                        placeholder="CPF ou CNPJ"
                      />
                    </div>
                    <Input
                      value={bankData.holder}
                      onChange={(event) =>
                        setBankData((current) => ({
                          ...current,
                          holder: event.target.value,
                        }))
                      }
                      placeholder="Titular"
                    />
                    <Button type="submit" className="h-11 sm:w-fit">
                      Salvar dados bancarios
                    </Button>
                  </form>

                  <div className="rounded-2xl border bg-muted/20 p-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Conta principal
                    </p>
                    <p className="mt-2 text-lg font-semibold">{bankData.bank}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Agencia {bankData.agency} • Conta {bankData.account}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Titular: {bankData.holder}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pix" className="mt-0">
                <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                  <form className="grid gap-4" onSubmit={handlePixSave}>
                    <Input
                      value={pixKey}
                      onChange={(event) => setPixKey(event.target.value)}
                      placeholder="Email, telefone, CPF ou chave aleatoria"
                    />
                    <p className="text-sm leading-6 text-muted-foreground">
                      Essa chave sera usada como destino preferencial quando o usuario escolher Pix
                      no momento do saque.
                    </p>
                    <Button type="submit" className="h-11 sm:w-fit">
                      Salvar chave Pix
                    </Button>
                  </form>

                  <div className="rounded-2xl border bg-muted/20 p-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Chave ativa
                    </p>
                    <p className="mt-2 break-all text-lg font-semibold">{pixKey}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="mt-0">
                <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                  <form className="grid gap-4" onSubmit={handleCryptoSave}>
                    <Input
                      value={cryptoWallet}
                      onChange={(event) => setCryptoWallet(event.target.value)}
                      placeholder="Endereco da carteira"
                    />
                    <p className="text-sm leading-6 text-muted-foreground">
                      Salve apenas enderecos validos e confirme a rede antes do uso em recebimentos
                      digitais.
                    </p>
                    <Button type="submit" className="h-11 sm:w-fit">
                      Salvar carteira cripto
                    </Button>
                  </form>

                  <div className="rounded-2xl border bg-muted/20 p-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Endereco salvo
                    </p>
                    <p className="mt-2 break-all text-lg font-semibold">{cryptoWallet}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
