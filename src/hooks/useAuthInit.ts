import { useEffect } from 'react';
import { useAuth } from '@/stores/auth';
import { authService } from '@/services/authService';
import { authServiceMock } from '@/services/authServiceMock';

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

export function useAuthInit() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Verificar autenticação ao carregar a aplicação
    checkAuth();

    // Escutar mudanças de autenticação
    const service = getAuthService();
    const { data: { subscription } } = service.onAuthStateChange((user) => {
      if (user) {
        // Usuário logado - atualizar store
        checkAuth();
      } else {
        // Usuário deslogado - limpar store
        checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth]);
}
