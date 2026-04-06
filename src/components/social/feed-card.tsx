import { useMemo, useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useFeed, type Post } from "@/stores/feed";
import { useAuth } from "@/stores/auth";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { getSocialProfilePath } from "@/lib/profile";

interface FeedCardProps {
  post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
  const { likePost, savePost, addComment, sharePost } = useFeed();
  const { user } = useAuth();
  const [showFullContent, setShowFullContent] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const latestPost = useFeed(
    useMemo(() => (state) => state.posts.find((item) => item.id === post.id) ?? post, [post]),
  );

  const handleLike = () => {
    likePost(latestPost.id);
  };

  const handleSave = () => {
    savePost(latestPost.id);
    toast({
      title: latestPost.isSaved ? "Post removido dos salvos" : "Post salvo",
      description: latestPost.isSaved ? "O post saiu da sua lista de salvos." : "O post foi adicionado aos seus salvos.",
    });
  };

  const handleComment = () => {
    setIsCommentsOpen(true);
  };

  const handleShare = () => {
    sharePost(latestPost.id);
    toast({
      title: "Post compartilhado",
      description: "O contador de compartilhamentos foi atualizado.",
    });
  };

  const handleDoubleClick = () => {
    if (!latestPost.isLiked) {
      handleLike();
    }
  };

  const handleSubmitComment = () => {
    if (!commentValue.trim()) return;

    addComment(latestPost.id, commentValue, {
      id: user?.id || "bypass-user",
      name: user?.name || "Felipe Said",
      username: user?.username || "felipesaid_",
      avatar: user?.avatar || "",
    });

    setCommentValue("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <Link to={getSocialProfilePath(latestPost.author.username)}>
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={latestPost.author.avatar} alt={latestPost.author.name} />
                <AvatarFallback>{latestPost.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-1">
                <Link to={getSocialProfilePath(latestPost.author.username)} className="text-[15px] font-semibold text-text hover:underline">
                  {latestPost.author.name}
                </Link>
                {latestPost.author.verified && <Badge className="h-4 w-4 rounded-full bg-brand p-0 text-white">âœ“</Badge>}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <span>@{latestPost.author.username}</span>
                <span>â€¢</span>
                <span>{latestPost.timestamp}</span>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-4 pb-3">
          <p className="text-[15px] leading-relaxed text-text">
            {showFullContent || latestPost.content.length <= 150
              ? latestPost.content
              : `${latestPost.content.slice(0, 150)}...`}
            {latestPost.content.length > 150 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="ml-1 text-sm font-semibold text-text-dim hover:underline"
              >
                {showFullContent ? "Ver menos" : "Ver mais"}
              </button>
            )}
          </p>

          {latestPost.tags.length > 0 && (
            <div className="mt-2 flex gap-2">
              {latestPost.tags.map((tag) => (
                <span key={tag} className="chip text-xs text-brand">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {latestPost.media && (
          <div className="group relative cursor-pointer" onDoubleClick={handleDoubleClick}>
            {latestPost.media.type === "image" ? (
              <img src={latestPost.media.url} alt="Post media" className="max-h-96 w-full object-cover" />
            ) : (
              <div className="relative">
                <img
                  src={latestPost.media.thumbnail || latestPost.media.url}
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
              {latestPost.isLiked && (
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
            <span>{latestPost.likes} curtidas</span>
            <span>
              {latestPost.comments} comentarios â€¢ {latestPost.shares} compartilhamentos
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={cn("h-10 w-10 rounded-full", latestPost.isLiked && "text-status-like")}
              aria-label="Curtir"
            >
              <motion.div whileTap={{ scale: 0.8 }} transition={{ duration: 0.1 }}>
                <Heart className={cn("h-5 w-5", latestPost.isLiked && "fill-current")} />
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
              className={cn("h-10 w-10 rounded-full", latestPost.isSaved && "text-brand")}
              aria-label="Salvar"
            >
              <Bookmark className={cn("h-4 w-4", latestPost.isSaved && "fill-current")} />
            </Button>
          </div>
        </div>
      </GlassCard>

      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent className="max-h-[92vh] max-w-[min(96vw,1100px)] overflow-hidden border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-0">
          <div className="grid h-full max-h-[92vh] md:grid-cols-[1.08fr_0.92fr]">
            <div className="hidden min-h-[680px] bg-black md:flex md:items-center md:justify-center">
              {latestPost.media ? (
                latestPost.media.type === "image" ? (
                  <img src={latestPost.media.url} alt="Post" className="h-full w-full object-cover" />
                ) : (
                  <img
                    src={latestPost.media.thumbnail || latestPost.media.url}
                    alt="Video"
                    className="h-full w-full object-cover"
                  />
                )
              ) : (
                <div className="flex h-full w-full items-center justify-center px-10 text-center text-lg text-white/85">
                  {latestPost.content}
                </div>
              )}
            </div>

            <div className="flex min-h-[75vh] flex-col bg-[hsl(var(--surface))]">
              <div className="flex items-center gap-3 border-b border-[hsl(var(--stroke-soft))] px-4 py-3">
                <Link to={getSocialProfilePath(latestPost.author.username)} onClick={() => setIsCommentsOpen(false)}>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src={latestPost.author.avatar} alt={latestPost.author.name} />
                    <AvatarFallback>{latestPost.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link
                    to={getSocialProfilePath(latestPost.author.username)}
                    onClick={() => setIsCommentsOpen(false)}
                    className="text-sm font-semibold text-text hover:underline"
                  >
                    {latestPost.author.name}
                  </Link>
                  <p className="text-xs text-text-dim">@{latestPost.author.username}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Link to={getSocialProfilePath(latestPost.author.username)} onClick={() => setIsCommentsOpen(false)}>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src={latestPost.author.avatar} alt={latestPost.author.name} />
                        <AvatarFallback>{latestPost.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="min-w-0 text-sm leading-relaxed text-text">
                      <Link
                        to={getSocialProfilePath(latestPost.author.username)}
                        onClick={() => setIsCommentsOpen(false)}
                        className="mr-2 font-semibold hover:underline"
                      >
                        {latestPost.author.username}
                      </Link>
                      {latestPost.content}
                      <div className="mt-1 text-xs text-text-dim">{latestPost.timestamp}</div>
                    </div>
                  </div>

                  {latestPost.commentList.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Link to={getSocialProfilePath(comment.author.username)} onClick={() => setIsCommentsOpen(false)}>
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="min-w-0 text-sm leading-relaxed text-text">
                        <Link
                          to={getSocialProfilePath(comment.author.username)}
                          onClick={() => setIsCommentsOpen(false)}
                          className="mr-2 font-semibold hover:underline"
                        >
                          {comment.author.username}
                        </Link>
                        {comment.content}
                        <div className="mt-1 text-xs text-text-dim">{comment.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[hsl(var(--stroke-soft))] px-4 py-3">
                <div className="mb-3 flex items-center justify-between text-xs text-text-dim">
                  <span>{latestPost.likes} curtidas</span>
                  <span>{latestPost.comments} comentarios</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-2">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || "F"}</AvatarFallback>
                  </Avatar>
                  <Input
                    value={commentValue}
                    onChange={(event) => setCommentValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSubmitComment();
                      }
                    }}
                    placeholder="Adicione um comentario..."
                    className="h-10 flex-1 rounded-full border border-[hsl(var(--stroke-soft))] bg-[hsl(var(--accent))] px-4 shadow-none focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    className="h-auto min-w-0 shrink-0 px-1 text-sm font-semibold text-brand"
                    onClick={handleSubmitComment}
                    disabled={!commentValue.trim()}
                  >
                    Publicar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
