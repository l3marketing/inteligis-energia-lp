import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import MercadoLivre from "./pages/MercadoLivre";
import HomeLite from "./pages/HomeLite";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import EnergiaPorAssinatura from "./pages/EnergiaPorAssinatura";
import EnergiaSolar from "./pages/EnergiaSolar";
import FiltrosCapacitivos from "./pages/FiltrosCapacitivos";
// Rotas administrativas desativadas temporariamente

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);
  return null;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<HomeLite />} />
        
        {/* Mercado Livre de Energia */}
        <Route path="/mercado-livre-de-energia" element={<MercadoLivre />} />
        
        {/* Outras páginas de serviços */}
        <Route path="/energia-por-assinatura" element={<EnergiaPorAssinatura />} />
        <Route path="/energia-solar" element={<EnergiaSolar />} />
        <Route path="/filtros-capacitivos" element={<FiltrosCapacitivos />} />
        
        {/* Página completa */}
        <Route path="/index" element={<Index />} />
        
        {/* Área restrita */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
