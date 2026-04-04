import { useEffect, useState } from "react";
import { Plus, Image, Video, Hash, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedCard } from "@/components/social/feed-card";
import { CreatePost } from "@/components/social/create-post";
import { PostCard } from "@/components/social/post-card";
import { WeatherBox } from "@/components/ui/weather-box";
import { useFeed } from "@/stores/feed";
import { useAuth } from "@/stores/auth";
import { motion } from "framer-motion";

const cryptoData = [
  { symbol: "BTC", price: "R$ 347.821,50", change: "+2.45%" },
  { symbol: "USDT", price: "R$ 5,12", change: "-0.12%" },
];

export default function Feed() {
  const { posts, stories, isLoading, loadFeed, addPost } = useFeed();
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handlePost = async () => {
    if (!postContent.trim()) return;
    
    setIsPosting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Mock delay
    
    addPost(postContent);
    setPostContent("");
    setIsPosting(false);
  };

  const handlePostCreated = (newPost: any) => {
    setUserPosts(prev => [newPost, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setUserPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleCommentPost = (postId: string) => {
    console.log('Comentar no post:', postId);
    // Implementar modal de comentários
  };

  const handleSharePost = (postId: string) => {
    console.log('Compartilhar post:', postId);
    // Implementar funcionalidade de compartilhamento
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Trending */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <GlassCard className="p-4">
              <h3 className="font-semibold text-text mb-3">Cripto em alta</h3>
              <div className="space-y-3">
                {cryptoData.map((crypto) => (
                  <div key={crypto.symbol} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text text-sm">{crypto.symbol}</p>
                      <p className="text-xs text-text-dim">{crypto.price}</p>
                    </div>
                    <Badge 
                      variant={crypto.change.startsWith('+') ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {crypto.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <h3 className="font-semibold text-text mb-3">Sugestões</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">João Developer</p>
                    <p className="text-xs text-text-dim">@joaodev</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Seguir
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Stories */}
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {/* Add Story */}
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="w-16 h-16 rounded-full border-2 border-dashed border-brand/50 hover:border-brand"
                >
                  <Plus className="h-6 w-6 text-brand" />
                </Button>
                <p className="text-xs text-center mt-1 text-text-dim">Adicionar</p>
              </div>

              {/* Stories */}
              {stories.map((story) => (
                <div key={story.id} className="flex-shrink-0">
                  <div className={`story-ring p-0.5 ${story.isViewed ? 'opacity-50' : ''}`}>
                    <div className="story-ring-inner">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={story.author.avatar} alt={story.author.name} />
                        <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 text-text-dim truncate w-16">
                    {story.author.name.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>

            {/* Post Composer */}
            <CreatePost onPostCreated={handlePostCreated} />

            {/* User Posts */}
            {userPosts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text">Seus Posts</h3>
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

            {/* Posts Feed */}
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeletons
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
                          <div className="w-10 h-10 bg-muted rounded-full"></div>
                          <div className="space-y-1">
                            <div className="w-32 h-4 bg-muted rounded"></div>
                            <div className="w-24 h-3 bg-muted rounded"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-4 bg-muted rounded"></div>
                          <div className="w-3/4 h-4 bg-muted rounded"></div>
                        </div>
                        <div className="w-full h-48 bg-muted rounded-brand"></div>
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

          {/* Right Sidebar - Activity */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <WeatherBox />

            <GlassCard className="p-4">
              <h3 className="font-semibold text-text mb-3">Atividades</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-text">Swap realizado</p>
                    <p className="text-xs text-text-dim">há 2h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-status-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-text">Saque aprovado</p>
                    <p className="text-xs text-text-dim">há 4h</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}