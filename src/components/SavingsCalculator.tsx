import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { addLead } from "@/lib/leads";
// Removida imagem decorativa de fundo para melhorar legibilidade

const SavingsCalculator = () => {
  const [currentBill, setCurrentBill] = useState("");
  const [sector, setSector] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadWhatsapp, setLeadWhatsapp] = useState("");

  const calculateSavings = () => {
    if (!currentBill) {
      toast.error("Por favor, insira o valor da sua conta");
      return;
    }

    const billValue = parseFloat(currentBill.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (isNaN(billValue) || billValue < 5000) {
      toast.error("O valor deve ser de pelo menos R$ 5.000");
      return;
    }

    // Cálculo de economia baseado no setor (20% a 40%)
    const savingsPercentage = sector === "metalurgia" ? 0.35 : sector === "quimica" ? 0.32 : 0.28;
    const monthlySavings = billValue * savingsPercentage;

    setResult(monthlySavings);
    setShowLeadCapture(true);
  };

  const handleSendReport = () => {
    if (!leadName || !leadCompany || !leadWhatsapp || !email) {
      toast.error("Por favor, preencha Nome, Empresa, WhatsApp e E-mail");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    // Salvar lead no store (MVP)
    const billValue = parseFloat(currentBill.replace(/[^\d,]/g, '').replace(',', '.'));
    const saved = addLead({
      name: leadName,
      company: leadCompany,
      whatsapp: leadWhatsapp,
      email,
      billValue: isNaN(billValue) ? undefined : billValue,
      sector,
      estimatedMonthlySavings: result ?? undefined,
      origin: "calculator",
    });

    toast.success("Lead salvo e relatório enviado!");
    setLeadName("");
    setLeadCompany("");
    setLeadWhatsapp("");
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Decorative Image removida */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Calculator className="w-6 h-6 text-accent" />
              <span className="font-semibold">Calculadora de Economia</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calcule Quanto Sua Empresa Pode Economizar
            </h2>
            <p className="text-xl text-white/90">
              Descubra em segundos seu potencial de redução de custos
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/20">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="calc-bill" className="text-white">
                  Valor Atual da Conta (R$)
                </Label>
                <Input
                  id="calc-bill"
                  type="text"
                  placeholder="Ex: 15.000"
                  value={currentBill}
                  onChange={(e) => setCurrentBill(e.target.value)}
                  className="h-12 bg-white text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calc-sector" className="text-white">
                  Setor Industrial
                </Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger id="calc-sector" className="h-12 bg-white text-foreground">
                    <SelectValue placeholder="Selecione seu setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metalurgia">Metalurgia</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                    <SelectItem value="textil">Têxtil</SelectItem>
                    <SelectItem value="alimentos">Alimentos e Bebidas</SelectItem>
                    <SelectItem value="automotiva">Automotiva</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={calculateSavings}
              className="w-full md:w-auto h-14 px-8 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-white"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcular Economia
            </Button>

            {result !== null && (
              <div className="mt-8 pt-8 border-t border-white/20 space-y-6">
                <div className="bg-secondary/20 backdrop-blur-sm rounded-xl p-6 border border-secondary/30">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    <span className="text-lg font-medium text-white/90">
                      Economia Estimada:
                    </span>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-lg text-white/80">por mês no Mercado Livre de Energia</p>
                </div>

                {showLeadCapture && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold mb-4">
                      Receba um Relatório Detalhado
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="lead-name" className="text-white">Nome Completo</Label>
                        <Input
                          id="lead-name"
                          type="text"
                          placeholder="João Silva"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="h-12 bg-white text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lead-company" className="text-white">Nome da Empresa</Label>
                        <Input
                          id="lead-company"
                          type="text"
                          placeholder="Sua Empresa Ltda"
                          value={leadCompany}
                          onChange={(e) => setLeadCompany(e.target.value)}
                          className="h-12 bg-white text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lead-whatsapp" className="text-white">WhatsApp</Label>
                        <Input
                          id="lead-whatsapp"
                          type="tel"
                          placeholder="(19) 99999-9999"
                          value={leadWhatsapp}
                          onChange={(e) => setLeadWhatsapp(e.target.value)}
                          className="h-12 bg-white text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lead-email" className="text-white">E-mail</Label>
                        <Input
                          id="lead-email"
                          type="email"
                          placeholder="seu.email@empresa.com.br"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 bg-white text-foreground"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSendReport}
                        className="h-12 px-6 bg-secondary hover:bg-secondary/90 text-white font-semibold whitespace-nowrap"
                      >
                        Enviar Relatório
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
