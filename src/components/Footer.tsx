import { Mail, Phone, MapPin } from "lucide-react";
import logoInteligis from "@/assets/logo-inteligis.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img src={logoInteligis} alt="Inteligis Logo" className="w-48 h-auto" />
            </div>
            <p className="text-white/80 leading-relaxed">
              Especialista em Mercado Livre de Energia, ajudando indústrias a reduzirem custos e aumentarem competitividade.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <a href="tel:+551931234567" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>(19) 3123-4567</span>
              </a>
              <a href="mailto:contato@inteligis.com.br" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>contato@inteligis.com.br</span>
              </a>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Campinas/SP - Atendimento RMC</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informações Legais</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>CNPJ: 00.000.000/0001-00</p>
              <p>Parceiro Oficial Auren e Cemig</p>
              <p>Agente Registrado CCEE</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Inteligis Energia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
