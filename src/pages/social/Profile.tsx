import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Camera,
  Grid3X3,
  Play,
  User,
  ImageIcon,
  Settings,
  Briefcase,
  Link2,
} from "lucide-react";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [bannerImage, setBannerImage] = useState(user?.banner || "");
  const [avatarImage, setAvatarImage] = useState(user?.avatar || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const stats = {
    posts: 0,
    followers: 1757,
    following: 1274,
  };

  const handleBannerUpload = async (image: string) => {
    setIsUpdating(true);
    try {
      await updateProfile({ banner: image });
      setBannerImage(image);
    } catch (error) {
      console.error("Erro ao atualizar banner:", error);
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
      console.error("Erro ao atualizar avatar:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const tabs = [
    { id: "posts", label: "Posts", icon: Grid3X3 },
    { id: "videos", label: "Videos", icon: Play },
    { id: "tagged", label: "Marcacoes", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="group relative h-36 md:h-48">
          {bannerImage ? (
            <div className="relative h-full w-full">
              <img
                src={bannerImage}
                alt="Banner"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                <ImageUpload
                  onImageSelect={handleBannerUpload}
                  currentImage={bannerImage}
                  aspectRatio={16 / 9}
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
                    {isUpdating ? "Atualizando..." : "Editar Banner"}
                  </Button>
                </ImageUpload>
              </div>
            </div>
          ) : (
            <ImageUpload
              onImageSelect={handleBannerUpload}
              aspectRatio={16 / 9}
              circular={false}
              minWidth={400}
              minHeight={225}
              className="h-full w-full bg-gradient-to-r from-muted to-muted-foreground/20"
            />
          )}
        </div>

        <div className="mx-auto max-w-full px-4 md:max-w-4xl md:px-6">
          <div className="relative z-10 -mt-10 md:-mt-12">
            <ImageUpload
              onImageSelect={handleAvatarUpload}
              currentImage={avatarImage}
              aspectRatio={1}
              circular={true}
              minWidth={100}
              minHeight={100}
              className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl ring-2 ring-blue-200/50 transition-colors group-hover:bg-blue-300 md:h-24 md:w-24"
            >
              {!avatarImage && (
                <span className="z-10 text-base font-semibold text-blue-700">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-all duration-200 hover:opacity-100">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </ImageUpload>
          </div>

          <div className="relative z-10 mt-3 md:mt-4">
            <div className="hidden md:block">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {user?.name || "Felipe Said"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    @{user?.email?.split("@")[0] || "saidlabsglobal"}
                  </p>
                </div>

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

              <div className="mb-4 flex gap-8">
                <div className="text-center">
                  <div className="text-base font-bold text-foreground">{stats.posts}</div>
                  <div className="text-sm text-muted-foreground">publicacoes</div>
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

              <div className="mb-2">
                <h2 className="text-base font-semibold text-foreground">
                  {user?.name || "Felipe Said"}
                </h2>
              </div>

              <div className="mb-4 space-y-1">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  TikTok Ads & Ecom
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-500"
                >
                  <Link2 className="h-4 w-4" />
                  abre.ai/playlistbusiness
                </a>
              </div>
            </div>

            <div className="space-y-5 md:hidden">
              <div className="space-y-1">
                <h1 className="text-[1.75rem] font-bold leading-none text-foreground">
                  {user?.name || "Felipe Said"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  @{user?.email?.split("@")[0] || "saidlabsglobal"}
                </p>
              </div>

              <div className="flex justify-start gap-8">
                <div className="min-w-[54px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{stats.posts}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">posts</div>
                </div>
                <div className="min-w-[54px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{stats.followers.toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">seguidores</div>
                </div>
                <div className="min-w-[54px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{stats.following.toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">seguindo</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  TikTok Ads & Ecom
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-500"
                >
                  <Link2 className="h-4 w-4" />
                  abre.ai/playlistbusiness
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-10 flex-1 bg-gray-800 text-white hover:bg-gray-700">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="h-10 flex-1 bg-gray-800 text-white hover:bg-gray-700">
                  Compartilhar perfil
                </Button>
                <Button variant="outline" size="sm" className="h-10 w-10 bg-gray-800 p-0 text-white hover:bg-gray-700">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-center border-b border-gray-600">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
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

            <div className="mt-6 min-h-96">
              <div className="flex flex-col items-center justify-center py-20">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-600">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">
                  Ainda nao ha nenhum post
                </h3>
                <p className="max-w-md text-center text-gray-400">
                  Quando voce compartilhar fotos e videos, eles aparecerao no seu perfil.
                </p>
                <Button className="mt-6 bg-blue-600 text-white hover:bg-blue-700">
                  Compartilhar sua primeira foto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
