import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Disc3,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Share,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getSocialProfilePath } from "@/lib/profile";
import { useAuth } from "@/stores/auth";
import { useSnaps, type Snap, type SnapMedia, type SnapMusic } from "@/stores/snaps";

function extractYoutubeVideoId(url: string) {
  const value = url.trim();
  if (!value) return null;

  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }

  try {
    const parsedUrl = new URL(value);
    const v = parsedUrl.searchParams.get("v");
    if (v && v.length === 11) return v;
  } catch {
    return null;
  }

  return null;
}

function getYoutubeAudioEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    controls: "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function getMusicMeta(label: string, fallbackTitle?: string | null) {
  const normalizedLabel = label.trim() || fallbackTitle?.trim() || "Audio do YouTube";
  const parts = normalizedLabel.split(" - ").map((part) => part.trim()).filter(Boolean);

  if (parts.length >= 2) {
    return {
      title: parts[0],
      artist: parts.slice(1).join(" - "),
    };
  }

  return {
    title: normalizedLabel,
    artist: "YouTube",
  };
}

export default function Snaps() {
  const { user } = useAuth();
  const { snaps, toggleLike, incrementShare, addComment, addSnap } = useSnaps();
  const [selectedSnapId, setSelectedSnapId] = useState<string | null>(null);
  const [commentValue, setCommentValue] = useState("");
  const [mutedMusicSnapIds, setMutedMusicSnapIds] = useState<string[]>([]);
  const [mutedVideoSnapIds, setMutedVideoSnapIds] = useState<string[]>([]);
  const [activeSnapId, setActiveSnapId] = useState<string | null>(snaps[0]?.id ?? null);
  const [isCreateSnapOpen, setIsCreateSnapOpen] = useState(false);
  const [newSnapDescription, setNewSnapDescription] = useState("");
  const [newSnapMedia, setNewSnapMedia] = useState<SnapMedia | null>(null);
  const [newSnapYoutubeUrl, setNewSnapYoutubeUrl] = useState("");
  const [newSnapMusicLabel, setNewSnapMusicLabel] = useState("");
  const [youtubePreviewTitle, setYoutubePreviewTitle] = useState("");
  const [isCreateMusicMuted, setIsCreateMusicMuted] = useState(false);
  const [isCreateVideoMuted, setIsCreateVideoMuted] = useState(false);
  const [videoUploadName, setVideoUploadName] = useState("");
  const snapRefs = useRef<Record<string, HTMLElement | null>>({});
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const selectedSnap = useMemo(
    () => snaps.find((snap) => snap.id === selectedSnapId) ?? null,
    [selectedSnapId, snaps],
  );

  const activeSnap = useMemo(
    () => snaps.find((snap) => snap.id === activeSnapId) ?? null,
    [activeSnapId, snaps],
  );

  const createPreviewMusicVideoId = useMemo(
    () => extractYoutubeVideoId(newSnapYoutubeUrl),
    [newSnapYoutubeUrl],
  );

  useEffect(() => {
    let isCancelled = false;

    if (!newSnapYoutubeUrl.trim()) {
      setYoutubePreviewTitle("");
      return;
    }

    const videoId = extractYoutubeVideoId(newSnapYoutubeUrl);
    if (!videoId) {
      setYoutubePreviewTitle("");
      return;
    }

    const loadYoutubeTitle = async () => {
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`,
        );

        if (!response.ok) {
          throw new Error("oEmbed request failed");
        }

        const data = (await response.json()) as { title?: string };
        if (!isCancelled) {
          setYoutubePreviewTitle(data.title?.trim() || "");
        }
      } catch {
        if (!isCancelled) {
          setYoutubePreviewTitle("");
        }
      }
    };

    void loadYoutubeTitle();

    return () => {
      isCancelled = true;
    };
  }, [newSnapYoutubeUrl]);

  useEffect(() => {
    const handleOpenCreateSnap = () => setIsCreateSnapOpen(true);
    window.addEventListener("open-create-snap", handleOpenCreateSnap);
    return () => window.removeEventListener("open-create-snap", handleOpenCreateSnap);
  }, []);

  useEffect(() => {
    if (!activeSnapId && snaps[0]?.id) {
      setActiveSnapId(snaps[0].id);
    }
  }, [activeSnapId, snaps]);

  useEffect(() => {
    const elements = Object.values(snapRefs.current).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextActiveId = visibleEntries[0]?.target.getAttribute("data-snap-id");
        if (nextActiveId) {
          setActiveSnapId(nextActiveId);
        }
      },
      {
        threshold: [0.55, 0.7, 0.85],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [snaps]);

  const handleLike = (snapId: string) => {
    toggleLike(snapId);
  };

  const handleOpenComments = (snapId: string) => {
    setSelectedSnapId(snapId);
  };

  const handleToggleMusic = (snapId: string) => {
    const isMuted = mutedMusicSnapIds.includes(snapId);

    setMutedMusicSnapIds((current) =>
      isMuted ? current.filter((id) => id !== snapId) : [...current, snapId],
    );

    toast({
      title: isMuted ? "Musica ativada" : "Musica silenciada",
      description: isMuted
        ? "A musica do link voltou a tocar neste snap."
        : "A musica do link foi silenciada neste snap.",
    });
  };

  const handleToggleVideoAudio = (snapId: string) => {
    const isMuted = mutedVideoSnapIds.includes(snapId);

    setMutedVideoSnapIds((current) =>
      isMuted ? current.filter((id) => id !== snapId) : [...current, snapId],
    );

    toast({
      title: isMuted ? "Audio do video ativado" : "Audio do video silenciado",
      description: isMuted
        ? "O som original do video voltou a tocar."
        : "O som original do video foi silenciado.",
    });
  };

  const handleShare = async (snapId: string) => {
    const snap = snaps.find((item) => item.id === snapId);
    if (!snap) return;

    const shareUrl = `${window.location.origin}/app/social/snaps?snap=${snap.id}`;
    const shareData = {
      title: `${snap.user.name} no Social Swift`,
      text: snap.description,
      url: shareUrl,
    };

    let shareCompleted = false;

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        shareCompleted = true;
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          try {
            await navigator.clipboard.writeText(shareUrl);
            shareCompleted = true;
          } catch {
            shareCompleted = false;
          }
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        shareCompleted = true;
      } catch {
        shareCompleted = false;
      }
    }

    if (!shareCompleted) {
      toast({
        title: "Nao foi possivel compartilhar",
        description: "Tente novamente em alguns instantes.",
      });
      return;
    }

    incrementShare(snapId);

    toast({
      title: "Snap compartilhado",
      description: "O link foi preparado para compartilhamento.",
    });
  };

  const handleSubmitComment = () => {
    if (!selectedSnap || !commentValue.trim()) return;

    addComment(selectedSnap.id, commentValue, {
      name: user?.name || "Felipe Said",
      username: user?.username || "felipesaid_",
      avatar: user?.avatar || "",
    });

    setCommentValue("");
  };

  const handleVideoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast({
        title: "Arquivo invalido",
        description: "Selecione um video compativel com o formato de reels.",
      });
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    setNewSnapMedia({
      type: "video",
      url: videoUrl,
    });
    setVideoUploadName(file.name);
  };

  const handleCreateSnap = () => {
    if (!newSnapMedia) {
      toast({
        title: "Adicione uma midia",
        description: "O snap precisa ter uma imagem ou video para ser publicado.",
      });
      return;
    }

    let music: SnapMusic | undefined;

    if (newSnapYoutubeUrl.trim()) {
      const videoId = extractYoutubeVideoId(newSnapYoutubeUrl);

      if (!videoId) {
        toast({
          title: "Link do YouTube invalido",
          description: "Cole um link valido para reproduzir apenas o audio do snap.",
        });
        return;
      }

      const meta = getMusicMeta(newSnapMusicLabel, youtubePreviewTitle);
      music = {
        title: meta.title,
        artist: meta.artist,
        youtubeUrl: newSnapYoutubeUrl.trim(),
        videoId,
      };
    }

    const newSnap: Snap = {
      id: `snap-${Date.now()}`,
      user: {
        name: user?.name || "Felipe Said",
        username: user?.username || "felipesaid_",
        avatar: user?.avatar || "",
      },
      media: newSnapMedia,
      description: newSnapDescription.trim() || "Novo snap publicado.",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      music,
      commentList: [],
    };

    addSnap(newSnap);
    setActiveSnapId(newSnap.id);
    setMutedMusicSnapIds((current) => current.filter((id) => id !== newSnap.id));
    setMutedVideoSnapIds((current) =>
      newSnapMedia.type === "video"
        ? [...current, newSnap.id].filter((id, index, arr) => arr.indexOf(id) === index)
        : current.filter((id) => id !== newSnap.id),
    );
    setIsCreateSnapOpen(false);
    setNewSnapDescription("");
    setNewSnapMedia(null);
    setNewSnapYoutubeUrl("");
    setNewSnapMusicLabel("");
    setYoutubePreviewTitle("");
    setIsCreateMusicMuted(false);
    setIsCreateVideoMuted(false);
    setVideoUploadName("");
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    toast({
      title: "Snap publicado",
      description: music
        ? "O snap foi publicado com video e audio do YouTube."
        : "O snap foi publicado com sucesso.",
    });
  };

  const shouldPlayActiveAudio =
    activeSnap?.music?.videoId && !mutedMusicSnapIds.includes(activeSnap.id);

  return (
    <div className="bg-black px-0 pb-24 pt-0 lg:px-0 lg:pb-0">
      {shouldPlayActiveAudio && activeSnap?.music?.videoId && (
        <div className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden opacity-0">
          <iframe
            key={`${activeSnap.id}-${activeSnap.music.videoId}`}
            title={`snap-audio-${activeSnap.id}`}
            src={getYoutubeAudioEmbedUrl(activeSnap.music.videoId)}
            allow="autoplay; encrypted-media"
            className="h-0 w-0 border-0"
          />
        </div>
      )}

      {isCreateSnapOpen && createPreviewMusicVideoId && !isCreateMusicMuted && (
        <div className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden opacity-0">
          <iframe
            key={`create-preview-${createPreviewMusicVideoId}`}
            title="create-snap-audio-preview"
            src={getYoutubeAudioEmbedUrl(createPreviewMusicVideoId)}
            allow="autoplay; encrypted-media"
            className="h-0 w-0 border-0"
          />
        </div>
      )}

      <div className="mx-auto max-w-md snap-y snap-mandatory space-y-0 overflow-y-auto lg:max-w-[420px]">
        {snaps.map((snap) => {
          const isMusicMuted = mutedMusicSnapIds.includes(snap.id);
          const isVideoMuted = mutedVideoSnapIds.includes(snap.id);
          const isActiveSnap = activeSnapId === snap.id;

          return (
            <section
              key={snap.id}
              ref={(element) => {
                snapRefs.current[snap.id] = element;
              }}
              data-snap-id={snap.id}
              className="relative h-[calc(100vh-56px)] snap-start overflow-hidden border-b border-white/10 bg-black lg:h-[calc(100vh-88px)]"
            >
              {snap.media.type === "video" ? (
                <video
                  src={snap.media.url}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  muted={!isActiveSnap || isVideoMuted}
                />
              ) : (
                <img src={snap.media.url} alt={snap.description} className="h-full w-full object-cover" />
              )}

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

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-black/20 text-white hover:bg-black/30"
                >
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
                    <button
                      type="button"
                      onClick={() => handleToggleMusic(snap.id)}
                      className={`mt-4 inline-flex max-w-[270px] items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium backdrop-blur-sm ${
                        isMusicMuted ? "bg-black/20 text-white/55" : "bg-black/35 text-white/95"
                      }`}
                    >
                      <Disc3
                        className={`h-4 w-4 shrink-0 ${isMusicMuted ? "" : "animate-spin"} [animation-duration:4s]`}
                      />
                      <span className="truncate">
                        {snap.music.title} - {snap.music.artist}
                      </span>
                    </button>
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

                  <button
                    onClick={() => void handleShare(snap.id)}
                    className="flex flex-col items-center gap-1 text-white"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm">
                      <Share className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-semibold">{snap.shares.toLocaleString("pt-BR")}</span>
                  </button>

                  {snap.media.type === "video" && (
                    <button
                      onClick={() => handleToggleVideoAudio(snap.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm"
                      aria-label="Controlar audio do video"
                    >
                      {isVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  )}

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
          );
        })}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 hidden justify-center px-4 lg:flex">
        <Button
          onClick={() => setIsCreateSnapOpen(true)}
          className="pointer-events-auto h-12 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-white/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Criar snap
        </Button>
      </div>

      <Drawer open={isCreateSnapOpen} onOpenChange={setIsCreateSnapOpen}>
        <DrawerContent className="mx-auto h-[88vh] max-w-xl rounded-t-[24px] border-none bg-[#111111] text-white">
          <DrawerHeader className="border-b border-white/10 px-4 pb-3 pt-2 text-left">
            <DrawerTitle className="text-base font-semibold text-white">Novo snap</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Midia do snap</p>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 rounded-full border border-white/10 bg-white/5 px-4 text-white hover:bg-white/10"
                  onClick={() => {
                    setNewSnapMedia(null);
                    setVideoUploadName("");
                    videoInputRef.current?.click();
                  }}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Video reels
                </Button>
              </div>

              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={handleVideoSelected}
              />

              {newSnapMedia?.type === "video" ? (
                <div className="mx-auto flex max-w-[280px] flex-col gap-3">
                  <div className="aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-black">
                    <video
                      src={newSnapMedia.url}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      muted={isCreateVideoMuted}
                      loop
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="min-w-0 truncate text-xs text-white/70">
                      {videoUploadName || "Video carregado"}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 rounded-full px-3 text-white hover:bg-white/10"
                      onClick={() => setIsCreateVideoMuted((current) => !current)}
                    >
                      {isCreateVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      <span className="ml-2 text-xs">Audio do video</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <ImageUpload
                  onImageSelect={(image) => {
                    setNewSnapMedia(
                      image
                        ? {
                            type: "image",
                            url: image,
                          }
                        : null,
                    );
                    setVideoUploadName("");
                  }}
                  currentImage={newSnapMedia?.type === "image" ? newSnapMedia.url : ""}
                  aspectRatio={9 / 16}
                  circular={false}
                  minWidth={320}
                  minHeight={560}
                  maxSize={8}
                  className="rounded-2xl"
                />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Descricao</p>
              <Textarea
                value={newSnapDescription}
                onChange={(event) => setNewSnapDescription(event.target.value)}
                placeholder="Escreva a legenda do snap"
                className="min-h-[110px] rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Link do YouTube</p>
              <Input
                value={newSnapYoutubeUrl}
                onChange={(event) => setNewSnapYoutubeUrl(event.target.value)}
                placeholder="Cole o link da musica que deve tocar no snap"
                className="h-11 rounded-full border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-0"
              />
              <p className="text-xs text-white/45">
                O preview comeca a tocar assim que o link valido for adicionado.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Rotulo do audio</p>
              <Input
                value={newSnapMusicLabel}
                onChange={(event) => setNewSnapMusicLabel(event.target.value)}
                placeholder={youtubePreviewTitle || "Ex.: Energy Boost - Motivation"}
                className="h-11 rounded-full border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-0"
              />
              {!newSnapMusicLabel.trim() && youtubePreviewTitle && (
                <p className="text-xs text-white/45">
                  Se voce nao preencher, vamos usar automaticamente: {youtubePreviewTitle}
                </p>
              )}
            </div>

            {(newSnapMusicLabel.trim() || youtubePreviewTitle || newSnapYoutubeUrl.trim()) && (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/35 px-3 py-3">
                <div className="inline-flex min-w-0 items-center gap-2 text-xs font-medium text-white/95">
                  <Disc3
                    className={`h-4 w-4 shrink-0 ${isCreateMusicMuted ? "" : "animate-spin"} [animation-duration:4s]`}
                  />
                  <span className="truncate">
                    {(newSnapMusicLabel.trim() || youtubePreviewTitle || "Audio do YouTube").replace(/\s+/g, " ")}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-8 rounded-full px-3 text-white hover:bg-white/10"
                  onClick={() => setIsCreateMusicMuted((current) => !current)}
                >
                  {isCreateMusicMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span className="ml-2 text-xs">Musica</span>
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="h-11 flex-1 rounded-full border border-white/10 bg-transparent text-white hover:bg-white/5"
                onClick={() => setIsCreateSnapOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="h-11 flex-1 rounded-full bg-[#0095f6] text-white hover:bg-[#0095f6]/90"
                onClick={handleCreateSnap}
              >
                Publicar snap
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

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
                      <Link
                        to={getSocialProfilePath(comment.author.username)}
                        onClick={() => setSelectedSnapId(null)}
                      >
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
