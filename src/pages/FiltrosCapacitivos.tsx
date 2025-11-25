import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Shield, Zap, Settings, Users, Award, Clock, TrendingUp, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import ServiceHeader from "@/components/ServiceHeader";

const FiltrosCapacitivos = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    email: "",
    tipo: "",
    valorConta: "",
    problema: ""
  });
  const [vagasRestantes, setVagasRestantes] = useState(3);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    alert("Obrigado pelo interesse! Nosso engenheiro entrará em contato em breve.");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ServiceHeader />

      {/* Mobile Menu handled by ServiceHeader */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 pt-20 pb-8 md:pb-12 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-8 self-center">
              <div className="space-y-4">
                <Badge className="bg-red-100 text-red-800 text-sm font-medium">
                  +135 Indústrias Protegidas
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Reduza Queimas de Motores e Economize até{" "}
                  <span className="text-blue-600">20% na Energia Industrial</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Filtro Capacitivo: tecnologia alemã que protege equipamentos e estabiliza sua rede elétrica
                </p>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 font-semibold">Garantia 10 Anos • Análise Gratuita</span>
                </div>
              </div>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">Solicite sua Análise Gratuita</CardTitle>
                  <CardDescription className="text-gray-600">
                    Engenheiro analisa sua rede sem compromisso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={(e) => handleInputChange("nome", e.target.value)}
                        className="bg-white border-gray-200"
                        required
                      />
                      <Input
                        placeholder="Celular com DDD"
                        value={formData.celular}
                        onChange={(e) => handleInputChange("celular", e.target.value)}
                        className="bg-white border-gray-200"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white border-gray-200"
                        required
                      />
                      <Select value={formData.tipo} onValueChange={(v) => handleInputChange("tipo", v)}>
                        <SelectTrigger className="bg-white border-gray-200">
                          <SelectValue placeholder="Tipo: Indústria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Metalúrgica">Metalúrgica</SelectItem>
                          <SelectItem value="Plásticos">Plásticos</SelectItem>
                          <SelectItem value="Alimentícia">Alimentícia</SelectItem>
                          <SelectItem value="Têxtil">Têxtil</SelectItem>
                          <SelectItem value="Outra">Outra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="Valor da conta de energia (R$)"
                      value={formData.valorConta}
                      onChange={(e) => handleInputChange("valorConta", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                    >
                      Solicitar Análise Gratuita
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center items-end h-full self-end">
              <img 
                src="/filtro-capacitivo.png"
                alt="Painel elétrico industrial moderno com filtro capacitivo instalado"
                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Identificação do Problema */}
      <section id="servicos" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sua Indústria Sofre Com Isso?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { icon: "🔥", title: "Motores queimam frequentemente" },
              { icon: "⚡", title: "Paradas inexplicáveis na produção" },
              { icon: "🔧", title: "Manutenção excessiva" },
              { icon: "💸", title: "Conta de energia muito alta" },
              { icon: "⚠️", title: "Equipamentos com vida útil reduzida" },
              { icon: "📊", title: "Variações que afetam qualidade" }
            ].map((problema, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{problema.icon}</div>
                    <span className="text-gray-700 font-medium">{problema.title}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-red-800 mb-4">
              A causa: Harmônicas invisíveis na rede elétrica destroem seus equipamentos 24h/dia
            </h3>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Descobrir Se Tenho Este Problema
            </Button>
          </div>
        </div>
      </section>

      {/* Solução Simples e Visual */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como o Filtro Capacitivo Resolve
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                icone: <Settings className="h-12 w-12 text-blue-600" />,
                titulo: "1. Detecta",
                descricao: "Identifica distorções e harmônicas"
              },
              {
                icone: <Shield className="h-12 w-12 text-green-600" />,
                titulo: "2. Filtra",
                descricao: "Limpa a energia em tempo real"
              },
              {
                icone: <Zap className="h-12 w-12 text-purple-600" />,
                titulo: "3. Protege",
                descricao: "Equipamentos duram mais e consomem menos"
              }
            ].map((passo, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {passo.icone}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{passo.titulo}</h3>
                  <p className="text-gray-600">{passo.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { titulo: "Até 20% economia", descricao: "na conta", icone: <TrendingUp className="h-6 w-6 text-green-600" /> },
              { titulo: "60% menos", descricao: "manutenção", icone: <Settings className="h-6 w-6 text-blue-600" /> },
              { titulo: "Proteção contra", descricao: "queimas", icone: <Shield className="h-6 w-6 text-red-600" /> },
              { titulo: "ROI em", descricao: "12 meses", icone: <Clock className="h-6 w-6 text-purple-600" /> }
            ].map((beneficio, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center border border-gray-200">
                <div className="flex justify-center mb-2">
                  {beneficio.icone}
                </div>
                <h4 className="font-bold text-gray-900">{beneficio.titulo}</h4>
                <p className="text-gray-600 text-sm">{beneficio.descricao}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Quero Esta Proteção
            </Button>
          </div>
        </div>
      </section>

      {/* Cases Reais de Transformação */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Que Falam Por Si
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <div className="mb-4">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">Metalúrgica em Campinas</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Parou de queimar motor!</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Antes:</span>
                    <span className="font-semibold text-red-600">3 motores queimados/mês</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Depois:</span>
                    <span className="font-semibold text-green-600">Zero queimas em 8 meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economia:</span>
                    <span className="font-bold text-green-700">R$ 4.200/mês</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-8">
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-800 mb-2">Indústria de Plásticos</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Produção estável finalmente!</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Antes:</span>
                    <span className="font-semibold text-red-600">Paradas constantes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Depois:</span>
                    <span className="font-semibold text-green-600">95% redução em paradas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economia:</span>
                    <span className="font-bold text-green-700">18% na conta</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Ver Análise Para Minha Indústria
            </Button>
          </div>
        </div>
      </section>

      {/* Processo Transparente */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simples e Sem Interrupção
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                dia: "Dia 1-3",
                titulo: "Análise gratuita",
                descricao: "Análise gratuita com relatório",
                icone: <Settings className="h-8 w-8 text-blue-600" />
              },
              {
                dia: "Dia 4-7",
                titulo: "Proposta",
                descricao: "Proposta e garantias",
                icone: <Shield className="h-8 w-8 text-green-600" />
              },
              {
                dia: "Dia 15-20",
                titulo: "Instalação",
                descricao: "Instalação sem parar produção",
                icone: <Zap className="h-8 w-8 text-purple-600" />
              },
              {
                dia: "Contínuo",
                titulo: "Monitoramento",
                descricao: "Monitoramento de resultados",
                icone: <TrendingUp className="h-8 w-8 text-orange-600" />
              }
            ].map((etapa, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
                  <div className="text-sm font-bold text-blue-600 mb-2">{etapa.dia}</div>
                  <div className="flex justify-center mb-3">
                    {etapa.icone}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{etapa.titulo}</h3>
                  <p className="text-gray-600 text-sm">{etapa.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Começar Análise Gratuita
            </Button>
          </div>
        </div>
      </section>

      {/* Garantias Poderosas */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vantagens
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { titulo: "10 Anos", subtitulo: "Garantia", descricao: "Proteção total do investimento", icone: <Shield className="h-8 w-8 text-blue-600" /> },
              { titulo: "Análise", subtitulo: "Grátis", descricao: "Diagnóstico sem compromisso", icone: <Settings className="h-8 w-8 text-green-600" /> },
              { titulo: "Sem Parar", subtitulo: "Produção", descricao: "Instalação em paralelo", icone: <Clock className="h-8 w-8 text-purple-600" /> },
              { titulo: "Resultado", subtitulo: "Garantido", descricao: "ROI em contrato", icone: <Award className="h-8 w-8 text-orange-600" /> }
            ].map((garantia, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {garantia.icone}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{garantia.titulo}</h3>
                  <p className="font-semibold text-gray-700 mb-2">{garantia.subtitulo}</p>
                  <p className="text-gray-600 text-sm">{garantia.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Essencial */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  pergunta: "É diferente de banco de capacitores?",
                  resposta: "Sim! Banco corrige fator de potência. Filtro protege contra harmônicas - problemas diferentes."
                },
                {
                  pergunta: "Preciso mesmo disso?",
                  resposta: "Se sua conta passa de R$ 5.000 e tem motores/equipamentos, provavelmente sim. A análise gratuita confirma."
                },
                {
                  pergunta: "Qual o investimento?",
                  resposta: "Depende da análise. Mas o ROI médio é 12 meses com economia + redução de queimas."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-left font-medium text-gray-900">{faq.pergunta}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="form" className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Cada Dia Sem Proteção é Risco de Prejuízo
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">⚡ Riscos Diários:</h3>
                <ul className="space-y-2 text-left">
                  <li>• Próxima queima: R$ 5.000 a R$ 50.000</li>
                  <li>• Parada produção: R$ 10.000/hora</li>
                  <li>• Desperdício energia: R$ 1.000 a R$ 5.000/mês</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">✅ Com Filtro Capacitivo:</h3>
                <ul className="space-y-2 text-left">
                  <li>• Proteção imediata</li>
                  <li>• Economia desde o 1º mês</li>
                  <li>• Tranquilidade por 10 anos</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-400 text-yellow-900 rounded-lg p-4 mb-8">
              <div className="text-xl font-bold">🎯 Análise GRATUITA para 10 indústrias este mês</div>
              <div className="text-lg font-semibold">Restam {vagasRestantes} vagas</div>
            </div>
            
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                    <Input
                      placeholder="Celular com DDD"
                      value={formData.celular}
                      onChange={(e) => handleInputChange("celular", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                    <Select value={formData.tipo} onValueChange={(v) => handleInputChange("tipo", v)}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Tipo: Indústria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Metalúrgica">Metalúrgica</SelectItem>
                        <SelectItem value="Plásticos">Plásticos</SelectItem>
                        <SelectItem value="Alimentícia">Alimentícia</SelectItem>
                        <SelectItem value="Têxtil">Têxtil</SelectItem>
                        <SelectItem value="Outra">Outra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Valor da conta de energia (R$)"
                      value={formData.valorConta}
                      onChange={(e) => handleInputChange("valorConta", e.target.value)}
                      className="bg-white border-gray-200"
                      required
                    />
                    <Select value={formData.problema} onValueChange={(v) => handleInputChange("problema", v)}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Principal Problema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Motores queimando">Motores queimando</SelectItem>
                        <SelectItem value="Paradas constantes">Paradas constantes</SelectItem>
                        <SelectItem value="Conta alta">Conta alta</SelectItem>
                        <SelectItem value="Manutenção excessiva">Manutenção excessiva</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg"
                  >
                    Garantir Análise Gratuita Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FiltrosCapacitivos;