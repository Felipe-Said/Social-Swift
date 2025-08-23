import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/stores/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Camera, 
  Grid3X3, 
  Play, 
  User,
  Share,
  Edit,
  ImageIcon,
  Settings
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [showBannerEdit, setShowBannerEdit] = useState(false);

  const stats = {
    posts: 0,
    followers: 1757,
    following: 1274
  };

  const tabs = [
    { id: "posts", label: "Posts", icon: Grid3X3 },
    { id: "videos", label: "Vídeos", icon: Play },
    { id: "tagged", label: "Marcações", icon: User }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header com Banner */}
      <div className="relative">
        {/* Banner */}
        <div 
          className="h-48 bg-gradient-to-r from-muted to-muted-foreground/20 relative group cursor-pointer"
          onMouseEnter={() => setShowBannerEdit(true)}
          onMouseLeave={() => setShowBannerEdit(false)}
        >
          {showBannerEdit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <Button variant="secondary" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Editar banner
              </Button>
            </motion.div>
          )}
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
          {/* Avatar e Info Principal */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl bg-muted">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Info e Estatísticas */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  {user?.name || "Nome do Usuário"}
                </h1>
                <p className="text-muted-foreground">@{user?.email?.split("@")[0] || "usuario"}</p>
              </div>

              {/* Estatísticas */}
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{stats.posts}</div>
                  <div className="text-sm text-muted-foreground">posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{stats.following.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">seguindo</div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">📱 Social Swift & Marketing</p>
                <a 
                  href="#" 
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  🔗 social.swift.app/bio
                </a>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 md:flex-none">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none">
                  <Share className="h-4 w-4 mr-2" />
                  Compartilhar perfil
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <GlassCard className="mb-6">
            <div className="flex justify-center border-b border-border">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Conteúdo das Tabs */}
          <GlassCard className="min-h-96">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 border-2 border-muted-foreground rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ainda não há nenhum post
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Quando você compartilhar fotos e vídeos, eles aparecerão no seu perfil.
              </p>
              <Button className="mt-6">
                Compartilhar sua primeira foto
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}