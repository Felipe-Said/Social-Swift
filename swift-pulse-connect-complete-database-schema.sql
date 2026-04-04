-- =====================================================
-- SCHEMA COMPLETO DO BANCO DE DADOS - SWIFT PULSE CONNECT
-- =====================================================
-- Execute este SQL no editor SQL do Supabase
-- Este schema inclui todas as funcionalidades implementadas na plataforma

-- =====================================================
-- 1. TABELAS PRINCIPAIS DE USUÁRIOS
-- =====================================================

-- Tabela principal de usuários (estende auth.users)
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
  birth_date DATE,
  phone TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  stories_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  allow_followers BOOLEAN DEFAULT TRUE,
  allow_messages BOOLEAN DEFAULT TRUE,
  swift_balance DECIMAL(15,2) DEFAULT 1000.00,
  usdt_balance DECIMAL(15,2) DEFAULT 0.00,
  real_balance DECIMAL(15,2) DEFAULT 0.00,
  total_earnings DECIMAL(15,2) DEFAULT 0.00,
  total_spent DECIMAL(15,2) DEFAULT 0.00,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. SISTEMA SOCIAL - POSTS E INTERAÇÕES
-- =====================================================

-- Tabela de posts
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  media_urls TEXT[] DEFAULT '{}',
  media_types TEXT[] DEFAULT '{}',
  media_metadata JSONB DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  is_pinned BOOLEAN DEFAULT FALSE,
  location TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de curtidas de posts
CREATE TABLE public.post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Tabela de comentários
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de curtidas de comentários
CREATE TABLE public.comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, comment_id)
);

-- Tabela de compartilhamentos
CREATE TABLE public.shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  share_type TEXT CHECK (share_type IN ('repost', 'quote', 'share')) DEFAULT 'share',
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id, share_type)
);

-- =====================================================
-- 3. SISTEMA DE STORIES
-- =====================================================

-- Tabela de stories
CREATE TABLE public.stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')) NOT NULL,
  media_metadata JSONB DEFAULT '{}',
  content TEXT,
  background_color TEXT,
  text_color TEXT,
  font_family TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
  views_count INTEGER DEFAULT 0,
  reactions_count INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de visualizações de stories
CREATE TABLE public.story_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  viewer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, viewer_id)
);

-- Tabela de reações em stories
CREATE TABLE public.story_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT CHECK (reaction_type IN ('like', 'love', 'laugh', 'wow', 'sad', 'angry')) DEFAULT 'like',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, user_id)
);

-- =====================================================
-- 4. SISTEMA DE RELACIONAMENTOS
-- =====================================================

-- Tabela de relacionamentos (seguir/seguidores)
CREATE TABLE public.relationships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'blocked')) DEFAULT 'accepted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Tabela de bloqueios
CREATE TABLE public.user_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocker_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  blocked_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

-- =====================================================
-- 5. SISTEMA FINANCEIRO - SWIFT COIN E TRANSAÇÕES
-- =====================================================

-- Tabela de transações
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('deposit', 'withdrawal', 'transfer', 'payment', 'reward', 'refund')) NOT NULL,
  currency TEXT CHECK (currency IN ('swift', 'usdt', 'real')) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  balance_before DECIMAL(15,2) NOT NULL,
  balance_after DECIMAL(15,2) NOT NULL,
  description TEXT,
  reference_id TEXT,
  reference_type TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de swaps (conversões entre moedas)
CREATE TABLE public.swaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  from_currency TEXT CHECK (from_currency IN ('swift', 'usdt', 'real')) NOT NULL,
  to_currency TEXT CHECK (to_currency IN ('swift', 'usdt', 'real')) NOT NULL,
  from_amount DECIMAL(15,2) NOT NULL,
  to_amount DECIMAL(15,2) NOT NULL,
  exchange_rate DECIMAL(15,8) NOT NULL,
  fee_amount DECIMAL(15,2) DEFAULT 0.00,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de saques
