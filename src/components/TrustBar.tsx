import { Shield, Award, MapPin, CheckCircle2 } from "lucide-react";

const TrustBar = () => {
  const trustItems = [
    {
      icon: Award,
      text: "Parceiro Oficial Auren – Nº 1 em Trading de Energia no Brasil",
    },
    {
      icon: CheckCircle2,
      text: "Economia Garantida em Contrato",
    },
    {
      icon: Shield,
      text: "Processo 100% Seguro e Regulamentado",
    },
    {
      icon: MapPin,
      text: "Atendimento Local em Campinas",
    },
  ];

  return (
    <section className="bg-muted/50 border-y border-border py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
