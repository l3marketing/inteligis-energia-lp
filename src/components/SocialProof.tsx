import { Button } from "@/components/ui/button";
import { Quote, TrendingUp, Factory, Beaker, Shirt } from "lucide-react";

const SocialProof = () => {
  const cases = [
    {
      icon: Factory,
      sector: "Metalurgia",
      savings: "R$ 18.000",
      percentage: "32%",
      migrationTime: "28 dias",
      quote: "A economia superou nossas expectativas. Processo profissional do início ao fim.",
      company: "Indústria Metalúrgica - Campinas/SP",
    },
    {
      icon: Beaker,
      sector: "Química",
      savings: "R$ 24.500",
      percentage: "38%",
      migrationTime: "25 dias",
      quote: "Finalmente conseguimos previsibilidade nos custos de energia. Excelente suporte.",
      company: "Química Industrial - Sumaré/SP",
    },
    {
      icon: Shirt,
      sector: "Têxtil",
      savings: "R$ 12.300",
      percentage: "29%",
      migrationTime: "30 dias",
      quote: "A migração foi muito mais simples do que imaginávamos. Recomendamos!",
      company: "Têxtil - Americana/SP",
    },
  ];

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Empresas de Campinas Já Estão{" "}
            <span className="text-secondary">Economizando Todo Mês</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja resultados reais de indústrias que fizeram a migração
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{item.sector}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-3xl font-bold text-secondary">{item.savings}</div>
                      <div className="text-sm text-muted-foreground">economizados por mês</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-muted/50 rounded-lg p-4">
                    <div>
                      <div className="text-2xl font-bold text-foreground">{item.percentage}</div>
                      <div className="text-xs text-muted-foreground">redução</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{item.migrationTime}</div>
                      <div className="text-xs text-muted-foreground">migração</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed pl-6">
                    "{item.quote}"
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
            className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            Quero Resultados Como Estes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
