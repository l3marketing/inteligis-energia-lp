import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Migrar para o Mercado Livre de Energia é seguro?",
      answer: "Sim, é 100% seguro. O Mercado Livre de Energia é regulamentado pela ANEEL e pela CCEE. A qualidade do fornecimento de energia continua a mesma, pois a distribuidora local continua responsável pela rede e manutenção. Você apenas passa a comprar energia de um fornecedor diferente, geralmente com preços mais competitivos.",
    },
    {
      question: "Posso voltar para o mercado cativo?",
      answer: "Sim, é possível retornar ao mercado cativo (distribuidora tradicional). No entanto, é necessário avisar com antecedência (geralmente 180 dias) e seguir os procedimentos regulatórios. Na prática, pouquíssimos clientes retornam, pois a economia no Mercado Livre é muito significativa.",
    },
    {
      question: "Quanto tempo leva a migração?",
      answer: "O processo de migração completo leva de 25 a 30 dias úteis, em média. Nós cuidamos de toda a burocracia: cadastro na CCEE, adesão à convenção de comercialização, modelagem de contratos e comunicação com a distribuidora. Você apenas acompanha o processo e assina os documentos necessários.",
    },
    {
      question: "Preciso fazer algum investimento inicial?",
      answer: "Não! A migração para o Mercado Livre não exige nenhum investimento em infraestrutura ou equipamentos. Você começa a economizar imediatamente após a migração ser concluída, sem custos iniciais. Os únicos custos são as taxas regulatórias normais do mercado, que já estão incluídas na nossa proposta.",
    },
    {
      question: "E se faltar energia na minha planta?",
      answer: "A continuidade do fornecimento é garantida pela distribuidora local, que continua responsável pela rede de distribuição e atendimento a emergências. O Mercado Livre não afeta em nada a confiabilidade do fornecimento. Em caso de problemas técnicos, você continua acionando a mesma distribuidora de sempre.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas <span className="text-primary">Frequentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre o Mercado Livre de Energia
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
