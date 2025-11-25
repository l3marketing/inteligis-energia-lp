import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoInteligisBranco from "@/assets/logo-inteligis-branco.svg";
import { Menu, X, ArrowRight } from "lucide-react";

const ServiceHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToId = (id: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isHome = typeof window !== "undefined" && (document?.documentElement?.dataset?.page === "home" || document?.body?.dataset?.page === "home" || window.location.pathname === "/");
  const positionClass = isHome ? "fixed top-0 left-0 w-full" : "relative";
  return (
    <>
      <header className={`bg-gradient-to-r from-[#3D98FF] via-[#6B46C1] to-[#8E32D9] shadow-lg h-[80px] z-40 ${positionClass}`}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-3">
              <img src={logoInteligisBranco} alt="Inteligis Energia" className="w-32 h-auto" loading="lazy" />
            </div>
            <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
              <a href="/" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Início
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/mercado-livre-de-energia" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Mercado Livre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/energia-por-assinatura" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Assinatura
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/energia-solar" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Solar
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/filtros-capacitivos" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Filtro Capacitivo
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button className="hidden md:flex bg-white text-blue-900 hover:bg-gray-100 font-semibold px-6 h-10" onClick={() => scrollToId('contato')}>
                Falar com Especialista
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <button className="md:hidden text-white" aria-label="Menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(v => !v)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#3D98FF] via-[#6B46C1] to-[#8E32D9] border-b border-white/20">
          <div className="container mx-auto px-4 pb-4">
            <nav className="flex flex-col gap-4 mt-4" aria-label="Mobile">
              <a href="/" className="text-white/90 hover:text-white font-medium transition-colors py-2">Início</a>
              <a href="/mercado-livre-de-energia" className="text-white/90 hover:text-white font-medium transition-colors py-2">Mercado Livre</a>
              <a href="/energia-por-assinatura" className="text-white/90 hover:text-white font-medium transition-colors py-2">Assinatura</a>
              <a href="/energia-solar" className="text-white/90 hover:text-white font-medium transition-colors py-2">Solar</a>
              <a href="/filtros-capacitivos" className="text-white/90 hover:text-white font-medium transition-colors py-2">Filtro Capacitivo</a>
              <button className="text-white/90 hover:text-white font-medium transition-colors py-2 text-left" onClick={() => scrollToId('contato')}>Falar com Especialista</button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceHeader;