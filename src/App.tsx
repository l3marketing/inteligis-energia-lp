import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
// Rotas administrativas desativadas temporariamente

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
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
