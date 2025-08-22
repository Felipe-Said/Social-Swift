import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  swiftBalance: number;
  usdtBalance: number;
  realBalance: number;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Ana Carolina',
  username: 'anacarolina',
  email: 'ana@socialswift.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b619?w=150&h=150&fit=crop&crop=face',
  bio: 'CEO & Founder at TechCorp 🚀 Building the future with Swift Coin 💎',
  followers: 12500,
  following: 847,
  posts: 234,
  verified: true,
  swiftBalance: 15420.50,
  usdtBalance: 8950.25,
  realBalance: 47850.75
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Mock login delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        set({ 
          user: mockUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        
        // Mock Google login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set({ 
          user: { ...mockUser, name: 'Carlos Silva', email: 'carlos@gmail.com' }, 
          isAuthenticated: true, 
          isLoading: false 
        });
      },

      loginWithApple: async () => {
        set({ isLoading: true });
        
        // Mock Apple login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set({ 
          user: { ...mockUser, name: 'Maria Santos', email: 'maria@icloud.com' }, 
          isAuthenticated: true, 
          isLoading: false 
        });
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'social-swift-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);