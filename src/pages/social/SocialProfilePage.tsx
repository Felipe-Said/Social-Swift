import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Globe,
  Grid3X3,
  ImageIcon,
  Link2,
  Lock,
  Play,
  User,
} from "lucide-react";
import { useAuth } from "@/stores/auth";
import { useFeed } from "@/stores/feed";
import { useSnaps } from "@/stores/snaps";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  buildPostGridItems,
  buildSnapGridItems,
  ProfileMediaGrid,
} from "@/components/social/profile-media-grid";
import Profile from "./Profile";
import { motion } from "framer-motion";

const tabs = [
  { id: "posts", label: "Posts", icon: Grid3X3 },
  { id: "videos", label: "Videos", icon: Play },
  { id: "tagged", label: "Marcacoes", icon: User },
];

export default function SocialProfilePage() {
  const { username } = useParams();
  const { user } = useAuth();
  const { posts, stories } = useFeed();
  const { snaps } = useSnaps();
  const [activeTab, setActiveTab] = useState("posts");

  const normalizedUsername = username?.toLowerCase();
  const isCurrentUser = !normalizedUsername || normalizedUsername === user?.username?.toLowerCase();

  const profileData = useMemo(() => {
    if (isCurrentUser) return null;

    const authorPost = posts.find((post) => post.author.username.toLowerCase() === normalizedUsername);
    const storyAuthor = stories.find((story) => story.author.username.toLowerCase() === normalizedUsername);
    const commentAuthor = posts
      .flatMap((post) => post.commentList)
      .find((comment) => comment.author.username.toLowerCase() === normalizedUsername);

    const author = authorPost?.author || storyAuthor?.author || commentAuthor?.author;
    if (!author) return null;

    const authoredPosts = posts.filter((post) => post.author.username.toLowerCase() === normalizedUsername);
    const authoredSnaps = snaps.filter((snap) => snap.user.username.toLowerCase() === normalizedUsername);

    return {
      ...author,
      banner: authoredPosts[0]?.media?.type === "image" ? authoredPosts[0].media.url : "",
      work: "Criador Social Swift",
      bio: "Compartilhando conteudo, experiencias e bastidores dentro da comunidade.",
      profileLink: `socialswift.app/${author.username}`,
      isPrivate: false,
      posts: authoredPosts,
      snaps: authoredSnaps,
      stats: {
        posts: authoredPosts.length + authoredSnaps.length,
        followers: 1200 + authoredPosts.length * 37,
        following: 320 + authoredPosts.length * 11,
      },
    };
  }, [isCurrentUser, normalizedUsername, posts, snaps, stories]);

  const imageGridItems = useMemo(
    () =>
      profileData
        ? buildPostGridItems(profileData.posts.filter((post) => post.media?.type === "image"))
        : [],
    [profileData],
  );

  const videoGridItems = useMemo(
    () =>
      profileData
        ? [
            ...buildPostGridItems(profileData.posts.filter((post) => post.media?.type === "video")),
            ...buildSnapGridItems(profileData.snaps),
          ]
        : [],
    [profileData],
  );

  if (isCurrentUser) {
    return <Profile />;
  }

  if (!profileData) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Perfil nao encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Esse usuario nao foi localizado na comunidade.
        </p>
        <Button asChild className="mt-6">
          <Link to="/app/social/feed">Voltar ao feed</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="mx-auto max-w-full px-4 py-4 md:max-w-4xl md:px-6">
          <Link
            to="/app/social/feed"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>

        <div className="relative h-36 md:h-48">
          {profileData.banner ? (
            <img src={profileData.banner} alt={`Banner de ${profileData.name}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-muted to-muted-foreground/20 text-sm text-muted-foreground">
              Banner do perfil
            </div>
          )}
        </div>

        <div className="mx-auto max-w-full px-4 md:max-w-4xl md:px-6">
          <div className="relative z-10 -mt-10 md:-mt-12">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl ring-2 ring-blue-200/50 md:h-24 md:w-24">
              <Avatar className="h-full w-full rounded-full">
                <AvatarImage src={profileData.avatar} alt={profileData.name} className="object-cover" />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="relative z-10 mt-3 md:mt-4">
            <div className="hidden md:block">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground">{profileData.name}</h1>
                  <p className="text-sm text-muted-foreground">@{profileData.username}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                    Seguir
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                    Mensagem
                  </Button>
                </div>
              </div>

              <div className="mb-4 flex gap-10">
                <div className="text-center">
                  <div className="text-base font-bold text-foreground">{profileData.stats.posts}</div>
                  <div className="text-sm text-muted-foreground">publicacoes</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-foreground">{profileData.stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-foreground">{profileData.stats.following.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">seguindo</div>
                </div>
              </div>

              <div className="mb-2">
                <h2 className="text-base font-semibold text-foreground">{profileData.name}</h2>
              </div>

              <div className="mb-4 space-y-1">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {profileData.work}
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  {profileData.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  {profileData.isPrivate ? "Perfil privado" : "Perfil publico"}
                </p>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-500">
                  <Link2 className="h-4 w-4" />
                  {profileData.profileLink}
                </a>
                <p className="text-sm text-muted-foreground">{profileData.bio}</p>
              </div>
            </div>

            <div className="space-y-5 md:hidden">
              <div className="space-y-1">
                <h1 className="text-[1.75rem] font-bold leading-none text-foreground">{profileData.name}</h1>
                <p className="text-sm text-muted-foreground">@{profileData.username}</p>
              </div>

              <div className="flex justify-start gap-12">
                <div className="min-w-[58px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{profileData.stats.posts}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">posts</div>
                </div>
                <div className="min-w-[72px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{profileData.stats.followers.toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">seguidores</div>
                </div>
                <div className="min-w-[72px] text-center">
                  <div className="text-[1.35rem] font-bold leading-none text-foreground">{profileData.stats.following.toLocaleString()}</div>
                  <div className="mt-1 text-sm leading-none text-muted-foreground">seguindo</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {profileData.work}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {profileData.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  {profileData.isPrivate ? "Perfil privado" : "Perfil publico"}
                </div>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-500">
                  <Link2 className="h-4 w-4" />
                  {profileData.profileLink}
                </a>
                <p className="text-sm text-muted-foreground">{profileData.bio}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-10 flex-1 bg-gray-800 text-white hover:bg-gray-700">
                  Seguir
                </Button>
                <Button variant="outline" size="sm" className="h-10 flex-1 bg-gray-800 text-white hover:bg-gray-700">
                  Mensagem
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
                        activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {activeTab === tab.id && (
                        <motion.div layoutId="externalProfileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
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
                    <h3 className="mb-2 text-center text-xl font-semibold text-white">Ainda nao ha nenhuma foto</h3>
                    <p className="max-w-md text-center text-gray-400">
                      As publicacoes com imagem deste usuario aparecem aqui em grade.
                    </p>
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
                      Videos e snaps deste usuario vao aparecer aqui.
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
                    Esse conteudo aparecera aqui quando houver novas publicacoes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
