import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Briefcase, Link2, Lock, Globe, ArrowLeft } from "lucide-react";
import { useAuth } from "@/stores/auth";
import { useFeed } from "@/stores/feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FeedCard } from "@/components/social/feed-card";
import Profile from "./Profile";

export default function SocialProfilePage() {
  const { username } = useParams();
  const { user } = useAuth();
  const { posts, stories } = useFeed();

  const normalizedUsername = username?.toLowerCase();
  const isCurrentUser = !normalizedUsername || normalizedUsername === user?.username?.toLowerCase();

  const profileData = useMemo(() => {
    if (isCurrentUser) return null;

    const authorPost = posts.find((post) => post.author.username.toLowerCase() === normalizedUsername);
    const storyAuthor = stories.find((story) => story.author.username.toLowerCase() === normalizedUsername);
    const commentAuthor = posts
      .flatMap((post) => post.commentList)
      .find((comment) => comment.author.username.toLowerCase() === normalizedUsername);

    const author =
      authorPost?.author ||
      storyAuthor?.author ||
      commentAuthor?.author;

    if (!author) return null;

    const authoredPosts = posts.filter((post) => post.author.username.toLowerCase() === normalizedUsername);

    return {
      ...author,
      work: "Criador Social Swift",
      bio: "Compartilhando conteudo, experiencias e bastidores dentro da comunidade.",
      profileLink: `socialswift.app/${author.username}`,
      isPrivate: false,
      posts: authoredPosts,
      stats: {
        posts: authoredPosts.length,
        followers: 1200 + authoredPosts.length * 37,
        following: 320 + authoredPosts.length * 11,
      },
    };
  }, [isCurrentUser, normalizedUsername, posts, stories]);

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
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Link to="/app/social/feed" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <div className="rounded-3xl border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profileData.name}</h1>
                  <p className="text-sm text-muted-foreground">@{profileData.username}</p>
                </div>

                <div className="flex gap-8">
                  <div>
                    <div className="text-lg font-bold text-foreground">{profileData.stats.posts}</div>
                    <div className="text-sm text-muted-foreground">posts</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{profileData.stats.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">seguidores</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{profileData.stats.following.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">seguindo</div>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {profileData.work}
                  </p>
                  <p className="flex items-center gap-2">
                    {profileData.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                    {profileData.isPrivate ? "Perfil privado" : "Perfil publico"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    {profileData.profileLink}
                  </p>
                  <p>{profileData.bio}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">Seguir</Button>
              <Button variant="outline">Mensagem</Button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {profileData.posts.length > 0 ? (
            profileData.posts.map((post) => <FeedCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-3xl border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-10 text-center text-muted-foreground">
              Esse usuario ainda nao publicou nada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
