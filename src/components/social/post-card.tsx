import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  MapPin,
  Clock
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  media?: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  liked: boolean;
  location?: string;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  className?: string;
}

export function PostCard({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  className = '' 
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Agora mesmo';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
    return postDate.toLocaleDateString('pt-BR');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <GlassCard className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-dim">
                <span>@{post.author.username}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(post.createdAt)}</span>
                </div>
                {post.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-dim hover:text-text"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {post.content && (
          <div className="text-text whitespace-pre-wrap">
            {post.content}
          </div>
        )}

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className={`grid gap-2 ${
            post.media.length === 1 ? 'grid-cols-1' : 
            post.media.length === 2 ? 'grid-cols-2' : 
            post.media.length === 3 ? 'grid-cols-2' : 
            'grid-cols-2'
          }`}>
            {post.media.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Post media ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {post.media!.length > 1 && index === 2 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium">
                      +{post.media!.length - 3} mais
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-text-dim hover:text-text'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment?.(post.id)}
              className="text-text-dim hover:text-text flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post.id)}
              className="text-text-dim hover:text-text flex items-center gap-2"
            >
              <Share className="h-4 w-4" />
              <span>{post.shares}</span>
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
