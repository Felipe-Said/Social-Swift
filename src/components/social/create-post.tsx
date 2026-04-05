import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/stores/auth";
import {
  Image,
  Video,
  Smile,
  MapPin,
  X,
  Send
} from "lucide-react";

interface CreatePostProps {
  onPostCreated?: (post: any) => void;
  className?: string;
}

export function CreatePost({ onPostCreated, className = "" }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);

  const handleMediaUpload = (image: string) => {
    if (media.length < 4) {
      setMedia((prev) => [...prev, image]);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!content.trim() && media.length === 0) return;

    setIsCreating(true);
    try {
      const newPost = {
        id: Date.now().toString(),
        author: {
          id: user?.id,
          name: user?.name,
          username: user?.username,
          avatar: user?.avatar
        },
        content: content.trim(),
        media: media,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date().toISOString(),
        liked: false
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setContent("");
      setMedia([]);
      setShowMediaUpload(false);

      onPostCreated?.(newPost);
    } catch (error) {
      console.error("Erro ao criar post:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <GlassCard className={`space-y-0 overflow-hidden p-0 ${className}`}>
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <button className="flex h-10 flex-1 items-center rounded-full bg-[hsl(var(--accent))] px-4 text-left text-[17px] text-text-dim">
          No que voce esta pensando, {user?.name?.split(" ")[0] || "Felipe"}?
        </button>
      </div>

      <div className="border-t border-[hsl(var(--stroke-soft))] px-4 py-3">
        <Textarea
          placeholder="Compartilhe uma atualizacao"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[88px] resize-none border-0 bg-transparent px-0 text-[16px] text-text placeholder:text-text-dim focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          {media.map((image, index) => (
            <div key={index} className="group relative">
              <img
                src={image}
                alt={`Media ${index + 1}`}
                className="h-32 w-full rounded-lg object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemoveMedia(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showMediaUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 px-4 pb-4"
          >
            <ImageUpload
              onImageSelect={handleMediaUpload}
              aspectRatio={16 / 9}
              circular={false}
              minWidth={200}
              minHeight={112}
              maxSize={10}
              className="rounded-lg border-2 border-dashed border-border/50 p-4"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[hsl(var(--stroke-soft))] px-3 py-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMediaUpload(!showMediaUpload)}
            className="rounded-lg text-text-dim hover:text-text"
          >
            <Image className="mr-1 h-4 w-4" />
            Foto
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-text-dim hover:text-text"
            disabled
          >
            <Video className="mr-1 h-4 w-4" />
            Video
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-text-dim hover:text-text"
            disabled
          >
            <Smile className="mr-1 h-4 w-4" />
            Emoji
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-text-dim hover:text-text"
            disabled
          >
            <MapPin className="mr-1 h-4 w-4" />
            Local
          </Button>
        </div>

        <Button
          onClick={handleCreatePost}
          disabled={(!content.trim() && media.length === 0) || isCreating}
          className="h-9 rounded-md bg-[hsl(var(--brand))] px-8 text-white"
        >
          {isCreating ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Publicando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Publicar
            </div>
          )}
        </Button>
      </div>
    </GlassCard>
  );
}
