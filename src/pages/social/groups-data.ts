export type GroupItem = {
  id: string;
  name: string;
  description: string;
  privacy: "Privado" | "Publico";
  members: string;
  cover: string;
  avatar: string;
  category: string;
};

export const featuredGroups: GroupItem[] = [
  {
    id: "said-lab-global",
    name: "Said LAB Global",
    description: "Networking, comunicados internos e oportunidades do ecossistema.",
    privacy: "Privado",
    members: "128 membros",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=320&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&h=140&fit=crop&crop=face",
    category: "Negocios e comunidade",
  },
  {
    id: "swift-marketplace-brasil",
    name: "Swift Marketplace Brasil",
    description: "Comunidade para vendedores, parceiros e novos projetos comerciais.",
    privacy: "Publico",
    members: "342 membros",
    cover:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900&h=320&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140&h=140&fit=crop&crop=face",
    category: "Marketplace",
  },
  {
    id: "creators-social-swift",
    name: "Creators Social Swift",
    description: "Grupo para criadores, divulgacao de novidades e colaboracoes.",
    privacy: "Privado",
    members: "89 membros",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=320&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&h=140&fit=crop&crop=face",
    category: "Criadores",
  },
];
