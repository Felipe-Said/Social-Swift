import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { logService } from '@/services/logService';
import { authService, SignUpData, SignInData, UpdateProfileData } from '@/services/authService';
import { authServiceMock } from '@/services/authServiceMock';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  banner?: string;
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
  error: string | null;
  
  // Actions
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithApple: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const AUTH_BYPASS_ENABLED = true;

const BYPASS_USER: User = {
  id: 'bypass-user',
  name: 'Felipe Said',
  username: 'felipesaid_',
  email: 'saidlabsglobal@gmail.com',
  avatar: '',
  banner: '',
  bio: 'Acesso temporario sem login',
  followers: 0,
  following: 0,
  posts: 0,
  verified: true,
  swiftBalance: 1000,
  usdtBalance: 0,
  realBalance: 0,
};

// Função para detectar se Supabase está configurado
const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(supabaseUrl && supabaseKey && 
    supabaseUrl !== 'https://your-project-ref.supabase.co' &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseUrl.includes('supabase.co'));
};

// Função para obter o serviço de autenticação apropriado
const getAuthService = () => {
  return isSupabaseConfigured() ? authService : authServiceMock;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: AUTH_BYPASS_ENABLED ? BYPASS_USER : null,
      isAuthenticated: AUTH_BYPASS_ENABLED,
      isLoading: false,
      error: null,

      signUp: async (data: SignUpData) => {
        if (AUTH_BYPASS_ENABLED) {
          set({ user: BYPASS_USER, isAuthenticated: true, isLoading: false, error: null });
          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { user, error } = await service.signUp(data);
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          if (user) {
            const storeUser = service.convertToStoreUser(user);
            set({ 
              user: storeUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });

            // Log successful registration
            logService.setUser(storeUser.id);
            await logService.logRegister('email');
          }

          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      signIn: async (data: SignInData) => {
        if (AUTH_BYPASS_ENABLED) {
          set({ user: BYPASS_USER, isAuthenticated: true, isLoading: false, error: null });
          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { user, error } = await service.signIn(data);
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          if (user) {
            const storeUser = service.convertToStoreUser(user);
            set({ 
              user: storeUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });

            // Log successful login
            logService.setUser(storeUser.id);
            await logService.logLogin('email', true);
          }

          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      signInWithGoogle: async () => {
        if (AUTH_BYPASS_ENABLED) {
          set({ user: BYPASS_USER, isAuthenticated: true, isLoading: false, error: null });
          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { error } = await service.signInWithGoogle();
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      signInWithApple: async () => {
        if (AUTH_BYPASS_ENABLED) {
          set({ user: BYPASS_USER, isAuthenticated: true, isLoading: false, error: null });
          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { error } = await service.signInWithApple();
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      signOut: async () => {
        if (AUTH_BYPASS_ENABLED) {
          set({ user: BYPASS_USER, isAuthenticated: true, isLoading: false, error: null });
          return;
        }

        set({ isLoading: true });
        
        try {
          // Log logout before clearing user
          await logService.logLogout();
          
          const service = getAuthService();
          const { error } = await service.signOut();
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error
          });
          
          // Clear user from log service
          logService.setUser(null);
        } catch (error) {
          set({ isLoading: false, error: 'Erro ao fazer logout' });
        }
      },

      updateProfile: async (data: UpdateProfileData) => {
        const { user } = get();
        if (!user) {
          return { success: false, error: 'Usuário não autenticado' };
        }

        if (AUTH_BYPASS_ENABLED) {
          set({
            user: {
              ...user,
              name: data.name ?? user.name,
              username: data.username ?? user.username,
              bio: data.bio ?? user.bio,
              avatar: data.avatar_url ?? user.avatar,
            },
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { user: updatedUser, error } = await service.updateProfile(user.id, data);
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          if (updatedUser) {
            const storeUser = authService.convertToStoreUser(updatedUser);
            set({ 
              user: storeUser, 
              isLoading: false,
              error: null
            });

            // Log profile update
            const updatedFields = Object.keys(data);
            await logService.logProfileUpdate(updatedFields);
          }

          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      updatePassword: async (newPassword: string) => {
        if (AUTH_BYPASS_ENABLED) {
          set({ isLoading: false, error: null });
          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { error } = await service.updatePassword(newPassword);
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          set({ isLoading: false, error: null });
          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      resetPassword: async (email: string) => {
        if (AUTH_BYPASS_ENABLED) {
          set({ isLoading: false, error: null });
          return { success: true };
        }

        set({ isLoading: true, error: null });
        
        try {
          const service = getAuthService();
          const { error } = await service.resetPassword(email);
          
          if (error) {
            set({ isLoading: false, error });
            return { success: false, error };
          }

          set({ isLoading: false, error: null });
          return { success: true };
        } catch (error) {
          const errorMessage = 'Erro interno do servidor';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      checkAuth: async () => {
        if (AUTH_BYPASS_ENABLED) {
          set({
            user: BYPASS_USER,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          logService.setUser(BYPASS_USER.id);
          return;
        }

        set({ isLoading: true });
        
        try {
          const service = getAuthService();
          const { user, error } = await service.getCurrentUser();
          
          if (error || !user) {
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false,
              error: null
            });
            return;
          }

          const storeUser = authService.convertToStoreUser(user);
          set({ 
            user: storeUser, 
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });

          // Set user in log service
          logService.setUser(storeUser.id);
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null
          });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'social-swift-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
