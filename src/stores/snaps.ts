import { create } from "zustand";

export interface SnapComment {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface SnapMusic {
  title: string;
  artist: string;
  youtubeUrl?: string;
  videoId?: string;
}

export interface SnapMedia {
  type: "image" | "video";
  url: string;
}

export interface Snap {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  media: SnapMedia;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  music?: SnapMusic;
  commentList: SnapComment[];
}

const initialSnaps: Snap[] = [
  {
    id: "1",
    user: {
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=160&h=160&fit=crop&crop=face",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=900&h=1400&fit=crop",
    },
    description: "Aproveitando o dia! #vibes #social",
    likes: 1234,
    comments: 89,
    shares: 12,
    isLiked: false,
    music: {
      title: "Good Vibes",
      artist: "Artist Name",
      youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
      videoId: "M7lc1UVf-VE",
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
    media: {
      type: "video",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    description: "Trabalhando duro no projeto de hoje. #swift #creator",
    likes: 892,
    comments: 45,
    shares: 8,
    isLiked: true,
    music: {
      title: "Energy Boost",
      artist: "Motivation",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
    },
    commentList: [
      {
        id: "s2c1",
        author: {
          name: "Bianca Melo",
          username: "biancamelo",
          avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df2?w=160&h=160&fit=crop&crop=face",
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
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1400&fit=crop",
    },
    description: "Nova receita testada e aprovada. #culinaria #delicia",
    likes: 567,
    comments: 23,
    shares: 5,
    isLiked: false,
    music: {
      title: "Late Night Mood",
      artist: "DJ Swift",
      youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      videoId: "ysz5S6PUM-U",
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

interface SnapsStore {
  snaps: Snap[];
  toggleLike: (snapId: string) => void;
  incrementShare: (snapId: string) => void;
  addComment: (
    snapId: string,
    content: string,
    author: { name: string; username: string; avatar: string },
  ) => void;
  addSnap: (snap: Snap) => void;
}

export const useSnaps = create<SnapsStore>()((set) => ({
  snaps: initialSnaps,

  toggleLike: (snapId) =>
    set((state) => ({
      snaps: state.snaps.map((snap) =>
        snap.id === snapId
          ? {
              ...snap,
              isLiked: !snap.isLiked,
              likes: snap.isLiked ? snap.likes - 1 : snap.likes + 1,
            }
          : snap,
      ),
    })),

  incrementShare: (snapId) =>
    set((state) => ({
      snaps: state.snaps.map((snap) =>
        snap.id === snapId ? { ...snap, shares: snap.shares + 1 } : snap,
      ),
    })),

  addComment: (snapId, content, author) =>
    set((state) => ({
      snaps: state.snaps.map((snap) =>
        snap.id === snapId
          ? {
              ...snap,
              comments: snap.comments + 1,
              commentList: [
                ...snap.commentList,
                {
                  id: `${snapId}-${Date.now()}`,
                  author,
                  content: content.trim(),
                  timestamp: "agora",
                },
              ],
            }
          : snap,
      ),
    })),

  addSnap: (snap) =>
    set((state) => ({
      snaps: [snap, ...state.snaps],
    })),
}));
