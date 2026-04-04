import { supabase } from '@/lib/supabase';
import { User } from '@/stores/auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar_url?: string;
  banner_url?: string;
  bio?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  verified: boolean;
  swift_balance: number;
  usdt_balance: number;
  real_balance: number;
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
}

class AuthService {
  // Cadastrar novo usuário
  async signUp(data: SignUpData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      console.log('🔍 Tentando cadastrar usuário:', data.email);

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            username: data.username
          }
        }
      });

      console.log('📝 Resultado do signup:', { authData, authError });

      if (authError) {
        console.error('❌ Erro no signup:', authError);
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        console.error('❌ Usuário não criado');
        return { user: null, error: 'Erro ao criar usuário' };
      }

      console.log('✅ Usuário criado no auth:', authData.user.id);

      // Aguardar um pouco para o trigger criar o perfil
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verificar se o perfil foi criado automaticamente
      let { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      console.log('📊 Verificação inicial do perfil:', { userData, userError });

      // Se o perfil não foi criado automaticamente, criar manualmente
      if (userError || !userData) {
        console.log('🔧 Criando perfil manualmente...');
        
        const { data: newUserData, error: createError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            name: data.name,
            username: data.username,
            avatar_url: '',
            banner_url: '',
            bio: '',
            followers_count: 0,
            following_count: 0,
            posts_count: 0,
            verified: false,
            swift_balance: 1000.00,
            usdt_balance: 0.00,
            real_balance: 0.00,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        console.log('📊 Resultado da criação manual:', { newUserData, createError });

        if (createError) {
          console.error('❌ Erro ao criar perfil manualmente:', createError);
          return { user: null, error: 'Erro ao criar perfil do usuário' };
        }

        userData = newUserData;
      }

      console.log('✅ Usuário cadastrado com sucesso!');
      return { user: userData, error: null };
    } catch (error) {
      console.error('❌ Erro no signup:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Fazer login
  async signIn(data: SignInData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Erro ao fazer login' };
      }

      // Buscar dados do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError || !userData) {
        return { user: null, error: 'Erro ao buscar dados do usuário' };
      }

      return { user: userData, error: null };
    } catch (error) {
      console.error('Erro no signin:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Login com Google
  async signInWithGoogle(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/app`
        }
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro no login com Google:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Login com Apple
  async signInWithApple(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/app`
        }
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro no login com Apple:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Fazer logout
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro no logout:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Obter usuário atual
  async getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        return { user: null, error: 'Usuário não autenticado' };
      }

      // Buscar dados do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (userError || !userData) {
        return { user: null, error: 'Erro ao buscar dados do usuário' };
      }

      return { user: userData, error: null };
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Atualizar perfil do usuário
  async updateProfile(userId: string, data: UpdateProfileData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Verificar se username já existe (se estiver sendo alterado)
      if (data.username) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('username')
          .eq('username', data.username)
          .neq('id', userId)
          .single();

        if (existingUser) {
          return { user: null, error: 'Nome de usuário já está em uso' };
        }
      }

      // Atualizar dados do usuário
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (updateError || !updatedUser) {
        return { user: null, error: 'Erro ao atualizar perfil' };
      }

      return { user: updatedUser, error: null };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Atualizar senha
  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Redefinir senha
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Verificar se usuário está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return !!user;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  }

  // Converter AuthUser para User (formato do store)
  convertToStoreUser(authUser: AuthUser): User {
    return {
      id: authUser.id,
      name: authUser.name,
      username: authUser.username,
      email: authUser.email,
      avatar: authUser.avatar_url || '',
      banner: authUser.banner_url || '',
      bio: authUser.bio || '',
      followers: authUser.followers_count,
      following: authUser.following_count,
      posts: authUser.posts_count,
      verified: authUser.verified,
      swiftBalance: authUser.swift_balance,
      usdtBalance: authUser.usdt_balance,
      realBalance: authUser.real_balance
    };
  }

  // Escutar mudanças de autenticação
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { user } = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();
