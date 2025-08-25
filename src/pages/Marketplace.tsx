import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search,
  Filter,
  Star,
  MessageCircle,
  Eye,
  Facebook,
  Chrome,
  Play
} from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  "Todos",
  "Facebook Ads",
  "Google Ads",
  "TikTok Ads",
  "Contas de Anúncio",
  "Serviços de Marketing",
  "Templates",
  "Outros"
];

const marketplaceItems = [
  {
    id: 1,
    title: "Conta Facebook Ads Verificada - Alto Limite",
    description: "Conta Facebook Ads com limite de $50,000 diários, verificada e ativa. Histórico limpo, sem violações.",
    price: "R$ 2.500,00",
    seller: {
      name: "Marketing Pro",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 127
    },
    category: "Facebook Ads",
    image: "/placeholder.svg",
    views: 1250,
    icon: Facebook
  },
  {
    id: 2,
    title: "Setup Completo Google Ads - E-commerce",
    description: "Configuração profissional de campanhas Google Ads para e-commerce com otimização garantida.",
    price: "R$ 899,00",
    seller: {
      name: "AdsPro Digital",
      avatar: "/placeholder.svg",
      rating: 5.0,
      reviews: 89
    },
    category: "Google Ads",
    image: "/placeholder.svg",
    views: 890,
    icon: Chrome
  },
  {
    id: 3,
    title: "Conta TikTok Ads Business - Global",
    description: "Conta TikTok Ads Business com acesso global, ideal para campanhas internacionais.",
    price: "R$ 1.800,00",
    seller: {
      name: "Social Media Expert",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 64
    },
    category: "TikTok Ads",
    image: "/placeholder.svg",
    views: 567,
    icon: Play
  }
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold text-text">Marketplace</h1>
          <p className="text-text-dim max-w-2xl mx-auto">
            Encontre e venda serviços de marketing digital, contas de anúncios e muito mais
          </p>
        </motion.div>

        {/* Search and Filters */}
        <GlassCard className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-dim" />
              <Input
                placeholder="Buscar produtos e serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </GlassCard>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center">
                <item.icon className="h-16 w-16 text-brand/60" />
                <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-text-dim bg-bg/80 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Eye className="h-3 w-3" />
                  {item.views}
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Category Badge */}
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>

                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-text group-hover:text-brand transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-dim line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-brand">
                  {item.price}
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={item.seller.avatar} />
                      <AvatarFallback className="text-xs">
                        {item.seller.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-text-dim">{item.seller.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-text-dim">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.seller.rating}</span>
                    <span>({item.seller.reviews})</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <MessageCircle className="h-3 w-3" />
                    Chat
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-text-dim space-y-2">
            <Search className="h-12 w-12 mx-auto opacity-50" />
            <p>Nenhum produto encontrado para os filtros selecionados</p>
            <Button variant="outline" onClick={() => {
              setSelectedCategory("Todos");
              setSearchQuery("");
            }}>
              Limpar Filtros
            </Button>
          </div>
        </motion.div>
      )}

      {/* Call to Action */}
      <GlassCard className="p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-text">Quer vender seus serviços?</h2>
        <p className="text-text-dim max-w-md mx-auto">
          Cadastre seus produtos e serviços de marketing digital e comece a vender hoje mesmo
        </p>
        <Button size="lg" className="gap-2">
          Começar a Vender
        </Button>
      </GlassCard>
    </div>
  );
}