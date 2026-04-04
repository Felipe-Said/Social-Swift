# Sistema de Logs do Swift Pulse Connect

## 📋 Visão Geral

Este sistema de logs foi implementado para rastrear todas as atividades dos usuários e eventos do sistema no Swift Pulse Connect. Os logs são armazenados no Supabase e incluem informações detalhadas sobre ações, navegação, erros e atividades dos usuários.

## 🏗️ Arquitetura

### Componentes Principais

1. **`src/lib/supabase.ts`** - Configuração do Supabase e funções básicas de log
2. **`src/services/logService.ts`** - Serviço principal de logs com métodos específicos
3. **`src/hooks/useLogger.ts`** - Hook React para usar o serviço de logs
4. **`src/components/admin/LogsViewer.tsx`** - Interface para visualizar logs

### Tabelas no Supabase

#### 1. `user_logs`
- **Propósito**: Logs de ações específicas dos usuários
- **Campos**:
  - `id` (UUID) - Identificador único
  - `user_id` (TEXT) - ID do usuário
  - `action` (TEXT) - Tipo de ação (login, post_create, etc.)
  - `resource` (TEXT) - Recurso afetado (user, post, etc.)
  - `resource_id` (TEXT) - ID do recurso específico
  - `details` (JSONB) - Detalhes adicionais da ação
  - `ip_address` (TEXT) - IP do usuário
  - `user_agent` (TEXT) - User agent do navegador
  - `created_at` (TIMESTAMP) - Data/hora da ação

#### 2. `system_logs`
- **Propósito**: Logs de eventos do sistema
- **Campos**:
  - `id` (UUID) - Identificador único
  - `level` (TEXT) - Nível do log (info, warning, error, debug)
  - `message` (TEXT) - Mensagem do log
  - `context` (JSONB) - Contexto adicional
  - `user_id` (TEXT) - ID do usuário (opcional)
  - `created_at` (TIMESTAMP) - Data/hora do evento

#### 3. `activity_logs`
- **Propósito**: Logs de atividades gerais dos usuários
- **Campos**:
  - `id` (UUID) - Identificador único
  - `user_id` (TEXT) - ID do usuário
  - `activity_type` (TEXT) - Tipo de atividade
  - `description` (TEXT) - Descrição da atividade
  - `metadata` (JSONB) - Metadados adicionais
  - `created_at` (TIMESTAMP) - Data/hora da atividade

## 🚀 Como Usar

### 1. Configuração Inicial

1. Crie um projeto no Supabase
2. Execute os SQLs do arquivo `supabase-config.example.md`
3. Configure as variáveis de ambiente:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 2. Usando o Hook de Logs

```typescript
import { useLogger } from '@/hooks/useLogger';

function MyComponent() {
  const { logUserAction, logError, logNavigation } = useLogger();

  const handleClick = async () => {
    // Log de ação do usuário
    await logUserAction('button_click', 'ui', 'my-button');
  };

  const handleError = async (error: Error) => {
    // Log de erro
    await logError(error, { component: 'MyComponent' });
  };
}
```

### 3. Métodos Disponíveis

#### Logs de Usuário
- `logLogin(method, success)` - Login do usuário
- `logLogout()` - Logout do usuário
- `logPostCreate(postId, hasMedia)` - Criação de post
- `logPostLike(postId, liked)` - Like/deslike de post
- `logProfileUpdate(fields)` - Atualização de perfil
- `logNavigation(from, to)` - Navegação entre páginas
- `logSearch(query, resultsCount)` - Busca
- `logFileUpload(fileType, fileSize, success)` - Upload de arquivo

#### Logs do Sistema
- `logSystemEvent(level, message, context)` - Evento do sistema
- `logError(error, context)` - Erro do sistema

#### Logs de Atividade
- `logUserActivity(type, description, metadata)` - Atividade geral

## 📊 Visualização de Logs

O componente `LogsViewer` permite visualizar todos os logs:

```typescript
import { LogsViewer } from '@/components/admin/LogsViewer';

function AdminPage() {
  return <LogsViewer />;
}
```

### Funcionalidades do LogsViewer:
- **Filtros por tipo**: Logs de usuário, sistema e atividades
- **Filtros por nível**: Para logs do sistema (error, warning, info, debug)
- **Exportação**: Download dos logs em formato JSON
- **Atualização**: Botão para recarregar os logs
- **Busca**: Visualização detalhada de cada log

## 🔒 Segurança

### Row Level Security (RLS)
- Usuários só podem ver seus próprios logs
- Logs do sistema são visíveis apenas para admins
- Políticas configuradas no Supabase

### Dados Sensíveis
- IPs são registrados para auditoria
- User agents são capturados
- Informações do navegador são coletadas
- Timestamps precisos para rastreamento

## 📈 Métricas e Analytics

### Dados Coletados
- **Navegação**: Páginas visitadas, tempo gasto
- **Interações**: Likes, comentários, compartilhamentos
- **Uploads**: Tipos de arquivo, tamanhos, sucessos/falhas
- **Erros**: Stack traces, contexto, frequência
- **Performance**: Tempos de resposta, carregamentos

### Casos de Uso
- **Debugging**: Identificar problemas rapidamente
- **Analytics**: Entender comportamento dos usuários
- **Segurança**: Detectar atividades suspeitas
- **Compliance**: Auditoria e conformidade
- **Performance**: Otimizar baseado no uso real

## 🛠️ Manutenção

### Limpeza de Logs
```sql
-- Remover logs antigos (exemplo: mais de 90 dias)
DELETE FROM user_logs WHERE created_at < NOW() - INTERVAL '90 days';
DELETE FROM system_logs WHERE created_at < NOW() - INTERVAL '90 days';
DELETE FROM activity_logs WHERE created_at < NOW() - INTERVAL '90 days';
```

### Monitoramento
- Configure alertas para logs de erro
- Monitore o volume de logs
- Verifique a performance das consultas

## 🔧 Configurações Avançadas

### Desabilitar Logs
```typescript
import { logService } from '@/services/logService';

// Desabilitar logs (útil para testes)
logService.disable();

// Reabilitar logs
logService.enable();
```

### Logs Customizados
```typescript
// Log personalizado
await logService.logUserAction('custom_action', 'custom_resource', 'id123', {
  custom_data: 'value',
  timestamp: new Date().toISOString()
});
```

## 📝 Exemplos de Uso

### 1. Log de Login
```typescript
// No store de autenticação
await logService.logLogin('email', true);
```

### 2. Log de Erro
```typescript
// Em um try/catch
try {
  // código que pode falhar
} catch (error) {
  await logService.logError(error, { 
    component: 'WeatherWidget',
    action: 'fetchWeatherData' 
  });
}
```

### 3. Log de Navegação
```typescript
// No React Router
useEffect(() => {
  logNavigation(previousPath, currentPath);
}, [location]);
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Logs não aparecem**
   - Verifique as variáveis de ambiente
   - Confirme se as tabelas foram criadas
   - Verifique as políticas RLS

2. **Erro de permissão**
   - Verifique se o usuário está autenticado
   - Confirme as políticas RLS no Supabase

3. **Performance lenta**
   - Verifique os índices das tabelas
   - Considere limpar logs antigos
   - Otimize as consultas

### Debug
```typescript
// Habilitar logs de debug
await logService.logSystemEvent('debug', 'Debug message', {
  component: 'LogService',
  action: 'debug'
});
```

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**Nota**: Este sistema de logs é essencial para monitoramento, debugging e compliance. Mantenha-o sempre atualizado e monitore regularmente os dados coletados.
