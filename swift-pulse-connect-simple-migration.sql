-- =====================================================
-- MIGRAÇÃO SIMPLIFICADA - SWIFT PULSE CONNECT
-- =====================================================
-- Execute este SQL no editor SQL do Supabase
-- Esta é uma versão simplificada focada nas funcionalidades principais

-- =====================================================
-- 1. TABELA PRINCIPAL DE USUÁRIOS
-- =====================================================

CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  swift_balance DECIMAL(15,2) DEFAULT 1000.00,
  usdt_balance DECIMAL(15,2) DEFAULT 0.00,
  real_balance DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. SISTEMA SOCIAL - POSTS
-- =====================================================

CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  media_urls TEXT[] DEFAULT '{}',
  media_types TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Curtidas de posts
CREATE TABLE public.post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Comentários
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. SISTEMA DE STORIES
-- =====================================================

CREATE TABLE public.stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')) NOT NULL,
  content TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visualizações de stories
CREATE TABLE public.story_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  viewer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, viewer_id)
);

-- =====================================================
-- 4. SISTEMA DE RELACIONAMENTOS
-- =====================================================

CREATE TABLE public.relationships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- =====================================================
-- 5. SISTEMA FINANCEIRO
-- =====================================================

CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('deposit', 'withdrawal', 'transfer', 'payment', 'reward')) NOT NULL,
  currency TEXT CHECK (currency IN ('swift', 'usdt', 'real')) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  balance_before DECIMAL(15,2) NOT NULL,
  balance_after DECIMAL(15,2) NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Swaps entre moedas
CREATE TABLE public.swaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  from_currency TEXT CHECK (from_currency IN ('swift', 'usdt', 'real')) NOT NULL,
  to_currency TEXT CHECK (to_currency IN ('swift', 'usdt', 'real')) NOT NULL,
  from_amount DECIMAL(15,2) NOT NULL,
  to_amount DECIMAL(15,2) NOT NULL,
  exchange_rate DECIMAL(15,8) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. SISTEMA DE NOTIFICAÇÕES
-- =====================================================

CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('like', 'comment', 'follow', 'mention', 'message', 'transaction')) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. SISTEMA DE LOGS
-- =====================================================

CREATE TABLE public.user_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. CONFIGURAÇÕES DA PLATAFORMA
-- =====================================================

CREATE TABLE public.platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para users
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);

-- Índices para posts
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_is_public ON public.posts(is_public);

-- Índices para stories
CREATE INDEX idx_stories_author_id ON public.stories(author_id);
CREATE INDEX idx_stories_expires_at ON public.stories(expires_at);
CREATE INDEX idx_stories_created_at ON public.stories(created_at DESC);

-- Índices para relationships
CREATE INDEX idx_relationships_follower_id ON public.relationships(follower_id);
CREATE INDEX idx_relationships_following_id ON public.relationships(following_id);

-- Índices para transactions
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);

-- Índices para notifications
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- Índices para logs
CREATE INDEX idx_user_logs_user_id ON public.user_logs(user_id);
CREATE INDEX idx_user_logs_action ON public.user_logs(action);
CREATE INDEX idx_user_logs_created_at ON public.user_logs(created_at DESC);

-- =====================================================
-- 10. TRIGGERS AUTOMÁTICOS
-- =====================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_platform_settings_updated_at BEFORE UPDATE ON public.platform_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar contadores
CREATE OR REPLACE FUNCTION update_counters()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Incrementar contador de curtidas
        IF TG_TABLE_NAME = 'post_likes' THEN
            UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
        -- Incrementar contador de comentários
        ELSIF TG_TABLE_NAME = 'comments' THEN
            UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
        -- Incrementar contador de posts
        ELSIF TG_TABLE_NAME = 'posts' THEN
            UPDATE public.users SET posts_count = posts_count + 1 WHERE id = NEW.author_id;
        -- Incrementar contador de seguidores/seguindo
        ELSIF TG_TABLE_NAME = 'relationships' THEN
            UPDATE public.users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
            UPDATE public.users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrementar contador de curtidas
        IF TG_TABLE_NAME = 'post_likes' THEN
            UPDATE public.posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
        -- Decrementar contador de comentários
        ELSIF TG_TABLE_NAME = 'comments' THEN
            UPDATE public.posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
        -- Decrementar contador de posts
        ELSIF TG_TABLE_NAME = 'posts' THEN
            UPDATE public.users SET posts_count = posts_count - 1 WHERE id = OLD.author_id;
        -- Decrementar contador de seguidores/seguindo
        ELSIF TG_TABLE_NAME = 'relationships' THEN
            UPDATE public.users SET following_count = following_count - 1 WHERE id = OLD.follower_id;
            UPDATE public.users SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Triggers para contadores
