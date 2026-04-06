import {
  Building2,
  Bot,
  DollarSign,
  FileText,
  FolderOpen,
  Globe,
  Import,
  KeyRound,
  LayoutTemplate,
  Link2,
  LucideIcon,
  MonitorCog,
  PackagePlus,
  PackageSearch,
  Puzzle,
  PlugZap,
  ReceiptText,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Store,
  ToyBrick,
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
            children: [
              {
                title: "Secreta",
                url: "/app/negocio/integracoes/checkout-gateway/api-admin/secreta",
                icon: KeyRound,
              },
              {
                title: "Publica",
                url: "/app/negocio/integracoes/checkout-gateway/api-admin/publica",
                icon: Globe,
              },
            ],
          },
        ],
      },
      {
        title: "Criador de Quiz",
        url: "/app/negocio/criador-de-quiz",
        icon: Puzzle,
        children: [
          {
            title: "Construtor",
            url: "/app/negocio/criador-de-quiz/construtor",
            icon: Settings2,
          },
          {
            title: "Dominio",
            url: "/app/negocio/criador-de-quiz/dominio",
            icon: Globe,
          },
        ],
      },
      {
        title: "Produtos",
        url: "/app/negocio/produtos",
        icon: ShoppingCart,
        children: [
          {
            title: "Importar lista CSV",
            url: "/app/negocio/produtos/importar-lista-csv",
            icon: Import,
          },
          {
            title: "Criar produto",
            url: "/app/negocio/produtos/criar-produto",
            icon: PackagePlus,
          },
        ],
      },
      {
        title: "Paginas",
        url: "/app/negocio/paginas",
        icon: LayoutTemplate,
        children: [
          {
            title: "Criar pagina",
            url: "/app/negocio/paginas/criar-pagina",
            icon: LayoutTemplate,
          },
          {
            title: "Importar pagina",
            url: "/app/negocio/paginas/importar-pagina",
            icon: Import,
          },
          {
            title: "Dominio",
            url: "/app/negocio/paginas/dominio",
            icon: Globe,
          },
        ],
      },
      {
        title: "Shop in Fy",
        url: "/app/negocio/shop-in-fy",
        icon: Store,
        children: [
          {
            title: "Importar tema",
            url: "/app/negocio/shop-in-fy/importar-tema",
            icon: Import,
          },
          {
            title: "Minhas lojas",
            url: "/app/negocio/shop-in-fy/minhas-lojas",
            icon: Store,
          },
          {
            title: "Dominio",
            url: "/app/negocio/shop-in-fy/dominio",
            icon: Globe,
          },
        ],
      },
      {
        title: "TypeBot",
        url: "/app/negocio/typebot",
        icon: Bot,
        children: [
          {
            title: "Importar Type",
            url: "/app/negocio/typebot/importar-type",
            icon: Import,
          },
          {
            title: "Meus Types",
            url: "/app/negocio/typebot/meus-types",
            icon: ToyBrick,
          },
          {
            title: "Dominio",
            url: "/app/negocio/typebot/dominio",
            icon: Globe,
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
  {
    title: "Secreta",
    url: "/app/negocio/integracoes/checkout-gateway/api-admin/secreta",
    eyebrow: "API Admin",
    description: "Area para chave secreta e configuracoes privadas da API administrativa.",
    icon: KeyRound,
    highlights: [
      "Credencial privada da operacao.",
      "Uso restrito a automacoes seguras.",
      "Base para autenticacao sensivel.",
    ],
    related: [
      { label: "API Admin", href: "/app/negocio/integracoes/checkout-gateway/api-admin" },
      { label: "Publica", href: "/app/negocio/integracoes/checkout-gateway/api-admin/publica" },
    ],
  },
  {
    title: "Publica",
    url: "/app/negocio/integracoes/checkout-gateway/api-admin/publica",
    eyebrow: "API Admin",
    description: "Area para chave publica e configuracoes expostas da integracao administrativa.",
    icon: Globe,
    highlights: [
      "Credencial publica da API.",
      "Uso em ambientes de integracao controlados.",
      "Base para comunicacao externa autenticada.",
    ],
    related: [
      { label: "API Admin", href: "/app/negocio/integracoes/checkout-gateway/api-admin" },
      { label: "Secreta", href: "/app/negocio/integracoes/checkout-gateway/api-admin/secreta" },
    ],
  },
  {
    title: "Criador de Quiz",
    url: "/app/negocio/criador-de-quiz",
    eyebrow: "Meu Negocio",
    description: "Modulo de quiz com construtor e configuracao de dominio para experiencias interativas.",
    icon: Puzzle,
    highlights: [
      "Estrutura de quizzes do negocio.",
      "Pronto para funis e jornadas interativas.",
      "Organiza construcao e publicacao do quiz.",
    ],
    related: [
      { label: "Construtor", href: "/app/negocio/criador-de-quiz/construtor" },
      { label: "Dominio", href: "/app/negocio/criador-de-quiz/dominio" },
    ],
  },
  {
    title: "Construtor",
    url: "/app/negocio/criador-de-quiz/construtor",
    eyebrow: "Criador de Quiz",
    description: "Editor do quiz para montar perguntas, fluxo e estrutura da experiencia.",
    icon: Settings2,
    highlights: [
      "Construcao do fluxo do quiz.",
      "Base para perguntas e resultados.",
      "Pronto para futuras automacoes de lead.",
    ],
    related: [
      { label: "Criador de Quiz", href: "/app/negocio/criador-de-quiz" },
      { label: "Dominio", href: "/app/negocio/criador-de-quiz/dominio" },
    ],
  },
  {
    title: "Dominio",
    url: "/app/negocio/criador-de-quiz/dominio",
    eyebrow: "Criador de Quiz",
    description: "Configuracao do dominio de publicacao do quiz.",
    icon: Globe,
    highlights: [
      "URL publica do quiz.",
      "Base para publicacao externa.",
      "Conecta branding e experiencia.",
    ],
    related: [
      { label: "Criador de Quiz", href: "/app/negocio/criador-de-quiz" },
      { label: "Construtor", href: "/app/negocio/criador-de-quiz/construtor" },
    ],
  },
  {
    title: "Produtos",
    url: "/app/negocio/produtos",
    eyebrow: "Meu Negocio",
    description: "Modulo de produtos com criacao individual e importacao em massa por CSV.",
    icon: ShoppingCart,
    highlights: [
      "Catalogo central de produtos.",
      "Importacao em lote por CSV.",
      "Base para venda e checkout.",
    ],
    related: [
      { label: "Importar lista CSV", href: "/app/negocio/produtos/importar-lista-csv" },
      { label: "Criar produto", href: "/app/negocio/produtos/criar-produto" },
    ],
  },
  {
    title: "Importar lista CSV",
    url: "/app/negocio/produtos/importar-lista-csv",
    eyebrow: "Produtos",
    description: "Area para importacao de catalogo por arquivo CSV.",
    icon: Import,
    highlights: [
      "Entrada em massa de produtos.",
      "Ideal para catalogos grandes.",
      "Preparado para mapeamento de colunas.",
    ],
    related: [
      { label: "Produtos", href: "/app/negocio/produtos" },
      { label: "Criar produto", href: "/app/negocio/produtos/criar-produto" },
    ],
  },
  {
    title: "Criar produto",
    url: "/app/negocio/produtos/criar-produto",
    eyebrow: "Produtos",
    description: "Cadastro individual de produto com dados comerciais e operacionais.",
    icon: PackagePlus,
    highlights: [
      "Criacao manual de produto.",
      "Base para preco, descricao e estoque.",
      "Pronto para conexao com checkout.",
    ],
    related: [
      { label: "Produtos", href: "/app/negocio/produtos" },
      { label: "Importar lista CSV", href: "/app/negocio/produtos/importar-lista-csv" },
    ],
  },
  {
    title: "Paginas",
    url: "/app/negocio/paginas",
    eyebrow: "Meu Negocio",
    description: "Modulo para criar, importar e publicar paginas com dominio proprio.",
    icon: LayoutTemplate,
    highlights: [
      "Criacao de paginas do negocio.",
      "Importacao de paginas externas.",
      "Conexao com dominio proprio.",
    ],
    related: [
      { label: "Criar pagina", href: "/app/negocio/paginas/criar-pagina" },
      { label: "Importar pagina", href: "/app/negocio/paginas/importar-pagina" },
    ],
  },
  {
    title: "Criar pagina",
    url: "/app/negocio/paginas/criar-pagina",
    eyebrow: "Paginas",
    description: "Editor para criar uma nova pagina dentro da operacao.",
    icon: LayoutTemplate,
    highlights: [
      "Criacao de pagina do zero.",
      "Base para landing pages e institucionais.",
      "Pronto para evolucao visual.",
    ],
    related: [
      { label: "Paginas", href: "/app/negocio/paginas" },
      { label: "Dominio", href: "/app/negocio/paginas/dominio" },
    ],
  },
  {
    title: "Importar pagina",
    url: "/app/negocio/paginas/importar-pagina",
    eyebrow: "Paginas",
    description: "Espaco para importar uma pagina e adaptar ao ecossistema atual.",
    icon: Import,
    highlights: [
      "Importacao de paginas externas.",
      "Base para migracoes de layout.",
      "Acelera entrada de projetos existentes.",
    ],
    related: [
      { label: "Paginas", href: "/app/negocio/paginas" },
      { label: "Criar pagina", href: "/app/negocio/paginas/criar-pagina" },
    ],
  },
  {
    title: "Dominio",
    url: "/app/negocio/paginas/dominio",
    eyebrow: "Paginas",
    description: "Configuracao do dominio de publicacao das paginas.",
    icon: Globe,
    highlights: [
      "Dominio das paginas publicas.",
      "Base para publicacao externa.",
      "Conecta branding e distribuicao.",
    ],
    related: [
      { label: "Paginas", href: "/app/negocio/paginas" },
      { label: "Importar pagina", href: "/app/negocio/paginas/importar-pagina" },
    ],
  },
  {
    title: "Shop in Fy",
    url: "/app/negocio/shop-in-fy",
    eyebrow: "Meu Negocio",
    description: "Modulo para importar tema, gerenciar lojas e conectar dominio no Shop in Fy.",
    icon: Store,
    highlights: [
      "Gestao de lojas conectadas.",
      "Importacao de tema.",
      "Configuracao de dominio da loja.",
    ],
    related: [
      { label: "Importar tema", href: "/app/negocio/shop-in-fy/importar-tema" },
      { label: "Minhas lojas", href: "/app/negocio/shop-in-fy/minhas-lojas" },
    ],
  },
  {
    title: "Importar tema",
    url: "/app/negocio/shop-in-fy/importar-tema",
    eyebrow: "Shop in Fy",
    description: "Area para importar um novo tema visual para a loja.",
    icon: Import,
    highlights: [
      "Entrada de tema visual.",
      "Base para personalizacao da loja.",
      "Acelera setup inicial.",
    ],
    related: [
      { label: "Shop in Fy", href: "/app/negocio/shop-in-fy" },
      { label: "Minhas lojas", href: "/app/negocio/shop-in-fy/minhas-lojas" },
    ],
  },
  {
    title: "Minhas lojas",
    url: "/app/negocio/shop-in-fy/minhas-lojas",
    eyebrow: "Shop in Fy",
    description: "Biblioteca das lojas conectadas e administradas no modulo Shop in Fy.",
    icon: Store,
    highlights: [
      "Visao das lojas vinculadas.",
      "Base para operacao multi-loja.",
      "Pronto para historico e status.",
    ],
    related: [
      { label: "Shop in Fy", href: "/app/negocio/shop-in-fy" },
      { label: "Dominio", href: "/app/negocio/shop-in-fy/dominio" },
    ],
  },
  {
    title: "Dominio",
    url: "/app/negocio/shop-in-fy/dominio",
    eyebrow: "Shop in Fy",
    description: "Configuracao do dominio da loja dentro do fluxo Shop in Fy.",
    icon: Globe,
    highlights: [
      "Dominio da loja conectada.",
      "Base para publicacao externa.",
      "Relaciona branding e operacao.",
    ],
    related: [
      { label: "Shop in Fy", href: "/app/negocio/shop-in-fy" },
      { label: "Minhas lojas", href: "/app/negocio/shop-in-fy/minhas-lojas" },
    ],
  },
  {
    title: "TypeBot",
    url: "/app/negocio/typebot",
    eyebrow: "Meu Negocio",
    description: "Modulo para importar fluxos TypeBot, gerenciar tipos criados e configurar dominio.",
    icon: Bot,
    highlights: [
      "Central do TypeBot na operacao.",
      "Importacao de fluxos existentes.",
      "Base para automacoes conversacionais.",
    ],
    related: [
      { label: "Importar Type", href: "/app/negocio/typebot/importar-type" },
      { label: "Meus Types", href: "/app/negocio/typebot/meus-types" },
    ],
  },
  {
    title: "Importar Type",
    url: "/app/negocio/typebot/importar-type",
    eyebrow: "TypeBot",
    description: "Entrada de fluxos TypeBot existentes para dentro da plataforma.",
    icon: Import,
    highlights: [
      "Importacao de fluxos prontos.",
      "Base para onboarding mais rapido.",
      "Acelera reaproveitamento de automacoes.",
    ],
    related: [
      { label: "TypeBot", href: "/app/negocio/typebot" },
      { label: "Meus Types", href: "/app/negocio/typebot/meus-types" },
    ],
  },
  {
    title: "Meus Types",
    url: "/app/negocio/typebot/meus-types",
    eyebrow: "TypeBot",
    description: "Biblioteca dos fluxos TypeBot ja criados e conectados ao negocio.",
    icon: ToyBrick,
    highlights: [
      "Gestao dos Types existentes.",
      "Base para organizacao de automacoes.",
      "Pronto para futuras publicacoes.",
    ],
    related: [
      { label: "TypeBot", href: "/app/negocio/typebot" },
      { label: "Dominio", href: "/app/negocio/typebot/dominio" },
    ],
  },
  {
    title: "Dominio",
    url: "/app/negocio/typebot/dominio",
    eyebrow: "TypeBot",
    description: "Configuracao do dominio publico para os fluxos TypeBot.",
    icon: Globe,
    highlights: [
      "Dominio dos fluxos conversacionais.",
      "Base para publicacao externa.",
      "Conecta experiencia e distribuicao.",
    ],
    related: [
      { label: "TypeBot", href: "/app/negocio/typebot" },
      { label: "Meus Types", href: "/app/negocio/typebot/meus-types" },
    ],
  },
];

export function getBusinessPageByUrl(url: string) {
  return businessPages.find((page) => page.url === url);
}
