import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import logoInteligis from "@/assets/logo-inteligis.jpg";
import { ArrowRight, Factory, Home as HomeIcon, Sun, Shield, Award, Clock, CheckCircle, Phone, Star, Zap, Target, MapPin as MapPinIcon, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [contaValue, setContaValue] = useState(1000);
  const [tipoImovel, setTipoImovel] = useState("");
  const [economiaCalculada, setEconomiaCalculada] = useState<any>(null);
  const [clientCount, setClientCount] = useState(0);
  const [economiaCount, setEconomiaCount] = useState(0);
  const [energiaCount, setEnergiaCount] = useState(0);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setClientCount(Math.floor(2000 * progress));
        setEconomiaCount(Math.floor(2.4 * progress * 10) / 10);
        setEnergiaCount(Math.floor(4.5 * progress * 10) / 10);
        if (currentStep >= steps) {
          clearInterval(timer);
          setClientCount(2000);
          setEconomiaCount(2.4);
          setEnergiaCount(4.5);
        }
      }, interval);
      return () => clearInterval(timer);
    };
    const timeout = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const services = [
    { title: "Mercado Livre de Energia", subtitle: "Indústrias e Grandes Empresas", description: "Economia de até 35% para alto consumo", path: "/mercado-livre-de-energia", color: "from-blue-500 to-blue-600", icon: Factory, economia: "35%" },
    { title: "Energia por Assinatura", subtitle: "Residências e Comércios", description: "10-25% de economia sem investimento", path: "/energia-por-assinatura", color: "from-green-500 to-green-600", icon: HomeIcon, economia: "25%" },
    { title: "Energia Solar", subtitle: "Residências e Empresas", description: "Até 80% de economia com ROI garantido", path: "/energia-solar", color: "from-yellow-500 to-yellow-600", icon: Sun, economia: "80%" },
    { title: "Filtro Capacitivo", subtitle: "Indústrias", description: "Proteção de equipamentos + 20% economia", path: "/filtros-capacitivos", color: "from-purple-500 to-purple-600", icon: Shield, economia: "20%" },
  ];

  const cases = [
    { segment: "Residencial", antes: 850, agora: 170, economia: 80, solucao: "Energia Solar", icone: HomeIcon },
    { segment: "Comercial", antes: 3200, agora: 2400, economia: 25, solucao: "Energia por Assinatura", icone: Zap },
    { segment: "Industrial", antes: 45000, agora: 29250, economia: 35, solucao: "Mercado Livre", icone: Factory },
  ];

  const calcularEconomia = () => {
    let percentual = 0;
    let solucao = "";
    if (tipoImovel === "residencia") {
      percentual = contaValue < 500 ? 15 : 70;
      solucao = contaValue < 500 ? "Energia por Assinatura" : "Energia Solar";
    } else if (tipoImovel === "comercio") {
      percentual = contaValue < 2000 ? 20 : 30;
      solucao = contaValue < 2000 ? "Energia por Assinatura" : "Mercado Livre";
    } else if (tipoImovel === "industria") {
      percentual = contaValue < 10000 ? 25 : 35;
      solucao = contaValue < 10000 ? "Mercado Livre" : "Mercado Livre + Filtro Capacitivo";
    }
    const economiaMensal = (contaValue * percentual) / 100;
    const economiaAnual = economiaMensal * 12;
    setEconomiaCalculada({ mensal: economiaMensal, anual: economiaAnual, percentual, solucao });
  };

  const scrollToId = (id: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-red-100 text-red-800 text-sm font-medium px-4 py-2">+{clientCount.toLocaleString()} Clientes Economizando</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">Reduza Até <span className="text-blue-600">80% na Conta de Energia</span> Com as Soluções Inteligis</h1>
                <p className="text-xl text-gray-600 leading-relaxed">Há mais de 5 anos transformando o consumo de energia em Campinas e região com economia real, tecnologia de ponta e atendimento humanizado</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg"><CheckCircle className="h-5 w-5 text-green-600" /><span className="text-green-700 font-semibold">Economia Garantida</span></div>
                  <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg"><Clock className="h-5 w-5 text-blue-600" /><span className="text-blue-700 font-semibold">Sem Burocracia</span></div>
                  <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg"><MapPinIcon className="h-5 w-5 text-purple-600" /><span className="text-purple-700 font-semibold">Empresa Local</span></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm"><div className="text-2xl font-bold text-blue-600">R$ {economiaCount}M+</div><div className="text-sm text-gray-600">economizados/mês</div></div>
                <div className="bg-white p-4 rounded-lg shadow-sm"><div className="text-2xl font-bold text-green-600">{energiaCount}MW+</div><div className="text-sm text-gray-600">energia limpa</div></div>
                <div className="bg-white p-4 rounded-lg shadow-sm"><div className="text-2xl font-bold text-purple-600">98%</div><div className="text-sm text-gray-600">satisfação</div></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg" onClick={() => scrollToId('contato')}>Calcular Minha Economia<ArrowRight className="ml-2 h-5 w-5" /></Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg" onClick={() => scrollToId('servicos')}>Conhecer Soluções</Button>
              </div>
              <p className="text-sm text-gray-500">Resposta em 2 minutos • Análise sem compromisso</p>
            </div>
            <div className="flex justify-center">
              <img src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Vista%20a%C3%A9rea%20de%20Campinas%20com%20pain%C3%A9is%20solares%20em%20telhados%2C%20torres%20de%20energia%20e%20ind%C3%BAstrias%2C%20c%C3%A9u%20azul%2C%20ambiente%20limpo%20e%20moderno%2C%20foto%20realista%2C%20alta%20qualidade&image_size=landscape_16_9" alt="Vista aérea de Campinas com painéis solares e infraestrutura energética" className="max-w-full h-auto rounded-2xl shadow-2xl" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-energy.jpg'; }} />
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Escolha a Solução Ideal Para Seu Perfil</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Economia inteligente adaptada ao seu consumo e necessidades</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon as any;
              return (
                <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-2" onClick={() => navigate(service.path)}>
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                          <p className="text-gray-500 text-sm">{service.subtitle}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{service.economia}</Badge>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white group-hover:bg-blue-600 transition-all duration-300" onClick={() => scrollToId('contato')}>Saiba Mais<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Inteligis: Sua Parceira em Economia de Energia</h2>
              <p className="text-lg text-gray-600 leading-relaxed">Nascemos em Campinas com uma missão clara: democratizar o acesso à economia de energia. Em 5 anos, nos tornamos referência regional em soluções energéticas, sempre priorizando transparência, tecnologia e um atendimento verdadeiramente humano.</p>
              <p className="text-lg text-gray-600 leading-relaxed">Nossa equipe de especialistas analisa cada caso individualmente, garantindo a solução mais adequada e rentável para seu perfil de consumo.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><div className="text-3xl font-bold text-blue-600">5+</div><div className="text-sm text-gray-600">anos de experiência</div></div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><div className="text-3xl font-bold text-green-600">2.000+</div><div className="text-sm text-gray-600">clientes ativos</div></div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><div className="text-3xl font-bold text-purple-600">100%</div><div className="text-sm text-gray-600">aprovação técnica</div></div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><div className="text-3xl font-bold text-orange-600">24h</div><div className="text-sm text-gray-600">resposta garantida</div></div>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => scrollToId('contato')}>Falar com Especialista</Button>
            </div>
            <div className="flex justify-center">
              <img src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Equipe%20profissional%20de%20especialistas%20em%20energia%20em%20escrit%C3%B3rio%20moderno%2C%20pessoas%20sorrindo%2C%20ambiente%20corporativo%20limpo%2C%20tecnologia%2C%20foto%20realista%2C%20alta%20qualidade&image_size=landscape_4_3" alt="Equipe Inteligis de especialistas em energia" className="max-w-full h-auto rounded-2xl shadow-2xl" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/partnership.jpg'; }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O Que Nos Torna Diferentes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Três pilares que garantem sua economia com segurança</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"><div className="flex justify-center mb-6"><div className="p-4 bg-blue-100 rounded-full"><Target className="h-8 w-8 text-blue-600" /></div></div><h3 className="text-2xl font-bold text-gray-900 mb-4">Análise Personalizada</h3><p className="text-gray-600 leading-relaxed">Cada projeto é único. Analisamos seu consumo e indicamos a melhor solução</p></div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"><div className="flex justify-center mb-6"><div className="p-4 bg-green-100 rounded-full"><MapPinIcon className="h-8 w-8 text-green-600" /></div></div><h3 className="text-2xl font-bold text-gray-900 mb-4">Atendimento Local</h3><p className="text-gray-600 leading-relaxed">Empresa campineira com atendimento presencial e time sempre disponível</p></div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"><div className="flex justify-center mb-6"><div className="p-4 bg-purple-100 rounded-full"><CheckCircle className="h-8 w-8 text-purple-600" /></div></div><h3 className="text-2xl font-bold text-gray-900 mb-4">Resultado Garantido</h3><p className="text-gray-600 leading-relaxed">Economia comprovada em contrato. Sem promessas vazias</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Da Análise à Economia em 3 Passos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simples, rápido e sem complicações</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center"><div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl font-bold text-blue-600">1</span></div><h3 className="text-xl font-bold text-gray-900 mb-4">Análise Gratuita</h3><p className="text-gray-600">Avaliamos seu consumo e identificamos oportunidades</p></div>
              <div className="hidden md:block text-gray-300"><ArrowRight className="h-8 w-8" /></div>
              <div className="flex-1 text-center"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl font-bold text-green-600">2</span></div><h3 className="text-xl font-bold text-gray-900 mb-4">Proposta Clara</h3><p className="text-gray-600">Apresentamos números reais e garantias</p></div>
              <div className="hidden md:block text-gray-300"><ArrowRight className="h-8 w-8" /></div>
              <div className="flex-1 text-center"><div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl font-bold text-purple-600">3</span></div><h3 className="text-xl font-bold text-gray-900 mb-4">Economia Imediata</h3><p className="text-gray-600">Implementamos e você começa a economizar</p></div>
            </div>
            <div className="text-center mt-12"><Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg" onClick={() => { const el = document.getElementById('calculadora'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Começar Minha Análise</Button></div>
          </div>
        </div>
      </section>

      <section id="calculadora" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Descubra Sua Economia em 30 Segundos</h2><p className="text-xl text-gray-600">Simule sua economia com base no seu perfil de consumo</p></div>
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Valor médio da conta: R$ {contaValue.toLocaleString()}</label>
                      <input type="range" min="100" max="50000" step="100" value={contaValue} onChange={(e) => setContaValue(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1"><span>R$ 100</span><span>R$ 50.000</span></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de imóvel</label>
                      <Select value={tipoImovel} onValueChange={setTipoImovel}><SelectTrigger className="w-full"><SelectValue placeholder="Selecione o tipo" /></SelectTrigger><SelectContent><SelectItem value="residencia">Residência</SelectItem><SelectItem value="comercio">Comércio</SelectItem><SelectItem value="industria">Indústria</SelectItem></SelectContent></Select>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg" onClick={calcularEconomia} disabled={!tipoImovel}>Calcular Economia</Button>
                  </div>
                  {economiaCalculada && (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Resultado da Simulação</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-gray-600">Economia mensal:</span><span className="text-2xl font-bold text-green-600">R$ {economiaCalculada.mensal.toLocaleString()}</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-600">Economia anual:</span><span className="text-2xl font-bold text-blue-600">R$ {economiaCalculada.anual.toLocaleString()}</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-600">Percentual:</span><span className="text-xl font-bold text-purple-600">{economiaCalculada.percentual}%</span></div>
                        <div className="pt-4 border-t border-gray-200"><p className="text-sm text-gray-600 mb-2">Melhor solução:</p><Badge className="bg-blue-100 text-blue-800 text-base">{economiaCalculada.solucao}</Badge></div>
                      </div>
                      <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => scrollToId('contato')}>Quero Análise Detalhada</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resultados Reais de Clientes Como Você</h2><p className="text-xl text-gray-600">Veja os números de quem já economia com a Inteligis</p></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cases.map((case_item, index) => {
              const IconComponent = case_item.icone as any;
              return (
                <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4"><div className="p-3 bg-blue-100 rounded-lg"><IconComponent className="h-6 w-6 text-blue-600" /></div><CardTitle className="text-xl text-gray-900">{case_item.segment}</CardTitle></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-gray-600">Antes:</span><span className="text-lg font-semibold text-red-600">R$ {case_item.antes.toLocaleString()}/mês</span></div>
                      <div className="flex justify-between items-center"><span className="text-gray-600">Agora:</span><span className="text-lg font-semibold text-green-600">R$ {case_item.agora.toLocaleString()}/mês</span></div>
                      <div className="flex justify-between items-center"><span className="text-gray-600">Economia:</span><Badge className="bg-green-100 text-green-800 text-lg">{case_item.economia}%</Badge></div>
                      <div className="pt-4 border-t border-gray-200"><p className="text-sm text-gray-600 mb-2">Solução:</p><Badge className="bg-blue-100 text-blue-800">{case_item.solucao}</Badge></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
                <div className="text-center mt-12"><Button variant="outline" className="border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => scrollToId('contato')}>Falar com Especialista</Button></div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-2xl font-bold text-gray-900 mb-2">Confiança e Certificações</h2><p className="text-gray-600">Empresa verificada e certificada</p></div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2"><Shield className="h-8 w-8 text-blue-600" /></div><p className="text-xs text-gray-600">ANEEL</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2"><Award className="h-8 w-8 text-green-600" /></div><p className="text-xs text-gray-600">INMETRO</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-2"><Star className="h-8 w-8 text-purple-600" /></div><p className="text-xs text-gray-600">ABNT</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-2"><Star className="h-8 w-8 text-yellow-600" /></div><p className="text-xs text-gray-600">4.8★ Google</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-2"><CheckCircle className="h-8 w-8 text-red-600" /></div><p className="text-xs text-gray-600">Empresa Verificada</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-2"><Clock className="h-8 w-8 text-indigo-600" /></div><p className="text-xs text-gray-600">5 Anos no Mercado</p></div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comece a Economizar Hoje Mesmo</h2>
            <p className="text-xl text-blue-100 mb-8">Análise gratuita • Sem compromisso • Resposta em 2 horas</p>
            <Card className="shadow-2xl border-0 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4"><Input placeholder="Seu nome completo" className="border-gray-300" required /><Input placeholder="Celular com DDD" className="border-gray-300" required /></div>
                  <Input type="email" placeholder="Seu melhor e-mail" className="border-gray-300" required />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Select required><SelectTrigger className="border-gray-300"><SelectValue placeholder="Tipo de imóvel" /></SelectTrigger><SelectContent><SelectItem value="residencia">Residência</SelectItem><SelectItem value="comercio">Comércio</SelectItem><SelectItem value="industria">Indústria</SelectItem></SelectContent></Select>
                    <Select required><SelectTrigger className="border-gray-300"><SelectValue placeholder="Solução de interesse" /></SelectTrigger><SelectContent><SelectItem value="mercado-livre">Mercado Livre</SelectItem><SelectItem value="assinatura">Energia por Assinatura</SelectItem><SelectItem value="solar">Energia Solar</SelectItem><SelectItem value="filtro">Filtro Capacitivo</SelectItem><SelectItem value="nao-sei">Não sei qual é melhor</SelectItem></SelectContent></Select>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">Solicitar Análise Gratuita</Button>
                </form>
                <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><Shield className="h-4 w-4" /><span>Dados protegidos</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>Resposta rápida</span></div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /><span>Análise sem custo</span></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => window.open('https://wa.me/5519995279091', '_blank')}><MessageCircle className="mr-2 h-4 w-4" />Falar Agora</Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-white" onClick={() => window.open('tel:+5519995279091', '_blank')}><Phone className="mr-2 h-4 w-4" />(19) 9 9527-9091</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
