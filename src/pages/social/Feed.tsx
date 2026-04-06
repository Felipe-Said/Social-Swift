import { useEffect, useState } from "react";
import { Plus, Search, Video, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedCard } from "@/components/social/feed-card";
import { CreatePost } from "@/components/social/create-post";
import { PostCard } from "@/components/social/post-card";
import { useFeed } from "@/stores/feed";
import { useAuth } from "@/stores/auth";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { getSocialProfilePath } from "@/lib/profile";

export default function Feed() {
  const { posts, stories, isLoading, loadFeed } = useFeed();
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handlePostCreated = (newPost: any) => {
    setUserPosts((prev) => [newPost, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setUserPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleCommentPost = (postId: string) => {
    console.log("Comentar no post:", postId);
  };

  const handleSharePost = (postId: string) => {
    console.log("Compartilhar post:", postId);
  };

  return (
    <div className="min-h-screen bg-bg px-2 py-4 lg:px-0 lg:py-6">
      <div className="mx-auto w-full max-w-[680px] space-y-4">
        <div className="hidden overflow-x-auto rounded-xl pb-1 lg:block">
          <div className="flex gap-2">
            <button className="relative h-[190px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-[hsl(var(--surface))] shadow-[var(--shadow)]">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[hsl(var(--accent))]">
                  <span className="text-3xl font-semibold text-text">
                    {user?.name?.charAt(0) || "F"}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20" />
              <div className="absolute inset-x-0 bottom-0 flex h-[58px] flex-col items-center justify-center border-t border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))]">
                <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[hsl(var(--surface))] bg-[hsl(var(--brand))] text-white">
                  <Plus className="h-5 w-5" />
                </div>
                <span className="mt-3 text-center text-[13px] font-semibold text-text">Criar story</span>
              </div>
            </button>

            {stories.slice(0, 4).map((story) => (
              <Link
                key={story.id}
                to={getSocialProfilePath(story.author.username)}
                className="relative h-[190px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-[hsl(var(--surface))] shadow-[var(--shadow)]"
              >
                <img
                  src={story.author.avatar}
                  alt={story.author.name}
                  className={cn("h-full w-full object-cover", story.isViewed && "opacity-70")}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                <Avatar className="absolute left-3 top-3 h-10 w-10 border-4 border-[hsl(var(--brand))]">
                  <AvatarImage src={story.author.avatar} alt={story.author.name} />
                  <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                  {story.author.name.split(" ")[0]}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <CreatePost onPostCreated={handlePostCreated} />

        <GlassCard className="hidden p-3 lg:block">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" className="rounded-lg text-brand">
                <Video className="h-4 w-4" />
                Reels
              </Button>
              <Button variant="ghost" className="rounded-lg">
                <Search className="h-4 w-4" />
                Explorar
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </GlassCard>

        {userPosts.length > 0 && (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLikePost}
                onComment={handleCommentPost}
                onShare={handleSharePost}
              />
            ))}
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div className="space-y-1">
                        <div className="h-4 w-32 rounded bg-muted" />
                        <div className="h-3 w-24 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-muted" />
                      <div className="h-4 w-3/4 rounded bg-muted" />
                    </div>
                    <div className="h-48 w-full rounded-xl bg-muted" />
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            posts.map((post) => (
              <FeedCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
