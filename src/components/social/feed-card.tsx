import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useFeed, type Post } from "@/stores/feed";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeedCardProps {
  post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
  const { likePost, savePost } = useFeed();
  const [showFullContent, setShowFullContent] = useState(false);
  
  const handleLike = () => {
    likePost(post.id);
  };

  const handleSave = () => {
    savePost(post.id);
  };

  const handleDoubleClick = () => {
    if (!post.isLiked) {
      handleLike();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="p-0 overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-text text-sm">
                  {post.author.name}
                </span>
                {post.author.verified && (
                  <Badge className="h-4 w-4 p-0 rounded-full bg-brand text-white">
                    ✓
                  </Badge>
                )}
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

        {/* Content */}
        <div className="px-4 pb-3">
          <p className="text-text text-sm leading-relaxed">
            {showFullContent || post.content.length <= 150 
              ? post.content 
              : `${post.content.slice(0, 150)}...`
            }
            {post.content.length > 150 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-brand text-sm ml-1 hover:underline"
              >
                {showFullContent ? 'Ver menos' : 'Ver mais'}
              </button>
            )}
          </p>
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex gap-2 mt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip text-xs text-brand bg-brand/10">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Media */}
        {post.media && (
          <div 
            className="relative cursor-pointer group"
            onDoubleClick={handleDoubleClick}
          >
            {post.media.type === 'image' ? (
              <img
                src={post.media.url}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
              />
            ) : (
              <div className="relative">
                <img
                  src={post.media.thumbnail || post.media.url}
                  alt="Video thumbnail"
                  className="w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-strong rounded-full p-3">
                    <Play className="h-6 w-6 text-white fill-current" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Double-tap like animation */}
            <AnimatePresence>
              {post.isLiked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Heart className="h-16 w-16 text-status-like fill-current" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 h-auto",
                  post.isLiked && "text-status-like"
                )}
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5", 
                      post.isLiked && "fill-current"
                    )} 
                  />
                </motion.div>
                <span className="text-sm font-medium">{post.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 px-2 py-1 h-auto text-text-dim hover:text-text"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 px-2 py-1 h-auto text-text-dim hover:text-text"
              >
                <Share className="h-5 w-5" />
                <span className="text-sm font-medium">{post.shares}</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className={cn(
                "h-8 w-8",
                post.isSaved && "text-brand"
              )}
            >
              <Bookmark 
                className={cn(
                  "h-4 w-4",
                  post.isSaved && "fill-current"
                )} 
              />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}