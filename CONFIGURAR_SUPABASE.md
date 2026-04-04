# 🔧 Configuração das Variáveis de Ambiente

## 📋 Passo a Passo para Remover o Banner de Desenvolvimento

### **1. Criar arquivo `.env` na raiz do projeto**

Crie um arquivo chamado `.env` na pasta raiz do projeto (`swift-pulse-connect`) com o seguinte conteúdo:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://jecnmlyzdobrjwqtgiex.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplY25tbHl6ZG9icmp3cXRnaWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NDUyMjUsImV4cCI6MjA3NTUyMTIyNX0.AL5gMFm-aObNXEJj5klWAnt-9XbSe2MKcQYuhLMgivg

# Environment
NODE_ENV=development
```

### **2. Reiniciar o servidor de desenvolvimento**

Após criar o arquivo `.env`, reinicie o servidor:

```bash
# Parar o servidor atual (Ctrl+C)
# Depois executar:
npm run dev
```

### **3. Verificar se funcionou**

Após reiniciar, o banner de **"Modo de Desenvolvimento Ativo"** deve desaparecer automaticamente!

## ✅ **O que acontece:**

1. **Antes:** Sistema usa dados simulados (mock)
2. **Depois:** Sistema conecta ao banco de dados real do Supabase
3. **Resultado:** Banner desaparece e você tem acesso completo ao backend

## 🚨 **Importante:**

- O arquivo `.env` deve estar na **raiz do projeto** (mesmo nível do `package.json`)
- **NÃO** commite o arquivo `.env` no Git (ele já está no `.gitignore`)
- As variáveis começam com `VITE_` para serem acessíveis no frontend

## 🔍 **Verificação:**

Se o banner ainda aparecer após seguir os passos:

1. Verifique se o arquivo `.env` está na pasta correta
2. Verifique se as variáveis estão escritas exatamente como mostrado
3. Reinicie o servidor completamente
4. Limpe o cache do navegador (Ctrl+F5)

## 🎉 **Sucesso!**

Quando funcionar, você terá:
- ✅ Banco de dados real funcionando
- ✅ Autenticação real do Supabase
- ✅ Dados persistentes
- ✅ Todas as funcionalidades ativas
