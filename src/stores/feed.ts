import { create } from "zustand";
import { logService } from "@/services/logService";

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  media?: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  commentList: {
    id: string;
    author: {
      id: string;
      name: string;
      username: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
}

export interface Story {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  media: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  };
  timestamp: string;
  isViewed: boolean;
}

interface FeedStore {
  posts: Post[];
  stories: Story[];
  isLoading: boolean;
  loadFeed: () => Promise<void>;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  commentPost: (postId: string) => void;
  addComment: (
    postId: string,
    content: string,
    author?: { id: string; name: string; username: string; avatar: string },
  ) => void;
  sharePost: (postId: string) => void;
  markStoryViewed: (storyId: string) => void;
  addPost: (content: string, media?: { type: "image" | "video"; url: string }) => void;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "2",
      name: "Bruno Costa",
      username: "brunocosta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content:
      "Acabei de fazer meu primeiro swap para Swift Coin! A interface esta incrivel e o processo foi super rapido. #SwiftCoin #Cripto",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    },
    timestamp: "2 min",
    likes: 127,
    comments: 23,
    shares: 8,
    isLiked: false,
    isSaved: false,
    tags: ["SwiftCoin", "Cripto"],
    commentList: [
      {
        id: "c1",
        author: {
          id: "3",
          name: "Carla Mendes",
          username: "carlamendes",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        },
        content: "Ficou muito bom mesmo. A interface esta bem mais fluida.",
        timestamp: "1 min",
      },
      {
        id: "c2",
        author: {
          id: "4",
          name: "Rafael Tech",
          username: "rafaeltech",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
        content: "Tambem testei aqui e o processo foi rapido.",
        timestamp: "agora",
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "3",
      name: "Carla Mendes",
      username: "carlamendes",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: false,
    },
    content:
      "Compartilhando minha experiencia com vendas este mes. Os novos gateways de pagamento estao facilitando muito para meus clientes!",
    timestamp: "15 min",
    likes: 89,
    comments: 12,
    shares: 5,
    isLiked: true,
    isSaved: true,
    tags: [],
    commentList: [
      {
        id: "c3",
        author: {
          id: "2",
          name: "Bruno Costa",
          username: "brunocosta",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
        content: "Os clientes perceberam mesmo essa melhora no checkout.",
        timestamp: "8 min",
      },
    ],
  },
  {
    id: "3",
    author: {
      id: "4",
      name: "Rafael Tech",
      username: "rafaeltech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content:
      "Tutorial: Como integrar a API do Social Swift em seu e-commerce. Thread completa nos comentarios.",
    media: {
      type: "video",
      url: "https://player.vimeo.com/video/397197647",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    },
    timestamp: "1h",
    likes: 342,
    comments: 67,
    shares: 89,
    isLiked: false,
    isSaved: false,
    tags: [],
    commentList: [
      {
        id: "c4",
        author: {
          id: "3",
          name: "Carla Mendes",
          username: "carlamendes",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        },
        content: "Quero ver essa thread completa, tema muito bom.",
        timestamp: "32 min",
      },
      {
        id: "c5",
        author: {
          id: "5",
          name: "Juliana Dev",
          username: "julianadev",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        },
        content: "Explicou de um jeito bem pratico.",
        timestamp: "12 min",
      },
    ],
  },
];

const mockStories: Story[] = [
  {
    id: "1",
    author: {
      id: "2",
      name: "Bruno Costa",
      username: "brunocosta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop",
    },
    timestamp: "3h",
    isViewed: false,
  },
  {
    id: "2",
    author: {
      id: "3",
      name: "Carla Mendes",
      username: "carlamendes",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=600&fit=crop",
    },
    timestamp: "5h",
    isViewed: true,
  },
];

export const useFeed = create<FeedStore>()((set, get) => ({
  posts: [],
  stories: [],
  isLoading: false,

  loadFeed: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      posts: mockPosts,
      stories: mockStories,
      isLoading: false,
    });
  },

  likePost: async (postId: string) => {
    const { posts } = get();
    const post = posts.find((item) => item.id === postId);
    const isLiked = post?.isLiked || false;

    const updatedPosts = posts.map((item) =>
      item.id === postId
        ? {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          }
        : item,
    );

    set({ posts: updatedPosts });
    await logService.logPostLike(postId, !isLiked);
  },

  savePost: (postId: string) => {
    const { posts } = get();
    const updatedPosts = posts.map((item) =>
      item.id === postId ? { ...item, isSaved: !item.isSaved } : item,
    );
    set({ posts: updatedPosts });
  },

  commentPost: (postId: string) => {
    const { posts } = get();
    const updatedPosts = posts.map((item) =>
      item.id === postId ? { ...item, comments: item.comments + 1 } : item,
    );
    set({ posts: updatedPosts });
  },

  addComment: (postId: string, content: string, author) => {
    const { posts } = get();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    const fallbackAuthor = {
      id: "bypass-user",
      name: "Felipe Said",
      username: "felipesaid_",
      avatar: "",
    };

    const nextAuthor = author ?? fallbackAuthor;

    const updatedPosts = posts.map((item) =>
      item.id === postId
        ? {
            ...item,
            comments: item.comments + 1,
            commentList: [
              ...item.commentList,
              {
                id: `${postId}-${Date.now()}`,
                author: nextAuthor,
                content: trimmedContent,
                timestamp: "agora",
              },
            ],
          }
        : item,
    );

    set({ posts: updatedPosts });
  },

  sharePost: (postId: string) => {
    const { posts } = get();
    const updatedPosts = posts.map((item) =>
      item.id === postId ? { ...item, shares: item.shares + 1 } : item,
    );
    set({ posts: updatedPosts });
  },

  markStoryViewed: async (storyId: string) => {
    const { stories } = get();
    const story = stories.find((item) => item.id === storyId);

    const updatedStories = stories.map((item) =>
      item.id === storyId ? { ...item, isViewed: true } : item,
    );

    set({ stories: updatedStories });

    if (story) {
      await logService.logStoryView(storyId, story.author.id);
    }
  },

  addPost: async (content: string, media?: { type: "image" | "video"; url: string }) => {
    const { posts } = get();
    const postId = Date.now().toString();

    const newPost: Post = {
      id: postId,
      author: {
        id: "1",
        name: "Ana Carolina",
        username: "anacarolina",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=150&h=150&fit=crop&crop=face",
        verified: true,
      },
      content,
      media,
      timestamp: "agora",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      tags: [],
      commentList: [],
    };

    set({ posts: [newPost, ...posts] });
    await logService.logPostCreate(postId, !!media);
  },
}));
