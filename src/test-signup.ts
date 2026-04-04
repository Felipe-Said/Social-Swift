// Teste de cadastro de usuário
import { supabase } from '@/lib/supabase';

export async function testSignup() {
  console.log('🧪 Testando cadastro de usuário...');
  
  const testData = {
    email: `teste_${Date.now()}@example.com`,
    password: '123456',
    name: 'Usuário Teste',
    username: `usuario_teste_${Date.now()}`
  };

  try {
    console.log('📧 Dados do teste:', testData);
    
    // Tentar cadastrar
    const { data, error } = await supabase.auth.signUp({
      email: testData.email,
      password: testData.password,
      options: {
        data: {
          name: testData.name,
          username: testData.username
        }
      }
    });

    console.log('📝 Resultado do teste:', { data, error });
    
    if (error) {
      console.error('❌ Erro no teste:', error);
      return { success: false, error: error.message };
    }

    if (data.user) {
      console.log('✅ Usuário criado:', data.user.id);
      
      // Aguardar e verificar se o perfil foi criado
      setTimeout(async () => {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        console.log('📊 Perfil criado:', { userData, userError });
        
        if (userData) {
          console.log('🎉 SUCESSO! Usuário e perfil criados!');
        } else {
          console.log('⚠️ Usuário criado mas perfil não encontrado');
        }
      }, 5000);
      
      return { success: true, userId: data.user.id };
    }

    return { success: false, error: 'Usuário não foi criado' };
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return { success: false, error: error.message };
  }
}

// Teste de conexão básica
export async function testConnection() {
  console.log('🔌 Testando conexão com Supabase...');
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro de conexão:', error);
      return false;
    }
    
    console.log('✅ Conexão OK!');
    return true;
  } catch (error) {
    console.error('❌ Erro de conexão:', error);
    return false;
  }
}

// Executar testes automaticamente
if (typeof window !== 'undefined') {
  window.testSignup = testSignup;
  window.testConnection = testConnection;
  console.log('🧪 Funções de teste disponíveis:');
  console.log('  - window.testConnection() - Testa conexão');
  console.log('  - window.testSignup() - Testa cadastro');
}
