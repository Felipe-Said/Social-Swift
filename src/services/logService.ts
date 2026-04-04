import { 
  logUserAction, 
  logSystemEvent, 
  logUserActivity, 
  getBrowserInfo,
  getClientIP,
  UserLog,
  SystemLog,
  ActivityLog
} from '@/lib/supabase';

// Tipos de ações do usuário
export type UserAction = 
  | 'login'
  | 'logout'
  | 'register'
  | 'profile_update'
  | 'post_create'
  | 'post_like'
  | 'post_share'
  | 'post_comment'
  | 'story_view'
  | 'story_create'
  | 'follow_user'
  | 'unfollow_user'
  | 'search'
  | 'navigation'
  | 'file_upload'
  | 'settings_change'
  | 'password_change'
  | 'email_change'
  | 'account_delete'
  | 'payment_made'
  | 'crypto_swap'
  | 'crypto_transfer'
  | 'marketplace_view'
  | 'marketplace_purchase'
  | 'weather_widget_view'
  | 'error_occurred';

// Tipos de recursos
export type Resource = 
  | 'user'
  | 'post'
  | 'story'
  | 'comment'
  | 'profile'
  | 'settings'
  | 'wallet'
  | 'crypto'
  | 'marketplace'
  | 'weather'
  | 'system'
  | 'auth';

// Níveis de log do sistema
export type SystemLogLevel = 'info' | 'warning' | 'error' | 'debug';

// Tipos de atividades
export type ActivityType = 
  | 'authentication'
  | 'content_interaction'
  | 'profile_management'
  | 'financial_transaction'
  | 'navigation'
  | 'search'
  | 'settings'
  | 'error'
  | 'system_event';

class LogService {
  private isEnabled: boolean = true;
  private userId: string | null = null;

  constructor() {
    // Verificar se estamos em ambiente de desenvolvimento
    this.isEnabled = import.meta.env.MODE !== 'test';
  }

  // Definir usuário atual
  setUser(userId: string | null) {
    this.userId = userId;
  }

  // Log de ação do usuário
  async logUserAction(
    action: UserAction,
    resource: Resource,
    resourceId?: string,
    details?: Record<string, any>
  ) {
    if (!this.isEnabled || !this.userId) return null;

    try {
      const browserInfo = getBrowserInfo();
      const ipAddress = await getClientIP();

      const logData: Omit<UserLog, 'id' | 'created_at'> = {
        user_id: this.userId,
        action,
        resource,
        resource_id: resourceId,
        details: {
          ...details,
          browser: browserInfo
        },
        ip_address: ipAddress,
        user_agent: browserInfo.user_agent
      };

      const result = await logUserAction(logData);
      return result;
    } catch (error) {
      console.error('Erro ao registrar ação do usuário:', error);
      return null;
    }
  }

  // Log de evento do sistema
  async logSystemEvent(
    level: SystemLogLevel,
    message: string,
    context?: Record<string, any>
  ) {
    if (!this.isEnabled) return null;

    try {
      const logData: Omit<SystemLog, 'id' | 'created_at'> = {
        level,
        message,
        context: {
          ...context,
          user_id: this.userId,
          timestamp: new Date().toISOString()
        }
      };

      const result = await logSystemEvent(logData);
      return result;
    } catch (error) {
      console.error('Erro ao registrar evento do sistema:', error);
      return null;
    }
  }

