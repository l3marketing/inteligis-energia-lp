import { Building2, Users, Zap, TrendingUp } from "lucide-react";
import partnershipImage from "@/assets/partnership.jpg";
const Partnership = () => {
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por Que <span className="text-primary">Inteligis?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A combinação perfeita de expertise local e força nacional
            </p>
          </div>

          {/* Partnership Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Inteligis Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Inteligis Energia</h3>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Especialista em energia com foco na Região Metropolitana de Campinas, oferecendo:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Atendimento personalizado e consultivo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Conhecimento profundo do mercado local</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Suporte dedicado em todas as etapas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Auren Card */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Auren e Cemig</h3>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Maior trader independente de energia do Brasil, garantindo:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Maior poder de negociação do mercado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Segurança financeira e operacional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Gestão de riscos especializada</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,5 GW</div>
              <div className="text-sm text-muted-foreground">Energia Comercializada</div>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1.000+</div>
              <div className="text-sm text-muted-foreground">Clientes Ativos</div>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15 Anos</div>
              <div className="text-sm text-muted-foreground">de Experiência</div>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Nº 1</div>
              <div className="text-sm text-muted-foreground">Trader Independente</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Partnership;