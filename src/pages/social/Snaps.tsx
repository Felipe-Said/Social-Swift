import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Volume2, Disc3 } from "lucide-react";
import { getSocialProfilePath } from "@/lib/profile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/stores/auth";

interface Snap {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  image: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  music?: {
    title: string;
    artist: string;
  };
  commentList: {
    id: string;
    author: {
      name: string;
      username: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
}

const initialSnaps: Snap[] = [
  {
    id: "1",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=160&h=160&fit=crop&crop=face",
    },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=900&h=1400&fit=crop",
    description: "Aproveitando o dia! ☀️ #vibes #social",
    likes: 1234,
    comments: 89,
    shares: 12,
    isLiked: false,
    music: {
      title: "Good Vibes",
      artist: "Artist Name",
    },
    commentList: [
      {
        id: "s1c1",
        author: {
          name: "Pedro Lima",
          username: "pedrolima",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=face",
        },
        content: "Esse snap ficou muito bom.",
        timestamp: "2 min",
      },
      {
        id: "s1c2",
        author: {
          name: "Clara Souza",
          username: "clarasouza",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=face",
        },
        content: "A luz dessa foto ficou perfeita.",
        timestamp: "agora",
      },
    ],
  },
  {
    id: "2",
    user: {
      name: "Joao Santos",
      username: "joaosantos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face",
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1400&fit=crop",
    description: "Trabalhando duro no projeto de hoje. #swift #creator",
    likes: 892,
    comments: 45,
    shares: 8,
    isLiked: true,
    music: {
      title: "Energy Boost",
      artist: "Motivation",
    },
    commentList: [
      {
        id: "s2c1",
        author: {
          name: "Bianca Melo",
          username: "biancamelo",
          avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=160&h=160&fit=crop&crop=face",
        },
        content: "Brabo demais.",
        timestamp: "5 min",
      },
    ],
  },
  {
    id: "3",
    user: {
      name: "Ana Costa",
      username: "anacosta",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face",
    },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1400&fit=crop",
    description: "Nova receita testada e aprovada. #culinaria #delicia",
    likes: 567,
    comments: 23,
    shares: 5,
    isLiked: false,
    music: {
      title: "Late Night Mood",
      artist: "DJ Swift",
    },
    commentList: [
      {
        id: "s3c1",
        author: {
          name: "Lucas Rocha",
          username: "lucasrocha",
          avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=160&h=160&fit=crop&crop=face",
        },
        content: "Quero a receita depois.",
        timestamp: "12 min",
      },
    ],
  },
];

export default function Snaps() {
  const { user } = useAuth();
  const [snaps, setSnaps] = useState(initialSnaps);
  const [selectedSnapId, setSelectedSnapId] = useState<string | null>(null);
  const [commentValue, setCommentValue] = useState("");

  const selectedSnap = useMemo(
    () => snaps.find((snap) => snap.id === selectedSnapId) ?? null,
    [selectedSnapId, snaps],
  );

  const handleLike = (snapId: string) => {
    setSnaps((current) =>
      current.map((snap) =>
        snap.id === snapId
          ? {
              ...snap,
              isLiked: !snap.isLiked,
              likes: snap.isLiked ? snap.likes - 1 : snap.likes + 1,
            }
          : snap,
      ),
    );
  };

  const handleOpenComments = (snapId: string) => {
    setSelectedSnapId(snapId);
  };

  const handleSubmitComment = () => {
    if (!selectedSnap || !commentValue.trim()) return;

    setSnaps((current) =>
      current.map((snap) =>
        snap.id === selectedSnap.id
          ? {
              ...snap,
              comments: snap.comments + 1,
              commentList: [
                ...snap.commentList,
                {
                  id: `${snap.id}-${Date.now()}`,
                  author: {
                    name: user?.name || "Felipe Said",
                    username: user?.username || "felipesaid_",
                    avatar: user?.avatar || "",
                  },
                  content: commentValue.trim(),
                  timestamp: "agora",
                },
              ],
            }
          : snap,
      ),
    );

    setCommentValue("");
  };

  return (
    <div className="bg-black px-0 pb-24 pt-0 lg:px-0 lg:pb-0">
      <div className="mx-auto max-w-md snap-y snap-mandatory space-y-0 overflow-y-auto lg:max-w-[420px]">
        {snaps.map((snap) => (
          <section
            key={snap.id}
            className="relative h-[calc(100vh-56px)] snap-start overflow-hidden border-b border-white/10 bg-black lg:h-[calc(100vh-88px)]"
          >
            <img src={snap.image} alt={snap.description} className="h-full w-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />

            <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-4">
              <Link
                to={getSocialProfilePath(snap.user.username)}
                className="flex min-w-0 items-center gap-3"
              >
                <Avatar className="h-11 w-11 border-2 border-white">
                  <AvatarImage src={snap.user.avatar} alt={snap.user.name} />
                  <AvatarFallback>{snap.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{snap.user.name}</p>
                  <p className="truncate text-xs text-white/70">@{snap.user.username}</p>
                </div>
              </Link>

              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-black/20 text-white hover:bg-black/30">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 px-4 pb-6">
              <div className="min-w-0 flex-1 pr-2">
                <Link
                  to={getSocialProfilePath(snap.user.username)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {snap.user.name}
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-white">{snap.description}</p>

                {snap.music && (
                  <div className="mt-4 flex max-w-[240px] items-center gap-2 rounded-full bg-black/25 px-3 py-2 text-xs text-white/90 backdrop-blur-sm">
                    <Disc3 className="h-4 w-4 shrink-0 animate-spin [animation-duration:4s]" />
                    <span className="truncate">
                      {snap.music.title} · {snap.music.artist}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(snap.id)}
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm">
                    <Heart className={`h-6 w-6 ${snap.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </span>
                  <span className="text-xs font-semibold">{snap.likes.toLocaleString("pt-BR")}</span>
                </motion.button>

                <button
                  onClick={() => handleOpenComments(snap.id)}
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm">
                    <MessageCircle className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold">{snap.comments.toLocaleString("pt-BR")}</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm">
                    <Share className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold">{snap.shares.toLocaleString("pt-BR")}</span>
                </button>

                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm">
                  <Volume2 className="h-5 w-5" />
                </button>

                <Link
                  to={getSocialProfilePath(snap.user.username)}
                  className="overflow-hidden rounded-full border-2 border-white bg-white"
                >
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={snap.user.avatar} alt={snap.user.name} />
                    <AvatarFallback>{snap.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Drawer open={Boolean(selectedSnap)} onOpenChange={(open) => !open && setSelectedSnapId(null)}>
        <DrawerContent className="mx-auto h-[78vh] max-w-md rounded-t-[24px] border-none bg-[#111111] text-white">
          {selectedSnap && (
            <>
              <DrawerHeader className="border-b border-white/10 px-4 pb-3 pt-2 text-left">
                <DrawerTitle className="text-base font-semibold text-white">Comentarios</DrawerTitle>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  {selectedSnap.commentList.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <Link to={getSocialProfilePath(comment.author.username)} onClick={() => setSelectedSnapId(null)}>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-relaxed text-white">
                          <Link
                            to={getSocialProfilePath(comment.author.username)}
                            onClick={() => setSelectedSnapId(null)}
                            className="mr-2 font-semibold hover:underline"
                          >
                            {comment.author.username}
                          </Link>
                          {comment.content}
                        </p>
                        <p className="mt-1 text-xs text-white/55">{comment.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
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
                    className="h-11 flex-1 rounded-full border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    className="h-auto min-w-0 shrink-0 px-1 text-sm font-semibold text-[#4c9eff]"
                    onClick={handleSubmitComment}
                    disabled={!commentValue.trim()}
                  >
                    Publicar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
