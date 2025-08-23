import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "@/stores/theme";
import { useAuth } from "@/stores/auth";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// App Layout
import { AppShell } from "@/components/layout/app-shell";

// Social Pages
import Feed from "./pages/social/Feed";
import Profile from "./pages/social/Profile";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function ThemeInitializer() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Initialize theme on app load
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInitializer />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected App Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }>
            {/* Redirect /app to /app/social/feed */}
            <Route index element={<Navigate to="/app/social/feed" replace />} />
            
            {/* Social Routes */}
            <Route path="social">
              <Route index element={<Navigate to="/app/social/feed" replace />} />
              <Route path="feed" element={<Feed />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="stories" element={<div className="p-6 text-center text-text">Stories em breve...</div>} />
              <Route path="buscar" element={<div className="p-6 text-center text-text">Busca em breve...</div>} />
              <Route path="chats" element={<div className="p-6 text-center text-text">Chats em breve...</div>} />
              <Route path="amigos" element={<div className="p-6 text-center text-text">Amigos em breve...</div>} />
              <Route path="solicitacoes" element={<div className="p-6 text-center text-text">Solicitações em breve...</div>} />
              <Route path="perfil/:id" element={<div className="p-6 text-center text-text">Perfil em breve...</div>} />
              <Route path="servicos" element={<div className="p-6 text-center text-text">Serviços em breve...</div>} />
            </Route>
            
            {/* Business Routes */}
            <Route path="dashboard" element={<div className="p-6 text-center text-text">Dashboard em breve...</div>} />
            <Route path="saques" element={<div className="p-6 text-center text-text">Saques em breve...</div>} />
            <Route path="vendas" element={<div className="p-6 text-center text-text">Vendas em breve...</div>} />
            <Route path="taxas" element={<div className="p-6 text-center text-text">Taxas em breve...</div>} />
            <Route path="meu-negocio" element={<div className="p-6 text-center text-text">Meu Negócio em breve...</div>} />
            <Route path="carteira" element={<div className="p-6 text-center text-text">Carteira em breve...</div>} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <div className="p-6 text-center text-text">Admin em breve...</div>
            </ProtectedRoute>
          } />
          
          {/* Legal Pages */}
          <Route path="/politicas/privacidade" element={<div className="p-6 text-center text-text">Política de Privacidade em breve...</div>} />
          <Route path="/politicas/termos" element={<div className="p-6 text-center text-text">Termos de Uso em breve...</div>} />
          <Route path="/politicas/cookies" element={<div className="p-6 text-center text-text">Política de Cookies em breve...</div>} />
          <Route path="/compliance-aml" element={<div className="p-6 text-center text-text">Compliance AML em breve...</div>} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
