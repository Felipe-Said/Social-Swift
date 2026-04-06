import { FormEvent, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  BadgeCheck,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const settlementRows = [
  {
    id: "REP-2404",
    type: "Saque bancario",
    status: "Processando",
    amount: 4200.0,
    date: "Hoje, 10:24",
  },
  {
    id: "REP-2398",
    type: "Transferencia Pix",
    status: "Concluido",
    amount: 1850.5,
    date: "Ontem, 18:07",
  },
  {
    id: "REF-1142",
    type: "Reembolso",
    status: "Concluido",
    amount: 320.0,
    date: "Ontem, 09:12",
  },
  {
    id: "REP-2384",
    type: "Carteira cripto",
    status: "Em analise",
    amount: 6900.0,
    date: "04 abr, 15:32",
  },
];

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof WalletCards;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div className="flex flex-col gap-1">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl">{value}</CardTitle>
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function WalletPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const availableBalance = 18420.55;
  const retainedBalance = 3210.24;
  const refundedBalance = 890.9;
  const swiftCoins = user?.swiftBalance ?? 0;
  const processingFee = 4.9;
  const monthlyLimit = 50000;
  const processedThisMonth = 21480.34;

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
  }, [withdrawAmount, availableBalance]);

  const netPreview = Math.max(withdrawPreview - processingFee, 0);
  const progressValue = Math.min((processedThisMonth / monthlyLimit) * 100, 100);

  const handleWithdraw = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Solicitacao registrada",
      description: `Seu saque de ${formatCurrency(withdrawPreview)} foi enviado para analise.`,
    });
  };

  const handleBankSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Dados bancarios atualizados",
      description: "A conta principal de recebimento foi salva com sucesso.",
    });
  };

  const handlePixSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Chave Pix vinculada",
      description: "Sua chave Pix foi associada a carteira.",
    });
  };

  const handleCryptoSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Carteira cripto salva",
      description: "O endereco de recebimento foi atualizado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 sm:px-4 lg:px-0 lg:py-4">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="gap-6 border-b">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex max-w-3xl flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    Carteira
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    Operacao financeira ativa
                  </Badge>
                </div>
                <CardTitle className="text-3xl sm:text-4xl">Fundos, repasses e Swift Coins</CardTitle>
                <CardDescription className="max-w-2xl text-sm leading-6">
                  Controle seus saldos, acompanhe valores retidos e configure seus meios de
                  recebimento em uma visao unica de carteira.
                </CardDescription>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
                <div className="rounded-xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Limite mensal processado</p>
                  <p className="mt-2 text-2xl font-semibold">{formatCurrency(processedThisMonth)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    de {formatCurrency(monthlyLimit)}
                  </p>
                </div>
                <div className="rounded-xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Swift Coins</p>
                  <p className="mt-2 text-2xl font-semibold">{formatNumber(swiftCoins)} SWIFT</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Saldo atual do ecossistema
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Disponivel para saque"
                value={formatCurrency(availableBalance)}
                description="Saldo liberado para repasse imediato."
                icon={ArrowDownToLine}
              />
              <MetricCard
                title="Valor retido"
                value={formatCurrency(retainedBalance)}
                description="Montante em janela de seguranca financeira."
                icon={ShieldCheck}
              />
              <MetricCard
                title="Valores reembolsados"
                value={formatCurrency(refundedBalance)}
                description="Total devolvido em operacoes recentes."
                icon={BadgeCheck}
              />
              <MetricCard
                title="Saldo em Swift Coins"
                value={`${formatNumber(swiftCoins)} SWIFT`}
                description="Quantidade disponivel em sua carteira digital."
                icon={Coins}
              />
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 p-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-dashed shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Efetuar saque</CardTitle>
                <CardDescription>
                  Informe o valor e escolha o destino de repasse para iniciar uma nova solicitacao.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4" onSubmit={handleWithdraw}>
                  <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Valor do saque</label>
                      <Input
                        value={withdrawAmount}
                        onChange={(event) => setWithdrawAmount(event.target.value)}
                        placeholder="0,00"
                        inputMode="decimal"
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Destino</label>
                      <Select value={withdrawDestination} onValueChange={setWithdrawDestination}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Selecione um destino" />
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

                  <div className="flex flex-wrap gap-2">
                    {["500", "1500", "3500", "5000"].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setWithdrawAmount(amount)}
                      >
                        {formatCurrency(Number(amount))}
                      </Button>
                    ))}
                  </div>

                  <div className="grid gap-4 rounded-xl border bg-muted/30 p-4 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Saldo disponivel</span>
                        <span className="font-medium">{formatCurrency(availableBalance)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Taxa operacional</span>
                        <span className="font-medium">{formatCurrency(processingFee)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Liquido estimado</span>
                        <span className="font-medium">{formatCurrency(netPreview)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Prazo medio</span>
                        <span className="font-medium">Ate 1 dia util</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Destino atual</span>
                        <span className="font-medium">
                          {withdrawDestination === "bank"
                            ? "Conta bancaria"
                            : withdrawDestination === "pix"
                              ? "Pix"
                              : "Carteira cripto"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">Status da conta</span>
                        <span className="font-medium">Apta para saque</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="submit" className="sm:min-w-44">
                      Solicitar saque
                    </Button>
                    <Button type="button" variant="outline" className="sm:min-w-44">
                      Ver historico
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Saude da carteira</CardTitle>
                <CardDescription>
                  Monitoramento dos limites, conformidade financeira e configuracoes de recebimento.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Uso do limite mensal</p>
                      <p className="mt-1 text-xl font-semibold">
                        {formatCurrency(processedThisMonth)} / {formatCurrency(monthlyLimit)}
                      </p>
                    </div>
                    <Badge variant="secondary">Compliance ok</Badge>
                  </div>
                  <Progress value={progressValue} />
                  <p className="text-sm text-muted-foreground">
                    {progressValue.toFixed(0)}% do volume mensal ja foi conciliado.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    { label: "Conta bancaria principal", value: `${bankData.bank} - ag ${bankData.agency}`, icon: Building2 },
                    { label: "Chave Pix", value: pixKey || "Nao cadastrada", icon: Landmark },
                    { label: "Carteira cripto", value: cryptoWallet || "Nao cadastrada", icon: WalletCards },
                    { label: "Moeda de repasse", value: "BRL / Swift Coin", icon: CreditCard },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl border bg-background p-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-primary">
                        <item.icon />
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
          </CardContent>
        </Card>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Movimentacoes recentes</CardTitle>
              <CardDescription>
                Historico dos ultimos repasses, reembolsos e movimentacoes financeiras.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referencia</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settlementRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>
                        <Badge variant={row.status === "Concluido" ? "secondary" : "outline"}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(row.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Dados de recebimento</CardTitle>
              <CardDescription>
                Configure conta bancaria, Pix e carteira cripto usando componentes shadcn/ui.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bank">
                <TabsList className="grid h-auto w-full grid-cols-3">
                  <TabsTrigger value="bank">Banco</TabsTrigger>
                  <TabsTrigger value="pix">Pix</TabsTrigger>
                  <TabsTrigger value="crypto">Cripto</TabsTrigger>
                </TabsList>

                <TabsContent value="bank">
                  <Card className="border-dashed shadow-none">
                    <CardHeader>
                      <CardTitle className="text-lg">Conta bancaria</CardTitle>
                      <CardDescription>
                        Use uma conta de titularidade compativel para saque.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="flex flex-col gap-4" onSubmit={handleBankSave}>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input
                            value={bankData.bank}
                            onChange={(event) =>
                              setBankData((current) => ({ ...current, bank: event.target.value }))
                            }
                            placeholder="Banco"
                          />
                          <Input
                            value={bankData.agency}
                            onChange={(event) =>
                              setBankData((current) => ({ ...current, agency: event.target.value }))
                            }
                            placeholder="Agencia"
                          />
                          <Input
                            value={bankData.account}
                            onChange={(event) =>
                              setBankData((current) => ({ ...current, account: event.target.value }))
                            }
                            placeholder="Conta"
                          />
                          <Input
                            value={bankData.document}
                            onChange={(event) =>
                              setBankData((current) => ({ ...current, document: event.target.value }))
                            }
                            placeholder="CPF ou CNPJ"
                          />
                        </div>
                        <Input
                          value={bankData.holder}
                          onChange={(event) =>
                            setBankData((current) => ({ ...current, holder: event.target.value }))
                          }
                          placeholder="Titular"
                        />
                        <Button type="submit" className="sm:w-fit">
                          Salvar dados bancarios
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pix">
                  <Card className="border-dashed shadow-none">
                    <CardHeader>
                      <CardTitle className="text-lg">Chave Pix</CardTitle>
                      <CardDescription>
                        Cadastre uma chave valida para repasses mais rapidos.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="flex flex-col gap-4" onSubmit={handlePixSave}>
                        <Input
                          value={pixKey}
                          onChange={(event) => setPixKey(event.target.value)}
                          placeholder="Email, telefone, CPF ou chave aleatoria"
                        />
                        <Separator />
                        <p className="text-sm text-muted-foreground">
                          A chave Pix sera usada como destino preferencial quando esse metodo for
                          selecionado no saque.
                        </p>
                        <Button type="submit" className="sm:w-fit">
                          Salvar chave Pix
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="crypto">
                  <Card className="border-dashed shadow-none">
                    <CardHeader>
                      <CardTitle className="text-lg">Carteira cripto</CardTitle>
                      <CardDescription>
                        Vincule seu endereco para recebimento em futuras operacoes digitais.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="flex flex-col gap-4" onSubmit={handleCryptoSave}>
                        <Input
                          value={cryptoWallet}
                          onChange={(event) => setCryptoWallet(event.target.value)}
                          placeholder="Endereco da carteira"
                        />
                        <Separator />
                        <p className="text-sm text-muted-foreground">
                          Confira a rede e o endereco antes de salvar para evitar divergencias no
                          recebimento.
                        </p>
                        <Button type="submit" className="sm:w-fit">
                          Salvar carteira cripto
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-between border-t pt-6 text-sm text-muted-foreground">
              <span>Perfil financeiro do usuario</span>
              <span>{user?.name || "Felipe Said"}</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
