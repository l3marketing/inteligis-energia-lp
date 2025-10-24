import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Eduardo Silva",
      role: "Diretor Industrial",
      company: "Metalúrgica São Paulo",
      location: "Campinas/SP",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      quote: "A Inteligis transformou nossa gestão de energia. Reduzimos 35% dos custos em apenas 3 meses. O suporte é excepcional e sempre disponível para esclarecer dúvidas.",
      rating: 5,
    },
    {
      name: "Marina Oliveira",
      role: "CFO",
      company: "Indústria Química Paulista",
      location: "Sumaré/SP",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina",
      quote: "Finalmente temos previsibilidade nos gastos com energia. A migração foi muito mais simples do que esperávamos e o retorno financeiro foi imediato.",
      rating: 5,
    },
    {
      name: "Roberto Mendes",
      role: "Gerente de Facilities",
      company: "Têxtil Americana",
      location: "Americana/SP",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      quote: "Excelente parceria! A economia na conta de energia nos deu fôlego para investir em outras áreas. Recomendo a Inteligis sem hesitar.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Que Nossos Clientes{" "}
            <span className="text-primary">Estão Dizendo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de empresas que transformaram seus custos de energia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 relative"
            >
              <Quote className="w-12 h-12 text-primary/20 absolute top-6 right-6" />
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full bg-muted"
                />
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-bold text-foreground">4.9/5.0</span>
            <span className="text-muted-foreground">
              • Avaliação média de 47 clientes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