CREATE TABLE public.withdrawals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  currency TEXT CHECK (currency IN ('swift', 'usdt', 'real')) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  fee_amount DECIMAL(15,2) DEFAULT 0.00,
  net_amount DECIMAL(15,2) NOT NULL,
  withdrawal_method TEXT CHECK (withdrawal_method IN ('pix', 'bank_transfer', 'crypto', 'card')) NOT NULL,
  destination TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  admin_notes TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. SISTEMA DE MARKETPLACE E VENDAS
-- =====================================================

-- Tabela de produtos/serviços
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(15,2) NOT NULL,
  currency TEXT CHECK (currency IN ('swift', 'usdt', 'real')) DEFAULT 'swift',
  category TEXT,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  stock_quantity INTEGER,
  is_digital BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de vendas
CREATE TABLE public.sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  currency TEXT CHECK (currency IN ('swift', 'usdt', 'real')) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded')) DEFAULT 'pending',
  payment_method TEXT,
  shipping_address JSONB,
  tracking_code TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. SISTEMA DE MENSAGENS E CHAT
-- =====================================================

-- Tabela de conversas
CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT CHECK (type IN ('direct', 'group')) DEFAULT 'direct',
  name TEXT,
  description TEXT,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de participantes de conversas
CREATE TABLE public.conversation_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  left_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(conversation_id, user_id)
);

-- Tabela de mensagens
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  message_type TEXT CHECK (message_type IN ('text', 'image', 'video', 'file', 'sticker', 'system')) DEFAULT 'text',
  media_url TEXT,
  media_metadata JSONB DEFAULT '{}',
  reply_to_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  read_by JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. SISTEMA DE NOTIFICAÇÕES
-- =====================================================

-- Tabela de notificações
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('like', 'comment', 'follow', 'mention', 'message', 'transaction', 'system')) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. SISTEMA DE LOGS E AUDITORIA
-- =====================================================

-- Tabela de logs de usuário
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

-- Tabela de logs do sistema
CREATE TABLE public.system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT CHECK (level IN ('info', 'warning', 'error', 'debug')) NOT NULL,
  message TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs de atividade
CREATE TABLE public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. SISTEMA DE CONFIGURAÇÕES E METADADOS
-- =====================================================

-- Tabela de configurações da plataforma
CREATE TABLE public.platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de estatísticas da plataforma
CREATE TABLE public.platform_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  total_posts INTEGER DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  total_volume DECIMAL(15,2) DEFAULT 0.00,
  swift_price DECIMAL(15,8) DEFAULT 0.00,
  usdt_price DECIMAL(15,8) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date)
);

-- =====================================================
-- 11. ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para tabela users
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);
CREATE INDEX idx_users_verified ON public.users(verified);

-- Índices para tabela posts
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_is_public ON public.posts(is_public);
CREATE INDEX idx_posts_likes_count ON public.posts(likes_count DESC);

-- Índices para tabela comments
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_author_id ON public.comments(author_id);
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);

-- Índices para tabela stories
CREATE INDEX idx_stories_author_id ON public.stories(author_id);
CREATE INDEX idx_stories_expires_at ON public.stories(expires_at);
CREATE INDEX idx_stories_created_at ON public.stories(created_at DESC);

-- Índices para tabela relationships
CREATE INDEX idx_relationships_follower_id ON public.relationships(follower_id);
CREATE INDEX idx_relationships_following_id ON public.relationships(following_id);

-- Índices para tabela transactions
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(transaction_type);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);

-- Índices para tabela messages
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

-- Índices para tabela notifications
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- Índices para tabelas de logs
CREATE INDEX idx_user_logs_user_id ON public.user_logs(user_id);
CREATE INDEX idx_user_logs_action ON public.user_logs(action);
CREATE INDEX idx_user_logs_created_at ON public.user_logs(created_at DESC);

CREATE INDEX idx_system_logs_level ON public.system_logs(level);
CREATE INDEX idx_system_logs_created_at ON public.system_logs(created_at DESC);

CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_activity_type ON public.activity_logs(activity_type);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- =====================================================
-- 12. TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA
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
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_platform_settings_updated_at BEFORE UPDATE ON public.platform_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar contadores de posts
CREATE OR REPLACE FUNCTION update_post_counters()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Incrementar contador de curtidas
        IF TG_TABLE_NAME = 'post_likes' THEN
            UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
        -- Incrementar contador de comentários
        ELSIF TG_TABLE_NAME = 'comments' THEN
            UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
        -- Incrementar contador de compartilhamentos
        ELSIF TG_TABLE_NAME = 'shares' THEN
            UPDATE public.posts SET shares_count = shares_count + 1 WHERE id = NEW.post_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrementar contador de curtidas
        IF TG_TABLE_NAME = 'post_likes' THEN
            UPDATE public.posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
        -- Decrementar contador de comentários
        ELSIF TG_TABLE_NAME = 'comments' THEN
            UPDATE public.posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
        -- Decrementar contador de compartilhamentos
        ELSIF TG_TABLE_NAME = 'shares' THEN
            UPDATE public.posts SET shares_count = shares_count - 1 WHERE id = OLD.post_id;
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Triggers para contadores
CREATE TRIGGER update_post_likes_counter AFTER INSERT OR DELETE ON public.post_likes FOR EACH ROW EXECUTE FUNCTION update_post_counters();
CREATE TRIGGER update_post_comments_counter AFTER INSERT OR DELETE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_post_counters();
CREATE TRIGGER update_post_shares_counter AFTER INSERT OR DELETE ON public.shares FOR EACH ROW EXECUTE FUNCTION update_post_counters();

-- Função para atualizar contadores de usuários
CREATE OR REPLACE FUNCTION update_user_counters()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Incrementar contador de posts
        IF TG_TABLE_NAME = 'posts' THEN
            UPDATE public.users SET posts_count = posts_count + 1 WHERE id = NEW.author_id;
        -- Incrementar contador de stories
        ELSIF TG_TABLE_NAME = 'stories' THEN
            UPDATE public.users SET stories_count = stories_count + 1 WHERE id = NEW.author_id;
        -- Incrementar contador de seguidores/seguindo
        ELSIF TG_TABLE_NAME = 'relationships' THEN
            UPDATE public.users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
            UPDATE public.users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrementar contador de posts
        IF TG_TABLE_NAME = 'posts' THEN
            UPDATE public.users SET posts_count = posts_count - 1 WHERE id = OLD.author_id;
        -- Decrementar contador de stories
        ELSIF TG_TABLE_NAME = 'stories' THEN
            UPDATE public.users SET stories_count = stories_count - 1 WHERE id = OLD.author_id;
        -- Decrementar contador de seguidores/seguindo
        ELSIF TG_TABLE_NAME = 'relationships' THEN
            UPDATE public.users SET following_count = following_count - 1 WHERE id = OLD.follower_id;
            UPDATE public.users SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Triggers para contadores de usuários
CREATE TRIGGER update_user_posts_counter AFTER INSERT OR DELETE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_user_counters();
CREATE TRIGGER update_user_stories_counter AFTER INSERT OR DELETE ON public.stories FOR EACH ROW EXECUTE FUNCTION update_user_counters();
CREATE TRIGGER update_user_relationships_counter AFTER INSERT OR DELETE ON public.relationships FOR EACH ROW EXECUTE FUNCTION update_user_counters();

-- =====================================================
-- 13. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela users
CREATE POLICY "Users can view public profiles" ON public.users FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Políticas para tabela posts
CREATE POLICY "Anyone can view public posts" ON public.posts FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view their own posts" ON public.posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- Políticas para tabela comments
CREATE POLICY "Anyone can view comments on public posts" ON public.comments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.posts WHERE id = comments.post_id AND is_public = true)
);
CREATE POLICY "Users can view comments on their posts" ON public.comments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.posts WHERE id = comments.post_id AND author_id = auth.uid())
);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = author_id);

-- Políticas para tabela post_likes
CREATE POLICY "Users can view likes on public posts" ON public.post_likes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.posts WHERE id = post_likes.post_id AND is_public = true)
);
CREATE POLICY "Users can like posts" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike their own likes" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- Políticas para tabela stories
CREATE POLICY "Users can view stories from users they follow" ON public.stories FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.relationships WHERE follower_id = auth.uid() AND following_id = stories.author_id)
  OR auth.uid() = author_id
);
CREATE POLICY "Users can create stories" ON public.stories FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can delete their own stories" ON public.stories FOR DELETE USING (auth.uid() = author_id);

