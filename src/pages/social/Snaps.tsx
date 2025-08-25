import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/stores/auth";

interface Snap {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  video?: string;
  image?: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  music?: {
    title: string;
    artist: string;
  };
}

const mockSnaps: Snap[] = [
  {
    id: "1",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "/placeholder.svg"
    },
    image: "https://images.unsplash.com/photo-1494790108755-2616c96ce29d?w=400&h=700&fit=crop",
    description: "Aproveitando o dia! ☀️ #vibes #social",
    likes: 1234,
    comments: 89,
    shares: 12,
    isLiked: false,
    music: {
      title: "Good Vibes",
      artist: "Artist Name"
    }
  },
  {
    id: "2",
    user: {
      name: "João Santos",
      username: "joaosantos",
      avatar: "/placeholder.svg"
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop",
    description: "Trabalhando duro! 💪 #hustle #swift",
    likes: 892,
    comments: 45,
    shares: 8,
    isLiked: true,
    music: {
      title: "Energy Boost",
      artist: "Motivational Music"
    }
  },
  {
    id: "3",
    user: {
      name: "Ana Costa",
      username: "anacosta",
      avatar: "/placeholder.svg"
    },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=700&fit=crop",
    description: "Nova receita testada! 🍰 #culinaria #delicia",
    likes: 567,
    comments: 23,
    shares: 5,
    isLiked: false
  }
];

export default function Snaps() {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snaps, setSnaps] = useState(mockSnaps);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSnap = snaps[currentIndex];

  const handleLike = (snapId: string) => {
    setSnaps(snaps.map(snap => 
      snap.id === snapId 
        ? { 
            ...snap, 
            isLiked: !snap.isLiked,
            likes: snap.isLiked ? snap.likes - 1 : snap.likes + 1
          }
        : snap
    ));
  };

  const goToNext = () => {
    if (currentIndex < snaps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Mobile-first full screen layout */}
      <div className="relative w-full h-full max-w-md mx-auto bg-black overflow-hidden">
        
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
          {snaps.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index === currentIndex ? 'w-full' : index < currentIndex ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white disabled:opacity-30"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute bottom-1/2 left-4 z-20 transform translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === snaps.length - 1}
            className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white disabled:opacity-30"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSnap.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            {/* Content */}
            {currentSnap.video ? (
              <video
                ref={videoRef}
                src={currentSnap.video}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
            ) : (
              <img
                src={currentSnap.image}
                alt={currentSnap.description}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* User info */}
            <div className="absolute top-16 left-4 right-16 z-10 flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={currentSnap.user.avatar} />
                <AvatarFallback className="bg-muted text-foreground">
                  {currentSnap.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  {currentSnap.user.name}
                </p>
                <p className="text-white/80 text-xs">
                  @{currentSnap.user.username}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Description and music */}
            <div className="absolute bottom-20 left-4 right-20 z-10">
              <p className="text-white text-sm mb-2 leading-relaxed">
                {currentSnap.description}
              </p>
              
              {currentSnap.music && (
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    <span>♪ {currentSnap.music.title} - {currentSnap.music.artist}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-20 right-4 z-10 flex flex-col gap-4">
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(currentSnap.id)}
                  className="h-12 w-12 rounded-full hover:bg-white/20 text-white"
                >
                  <Heart 
                    className={`h-6 w-6 ${
                      currentSnap.isLiked ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                </Button>
                <span className="text-white text-xs font-medium">
                  {currentSnap.likes.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-white/20 text-white"
                >
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs font-medium">
                  {currentSnap.comments}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-white/20 text-white"
                >
                  <Share className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs font-medium">
                  {currentSnap.shares}
                </span>
              </div>

              {currentSnap.video && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                    className="h-12 w-12 rounded-full hover:bg-white/20 text-white"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="h-12 w-12 rounded-full hover:bg-white/20 text-white"
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}