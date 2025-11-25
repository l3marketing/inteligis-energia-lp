import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Zap, Shield, TrendingUp, Clock, Users, Star, ArrowRight, Calculator, Lightbulb, Battery, Home, Building, Menu, X, Store } from "lucide-react";
import Footer from "@/components/Footer";
import ServiceHeader from "@/components/ServiceHeader";
import savingsIllustration from "@/assets/savings-illustration.jpg";

const EnergiaPorAssinatura = () => {
  const [formData, setFormData] = useState({ name: "", category: "", whatsapp: "", email: "", bill: "" });
  const [monthlyValue, setMonthlyValue] = useState("");
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSavings = () => {
    const value = parseFloat(monthlyValue.replace(/[^0-9,]/g, "").replace(",", "."));
    if (value && value > 0) {
      const annualSavings = value * 12 * 0.25; // 25% de economia
      setCalculationResult(annualSavings);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <ServiceHeader />

      
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 pt-12 md:pt-16 pb-0">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-8 self-center">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 text-sm font-medium">
                  Economia Garantida
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Economize até{" "}
                  <span className="text-blue-600">25% na Conta de Luz</span>{" "}
                  Sem Investir em Painéis Solares
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Energia limpa por assinatura. Sem instalação, sem manutenção, sem complicação. 
                  Economia imediata com garantia de 5 anos.
                </p>
                <p className="text-xl font-bold text-green-700">
                  100% online, sem investimentos e sem painéis solares
                </p>
              </div>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">Quero Economizar na Conta de Luz</CardTitle>
                  <CardDescription className="text-gray-600">
                    Calcule sua economia agora!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    type="button" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                    asChild
                  >
                    <a href="#form">Quero economizar na conta de Luz</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center items-end h-full self-end">
              <img 
                src="/bg-assinatura.webp"
                alt="Pessoa sorrindo ao ver economia no celular"
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      

      {/* Trust Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Economia Garantida</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Contratação rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Sem Investimento Inicial</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">+500 Empresas Atendidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section id="situations" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Você se Identifica com Alguma dessas Situações?
            </h2>
            <p className="text-lg text-gray-600">
              Se sim, a Energia por Assinatura é perfeita para sua empresa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Conta de luz aumentando todo mês sem controle",
              "Quer economizar mas não quer investir em painéis solares",
              "Preocupado com manutenção e complexidade de sistemas",
              "Não tem tempo para gerenciar instalações",
              "Quer previsibilidade nos custos de energia",
              "Precisa de uma solução rápida e sem burocracia"
            ].map((point, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-700 font-medium">{point}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona a Energia por Assinatura?
            </h2>
            <p className="text-lg text-gray-600">
              Simples, rápido e sem complicações
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Calculator className="h-12 w-12 text-blue-600" />,
                title: "1. Simule sua Economia",
                description: "Use nossa calculadora para descobrir quanto você pode economizar. Leva apenas 1 minuto."
              },
              {
                icon: <Lightbulb className="h-12 w-12 text-green-600" />,
                title: "2. Assine e Economize",
                description: "Escolha seu plano e comece a economizar em até 30 dias. Sem instalação complicada."
              },
              {
                icon: <Battery className="h-12 w-12 text-purple-600" />,
                title: "3. Energia Garantida",
                description: "Receba energia limpa com economia garantida por 5 anos. A gente cuida de tudo."
              }
            ].map((step, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section (moved) */}
      <div id="contato" />
      <section id="form" className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Solicite sua análise gratuita
              </h2>
              <p className="text-lg text-gray-600">
                Preencha o formulário para iniciarmos sua economia
              </p>
            </div>
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                    <Select value={formData.category} onValueChange={(v) => handleInputChange("category", v)}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Selecione: Residência, Comércio ou Empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residência">Residência</SelectItem>
                        <SelectItem value="Comércio">Comércio</SelectItem>
                        <SelectItem value="Empresa">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="WhatsApp com DDD"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Valor da sua conta de energia (R$)"
                      value={formData.bill}
                      onChange={(e) => handleInputChange("bill", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  >
                    Quero Economizar até 25% na Conta de Luz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quem pode assinar? */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quem pode assinar?</h2>
            <p className="text-lg text-gray-600">Categorias elegíveis no Grupo B (baixa tensão)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Home className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Residencial</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Store className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Comercial</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Building className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Empresarial</h3>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-5"
              asChild
            >
              <a href="#form">Quero assinar agora</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quem já economiza com a Inteligis
            </h2>
            <p className="text-lg text-gray-600">
              Conheça casos reais que reduziram seus custos de energia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                company: "Residência no Cambuí",
                location: "Campinas, SP",
                savings: "R$ 1.800/ano",
                testimonial: "Economia de 15% sem obras ou investimento. Processo simples e rápido.",
                icon: <Home className="h-5 w-5 text-blue-600" />
              },
              {
                company: "Supermercados Silva",
                location: "Campinas, SP",
                savings: "R$ 28.000/ano",
                testimonial: "Solução perfeita para nossa cadeia de lojas.",
                icon: <Building className="h-5 w-5 text-blue-600" />
              },
              {
                company: "Residência em Pq. Universitário",
                location: "Americana, SP",
                savings: "R$ 1.500/ano",
                testimonial: "Conta ficou previsível e mais barata com a assinatura de energia.",
                icon: <Home className="h-5 w-5 text-blue-600" />
              },
              {
                company: "Clínica Médica Santos",
                location: "São Paulo, SP",
                savings: "R$ 12.000/ano",
                testimonial: "Simples, rápido e eficiente. Estamos muito satisfeitos.",
                icon: <Building className="h-5 w-5 text-blue-600" />
              }
            ].map((case_, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {case_.icon}
                    <span className="font-semibold text-gray-900">{case_.company}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{case_.location}</div>
                  <div className="text-lg font-bold text-green-600 mb-3">{case_.savings}</div>
                  <div className="text-sm text-gray-700 italic">"{case_.testimonial}"</div>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-gray-600">
                Tire suas dúvidas sobre a Energia por Assinatura
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Como é possível economizar sem instalar painéis solares?",
                  answer: "Através de usinas solares compartilhadas. Você assina um plano de energia limpa e recebe os benefícios econômicos sem precisar instalar nada em seu estabelecimento."
                },
                {
                  question: "Qual é o prazo para começar a economizar?",
                  answer: "Em até 30 dias após a assinatura do contrato. O processo é rápido e não reobra em sua empresa."
                },
                {
                  question: "Existe algum investimento inicial?",
                  answer: "Zero investimento, é uma assinatura com desconto de energia"
                },
                {
                  question: "Como funciona a garantia de economia?",
                  answer: "A economia é negociada na hora da assinatura do contrato e varia entre 8% e 25%."
                },
                {
                  question: "Posso cancelar a assinatura quando quiser?",
                  answer: "Sim! O contrato tem flexibilidade e você pode cancelar conforme os termos estabelecidos, sem multas abusivas."
                },
                {
                  question: "A energia continua vindo da mesma forma?",
                  answer: "Sim! Sua empresa ou residência continua recebendo energia normalmente pela rede elétrica. A diferença está na origem limpa e no desconto aplicado."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-left font-medium text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Escolher a Inteligis?
            </h2>
            <p className="text-lg text-gray-600">
              Diferenciais que fazem a diferença na sua economia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Zap className="h-10 w-10 text-yellow-500" />,
                title: "Economia Rápida",
                description: "Comece a economizar em até 30 dias sem investimento inicial"
              },
              {
                icon: <Shield className="h-10 w-10 text-green-500" />,
                title: "Contrato Flexível",
                description: "Você escolhe o tempo de contrato"
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
                title: "Tecnologia Avançada",
                description: "Usamos as melhores usinas solares do mercado"
              },
              {
                icon: <Clock className="h-10 w-10 text-purple-500" />,
                title: "Sem Burocracia",
                description: "Processo simples e rápido, sem complicações"
              },
              {
                icon: <Users className="h-10 w-10 text-orange-500" />,
                title: "Atendimento Personalizado",
                description: "Equipe especializada para cuidar do seu negócio"
              },
              {
                icon: <Home className="h-10 w-10 text-red-500" />,
                title: "Energia Limpa",
                description: "Contribua com o meio ambiente usando energia renovável"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="bg-gradient-to-r from-[#3D98FF] via-[#6B46C1] to-[#8E32D9] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <Badge className="bg-white/20 text-white border-0 mb-4">
                Oferta por Tempo Limitado
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Garanta sua Economia de Energia Agora
              </h2>
              <p className="text-xl opacity-90">
                As primeiras 50 empresas garantem condições especiais de assinatura
              </p>
            </div>
            
            <div className="mb-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold">877 clientes já estão economizando</div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8 py-4"
              asChild
            >
              <a href="#form">
                Quero Garantir Minha Economia
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default EnergiaPorAssinatura;