import { Button } from "@/components/ui/button";
import { FileSearch, FileText, Zap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: FileSearch,
      title: "Análise Gratuita",
      description: "Analisamos seu perfil de consumo e identificamos o potencial exato de economia",
    },
    {
      number: "02",
      icon: FileText,
      title: "Proposta Transparente",
      description: "Apresentamos uma proposta clara, com economia garantida em contrato",
    },
    {
      number: "03",
      icon: Zap,
      title: "Migração Segura",
      description: "Cuidamos de toda a burocracia. Migração completa em até 30 dias",
    },
  ];

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Migre em Apenas <span className="text-primary">3 Passos Simples</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo descomplicado e totalmente gerenciado pela nossa equipe
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connecting Line (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                  )}
                  
                  <div className="relative bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <div className="absolute -top-4 left-8 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                      {step.number}
                    </div>
                    
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mt-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-white shadow-lg"
            >
              Iniciar Minha Análise Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
