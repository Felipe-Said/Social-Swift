# 🔍 Como Verificar se o Banco de Dados foi Criado Corretamente

## 📋 Checklist de Verificação

### **1. Verificar se as Tabelas foram Criadas**

No **SQL Editor** do Supabase, execute esta query:

```sql
-- Verificar todas as tabelas criadas
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Resultado esperado (Schema Completo):**
```
activity_logs          | BASE TABLE
comments               | BASE TABLE
comment_likes          | BASE TABLE
conversation_participants | BASE TABLE
conversations          | BASE TABLE
messages               | BASE TABLE
notifications          | BASE TABLE
platform_settings      | BASE TABLE
platform_stats         | BASE TABLE
post_likes             | BASE TABLE
posts                  | BASE TABLE
products               | BASE TABLE
relationships          | BASE TABLE
sales                  | BASE TABLE
shares                 | BASE TABLE
stories                | BASE TABLE
story_reactions        | BASE TABLE
story_views            | BASE TABLE
swaps                  | BASE TABLE
system_logs            | BASE TABLE
transactions           | BASE TABLE
user_blocks            | BASE TABLE
user_logs              | BASE TABLE
users                  | BASE TABLE
withdrawals            | BASE TABLE
```

**Resultado esperado (Migração Simplificada):**
```
comments               | BASE TABLE
notifications          | BASE TABLE
platform_settings      | BASE TABLE
post_likes             | BASE TABLE
posts                  | BASE TABLE
relationships          | BASE TABLE
stories                | BASE TABLE
story_views            | BASE TABLE
swaps                  | BASE TABLE
transactions           | BASE TABLE
user_logs              | BASE TABLE
users                  | BASE TABLE
```

### **2. Verificar se as Políticas RLS foram Criadas**

```sql
-- Verificar políticas RLS
SELECT schemaname, tablename, policyname, cmd, roles
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Resultado esperado:** Deve mostrar várias políticas para cada tabela.

### **3. Verificar se as Configurações Iniciais foram Inseridas**

```sql
-- Verificar configurações da plataforma
SELECT key, value, description, is_public 
FROM public.platform_settings 
ORDER BY key;
```

**Resultado esperado:**
```
key                    | value                                    | description
max_post_images        | "4"                                      | Número máximo de imagens por post
min_withdrawal         | {"real": 50, "swift": 100, "usdt": 10}  | Valores mínimos para saque
platform_fees          | {"swap": 0.01, "withdrawal": 0.02}      | Taxas da plataforma
story_duration         | "24"                                     | Duração das stories em horas
swift_coin_price       | {"real": 0.5, "usdt": 0.1}             | Preço atual do Swift Coin
```

### **4. Verificar se os Índices foram Criados**

```sql
-- Verificar índices criados
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

**Resultado esperado:** Deve mostrar vários índices para performance.

### **5. Verificar se as Views foram Criadas**

```sql
-- Verificar views criadas
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'VIEW'
ORDER BY table_name;
```

**Resultado esperado:**
```
active_stories         | VIEW
posts_feed            | VIEW
user_stats            | VIEW
```

### **6. Verificar se as Funções foram Criadas**

```sql
-- Verificar funções criadas
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines 
WHERE routine_schema = 'public'
ORDER BY routine_name;
```

**Resultado esperado:**
```
routine_name           | routine_type | data_type
update_counters        | FUNCTION    | trigger
update_updated_at_column | FUNCTION   | trigger
```

## 🧪 Testes Práticos

### **Teste 1: Inserir um Usuário de Teste**

```sql
-- Inserir usuário de teste (substitua o UUID por um real)
INSERT INTO public.users (
    id,
    email,
    name,
    username,
    avatar_url,
    bio,
    swift_balance,
    usdt_balance,
    real_balance
) VALUES (
    gen_random_uuid(),
    'teste@example.com',
    'Usuário Teste',
    'usuario_teste',
    'https://images.unsplash.com/photo-1494790108755-2616b612b619?w=150&h=150&fit=crop&crop=face',
    'Este é um usuário de teste',
    1000.00,
    0.00,
    0.00
);
```

**Resultado esperado:** Deve inserir sem erros.

### **Teste 2: Verificar se o Usuário foi Inserido**

```sql
-- Verificar usuário inserido
SELECT id, email, name, username, swift_balance 
FROM public.users 
WHERE email = 'teste@example.com';
```

**Resultado esperado:** Deve retornar o usuário inserido.

### **Teste 3: Inserir um Post de Teste**

```sql
-- Inserir post de teste
INSERT INTO public.posts (
    author_id,
    content,
    is_public
) VALUES (
    (SELECT id FROM public.users WHERE email = 'teste@example.com' LIMIT 1),
    'Este é um post de teste!',
    true
);
```

**Resultado esperado:** Deve inserir sem erros.

### **Teste 4: Verificar se o Post foi Inserido**

```sql
-- Verificar post inserido
SELECT p.id, p.content, u.name as author_name, p.created_at
FROM public.posts p
JOIN public.users u ON p.author_id = u.id
WHERE p.content = 'Este é um post de teste!';
```

**Resultado esperado:** Deve retornar o post com o autor.

### **Teste 5: Verificar se os Contadores Funcionam**

```sql
-- Verificar se o contador de posts foi atualizado
SELECT name, posts_count 
FROM public.users 
WHERE email = 'teste@example.com';
```

**Resultado esperado:** `posts_count` deve ser 1.

## 🚨 Possíveis Problemas e Soluções

### **Problema 1: "relation does not exist"**
**Causa:** Tabelas não foram criadas
**Solução:** Execute novamente o arquivo SQL completo

### **Problema 2: "permission denied"**
**Causa:** RLS bloqueando acesso
**Solução:** Verifique se está logado no Supabase

### **Problema 3: "duplicate key value"**
**Causa:** Tentativa de inserir dados duplicados
**Solução:** Use dados únicos ou DELETE antes de INSERT

### **Problema 4: "foreign key constraint"**
**Causa:** Referência a ID inexistente
**Solução:** Verifique se o usuário existe antes de criar posts

## ✅ Checklist Final

- [ ] **Tabelas criadas** (verificar com query 1)
- [ ] **Políticas RLS ativas** (verificar com query 2)
- [ ] **Configurações inseridas** (verificar com query 3)
- [ ] **Índices criados** (verificar com query 4)
- [ ] **Views funcionando** (verificar com query 5)
- [ ] **Funções criadas** (verificar com query 6)
- [ ] **Teste de inserção** (testes 1-5 funcionando)
- [ ] **Contadores automáticos** (teste 5 funcionando)

## 🎉 Sucesso!

Se todos os testes passaram, seu banco de dados está **100% funcional** e pronto para uso!

**Próximos passos:**
1. Configurar variáveis de ambiente no projeto
2. Testar conexão com o frontend
3. Implementar APIs para cada funcionalidade
4. Começar a usar a plataforma!

## 🔧 Comandos Úteis para Debug

```sql
-- Limpar dados de teste
DELETE FROM public.posts WHERE content = 'Este é um post de teste!';
DELETE FROM public.users WHERE email = 'teste@example.com';

-- Verificar logs de erro
SELECT * FROM public.system_logs ORDER BY created_at DESC LIMIT 10;

-- Verificar estatísticas da plataforma
SELECT * FROM public.platform_stats ORDER BY date DESC LIMIT 5;
```
