# Configuração do Supabase

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Como obter as chaves:

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings > API
4. Copie a URL e a chave anônima

## Tabelas necessárias no Supabase

Execute os seguintes SQLs no editor SQL do Supabase:

### 1. Tabela de logs de usuário
```sql
CREATE TABLE user_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_logs_user_id ON user_logs(user_id);
CREATE INDEX idx_user_logs_created_at ON user_logs(created_at);
CREATE INDEX idx_user_logs_action ON user_logs(action);
```

### 2. Tabela de logs do sistema
```sql
CREATE TABLE system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'debug')),
  message TEXT NOT NULL,
  context JSONB,
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);
```

### 3. Tabela de atividades do usuário
```sql
CREATE TABLE activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_activity_type ON activity_logs(activity_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

### 4. Políticas de RLS (Row Level Security)

```sql
-- Habilitar RLS
ALTER TABLE user_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para user_logs
CREATE POLICY "Users can view their own logs" ON user_logs
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own logs" ON user_logs
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Políticas para system_logs (apenas admins)
CREATE POLICY "Admins can view system logs" ON system_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Políticas para activity_logs
CREATE POLICY "Users can view their own activities" ON activity_logs
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own activities" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);
```