  // Log de atividade do usuário
  async logUserActivity(
    activityType: ActivityType,
    description: string,
    metadata?: Record<string, any>
  ) {
    if (!this.isEnabled || !this.userId) return null;

    try {
      const logData: Omit<ActivityLog, 'id' | 'created_at'> = {
        user_id: this.userId,
        activity_type: activityType,
        description,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString()
        }
      };

      return await logUserActivity(logData);
    } catch (error) {
      console.error('Erro ao registrar atividade do usuário:', error);
      return null;
    }
  }

  // Métodos específicos para ações comuns

  // Autenticação
  async logLogin(method: 'email' | 'google' | 'apple', success: boolean) {
    return this.logUserAction('login', 'auth', undefined, {
      method,
      success,
      timestamp: new Date().toISOString()
    });
  }

  async logLogout() {
    return this.logUserAction('logout', 'auth');
  }

  async logRegister(method: 'email' | 'google' | 'apple') {
    return this.logUserAction('register', 'auth', undefined, {
      method,
      timestamp: new Date().toISOString()
    });
  }

  // Interações com posts
  async logPostCreate(postId: string, hasMedia: boolean) {
    return this.logUserAction('post_create', 'post', postId, {
      has_media: hasMedia,
      timestamp: new Date().toISOString()
    });
  }

  async logPostLike(postId: string, liked: boolean) {
    return this.logUserAction('post_like', 'post', postId, {
      liked,
      timestamp: new Date().toISOString()
    });
  }

  async logPostShare(postId: string, platform?: string) {
    return this.logUserAction('post_share', 'post', postId, {
      platform,
      timestamp: new Date().toISOString()
    });
  }

  async logPostComment(postId: string, commentId: string) {
    return this.logUserAction('post_comment', 'post', postId, {
      comment_id: commentId,
      timestamp: new Date().toISOString()
    });
  }

  // Stories
  async logStoryView(storyId: string, authorId: string) {
    return this.logUserAction('story_view', 'story', storyId, {
      author_id: authorId,
      timestamp: new Date().toISOString()
    });
  }

  async logStoryCreate(storyId: string, hasMedia: boolean) {
    return this.logUserAction('story_create', 'story', storyId, {
      has_media: hasMedia,
      timestamp: new Date().toISOString()
    });
  }

  // Perfil
  async logProfileUpdate(fields: string[]) {
    return this.logUserAction('profile_update', 'profile', undefined, {
      updated_fields: fields,
      timestamp: new Date().toISOString()
    });
  }

  async logFollowUser(targetUserId: string, followed: boolean) {
    return this.logUserAction(
      followed ? 'follow_user' : 'unfollow_user', 
      'user', 
      targetUserId,
      {
        timestamp: new Date().toISOString()
      }
    );
  }

  // Navegação
  async logNavigation(from: string, to: string) {
    return this.logUserAction('navigation', 'system', undefined, {
      from,
      to,
      timestamp: new Date().toISOString()
    });
  }

  async logSearch(query: string, resultsCount: number) {
    return this.logUserAction('search', 'system', undefined, {
      query,
      results_count: resultsCount,
      timestamp: new Date().toISOString()
    });
  }

  // Upload de arquivos
  async logFileUpload(fileType: string, fileSize: number, success: boolean) {
    return this.logUserAction('file_upload', 'system', undefined, {
      file_type: fileType,
      file_size: fileSize,
      success,
      timestamp: new Date().toISOString()
    });
  }

  // Configurações
  async logSettingsChange(setting: string, oldValue: any, newValue: any) {
    return this.logUserAction('settings_change', 'settings', undefined, {
      setting,
      old_value: oldValue,
      new_value: newValue,
      timestamp: new Date().toISOString()
    });
  }

  // Transações financeiras
  async logCryptoSwap(fromCurrency: string, toCurrency: string, amount: number) {
    return this.logUserAction('crypto_swap', 'crypto', undefined, {
      from_currency: fromCurrency,
      to_currency: toCurrency,
      amount,
      timestamp: new Date().toISOString()
    });
  }

  async logCryptoTransfer(currency: string, amount: number, toAddress: string) {
    return this.logUserAction('crypto_transfer', 'crypto', undefined, {
      currency,
      amount,
      to_address: toAddress,
      timestamp: new Date().toISOString()
    });
  }

  // Marketplace
  async logMarketplaceView(itemId?: string) {
    return this.logUserAction('marketplace_view', 'marketplace', itemId, {
      timestamp: new Date().toISOString()
    });
  }

  async logMarketplacePurchase(itemId: string, amount: number, currency: string) {
    return this.logUserAction('marketplace_purchase', 'marketplace', itemId, {
      amount,
      currency,
      timestamp: new Date().toISOString()
    });
  }

  // Widget de clima
  async logWeatherWidgetView(location: string) {
    return this.logUserAction('weather_widget_view', 'weather', undefined, {
      location,
      timestamp: new Date().toISOString()
    });
  }

  // Erros
  async logError(error: Error, context?: Record<string, any>) {
    await this.logSystemEvent('error', error.message, {
      stack: error.stack,
      ...context
    });

    if (this.userId) {
      await this.logUserAction('error_occurred', 'system', undefined, {
        error_message: error.message,
        error_stack: error.stack,
        ...context
      });
    }
  }

  // Desabilitar/habilitar logs
  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }

  // Verificar se está habilitado
  get enabled() {
    return this.isEnabled;
  }
}

// Instância singleton
export const logService = new LogService();

// Hook para usar o serviço de logs
export const useLogService = () => {
  return logService;
};
