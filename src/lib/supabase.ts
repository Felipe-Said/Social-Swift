import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para logs
export interface UserLog {
  id?: string;
  user_id: string;
  action: string;
  resource: string;
  resource_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
}

export interface SystemLog {
  id?: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  context?: Record<string, any>;
  user_id?: string;
  created_at?: string;
}

export interface ActivityLog {
  id?: string;
  user_id: string;
  activity_type: string;
  description: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

// Funções de log
export const logUserAction = async (log: Omit<UserLog, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('user_logs')
      .insert([{
        ...log,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao registrar log de usuário:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao registrar log de usuário:', error);
    return null;
  }
};

export const logSystemEvent = async (log: Omit<SystemLog, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('system_logs')
      .insert([{
        ...log,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao registrar log do sistema:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao registrar log do sistema:', error);
    return null;
  }
};

export const logUserActivity = async (log: Omit<ActivityLog, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert([{
        ...log,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao registrar atividade do usuário:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao registrar atividade do usuário:', error);
    return null;
  }
};

// Funções para buscar logs
export const getUserLogs = async (userId: string, limit = 50) => {
  try {
    const { data, error } = await supabase
      .from('user_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar logs do usuário:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar logs do usuário:', error);
    return [];
  }
};

export const getSystemLogs = async (level?: string, limit = 100) => {
  try {
    let query = supabase
      .from('system_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (level) {
      query = query.eq('level', level);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar logs do sistema:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar logs do sistema:', error);
    return [];
  }
};

export const getUserActivities = async (userId: string, limit = 50) => {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar atividades do usuário:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar atividades do usuário:', error);
    return [];
  }
};

// Função para obter informações do navegador
export const getBrowserInfo = () => {
  if (typeof window === 'undefined') return {};

  return {
    user_agent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || null
  };
};

// Função para obter IP (simulação - em produção use um serviço real)
export const getClientIP = async (): Promise<string> => {
  try {
    // Em produção, use um serviço como ipify.org ou similar
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.warn('Não foi possível obter IP do cliente:', error);
    return 'unknown';
  }
};
