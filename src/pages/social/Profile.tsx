import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/stores/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageUpload } from "@/components/ui/image-upload";
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
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [showBannerEdit, setShowBannerEdit] = useState(false);
  const [bannerImage, setBannerImage] = useState(user?.banner || '');
  const [avatarImage, setAvatarImage] = useState(user?.avatar || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const stats = {
    posts: 0,
    followers: 1757,
    following: 1274
  };

  const handleBannerUpload = async (image: string) => {
    setIsUpdating(true);
    try {
      await updateProfile({ banner: image });
      setBannerImage(image);
    } catch (error) {
      console.error('Erro ao atualizar banner:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (image: string) => {
    setIsUpdating(true);
    try {
      await updateProfile({ avatar: image });
      setAvatarImage(image);
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
    } finally {
      setIsUpdating(false);
    }
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
        <div className="h-32 md:h-48 relative group">
          {bannerImage ? (
            <div className="relative w-full h-full">
              <img
                src={bannerImage}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageUpload
                  onImageSelect={handleBannerUpload}
                  currentImage={bannerImage}
                  aspectRatio={16/9}
                  circular={false}
                  minWidth={400}
                  minHeight={225}
                  className="absolute inset-0"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                    disabled={isUpdating}
                  >
                    <Camera className="h-4 w-4" />
                    {isUpdating ? 'Atualizando...' : 'Editar Banner'}
                  </Button>
                </ImageUpload>
              </div>
            </div>
          ) : (
            <ImageUpload
              onImageSelect={handleBannerUpload}
              aspectRatio={16/9}
              circular={false}
              minWidth={400}
              minHeight={225}
              className="w-full h-full bg-gradient-to-r from-muted to-muted-foreground/20"
            />
          )}
        </div>

        {/* Avatar sobrepondo o banner */}
        <div className="max-w-full md:max-w-4xl mx-auto px-4 md:px-6 -mt-8 md:-mt-12 relative z-10">
          <div className="relative group">
            <ImageUpload
              onImageSelect={handleAvatarUpload}
              currentImage={avatarImage}
              aspectRatio={1}
              circular={true}
              minWidth={100}
              minHeight={100}
              className="relative h-16 w-16 sm:h-20 sm:w-20 border-4 border-background shadow-xl ring-2 ring-blue-200/50 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center cursor-pointer group-hover:bg-blue-300 transition-colors overflow-hidden"
            >
              {!avatarImage && (
                <span className="text-sm sm:text-base text-blue-700 font-semibold z-10">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
              
              {/* Small edit icon - appears on hover, centered inside the circle */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
                <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
            </ImageUpload>
          </div>
        </div>


        {/* Profile Content - Completamente abaixo do banner */}
        <div className="max-w-full md:max-w-4xl mx-auto px-4 md:px-6 mt-4 relative z-10">
          {/* Layout Desktop - Exatamente como na imagem */}
          <div className="hidden md:block">
            {/* Linha horizontal com nome e botões */}
            <div className="flex items-center justify-between mb-4">
              {/* Nome e @ do usuário */}
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {user?.name || "Samuel Abnadaby"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  @{user?.email?.split("@")[0] || "sr_samukera"}
                </p>
              </div>
              
              {/* Botões de ação */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Editar perfil
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Ver arquivo
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <div className="text-base font-bold text-foreground">{stats.posts}</div>
                <div className="text-sm text-muted-foreground">publicações</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-foreground">{stats.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">seguidores</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-foreground">{stats.following.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">A seguir</div>
              </div>
            </div>

            {/* Nome completo */}
            <div className="mb-2">
              <h2 className="text-base font-semibold text-foreground">
                {user?.name || "Samuel Abnadaby"}
              </h2>
            </div>

            {/* Bio e links */}
            <div className="space-y-1 mb-4">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>💼</span>
                TikTok Ads & Ecom
              </p>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span>🔗</span>
                abre.ai/playlistbusiness
              </a>
            </div>
          </div>

          {/* Layout Mobile - Exatamente como na imagem */}
          <div className="md:hidden">
            {/* Nome e @ do usuário */}
            <div className="mb-3">
              <h1 className="text-lg font-bold text-foreground">
                {user?.name || "Samuel Abnadaby"}
              </h1>
              <p className="text-sm text-muted-foreground">
                @{user?.email?.split("@")[0] || "sr_samukera"}
              </p>
            </div>

            {/* Estatísticas */}
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="text-base font-bold text-foreground">{stats.posts}</div>
                <div className="text-sm text-muted-foreground">posts</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-foreground">{stats.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">seguidores</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-foreground">{stats.following.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">seguindo</div>
              </div>
            </div>

            {/* Bio e links */}
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>💼</span>
                TikTok Ads & Ecom
              </p>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span>🔗</span>
                abre.ai/playlistbusiness
              </a>
            </div>
          </div>

          {/* Botões de Ação - Apenas para Mobile */}
          <div className="md:hidden mt-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-gray-800 text-white hover:bg-gray-700">
                Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-gray-800 text-white hover:bg-gray-700">
                Compartilhar perfil
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-800 text-white hover:bg-gray-700 p-2">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="mt-6">
            <div className="flex justify-center border-b border-gray-600">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo das Tabs */}
          <div className="min-h-96 mt-6">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 border-2 border-gray-600 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ainda não há nenhum post
              </h3>
              <p className="text-gray-400 text-center max-w-md">
                Quando você compartilhar fotos e vídeos, eles aparecerão no seu perfil.
              </p>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                Compartilhar sua primeira foto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}