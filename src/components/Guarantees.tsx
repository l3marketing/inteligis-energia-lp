import { Shield, Award, HeadphonesIcon, FileCheck } from "lucide-react";

const Guarantees = () => {
  const guarantees = [
    {
      icon: Award,
      title: "Economia Média de 20%",
      description: "Média de 20% de economia observada em casos reais; os resultados podem variar conforme consumo e perfil contratual.",
    },
    {
      icon: Shield,
      title: "Garantia de Qualidade",
      description: "Mesma qualidade e confiabilidade no fornecimento de energia, regulado pela ANEEL",
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte Local Dedicado",
      description: "Equipe em Campinas disponível para atender suas dúvidas e necessidades",
    },
    {
      icon: FileCheck,
      title: "Transparência Total",
      description: "Sem letras miúdas. Contrato claro com todas as condições especificadas",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Migre com <span className="text-primary">100% de Segurança</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Garantias que protegem seu investimento e operação
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {guarantees.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-card border-2 border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-secondary/10 border border-secondary/30 px-8 py-4 rounded-xl">
              <Shield className="w-8 h-8 text-secondary" />
              <div className="text-left">
                <div className="font-bold text-lg text-foreground">
                  Garantia Inteligis de Economia Real
                </div>
                <div className="text-sm text-muted-foreground">
                  Seu investimento protegido do início ao fim
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