-- Políticas para tabela relationships
CREATE POLICY "Users can view their own relationships" ON public.relationships FOR SELECT USING (
  auth.uid() = follower_id OR auth.uid() = following_id
);
CREATE POLICY "Users can create relationships" ON public.relationships FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own relationships" ON public.relationships FOR DELETE USING (
  auth.uid() = follower_id OR auth.uid() = following_id
);

-- Políticas para tabela transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para tabela messages
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND user_id = auth.uid())
);
CREATE POLICY "Users can send messages to their conversations" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND user_id = auth.uid())
);

-- Políticas para tabela notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 14. DADOS INICIAIS E CONFIGURAÇÕES
-- =====================================================

-- Inserir configurações iniciais da plataforma
INSERT INTO public.platform_settings (key, value, description, is_public) VALUES
('swift_coin_price', '{"usdt": 0.1, "real": 0.5}', 'Preço atual do Swift Coin', true),
('platform_fees', '{"swap": 0.01, "withdrawal": 0.02, "transaction": 0.005}', 'Taxas da plataforma', false),
('min_withdrawal', '{"swift": 100, "usdt": 10, "real": 50}', 'Valores mínimos para saque', true),
('max_withdrawal', '{"swift": 10000, "usdt": 1000, "real": 5000}', 'Valores máximos para saque', true),
('story_duration', '24', 'Duração das stories em horas', true),
('max_post_images', '4', 'Número máximo de imagens por post', true),
('max_file_size', '{"image": 5242880, "video": 52428800}', 'Tamanho máximo de arquivos em bytes', true);

-- Inserir estatísticas iniciais
INSERT INTO public.platform_stats (date, total_users, active_users, total_posts, total_transactions, total_volume, swift_price, usdt_price) VALUES
(CURRENT_DATE, 0, 0, 0, 0, 0.00, 0.1, 5.12);

-- =====================================================
-- 15. VIEWS ÚTEIS PARA CONSULTAS
-- =====================================================

-- View para feed de posts com informações do autor
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

-- View para stories ativas
CREATE VIEW public.active_stories AS
SELECT 
  s.*,
  u.name as author_name,
  u.username as author_username,
  u.avatar_url as author_avatar
FROM public.stories s
JOIN public.users u ON s.author_id = u.id
WHERE s.expires_at > NOW() AND s.is_archived = false
ORDER BY s.created_at DESC;

-- View para estatísticas de usuário
CREATE VIEW public.user_stats AS
SELECT 
  u.id,
  u.username,
  u.name,
  u.followers_count,
  u.following_count,
  u.posts_count,
  u.stories_count,
  u.swift_balance,
  u.usdt_balance,
  u.real_balance,
  u.total_earnings,
  u.total_spent,
  u.created_at,
  u.last_login
FROM public.users u;

-- =====================================================
-- SCHEMA COMPLETO CRIADO COM SUCESSO!
-- =====================================================
-- 
-- Este schema inclui:
-- ✅ Sistema completo de usuários e perfis
-- ✅ Sistema social (posts, comentários, curtidas, compartilhamentos)
-- ✅ Sistema de stories com expiração
-- ✅ Sistema de relacionamentos (seguir/seguidores)
-- ✅ Sistema financeiro completo (Swift Coin, USDT, Real)
-- ✅ Sistema de marketplace e vendas
-- ✅ Sistema de mensagens e chat
-- ✅ Sistema de notificações
-- ✅ Sistema de logs e auditoria
-- ✅ Configurações da plataforma
-- ✅ Índices para performance
-- ✅ Triggers para atualização automática
-- ✅ Row Level Security (RLS)
-- ✅ Views úteis para consultas
-- ✅ Dados iniciais e configurações
--
-- Total: 25+ tabelas principais + views + triggers + políticas
-- =====================================================
