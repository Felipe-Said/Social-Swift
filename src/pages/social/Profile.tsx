import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/stores/auth";
import { useFeed } from "@/stores/feed";
import { FeedCard } from "@/components/social/feed-card";
import {
  buildPostGridItems,
  buildSnapGridItems,
  ProfileMediaGrid,
} from "@/components/social/profile-media-grid";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  Grid3X3,
  Play,
  User,
  Bookmark,
  ImageIcon,
  Settings,
  Briefcase,
  Link2,
  Lock,
  Globe,
} from "lucide-react";
import { useSnaps } from "@/stores/snaps";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { posts, loadFeed, isLoading } = useFeed();
  const { snaps } = useSnaps();
  const [activeTab, setActiveTab] = useState("posts");
  const [bannerImage, setBannerImage] = useState(user?.banner || "");
  const [avatarImage, setAvatarImage] = useState(user?.avatar || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileUsername, setProfileUsername] = useState(user?.username || "");
  const [profileWork, setProfileWork] = useState(user?.work || "");
  const [profileBio, setProfileBio] = useState(user?.bio || "");
  const [profileLink, setProfileLink] = useState(user?.profileLink || "");
  const [profilePrivate, setProfilePrivate] = useState(Boolean(user?.isPrivate));

  useEffect(() => {
    setBannerImage(user?.banner || "");
    setAvatarImage(user?.avatar || "");
    setProfileName(user?.name || "");
    setProfileUsername(user?.username || "");
    setProfileWork(user?.work || "");
    setProfileBio(user?.bio || "");
    setProfileLink(user?.profileLink || "");
    setProfilePrivate(Boolean(user?.isPrivate));
  }, [user]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const currentUsername = user?.username?.toLowerCase();

  const authoredImagePosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.author.username.toLowerCase() === currentUsername &&
          post.media?.type === "image",
      ),
    [currentUsername, posts],
  );

  const authoredVideoPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.author.username.toLowerCase() === currentUsername &&
          post.media?.type === "video",
      ),
    [currentUsername, posts],
  );

  const authoredSnaps = useMemo(
    () => snaps.filter((snap) => snap.user.username.toLowerCase() === currentUsername),
    [currentUsername, snaps],
  );

  const imageGridItems = useMemo(
    () => buildPostGridItems(authoredImagePosts),
    [authoredImagePosts],
  );

  const videoGridItems = useMemo(
    () => [...buildPostGridItems(authoredVideoPosts), ...buildSnapGridItems(authoredSnaps)],
    [authoredSnaps, authoredVideoPosts],
  );

  const stats = {
    posts: user?.posts ?? imageGridItems.length + videoGridItems.length,
    followers: user?.followers ?? 1757,
    following: user?.following ?? 1274,
  };

  const handleBannerUpload = async (image: string) => {
    setIsUpdating(true);
    try {
      await updateProfile({ banner_url: image });
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
      await updateProfile({ avatar_url: image });
      setAvatarImage(image);
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsUpdating(true);
    try {
      await updateProfile({
        name: profileName,
        username: profileUsername,
        bio: profileBio,
        work: profileWork,
        profile_link: profileLink,
        is_private: profilePrivate,
        avatar_url: avatarImage,
        banner_url: bannerImage,
      });
      setIsEditOpen(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const tabs = [
    { id: "posts", label: "Posts", icon: Grid3X3 },
    { id: "videos", label: "Videos", icon: Play },
    { id: "saved", label: "Salvos", icon: Bookmark },
    { id: "tagged", label: "Marcacoes", icon: User },
  ];

  const savedPosts = posts.filter((post) => post.isSaved);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="relative h-36 md:h-48">
          {bannerImage ? (
            <div className="relative h-full w-full">
              <img
                src={bannerImage}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-muted to-muted-foreground/20 text-sm text-muted-foreground">
              Adicione um banner ao perfil
            </div>
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
              triggerOnly
              className="w-fit"
            >
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl ring-2 ring-blue-200/50 md:h-24 md:w-24">
                {avatarImage ? (
                  <img src={avatarImage} alt={user?.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="z-10 text-base font-semibold text-blue-700">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35 opacity-100 md:opacity-0 md:transition-all md:duration-200 md:hover:opacity-100">
                  <Camera className="h-4 w-4 text-white" />
                </div>
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
                    @{user?.username || "saidlabsglobal"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    onClick={() => setIsEditOpen(true)}
                  >
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

              <div className="mb-4 flex gap-10">
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
                  {user?.work || "Said LAB Global"}
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-500"
                >
                  <Link2 className="h-4 w-4" />
                  {user?.profileLink || "abre.ai/playlistbusiness"}
                </a>
                <p className="text-sm text-muted-foreground">{user?.bio}</p>
              </div>
            </div>

            <div className="space-y-5 md:hidden">
              <div className="space-y-1">
                <h1 className="text-[1.75rem] font-bold leading-none text-foreground">
                  {user?.name || "Felipe Said"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  @{user?.username || "saidlabsglobal"}
                </p>
              </div>

              <div className="flex justify-start gap-12">
                <div className="min-w-[58px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{stats.posts}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">posts</div>
                </div>
                <div className="min-w-[72px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{stats.followers.toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">seguidores</div>
                </div>
                <div className="min-w-[72px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{stats.following.toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">seguindo</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {user?.work || "Said LAB Global"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {user?.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  {user?.isPrivate ? "Perfil privado" : "Perfil publico"}
                </div>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-500"
                >
                  <Link2 className="h-4 w-4" />
                  {user?.profileLink || "abre.ai/playlistbusiness"}
                </a>
                <p className="text-sm text-muted-foreground">{user?.bio}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 flex-1 bg-gray-800 text-white hover:bg-gray-700"
                  onClick={() => setIsEditOpen(true)}
                >
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
              {activeTab === "posts" ? (
                imageGridItems.length > 0 ? (
                  <ProfileMediaGrid items={imageGridItems} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-600">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-white">
                      Ainda nao ha nenhuma foto
                    </h3>
                    <p className="max-w-md text-center text-gray-400">
                      As publicacoes com imagem vao aparecer aqui em grade, como no Instagram.
                    </p>
                    <Button className="mt-6 bg-blue-600 text-white hover:bg-blue-700">
                      Compartilhar sua primeira foto
                    </Button>
                  </div>
                )
              ) : activeTab === "videos" ? (
                videoGridItems.length > 0 ? (
                  <ProfileMediaGrid items={videoGridItems} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-600">
                      <Play className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-white">
                      Ainda nao ha nenhum video
                    </h3>
                    <p className="max-w-md text-center text-gray-400">
                      Videos e snaps publicados vao aparecer aqui em grade.
                    </p>
                  </div>
                )
              ) : activeTab === "saved" ? (
                savedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {savedPosts.map((post) => (
                      <FeedCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-600">
                      <Bookmark className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold text-white">
                      Nenhum post salvo ainda
                    </h3>
                    <p className="max-w-md text-center text-gray-400">
                      Os posts que voce salvar aparecerao aqui no seu perfil.
                    </p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-600">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-center text-xl font-semibold text-white">
                    Ainda nao ha marcacoes
                  </h3>
                  <p className="max-w-md text-center text-gray-400">
                    Quando voce for marcado em publicacoes, elas aparecerao aqui.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Atualize trabalho, privacidade, foto, banner, link e bio do seu perfil.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Banner do perfil</Label>
              <ImageUpload
                onImageSelect={(image) => setBannerImage(image)}
                currentImage={bannerImage}
                aspectRatio={16 / 9}
                circular={false}
                minWidth={400}
                minHeight={225}
              />
            </div>

            <div className="space-y-2">
              <Label>Foto do perfil</Label>
              <div className="flex justify-start">
                <ImageUpload
                  onImageSelect={(image) => setAvatarImage(image)}
                  currentImage={avatarImage}
                  aspectRatio={1}
                  circular
                  minWidth={100}
                  minHeight={100}
                  className="w-[168px]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nome</Label>
                <Input id="profile-name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-username">Usuario</Label>
                <Input id="profile-username" value={profileUsername} onChange={(e) => setProfileUsername(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-work">Trabalho</Label>
              <Input id="profile-work" value={profileWork} onChange={(e) => setProfileWork(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-link">Link do perfil</Label>
              <Input id="profile-link" value={profileLink} onChange={(e) => setProfileLink(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea id="profile-bio" value={profileBio} onChange={(e) => setProfileBio(e.target.value)} className="min-h-[120px]" />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[hsl(var(--stroke-soft))] p-4">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Privacidade do perfil</p>
                <p className="text-sm text-muted-foreground">
                  Ative para deixar seu perfil privado.
                </p>
              </div>
              <Switch checked={profilePrivate} onCheckedChange={setProfilePrivate} />
            </div>
          </div>

          <DialogFooter className="mt-2 gap-3 sm:gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleSaveProfile} disabled={isUpdating}>
              {isUpdating ? "Salvando..." : "Salvar alteracoes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
