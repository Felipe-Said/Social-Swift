import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "@/stores/theme";
import { useAuth } from "@/stores/auth";
import { useAuthInit } from "@/hooks/useAuthInit";
import { MockBanner } from "@/components/ui/mock-banner";
import "@/test-signup"; // Teste de cadastro

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// App Layout
import { AppShell } from "@/components/layout/app-shell";

// Social Pages
import Feed from "./pages/social/Feed";
import Profile from "./pages/social/Profile";
import Snaps from "./pages/social/Snaps";
import SearchPage from "./pages/social/SearchPage";
import MessagesPage from "./pages/social/MessagesPage";
import FriendsPage from "./pages/social/FriendsPage";
import RequestsPage from "./pages/social/RequestsPage";

// Business Pages
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import WithdrawalsPage from "./pages/business/WithdrawalsPage";
import SalesPage from "./pages/business/SalesPage";
import FeesPage from "./pages/business/FeesPage";
import ProjectsPage from "./pages/business/ProjectsPage";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-text-dim">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Theme Initializer Component
function ThemeInitializer() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
}

const App = () => {
  useAuthInit(); // Inicializar autenticação
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeInitializer />
        <MockBanner />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/politicas/termos" element={<TermsOfUse />} />
            <Route path="/politicas/privacidade" element={<PrivacyPolicy />} />

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
                <Route path="feed" element={<Feed />} /> {/* Feed page */}
                <Route path="perfil" element={<Profile />} /> {/* Profile page */}
                <Route path="snaps" element={<Snaps />} />
                <Route path="buscar" element={<SearchPage />} />
                <Route path="chats" element={<MessagesPage />} />
                <Route path="amigos" element={<FriendsPage />} />
                <Route path="solicitacoes" element={<RequestsPage />} />
                <Route path="perfil/:id" element={<div className="p-6 text-center text-text">Perfil em breve...</div>} />
                <Route path="servicos" element={<div className="p-6 text-center text-text">Serviços em breve...</div>} />
              </Route>

              {/* Business Routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="saques" element={<WithdrawalsPage />} />
              <Route path="vendas" element={<SalesPage />} />
              <Route path="taxas" element={<FeesPage />} />
              <Route path="projetos" element={<ProjectsPage />} />
              <Route path="marketplace" element={<Marketplace />} /> {/* Marketplace page */}
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
            <Route path="/politicas/cookies" element={<div className="p-6 text-center text-text">Política de Cookies em breve...</div>} />
            <Route path="/compliance-aml" element={<div className="p-6 text-center text-text">Compliance AML em breve...</div>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
