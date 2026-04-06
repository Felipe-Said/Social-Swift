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
import { businessPages } from "@/lib/business-navigation";
import "@/test-signup";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

import { AppShell } from "@/components/layout/app-shell";

import Feed from "./pages/social/Feed";
import Profile from "./pages/social/Profile";
import Snaps from "./pages/social/Snaps";
import SearchPage from "./pages/social/SearchPage";
import MessagesPage from "./pages/social/MessagesPage";
import FriendsPage from "./pages/social/FriendsPage";
import RequestsPage from "./pages/social/RequestsPage";
import GroupsPage from "./pages/social/GroupsPage";
import GroupDetailPage from "./pages/social/GroupDetailPage";
import SocialProfilePage from "./pages/social/SocialProfilePage";

import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import WithdrawalsPage from "./pages/business/WithdrawalsPage";
import SalesPage from "./pages/business/SalesPage";
import FeesPage from "./pages/business/FeesPage";
import ProjectsPage from "./pages/business/ProjectsPage";
import WalletPage from "./pages/business/WalletPage";
import BusinessRoutePage from "./pages/business/BusinessRoutePage";

const queryClient = new QueryClient();

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

function ThemeInitializer() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
}

const App = () => {
  useAuthInit();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeInitializer />
        <MockBanner />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/politicas/termos" element={<TermsOfUse />} />
            <Route path="/politicas/privacidade" element={<PrivacyPolicy />} />

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/social/feed" replace />} />

              <Route path="social">
                <Route index element={<Navigate to="/app/social/feed" replace />} />
                <Route path="feed" element={<Feed />} />
                <Route path="perfil" element={<Profile />} />
                <Route path="perfil/:username" element={<SocialProfilePage />} />
                <Route path="snaps" element={<Snaps />} />
                <Route path="buscar" element={<SearchPage />} />
                <Route path="chats" element={<MessagesPage />} />
                <Route path="amigos" element={<FriendsPage />} />
                <Route path="solicitacoes" element={<RequestsPage />} />
                <Route path="grupos" element={<GroupsPage />} />
                <Route path="grupos/:groupId" element={<GroupDetailPage />} />
                <Route
                  path="servicos"
                  element={<div className="p-6 text-center text-text">Servicos em breve...</div>}
                />
              </Route>

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="saques" element={<WithdrawalsPage />} />
              <Route path="vendas" element={<SalesPage />} />
              <Route path="taxas" element={<FeesPage />} />
              <Route path="projetos" element={<ProjectsPage />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route
                path="meu-negocio"
                element={<Navigate to="/app/negocio/loja" replace />}
              />
              <Route path="carteira" element={<WalletPage />} />
              {businessPages.map((page) => (
                <Route
                  key={page.url}
                  path={page.url.replace("/app/", "")}
                  element={<BusinessRoutePage />}
                />
              ))}
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <div className="p-6 text-center text-text">Admin em breve...</div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/politicas/cookies"
              element={<div className="p-6 text-center text-text">Politica de Cookies em breve...</div>}
            />
            <Route
              path="/compliance-aml"
              element={<div className="p-6 text-center text-text">Compliance AML em breve...</div>}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
