import {
  Building2,
  DollarSign,
  FileText,
  FolderOpen,
  Globe,
  KeyRound,
  LayoutTemplate,
  Link2,
  LucideIcon,
  MonitorCog,
  PlugZap,
  ReceiptText,
  Settings2,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";

export interface BusinessNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  children?: BusinessNavItem[];
}

export interface BusinessPageDefinition {
  title: string;
  url: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  related: Array<{ label: string; href: string }>;
}

export const businessNavigation: BusinessNavItem[] = [
  {
    title: "Loja",
    url: "/app/negocio/loja",
    icon: Store,
    children: [
      { title: "Meus dados", url: "/app/negocio/loja/meus-dados", icon: Building2 },
      { title: "Meus arquivos", url: "/app/negocio/loja/meus-arquivos", icon: FolderOpen },
      {
        title: "Checkout",
        url: "/app/negocio/loja/checkout",
        icon: ShoppingBag,
        children: [
          {
            title: "Editor",
            url: "/app/negocio/loja/checkout/editor",
            icon: Settings2,
            children: [
              {
                title: "Dominio",
                url: "/app/negocio/loja/checkout/editor/dominio",
                icon: Globe,
              },
              {
                title: "Layout",
                url: "/app/negocio/loja/checkout/editor/layout",
                icon: LayoutTemplate,
              },
            ],
          },
          {
            title: "Meus checkouts",
            url: "/app/negocio/loja/checkout/meus-checkouts",
            icon: ReceiptText,
          },
          {
            title: "Gateways",
            url: "/app/negocio/loja/checkout/gateways",
            icon: WalletCards,
            children: [
              {
                title: "Swift payments",
                url: "/app/negocio/loja/checkout/gateways/swift-payments",
                icon: DollarSign,
              },
              {
                title: "Escolher adquirente",
                url: "/app/negocio/loja/checkout/gateways/escolher-adquirente",
                icon: Building2,
              },
              {
                title: "Outros",
                url: "/app/negocio/loja/checkout/gateways/outros",
                icon: Settings2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Integracoes",
    url: "/app/negocio/integracoes",
    icon: PlugZap,
    children: [
      {
        title: "Gateway",
        url: "/app/negocio/integracoes/gateway",
        icon: WalletCards,
        children: [
          {
            title: "Chave API",
            url: "/app/negocio/integracoes/gateway/chave-api",
            icon: KeyRound,
          },
          {
            title: "Documentacao",
            url: "/app/negocio/integracoes/gateway/documentacao",
            icon: FileText,
          },
        ],
      },
      {
        title: "Checkout + Gateway",
        url: "/app/negocio/integracoes/checkout-gateway",
        icon: MonitorCog,
        children: [
          {
            title: "Link",
            url: "/app/negocio/integracoes/checkout-gateway/link",
            icon: Link2,
          },
          {
            title: "API Admin",
            url: "/app/negocio/integracoes/checkout-gateway/api-admin",
            icon: Settings2,
          },
        ],
      },
    ],
  },
];

export const businessPages: BusinessPageDefinition[] = [
  {
    title: "Loja",
    url: "/app/negocio/loja",
    eyebrow: "Meu Negocio",
    description: "Hub principal da loja com acesso a dados, arquivos e estrutura de checkout.",
    icon: Store,
    highlights: [
      "Centraliza configuracoes comerciais da loja.",
      "Organiza o fluxo do checkout em uma unica arvore.",
      "Conecta identidade, arquivos e pagamentos.",
    ],
    related: [
      { label: "Meus dados", href: "/app/negocio/loja/meus-dados" },
      { label: "Checkout", href: "/app/negocio/loja/checkout" },
    ],
  },
  {
    title: "Meus dados",
    url: "/app/negocio/loja/meus-dados",
    eyebrow: "Loja",
    description: "Area para dados operacionais, cadastro da loja, informacoes fiscais e identidade comercial.",
    icon: Building2,
    highlights: [
      "Dados institucionais e fiscais.",
      "Informacoes da operacao comercial.",
      "Base para checkout e integracoes.",
    ],
    related: [
      { label: "Loja", href: "/app/negocio/loja" },
      { label: "Meus arquivos", href: "/app/negocio/loja/meus-arquivos" },
    ],
  },
  {
    title: "Meus arquivos",
    url: "/app/negocio/loja/meus-arquivos",
    eyebrow: "Loja",
    description: "Espaco para organizar arquivos da operacao com estrutura pronta para MP4, PNG, ZIP e JPG.",
    icon: FolderOpen,
    highlights: [
      "Biblioteca central de arquivos da loja.",
      "Pronto para midias, exports e documentos.",
      "Organiza ativos do fluxo comercial.",
    ],
    related: [
      { label: "Loja", href: "/app/negocio/loja" },
      { label: "Checkout", href: "/app/negocio/loja/checkout" },
    ],
  },
  {
    title: "Checkout",
    url: "/app/negocio/loja/checkout",
    eyebrow: "Loja",
    description: "Workspace do checkout com editor, biblioteca de checkouts e configuracao de gateways.",
    icon: ShoppingBag,
    highlights: [
      "Editor visual do checkout.",
      "Gestao de modelos publicados.",
      "Conexao direta com gateways de pagamento.",
    ],
    related: [
      { label: "Editor", href: "/app/negocio/loja/checkout/editor" },
      { label: "Gateways", href: "/app/negocio/loja/checkout/gateways" },
    ],
  },
  {
    title: "Editor",
    url: "/app/negocio/loja/checkout/editor",
    eyebrow: "Checkout",
    description: "Painel de edicao do checkout com foco em dominio e layout da experiencia.",
    icon: Settings2,
    highlights: [
      "Edicao estrutural do checkout.",
      "Configuracao visual da jornada.",
      "Base para identidade da pagina.",
    ],
    related: [
      { label: "Dominio", href: "/app/negocio/loja/checkout/editor/dominio" },
      { label: "Layout", href: "/app/negocio/loja/checkout/editor/layout" },
    ],
  },
  {
    title: "Dominio",
    url: "/app/negocio/loja/checkout/editor/dominio",
    eyebrow: "Editor",
    description: "Conexao do checkout com dominio proprio e organizacao das rotas publicas da pagina.",
    icon: Globe,
    highlights: [
      "Dominio personalizado do checkout.",
      "Mapeamento de URL publica.",
      "Preparado para futuras validacoes de DNS.",
    ],
    related: [
      { label: "Editor", href: "/app/negocio/loja/checkout/editor" },
      { label: "Layout", href: "/app/negocio/loja/checkout/editor/layout" },
    ],
  },
  {
    title: "Layout",
    url: "/app/negocio/loja/checkout/editor/layout",
    eyebrow: "Editor",
    description: "Camada visual do checkout com identidade, estrutura e componentes da pagina.",
    icon: LayoutTemplate,
    highlights: [
      "Controle visual da pagina.",
      "Padrao para branding da loja.",
      "Espaco ideal para templates futuros.",
    ],
    related: [
      { label: "Editor", href: "/app/negocio/loja/checkout/editor" },
      { label: "Meus checkouts", href: "/app/negocio/loja/checkout/meus-checkouts" },
    ],
  },
  {
    title: "Meus checkouts",
    url: "/app/negocio/loja/checkout/meus-checkouts",
    eyebrow: "Checkout",
    description: "Biblioteca dos checkouts criados, publicados e reutilizaveis dentro da loja.",
    icon: ReceiptText,
    highlights: [
      "Gestao dos checkouts ativos.",
      "Historico de modelos criados.",
      "Base para duplicacao e publicacao.",
    ],
    related: [
      { label: "Checkout", href: "/app/negocio/loja/checkout" },
      { label: "Gateways", href: "/app/negocio/loja/checkout/gateways" },
    ],
  },
  {
    title: "Gateways",
    url: "/app/negocio/loja/checkout/gateways",
    eyebrow: "Checkout",
    description: "Central de pagamentos da loja com Swift Payments, adquirentes e outras opcoes.",
    icon: WalletCards,
    highlights: [
      "Conecta meios de pagamento do checkout.",
      "Organiza adquirentes e regras operacionais.",
      "Estrutura aberta para multiplos provedores.",
    ],
    related: [
      { label: "Swift payments", href: "/app/negocio/loja/checkout/gateways/swift-payments" },
      { label: "Escolher adquirente", href: "/app/negocio/loja/checkout/gateways/escolher-adquirente" },
    ],
  },
  {
    title: "Swift payments",
    url: "/app/negocio/loja/checkout/gateways/swift-payments",
    eyebrow: "Gateways",
    description: "Configuracao do gateway nativo Swift Payments para operacao da loja.",
    icon: DollarSign,
    highlights: [
      "Gateway proprietario do ecossistema Swift.",
      "Base para configuracoes financeiras dedicadas.",
      "Ponto central do fluxo de pagamento nativo.",
    ],
    related: [
      { label: "Gateways", href: "/app/negocio/loja/checkout/gateways" },
      { label: "Outros", href: "/app/negocio/loja/checkout/gateways/outros" },
    ],
  },
  {
    title: "Escolher adquirente",
    url: "/app/negocio/loja/checkout/gateways/escolher-adquirente",
    eyebrow: "Gateways",
    description: "Espaco para definir o adquirente principal da operacao e a logica de roteamento.",
    icon: Building2,
    highlights: [
      "Selecao da adquirente principal.",
      "Pronto para regras por checkout.",
      "Base para comparacao de taxa e aprovacao.",
    ],
    related: [
      { label: "Gateways", href: "/app/negocio/loja/checkout/gateways" },
      { label: "Swift payments", href: "/app/negocio/loja/checkout/gateways/swift-payments" },
    ],
  },
  {
    title: "Outros",
    url: "/app/negocio/loja/checkout/gateways/outros",
    eyebrow: "Gateways",
    description: "Area de configuracoes complementares para gateways secundarios e metodos alternativos.",
    icon: Settings2,
    highlights: [
      "Configuracoes adicionais de pagamento.",
      "Espaco para provedores extras.",
      "Organizacao de cenarios complementares.",
    ],
    related: [
      { label: "Gateways", href: "/app/negocio/loja/checkout/gateways" },
      { label: "Escolher adquirente", href: "/app/negocio/loja/checkout/gateways/escolher-adquirente" },
    ],
  },
  {
    title: "Integracoes",
    url: "/app/negocio/integracoes",
    eyebrow: "Meu Negocio",
    description: "Camada de integracoes tecnicas do negocio com gateway, checkout e administracao da API.",
    icon: PlugZap,
    highlights: [
      "Organiza integracoes da operacao.",
      "Separacao clara entre gateway e checkout.",
      "Base para conexoes externas do ecossistema.",
    ],
    related: [
      { label: "Gateway", href: "/app/negocio/integracoes/gateway" },
      { label: "Checkout + Gateway", href: "/app/negocio/integracoes/checkout-gateway" },
    ],
  },
  {
    title: "Gateway",
    url: "/app/negocio/integracoes/gateway",
    eyebrow: "Integracoes",
    description: "Area tecnica do gateway com acesso a chave API e documentacao para implementacao.",
    icon: WalletCards,
    highlights: [
      "Configuracao tecnica do gateway.",
      "Acesso a credenciais e base documental.",
      "Preparado para onboarding tecnico.",
    ],
    related: [
      { label: "Chave API", href: "/app/negocio/integracoes/gateway/chave-api" },
      { label: "Documentacao", href: "/app/negocio/integracoes/gateway/documentacao" },
    ],
  },
  {
    title: "Chave API",
    url: "/app/negocio/integracoes/gateway/chave-api",
    eyebrow: "Gateway",
    description: "Gestao das credenciais de integracao para autenticar chamadas no gateway.",
    icon: KeyRound,
    highlights: [
      "Credenciais de integracao.",
      "Base para ambientes de teste e producao.",
      "Pronto para futuras rotacoes de chave.",
    ],
    related: [
      { label: "Gateway", href: "/app/negocio/integracoes/gateway" },
      { label: "Documentacao", href: "/app/negocio/integracoes/gateway/documentacao" },
    ],
  },
  {
    title: "Documentacao",
    url: "/app/negocio/integracoes/gateway/documentacao",
    eyebrow: "Gateway",
    description: "Referencia tecnica do gateway com instrucoes, exemplos e fluxo de uso.",
    icon: FileText,
    highlights: [
      "Documentacao central do gateway.",
      "Base para onboarding tecnico.",
      "Pronto para endpoints e exemplos reais.",
    ],
    related: [
      { label: "Gateway", href: "/app/negocio/integracoes/gateway" },
      { label: "Chave API", href: "/app/negocio/integracoes/gateway/chave-api" },
    ],
  },
  {
    title: "Checkout + Gateway",
    url: "/app/negocio/integracoes/checkout-gateway",
    eyebrow: "Integracoes",
    description: "Conexao operacional entre checkout e gateway com controle de link e administracao.",
    icon: MonitorCog,
    highlights: [
      "Integra o checkout ao gateway.",
      "Controla links e painel administrativo.",
      "Ponto de uniao entre venda e processamento.",
    ],
    related: [
      { label: "Link", href: "/app/negocio/integracoes/checkout-gateway/link" },
      { label: "API Admin", href: "/app/negocio/integracoes/checkout-gateway/api-admin" },
    ],
  },
  {
    title: "Link",
    url: "/app/negocio/integracoes/checkout-gateway/link",
    eyebrow: "Checkout + Gateway",
    description: "Area para geracao e gestao de links entre checkout publicado e gateway conectado.",
    icon: Link2,
    highlights: [
      "Conexao publica entre checkout e pagamento.",
      "Ideal para links de venda e distribuicao.",
      "Base para publicacoes futuras.",
    ],
    related: [
      { label: "Checkout + Gateway", href: "/app/negocio/integracoes/checkout-gateway" },
      { label: "API Admin", href: "/app/negocio/integracoes/checkout-gateway/api-admin" },
    ],
  },
  {
    title: "API Admin",
    url: "/app/negocio/integracoes/checkout-gateway/api-admin",
    eyebrow: "Checkout + Gateway",
    description: "Painel administrativo da API para governanca tecnica do checkout integrado ao gateway.",
    icon: Settings2,
    highlights: [
      "Governanca da API administrativa.",
      "Base para usuarios tecnicos e logs.",
      "Espaco para automacoes e controles futuros.",
    ],
    related: [
      { label: "Checkout + Gateway", href: "/app/negocio/integracoes/checkout-gateway" },
      { label: "Link", href: "/app/negocio/integracoes/checkout-gateway/link" },
    ],
  },
];

export function getBusinessPageByUrl(url: string) {
  return businessPages.find((page) => page.url === url);
}
