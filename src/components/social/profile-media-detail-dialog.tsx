import { useMemo, useState } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getSocialProfilePath } from "@/lib/profile";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/stores/auth";
import { useFeed } from "@/stores/feed";
import { useSnaps } from "@/stores/snaps";
import type { MediaGridItem } from "@/components/social/profile-media-grid";

interface ProfileMediaDetailDialogProps {
  item: MediaGridItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileMediaDetailDialog({
  item,
  open,
  onOpenChange,
}: ProfileMediaDetailDialogProps) {
  const { user } = useAuth();
  const { posts, likePost, sharePost, addComment: addPostComment } = useFeed();
  const { snaps, toggleLike, incrementShare, addComment: addSnapComment } = useSnaps();
  const [commentValue, setCommentValue] = useState("");

  const content = useMemo(() => {
    if (!item) return null;

    if (item.kind === "post") {
      const post = posts.find((entry) => entry.id === item.id);
      if (!post) return null;

      return {
        kind: "post" as const,
        id: post.id,
        author: post.author,
        mediaType: post.media?.type || "image",
        mediaUrl: post.media?.url || item.imageUrl,
        caption: post.content,
        timestamp: post.timestamp,
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        isLiked: post.isLiked,
        commentList: post.commentList.map((comment) => ({
          ...comment,
          authorName: comment.author.name,
        })),
      };
    }

    const snap = snaps.find((entry) => entry.id === item.id);
    if (!snap) return null;

    return {
      kind: "snap" as const,
      id: snap.id,
      author: {
        ...snap.user,
        verified: false,
      },
      mediaType: snap.media.type,
      mediaUrl: snap.media.url,
      caption: snap.description,
      timestamp: "agora",
      likes: snap.likes,
      comments: snap.comments,
      shares: snap.shares,
      isLiked: snap.isLiked,
      commentList: snap.commentList.map((comment) => ({
        ...comment,
        authorName: comment.author.name,
      })),
    };
  }, [item, posts, snaps]);

  const handleLike = () => {
    if (!content) return;
    if (content.kind === "post") {
      likePost(content.id);
      return;
    }
    toggleLike(content.id);
  };

  const handleShare = () => {
    if (!content) return;
    if (content.kind === "post") {
      sharePost(content.id);
    } else {
      incrementShare(content.id);
    }

    toast({
      title: "Compartilhado",
      description: "O contador foi atualizado.",
    });
  };

  const handleSubmitComment = () => {
    if (!content || !commentValue.trim()) return;

    const author = {
      name: user?.name || "Felipe Said",
      username: user?.username || "felipesaid_",
      avatar: user?.avatar || "",
    };

    if (content.kind === "post") {
      addPostComment(content.id, commentValue, {
        id: user?.id || "bypass-user",
        ...author,
      });
    } else {
      addSnapComment(content.id, commentValue, author);
    }

    setCommentValue("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-[min(96vw,1100px)] overflow-hidden border-[hsl(var(--stroke-soft))] bg-[hsl(var(--surface))] p-0">
        {content && (
          <div className="grid h-full max-h-[92vh] grid-rows-[minmax(220px,42vh)_1fr] md:grid-cols-[1.08fr_0.92fr] md:grid-rows-1">
            <div className="min-h-[220px] bg-black md:min-h-[680px] md:flex md:items-center md:justify-center">
              {content.mediaType === "video" ? (
                <video
                  src={content.mediaUrl}
                  className="h-full w-full object-cover md:h-full md:w-full"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img src={content.mediaUrl} alt={content.caption} className="h-full w-full object-cover" />
              )}
            </div>

            <div className="flex min-h-0 flex-col bg-[hsl(var(--surface))] md:min-h-[75vh]">
              <div className="flex items-center gap-3 border-b border-[hsl(var(--stroke-soft))] px-4 py-3">
                <Link to={getSocialProfilePath(content.author.username)} onClick={() => onOpenChange(false)}>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src={content.author.avatar} alt={content.author.name} />
                    <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link
                    to={getSocialProfilePath(content.author.username)}
                    onClick={() => onOpenChange(false)}
                    className="text-sm font-semibold text-text hover:underline"
                  >
                    {content.author.name}
                  </Link>
                  <p className="text-xs text-text-dim">@{content.author.username}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Link to={getSocialProfilePath(content.author.username)} onClick={() => onOpenChange(false)}>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src={content.author.avatar} alt={content.author.name} />
                        <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="min-w-0 text-sm leading-relaxed text-text">
                      <Link
                        to={getSocialProfilePath(content.author.username)}
                        onClick={() => onOpenChange(false)}
                        className="mr-2 font-semibold hover:underline"
                      >
                        {content.author.username}
                      </Link>
                      {content.caption}
                      <div className="mt-1 text-xs text-text-dim">{content.timestamp}</div>
                    </div>
                  </div>

                  {content.commentList.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Link to={getSocialProfilePath(comment.author.username)} onClick={() => onOpenChange(false)}>
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="min-w-0 text-sm leading-relaxed text-text">
                        <Link
                          to={getSocialProfilePath(comment.author.username)}
                          onClick={() => onOpenChange(false)}
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
                <div className="mb-3 flex items-center gap-5">
                  <Button variant="ghost" size="icon" onClick={handleLike} className="h-9 w-9 rounded-full">
                    <Heart className={`h-5 w-5 ${content.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleShare} className="h-9 w-9 rounded-full">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mb-3 space-y-1 text-xs text-text-dim">
                  <p>{content.likes} curtidas</p>
                  <p>{content.comments} comentarios</p>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
