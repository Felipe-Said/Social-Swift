import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useFeed, type Post } from "@/stores/feed";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface FeedCardProps {
  post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
  const { likePost, savePost, commentPost, sharePost } = useFeed();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleSave = () => {
    savePost(post.id);
    toast({
      title: post.isSaved ? "Post removido dos salvos" : "Post salvo",
      description: post.isSaved ? "O post saiu da sua lista de salvos." : "O post foi adicionado aos seus salvos.",
    });
  };

  const handleComment = () => {
    commentPost(post.id);
    toast({
      title: "Comentario iniciado",
      description: "Adicionamos uma interacao de comentario neste post.",
    });
  };

  const handleShare = () => {
    sharePost(post.id);
    toast({
      title: "Post compartilhado",
      description: "O contador de compartilhamentos foi atualizado.",
    });
  };

  const handleDoubleClick = () => {
    if (!post.isLiked) {
      handleLike();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-semibold text-text">{post.author.name}</span>
                {post.author.verified && <Badge className="h-4 w-4 rounded-full bg-brand p-0 text-white">✓</Badge>}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <span>@{post.author.username}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-4 pb-3">
          <p className="text-[15px] leading-relaxed text-text">
            {showFullContent || post.content.length <= 150 ? post.content : `${post.content.slice(0, 150)}...`}
            {post.content.length > 150 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="ml-1 text-sm font-semibold text-text-dim hover:underline"
              >
                {showFullContent ? "Ver menos" : "Ver mais"}
              </button>
            )}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-2 flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip text-xs text-brand">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.media && (
          <div className="group relative cursor-pointer" onDoubleClick={handleDoubleClick}>
            {post.media.type === "image" ? (
              <img src={post.media.url} alt="Post media" className="max-h-96 w-full object-cover" />
            ) : (
              <div className="relative">
                <img
                  src={post.media.thumbnail || post.media.url}
                  alt="Video thumbnail"
                  className="max-h-96 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-strong rounded-full p-3">
                    <Play className="h-6 w-6 fill-current text-white" />
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence>
              {post.isLiked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <Heart className="h-16 w-16 fill-current text-status-like" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[hsl(var(--stroke-soft))] pb-3 text-sm text-text-dim">
            <span>{post.likes} curtidas</span>
            <span>
              {post.comments} comentarios • {post.shares} compartilhamentos
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={cn(
                "h-10 w-10 rounded-full",
                post.isLiked && "text-status-like"
              )}
              aria-label="Curtir"
            >
              <motion.div whileTap={{ scale: 0.8 }} transition={{ duration: 0.1 }}>
                <Heart className={cn("h-5 w-5", post.isLiked && "fill-current")} />
              </motion.div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-text-dim hover:text-text"
              onClick={handleComment}
              aria-label="Comentar"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-text-dim hover:text-text"
              onClick={handleShare}
              aria-label="Compartilhar"
            >
              <Share className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className={cn(
                "h-10 w-10 rounded-full",
                post.isSaved && "text-brand"
              )}
              aria-label="Salvar"
            >
              <Bookmark className={cn("h-4 w-4", post.isSaved && "fill-current")} />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
