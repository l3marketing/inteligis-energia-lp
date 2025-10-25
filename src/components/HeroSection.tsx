import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Award } from "lucide-react";
import logoInteligis from "@/assets/logo-inteligis.jpg";
const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    currentBill: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name || !formData.company || !formData.email || !formData.whatsapp || !formData.currentBill) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, insira um email válido");
      return;
    }
    toast.success("Análise solicitada com sucesso! Entraremos em contato em breve.");
    setFormData({
      name: "",
      company: "",
      email: "",
      whatsapp: "",
      currentBill: ""
    });
  };
  return <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">47 Clientes Industriais Atendidos em Campinas</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-50">
                Descubra Como Sua Planta Pode Economizar Até{" "}
                <span className="text-lime-300 font-extrabold">40%</span> na Conta de Energia
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Receba uma análise gratuita e personalizada mostrando sua economia exata no Mercado Livre de Energia.
              </p>
            </div>

            {/* Trust Logos */}
            
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Solicite Sua Análise Gratuita
              </h2>
              <p className="text-muted-foreground">
                Preencha os dados abaixo e descubra quanto sua empresa pode economizar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo*</Label>
                <Input id="name" type="text" placeholder="João Silva" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} required className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa*</Label>
                <Input id="company" type="text" placeholder="Sua Empresa Ltda" value={formData.company} onChange={e => setFormData({
                ...formData,
                company: e.target.value
              })} required className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail Corporativo*</Label>
                <Input id="email" type="email" placeholder="joao@suaempresa.com.br" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} required className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp*</Label>
                <Input id="whatsapp" type="tel" placeholder="(19) 99999-9999" value={formData.whatsapp} onChange={e => setFormData({
                ...formData,
                whatsapp: e.target.value
              })} required className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentBill">Valor Atual da Conta (R$)*</Label>
                <Input id="currentBill" type="text" placeholder="Ex: 15.000" value={formData.currentBill} onChange={e => setFormData({
                ...formData,
                currentBill: e.target.value
              })} required className="h-12" />
              </div>

              <Button type="submit" className="w-full h-14 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all">
                Quero Minha Análise Gratuita
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Seus dados estão protegidos. Não compartilhamos com terceiros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;