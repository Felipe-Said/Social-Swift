import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BusinessPageDefinition } from "@/lib/business-navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BusinessPageTemplate({ page }: { page: BusinessPageDefinition }) {
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 sm:px-4 lg:px-0 lg:py-4">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="gap-6 border-b p-5 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {page.eyebrow}
                </Badge>
                <div className="space-y-3">
                  <CardTitle className="text-3xl tracking-tight sm:text-5xl">
                    {page.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-7 sm:text-base">
                    {page.description}
                  </CardDescription>
                </div>
              </div>

              <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Icon className="h-8 w-8" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {page.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Workspace da pagina</CardTitle>
                <CardDescription>
                  Essa pagina ja representa o ponto da arvore do Miro e esta pronta para receber a logica especifica do modulo.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="rounded-2xl border bg-background p-4">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Rota interna
                  </p>
                  <p className="mt-2 break-all text-lg font-semibold">{page.url}</p>
                </div>
                <div className="rounded-2xl border bg-background p-4">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Proximo passo
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Agora da para evoluir essa area com formularios, logica e automacoes sem perder a arquitetura do Meu Negocio.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Paginas relacionadas</CardTitle>
                <CardDescription>
                  Atalhos para os proximos pontos dessa mesma arvore.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {page.related.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="outline"
                    className="h-auto justify-between rounded-2xl px-4 py-4"
                  >
                    <Link to={item.href}>
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
