import { AuthUser, SignUpData, SignInData, UpdateProfileData } from './authService';

// Mock service para funcionar sem Supabase
class AuthServiceMock {
  private users: AuthUser[] = [];
  private currentUser: AuthUser | null = null;

  // Cadastrar novo usuário
  async signUp(data: SignUpData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar se username já existe
      const existingUser = this.users.find(u => u.username === data.username);
      if (existingUser) {
        return { user: null, error: 'Nome de usuário já está em uso' };
      }

      // Verificar se email já existe
      const existingEmail = this.users.find(u => u.email === data.email);
      if (existingEmail) {
        return { user: null, error: 'Email já está em uso' };
      }

      // Criar novo usuário
      const newUser: AuthUser = {
        id: Date.now().toString(),
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
        swift_balance: 1000.00, // Saldo inicial
        usdt_balance: 0.00,
        real_balance: 0.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      this.users.push(newUser);
      this.currentUser = newUser;

      return { user: newUser, error: null };
    } catch (error) {
      console.error('Erro no signup mock:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Fazer login
  async signIn(data: SignInData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));

      // Buscar usuário
      const user = this.users.find(u => u.email === data.email);
      if (!user) {
        return { user: null, error: 'Email ou senha incorretos' };
      }

      this.currentUser = user;
      return { user, error: null };
    } catch (error) {
      console.error('Erro no signin mock:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Login com Google
  async signInWithGoogle(): Promise<{ error: string | null }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular criação de usuário Google
      const googleUser: AuthUser = {
        id: Date.now().toString(),
        email: 'usuario@gmail.com',
        name: 'Usuário Google',
        username: 'usuario_google',
        avatar_url: '',
        bio: '',
        followers_count: 0,
        following_count: 0,
        posts_count: 0,
        verified: true,
        swift_balance: 1000.00,
        usdt_balance: 0.00,
        real_balance: 0.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      this.users.push(googleUser);
      this.currentUser = googleUser;

      return { error: null };
    } catch (error) {
      console.error('Erro no login Google mock:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Login com Apple
  async signInWithApple(): Promise<{ error: string | null }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular criação de usuário Apple
      const appleUser: AuthUser = {
        id: Date.now().toString(),
        email: 'usuario@icloud.com',
        name: 'Usuário Apple',
        username: 'usuario_apple',
        avatar_url: '',
        bio: '',
        followers_count: 0,
        following_count: 0,
        posts_count: 0,
        verified: true,
        swift_balance: 1000.00,
        usdt_balance: 0.00,
        real_balance: 0.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      this.users.push(appleUser);
      this.currentUser = appleUser;

      return { error: null };
    } catch (error) {
      console.error('Erro no login Apple mock:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Fazer logout
  async signOut(): Promise<{ error: string | null }> {
    try {
      this.currentUser = null;
      return { error: null };
    } catch (error) {
      console.error('Erro no logout mock:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Obter usuário atual
  async getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      if (!this.currentUser) {
        return { user: null, error: 'Usuário não autenticado' };
      }

      return { user: this.currentUser, error: null };
    } catch (error) {
      console.error('Erro ao obter usuário atual mock:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Atualizar perfil do usuário
  async updateProfile(userId: string, data: UpdateProfileData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const userIndex = this.users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return { user: null, error: 'Usuário não encontrado' };
      }

      // Verificar se username já existe (se estiver sendo alterado)
      if (data.username) {
        const existingUser = this.users.find(u => u.username === data.username && u.id !== userId);
        if (existingUser) {
          return { user: null, error: 'Nome de usuário já está em uso' };
        }
      }

      // Atualizar usuário
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...data,
        updated_at: new Date().toISOString()
      };

      this.currentUser = this.users[userIndex];
      return { user: this.currentUser, error: null };
    } catch (error) {
      console.error('Erro ao atualizar perfil mock:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Atualizar senha
  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null };
    } catch (error) {
      console.error('Erro ao atualizar senha mock:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Redefinir senha
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null };
    } catch (error) {
      console.error('Erro ao redefinir senha mock:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Verificar se usuário está autenticado
  async isAuthenticated(): Promise<boolean> {
    return !!this.currentUser;
  }

  // Converter AuthUser para User (formato do store)
  convertToStoreUser(authUser: AuthUser) {
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

  // Escutar mudanças de autenticação (mock)
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    // Simular listener
    return {
      data: { subscription: { unsubscribe: () => {} } }
    };
  }
}

export const authServiceMock = new AuthServiceMock();
