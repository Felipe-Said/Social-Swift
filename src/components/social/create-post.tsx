import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
import { GlassCard } from '@/components/ui/glass-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/stores/auth';
import { 
  Image, 
  Video, 
  Smile, 
  MapPin, 
  X,
  Send
} from 'lucide-react';

interface CreatePostProps {
  onPostCreated?: (post: any) => void;
  className?: string;
}

export function CreatePost({ onPostCreated, className = '' }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);

  const handleMediaUpload = (image: string) => {
    if (media.length < 4) {
      setMedia(prev => [...prev, image]);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!content.trim() && media.length === 0) return;

    setIsCreating(true);
    try {
      // Simular criação do post
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

      // Aqui você faria a chamada para a API real
      console.log('Criando post:', newPost);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Limpar formulário
      setContent('');
      setMedia([]);
      setShowMediaUpload(false);

      // Notificar componente pai
      onPostCreated?.(newPost);

    } catch (error) {
      console.error('Erro ao criar post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <GlassCard className={`p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-text">
            {user?.name || 'Usuário'}
          </h3>
          <p className="text-sm text-text-dim">
            @{user?.username || 'usuario'}
          </p>
        </div>
      </div>

      {/* Content Input */}
      <Textarea
        placeholder="O que você está pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] resize-none border-0 bg-transparent text-text placeholder:text-text-dim focus:ring-0"
      />

      {/* Media Preview */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {media.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Media ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveMedia(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Media Upload */}
      <AnimatePresence>
        {showMediaUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <ImageUpload
              onImageSelect={handleMediaUpload}
              aspectRatio={16/9}
              circular={false}
              minWidth={200}
              minHeight={112}
              maxSize={10}
              className="border-2 border-dashed border-border/50 rounded-lg p-4"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMediaUpload(!showMediaUpload)}
            className="text-text-dim hover:text-text"
          >
            <Image className="h-4 w-4 mr-1" />
            Foto
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-dim hover:text-text"
            disabled
          >
            <Video className="h-4 w-4 mr-1" />
            Vídeo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-dim hover:text-text"
            disabled
          >
            <Smile className="h-4 w-4 mr-1" />
            Emoji
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-dim hover:text-text"
            disabled
          >
            <MapPin className="h-4 w-4 mr-1" />
            Localização
          </Button>
        </div>

        <Button
          onClick={handleCreatePost}
          disabled={(!content.trim() && media.length === 0) || isCreating}
          className="gradient-brand text-white"
        >
          {isCreating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
