import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
const PainSection = () => {
  const pains = [{
    icon: AlertCircle,
    text: "Bandeiras tarifárias inesperadas aumentam custos sem aviso"
  }, {
    icon: TrendingUp,
    text: "Pressão nas margens de lucro devido a custos energéticos altos"
  }, {
    icon: BarChart3,
    text: "Falta de previsibilidade nos custos operacionais"
  }, {
    icon: DollarSign,
    text: "Pagando mais que seus concorrentes pela mesma energia"
  }];
  const scrollToForm = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Se Sua Conta de Energia Passa de R$ 5 mil/Mês,{" "}
              <span className="text-primary">Você Está Deixando Dinheiro na Mesa</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {pains.map((pain, index) => {
            const Icon = pain.icon;
            return <div key={index} className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <p className="text-base text-foreground font-medium leading-relaxed pt-2">
                    {pain.text}
                  </p>
                </div>;
          })}
          </div>

          <div className="text-center">
            <Button onClick={scrollToForm} size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg">
              Sim, Quero Resolver Isso Agora
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default PainSection;