CREATE TRIGGER update_post_likes_counter AFTER INSERT OR DELETE ON public.post_likes FOR EACH ROW EXECUTE FUNCTION update_counters();
CREATE TRIGGER update_post_comments_counter AFTER INSERT OR DELETE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_counters();
CREATE TRIGGER update_user_posts_counter AFTER INSERT OR DELETE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_counters();
CREATE TRIGGER update_user_relationships_counter AFTER INSERT OR DELETE ON public.relationships FOR EACH ROW EXECUTE FUNCTION update_counters();

-- =====================================================
-- 11. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
CREATE POLICY "Users can view public profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view public posts" ON public.posts FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Anyone can view comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Users can like posts" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike their own likes" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view stories" ON public.stories FOR SELECT USING (true);
CREATE POLICY "Users can create stories" ON public.stories FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can delete their own stories" ON public.stories FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Users can view their own relationships" ON public.relationships FOR SELECT USING (auth.uid() = follower_id OR auth.uid() = following_id);
CREATE POLICY "Users can create relationships" ON public.relationships FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own relationships" ON public.relationships FOR DELETE USING (auth.uid() = follower_id OR auth.uid() = following_id);

CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 12. DADOS INICIAIS
-- =====================================================

-- Configurações iniciais
INSERT INTO public.platform_settings (key, value, description, is_public) VALUES
('swift_coin_price', '{"usdt": 0.1, "real": 0.5}', 'Preço atual do Swift Coin', true),
('platform_fees', '{"swap": 0.01, "withdrawal": 0.02}', 'Taxas da plataforma', false),
('min_withdrawal', '{"swift": 100, "usdt": 10, "real": 50}', 'Valores mínimos para saque', true),
('story_duration', '24', 'Duração das stories em horas', true),
('max_post_images', '4', 'Número máximo de imagens por post', true);

-- =====================================================
-- 13. VIEWS ÚTEIS
-- =====================================================

-- Feed de posts
CREATE VIEW public.posts_feed AS
SELECT 
  p.*,
  u.name as author_name,
  u.username as author_username,
  u.avatar_url as author_avatar,
  u.verified as author_verified
FROM public.posts p
JOIN public.users u ON p.author_id = u.id
WHERE p.is_public = true
ORDER BY p.created_at DESC;

-- Stories ativas
CREATE VIEW public.active_stories AS
SELECT 
  s.*,
  u.name as author_name,
  u.username as author_username,
  u.avatar_url as author_avatar
FROM public.stories s
JOIN public.users u ON s.author_id = u.id
WHERE s.expires_at > NOW()
ORDER BY s.created_at DESC;

-- =====================================================
-- MIGRAÇÃO SIMPLIFICADA CONCLUÍDA!
-- =====================================================
-- 
-- Tabelas criadas:
-- ✅ users - Usuários principais
-- ✅ posts - Posts dos usuários
-- ✅ post_likes - Curtidas
-- ✅ comments - Comentários
-- ✅ stories - Stories
-- ✅ story_views - Visualizações
-- ✅ relationships - Seguir/seguidores
-- ✅ transactions - Transações
-- ✅ swaps - Conversões
-- ✅ notifications - Notificações
-- ✅ user_logs - Logs
-- ✅ platform_settings - Configurações
--
-- Total: 12 tabelas principais + views + triggers + RLS
-- =====================================================
