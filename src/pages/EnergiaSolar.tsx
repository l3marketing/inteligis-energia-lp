import { useState } from "react";
import { Menu, X, Sun, Zap, Home, DollarSign, Shield, Clock, Star, CheckCircle, TrendingUp, Leaf, Battery, Settings, Users, Award, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight, Calculator, Lightbulb, Wind, CreditCard, BarChart3, PiggyBank, ShieldCheck, Wrench, Cloud, Snowflake, Building, Factory, Store, Quote, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Footer from "@/components/Footer";
import ServiceHeader from "@/components/ServiceHeader";

export default function EnergiaSolar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    email: "",
    tipo: "",
    valorConta: ""
  });
  const [valorContaSlider, setValorContaSlider] = useState(1000);
  const [economiaCalculada, setEconomiaCalculada] = useState(0);
  const [investimentoCalculado, setInvestimentoCalculado] = useState(0);
  const [paybackCalculado, setPaybackCalculado] = useState(0);
  const [economia25Anos, setEconomia25Anos] = useState(0);

  // Função para obter datas dinâmicas
  const getDataAtual = () => {
    const hoje = new Date();
    const mesAtual = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    
    // Data atual + 45 dias
    const data45Dias = new Date(hoje);
    data45Dias.setDate(hoje.getDate() + 45);
    const mes45Dias = data45Dias.toLocaleDateString('pt-BR', { month: 'long' });
    
    return { mesAtual, mes45Dias };
  };

  const { mesAtual, mes45Dias } = getDataAtual();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData);
    alert('Obrigado pelo interesse! Entraremos em contato em breve.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calcularEconomia = (valor: number) => {
    const economia = valor * 0.8;
    const investimento = valor * 60;
    const payback = investimento / (economia * 12);
    const economiaTotal = economia * 12 * 25;
    
    setEconomiaCalculada(economia);
    setInvestimentoCalculado(investimento);
    setPaybackCalculado(payback);
    setEconomia25Anos(economiaTotal);
  };

  const handleSliderChange = (value: number[]) => {
    setValorContaSlider(value[0]);
    calcularEconomia(value[0]);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Altura do header fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Adicionar foco para acessibilidade
      element.setAttribute('tabindex', '-1');
      element.focus();
    }
    setIsMenuOpen(false);
  };

  const cases = [
    {
      tipo: "Residencial Médio",
      antes: 680,
      depois: 136,
      sistema: "5.2 kWp",
      economia: 544,
      depoimento: "Em 4 anos o sistema se paga. Depois é lucro puro!",
      autor: "João, Jardim Santana",
      icon: Home
    },
    {
      tipo: "Residencial Alto Padrão", 
      antes: 1850,
      depois: 370,
      sistema: "10.4 kWp",
      economia: 1480,
      depoimento: "Melhor investimento que fiz. Valorizou minha casa!",
      autor: "Patricia, Alphaville",
      icon: Building
    },
    {
      tipo: "Comércio",
      antes: 4200,
      depois: 840,
      sistema: "27 kWp",
      economia: 3360,
      depoimento: "A economia paga o financiamento e ainda sobra!",
      autor: "Carlos, Centro",
      icon: Store
    },
    {
      tipo: "Empresa",
      antes: 12500,
      depois: 2500,
      sistema: "75 kWp",
      economia: 10000,
      depoimento: "ROI incrível! Reduzimos custos e ganhamos competitividade",
      autor: "Roberto, Distrito Industrial",
      icon: Factory
    }
  ];

  const etapas = [
    {
      titulo: "Sol → Painel",
      descricao: "Captação de luz solar de alta eficiência",
      icone: Sun
    },
    {
      titulo: "Painel → Inversor",
      descricao: "Conversão para energia utilizável",
      icone: Zap
    },
    {
      titulo: "Inversor → Casa",
      descricao: "Alimenta todos os equipamentos",
      icone: Home
    },
    {
      titulo: "Excedente → Créditos",
      descricao: "Sobra vira crédito para a noite",
      icone: CreditCard
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ServiceHeader />

      {/* Mobile Menu handled by ServiceHeader */}

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  +650 Sistemas Instalados em Campinas e Região
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transforme Sol em Economia: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Reduza até 80% da Sua Conta de Energia
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Sistema fotovoltaico completo com instalação profissional, garantia total e o melhor: 
                  financiamento que cabe no seu bolso
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Instalação em 15 dias
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Garantia Completa
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Financiamento Facilitado
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => scrollToSection('form')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  >
                    Fazer simulação
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Casa%20moderna%20com%20pain%C3%A9is%20solares%20reluzentes%20no%20telhado%2C%20fam%C3%ADlia%20feliz%20no%20jardim%2C%20c%C3%A9u%20azul%20com%20nuvens%2C%20ilumina%C3%A7%C3%A3o%20natural%2C%20estilo%20fotogr%C3%A1fico%20profissional&image_size=landscape_16_9" 
                alt="Casa com painéis solares"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Confiança */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">650+</div>
              <div className="text-blue-100">Projetos Realizados</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Aprovado INMETRO</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-blue-100">Anos de Garantia</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Payback</div>
              <div className="text-blue-100">Garantido</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Simulador */}
      <section id="simulador" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Veja Seu Retorno Real em Números
            </h2>
            <p className="text-xl text-gray-600">
              Descubra exatamente quanto você vai economizar
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardTitle className="text-2xl">Calculadora Interativa</CardTitle>
                <CardDescription className="text-green-100">
                  Ajuste o valor da sua conta e veja a economia instantânea
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="mb-8">
                  <Label htmlFor="valorContaSlider" className="text-lg font-semibold">
                    Valor da sua conta mensal: R$ {valorContaSlider.toLocaleString()}
                  </Label>
                  <Slider 
                    id="valorContaSlider"
                    min={500}
                    max={10000}
                    step={100}
                    value={[valorContaSlider]}
                    onValueChange={handleSliderChange}
                    className="mt-4"
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      R$ {investimentoCalculado.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Investimento estimado</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      R$ {economiaCalculada.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Economia mensal</div>
                    <div className="text-sm text-green-600 mt-1">(até 80%)</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {paybackCalculado.toFixed(1)} anos
                    </div>
                    <div className="text-gray-600 font-medium">Payback</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      R$ {economia25Anos.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Economia em 25 anos</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-4">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      Gráfico: Linha mostrando investimento vs. economia acumulada com ponto de break-even destacado
                    </span>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => scrollToSection('form')}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg"
                  >
                    Garantir Esta Economia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Confiabilidade e Diferenciação */}
      <section id="confiabilidade" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cansado de Orçamentos Sem Compromisso Com Seu Projeto?
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Sabemos que você já fez diversos orçamentos, mas não sentiu confiança em nenhuma empresa ainda...
                  </h3>
                  <p className="text-xl text-gray-600">
                    A Inteligis será seu último e definitivo orçamento. Aqui você encontra:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Transparência Total</h4>
                        <p className="text-gray-600">Mostramos marca, modelo e garantia de cada componente</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Visita Técnica Real</h4>
                        <p className="text-gray-600">Engenheiro vai até você, não vendedor disfarçado</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Projeto Sob Medida</h4>
                        <p className="text-gray-600">Dimensionamento exato, sem subdimensionar para baratear</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Contrato Claro</h4>
                        <p className="text-gray-600">Sem letras miúdas ou surpresas na instalação</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Equipe Própria</h4>
                        <p className="text-gray-600">Acompanhamento do início ao fim com os mesmos profissionais</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <Quote className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        "Depois de 5 orçamentos frustrantes, a Inteligis foi diferente. Explicaram tudo, cumpriram prazos 
                        e a economia veio exatamente como prometido"
                      </p>
                      <p className="text-blue-600 font-semibold">- Marina, Cambuí</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => scrollToSection('form')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  >
                    Fazer Minha Última Simulação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tecnologia Alemã, Instalação Brasileira, Economia Para Sempre
            </h2>
            <p className="text-xl text-gray-600">
              Processo simples e eficiente em 4 etapas
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {etapas.map((etapa, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <etapa.icone className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{etapa.titulo}</h3>
                  <p className="text-gray-600">{etapa.descricao}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Eficiência garantida por contrato</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Mesmo padrão dos fabricantes</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Você não se preocupa com nada técnico</span>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => scrollToSection('simulador')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  Simular Meu Sistema Personalizado
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Cases de Sucesso */}
      <section id="cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Clientes Que Já Produzem a Própria Energia
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de clientes Inteligis
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cases.map((case_, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-4">
                    <case_.icon className="w-8 h-8 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {case_.tipo}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{case_.sistema}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Antes:</span>
                      <span className="font-bold text-red-600 line-through">R$ {case_.antes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Depois:</span>
                      <span className="font-bold text-green-600">R$ {case_.depois.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Economia:</span>
                      <span className="font-bold text-blue-600">R$ {case_.economia.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 italic mb-2">
                      "{case_.depoimento}"
                    </p>
                    <p className="text-xs text-blue-600 font-medium">- {case_.autor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => scrollToSection('form')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              Quero Resultados Como Estes
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline do Processo */}
      <section id="processo" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Do Primeiro Contato à Energia Fluindo em 30 Dias
            </h2>
            <p className="text-xl text-gray-600">
              Processo transparente Inteligis
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Dia 1-2: Análise e Simulação</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Visitamos seu imóvel</li>
                        <li>• Projeto personalizado</li>
                        <li>• Simulação transparente</li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center relative z-10 my-4 md:my-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center relative z-10 my-4 md:my-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Dia 3-5: Aprovação</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Você analisa com calma</li>
                        <li>• Tiramos todas as dúvidas</li>
                        <li>• Facilitamos financiamento</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Dia 6-20: Preparação</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Compramos equipamentos</li>
                        <li>• Preparamos documentação</li>
                        <li>• Agendamos instalação</li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center relative z-10 my-4 md:my-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center relative z-10 my-4 md:my-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-orange-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Dia 21-30: Instalação e Ativação</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Instalação profissional</li>
                        <li>• Homologação completa</li>
                        <li>• Sistema funcionando!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mt-12">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700 font-medium text-center">
                  📌 Cuidamos de toda burocracia. Você só acompanha a economia chegando!
                </span>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => scrollToSection('form')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                Iniciar Minha Simulação
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Respostas Diretas às Suas Preocupações
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quanto custa? É muito caro?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  O sistema se paga sozinho entre 3-5 anos com a economia gerada. Temos financiamento onde a parcela 
                  fica menor que sua economia mensal. Ou seja: você lucra desde o primeiro mês!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  E se quebrar? E manutenção?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sistema com garantia de 25 anos de eficiência e 12 anos contra defeitos. Manutenção é mínima: 
                  apenas limpeza ocasional. Monitoramos remotamente 24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Funciona em dias nublados?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sim! Painéis modernos captam luz difusa. Em dias nublados gera menos, mas à noite você usa os 
                  créditos acumulados. Sistema é dimensionado para sua necessidade anual.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  E se eu mudar de casa?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  O sistema valoriza seu imóvel em até 10%. Você pode vender com ágio ou levar o sistema para nova residência.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  É confiável? E granizo?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Painéis são testados contra granizo de até 25mm a 82km/h. Mais resistentes que telhas comuns. 
                  +650 sistemas instalados sem problemas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Oferta com Urgência */}
      <section id="oferta" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Condições Especiais Este Mês Para Novos Projetos
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="text-2xl">🎯 Bônus {mesAtual}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-gray-700">Simulação técnica GRÁTIS (economia de R$ 800)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-gray-700">Monitoramento online GRÁTIS por 2 anos</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-gray-700">Primeira parcela só em 90 dias</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-gray-700">Seguro do sistema grátis no 1º ano</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Zap className="w-6 h-6 text-orange-600" />
                    <span className="text-orange-800 font-semibold">
                      ⚡ Com reajuste tarifário previsto de 8%, cada mês sem solar é dinheiro perdido
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3">
                    <Users className="w-6 h-6 text-orange-600" />
                    <span className="text-orange-800 font-semibold">
                      👷 Instalamos máximo 15 sistemas/mês para garantir qualidade
                    </span>
                  </div>
                  
                  <div className="text-center mt-4">
                    <span className="text-2xl font-bold text-red-600">
                      Restam 4 vagas para instalação em {mes45Dias}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => scrollToSection('form')}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-4 text-lg"
                  >
                    Tirar Dúvidas Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Garantias */}
      <section id="garantias" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seu Investimento 100% Protegido
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Garantia de Eficiência</h3>
                  <p className="text-gray-600 text-sm">
                    Produção conforme projetado ou ajustamos gratuitamente
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Garantia de Instalação</h3>
                  <p className="text-gray-600 text-sm">
                    Padrão fabricante com certificação INMETRO
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Garantia de Economia</h3>
                  <p className="text-gray-600 text-sm">
                    ROI conforme apresentado em contrato
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Garantia de Suporte</h3>
                  <p className="text-gray-600 text-sm">
                    Monitoramento e suporte por 25 anos
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta-final" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Junte-se a 650+ Famílias e Empresas Que Já Produzem a Própria Energia
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center">
              <div>
                <div className="text-4xl font-bold mb-2 text-yellow-300">💡</div>
                <div className="text-2xl font-bold mb-2">3.2 MWp</div>
                <div className="text-blue-100">instalados</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-green-300">💰</div>
                <div className="text-2xl font-bold mb-2">R$ 850mil</div>
                <div className="text-blue-100">economizados/mês</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-green-300">🌳</div>
                <div className="text-2xl font-bold mb-2">1.200t</div>
                <div className="text-blue-100">CO₂ evitadas/ano</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-yellow-300">⭐</div>
                <div className="text-2xl font-bold mb-2">98%</div>
                <div className="text-blue-100">satisfação</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Depoimentos em Vídeo</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-lg p-4 h-24 flex items-center justify-center">
                    <Play className="w-8 h-8" />
                  </div>
                  <p className="text-sm">Família mostrando conta antes/depois</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-lg p-4 h-24 flex items-center justify-center">
                    <Play className="w-8 h-8" />
                  </div>
                  <p className="text-sm">Empresário calculando ROI</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 rounded-lg p-4 h-24 flex items-center justify-center">
                    <Play className="w-8 h-8" />
                  </div>
                  <p className="text-sm">Instalação time-lapse</p>
                </div>
              </div>
            </div>

            <div id="form" className="bg-white rounded-2xl p-8 text-gray-900">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Fazer Minha Última e Definitiva Simulação
              </h3>
              
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome-final">Nome</Label>
                    <Input 
                      id="nome-final"
                      placeholder="Seu nome completo"
                      className="border-gray-300"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="celular-final">Celular</Label>
                    <Input 
                      id="celular-final"
                      placeholder="(00) 00000-0000"
                      className="border-gray-300"
                      value={formData.celular}
                      onChange={(e) => handleInputChange('celular', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email-final">E-mail</Label>
                  <Input 
                    id="email-final"
                    type="email"
                    placeholder="seu@email.com"
                    className="border-gray-300"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="tipo-final">Tipo</Label>
                    <Select 
                      value={formData.tipo}
                      onValueChange={(value) => handleInputChange('tipo', value)}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residencia">Residência</SelectItem>
                        <SelectItem value="comercio">Comércio</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="valor-conta-final">Valor da Conta</Label>
                    <Input 
                      id="valor-conta-final"
                      placeholder="500"
                      className="border-gray-300"
                      value={formData.valorConta}
                      onChange={(e) => handleInputChange('valorConta', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="periodo">Melhor período para contato</Label>
                    <Select>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manha">Manhã</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noite">Noite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg"
                  >
                    Fazer Minha Última e Definitiva Simulação
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Simulação sem compromisso. Se não fizer sentido, não insistimos.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}