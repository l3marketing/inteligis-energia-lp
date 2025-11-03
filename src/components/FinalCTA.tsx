import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Clock, AlertCircle } from "lucide-react";
import { useTrackingFields } from "@/hooks/use-tracking";
import { toast } from "sonner";

const FinalCTA = () => {
  const [slotsLeft, setSlotsLeft] = useState(3);
  const monthName = new Date().toLocaleString('pt-BR', { month: 'long' });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    currentBill: "",
  });
  const trackingFields = useTrackingFields();

  // Simulate slot countdown (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setSlotsLeft((prev) => (prev > 1 ? prev - 1 : 3));
    }, 120000); // Change every 2 minutes for demo

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.email || !formData.whatsapp || !formData.currentBill) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    toast.success("Solicitação enviada! Entraremos em contato em breve.");
    setFormData({
      name: "",
      company: "",
      email: "",
      whatsapp: "",
      currentBill: "",
    });
  };

  // Removido: ação de abrir link do WhatsApp

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Scarcity Alert */}
          <div className="bg-destructive/20 backdrop-blur-sm border border-destructive/40 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-white mb-1">
                  Vagas Limitadas para Análise Gratuita
                </div>
                <div className="text-white/90">
                  Atendemos apenas 10 novas indústrias por mês para manter a qualidade do serviço
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/30">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-destructive" />
                <span className="font-bold text-2xl text-destructive">{slotsLeft}</span>
                <span className="text-sm">vagas restantes<br />em {monthName}</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Garanta Sua Vaga para Análise Gratuita
            </h2>
            <p className="text-xl text-white/90">
              Preencha o formulário abaixo ou entre em contato direto
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="final-name" className="text-white">Nome Completo*</Label>
                    <Input
                      id="final-name"
                      type="text"
                      placeholder="João Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 bg-white text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-company" className="text-white">Empresa*</Label>
                    <Input
                      id="final-company"
                      type="text"
                      placeholder="Sua Empresa Ltda"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="h-12 bg-white text-foreground"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="final-email" className="text-white">E-mail*</Label>
                    <Input
                      id="final-email"
                      type="email"
                      placeholder="joao@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 bg-white text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-whatsapp" className="text-white">WhatsApp*</Label>
                    <Input
                      id="final-whatsapp"
                      type="tel"
                      placeholder="(19) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required
                      className="h-12 bg-white text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="final-bill" className="text-white">Valor da Conta Atual (R$)*</Label>
                  <Input
                    id="final-bill"
                    type="text"
                    placeholder="Ex: 15.000"
                    value={formData.currentBill}
                    onChange={(e) => setFormData({ ...formData, currentBill: e.target.value })}
                    required
                    className="h-12 bg-white text-foreground"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-white shadow-lg"
                >
                  Quero Economizar Agora
                </Button>

                {/* Campos ocultos de tracking */}
                {Object.entries(trackingFields).map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={typeof value === "string" ? value : JSON.stringify(value)} />
                ))}
              </form>
            </div>

            {/* Quick Contact */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Contato Direto</h3>
                <div className="space-y-4">
                  <a href="tel:+5519995279091" className="block">
                    <Button 
                      className="w-full h-14 bg-white/20 hover:bg-white/30 text-white font-semibold gap-2 border border-white/30"
                    >
                      <Phone className="w-5 h-5" />
                      (19) 9 9527-9091
                    </Button>
                  </a>
                </div>
              </div>

              <div className="bg-accent/30 backdrop-blur-sm border border-accent/50 rounded-xl p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-foreground mb-2">47</div>
                  <div className="text-sm text-accent-foreground/80">
                    Indústrias em Campinas já confiam na Inteligis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
