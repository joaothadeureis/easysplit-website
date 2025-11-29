import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, ChevronDown, ChevronUp, Layout, DollarSign, TrendingUp, Zap, ShoppingCart, UserCheck, Briefcase, PlayCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { DashboardMockup } from '../components/DashboardMockup';
import { FAQS, PLANS } from '../constants';

// Animated words for the hero
const ROTATING_WORDS = ['CONVERSÕES', 'VENDAS', 'CAPTAÇÕES', 'RESULTADOS'];

export const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Rotate words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark overflow-x-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-44 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Moving gradient orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/30 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/20 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[200px] animate-spin-slow"></div>
          
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-[0.03] animate-grid-move"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-brand-yellow/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/95 to-brand-dark"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-brand-yellow/30 bg-brand-yellow/5 backdrop-blur-md text-brand-yellow text-xs font-bold tracking-widest uppercase animate-fade-in-up group hover:bg-brand-yellow/10 transition-all cursor-default">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Teste A/B de Página</span>
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
          </div>
          
          {/* Animated headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tight">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>AUMENTE SUAS</span>{' '}
            <span 
              className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-yellow-400 to-brand-yellow bg-[length:200%_auto] animate-gradient-x transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {ROTATING_WORDS[currentWordIndex]}
            </span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              SEM GASTAR UMA FORTUNA.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Com o <strong className="text-white font-bold">EasySplit</strong>, você roda testes A/B no WordPress de forma fácil, rápida e acessível — <span className="text-brand-yellow/80">sem complicação e sem mensalidades abusivas.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <Link to="/pricing">
                <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-brand-yellow/20 hover:scale-105 transition-transform">Quero o EasySplit Agora</Button>
            </Link>
            <Link to="/funcionalidades">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105 transition-transform">Ver como funciona</Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
             <CheckCircle2 size={16} className="text-brand-purple" />
             <span>Instale, escolha as variantes e acompanhe métricas.</span>
          </div>

          <div className="relative mx-auto max-w-5xl animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
             <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow via-brand-purple to-brand-yellow opacity-30 blur-2xl rounded-2xl animate-gradient-x bg-[length:200%_auto]"></div>
             <DashboardMockup />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-brand-yellow rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
         {/* Background Texture */}
         <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
            <img 
               src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=3000&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale" 
               alt="Background Texture"
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark z-0"></div>
         <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-[0.03] z-0"></div>

         <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h3 className="text-brand-purple font-bold uppercase tracking-widest mb-3 text-xs">O Problema</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10">
                FERRAMENTAS CARAS E COMPLEXAS <br/> <span className="text-neutral-500">NÃO DEIXAM VOCÊ TESTAR DE VERDADE</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
                {[
                    { text: "Caríssimas, cobrando em dólar e com mensalidades abusivas", icon: <DollarSign className="text-red-500" /> },
                    { text: "Complexas de configurar, exigindo tempo e conhecimento técnico", icon: <Layout className="text-red-500" /> },
                    { text: "Cheias de redirecionamentos que atrapalham SEO e campanhas", icon: <TrendingUp className="text-red-500" /> }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/5 hover:border-red-500/30 transition-colors group shadow-lg">
                         <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {item.icon}
                         </div>
                        <p className="text-neutral-300 font-medium leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
            <div className="mt-12 inline-block px-8 py-4 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-sm">
                <p className="text-white font-medium">Resultado? <span className="text-red-400">A maioria não consegue rodar testes de verdade.</span></p>
            </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/40"></div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div>
                <h3 className="text-brand-yellow font-bold uppercase tracking-widest mb-3 text-xs flex items-center gap-2">
                   <span className="w-8 h-[2px] bg-brand-yellow"></span> A Solução
                </h3>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                    TESTES A/B SIMPLES, <br/>
                    <span className="text-brand-purple">ACESSÍVEIS E SEM COMPLICAÇÃO.</span>
                </h2>
                <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                    O EasySplit muda isso. Um plugin de A/B/n Testing feito para ser acessível e prático.
                </p>
                
                <div className="space-y-6 mb-10">
                    {[
                        "Funciona direto no WordPress",
                        "Configuração por shortcode simples",
                        "Experiência original preservada",
                        "Seguro para SEO e compatível com Ads"
                    ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-purple/50 transition-colors backdrop-blur-sm">
                            <div className="bg-brand-purple/20 p-2 rounded-full">
                                <CheckCircle2 className="text-brand-purple" size={18} />
                            </div>
                            <span className="text-neutral-200 font-medium">{feat}</span>
                        </div>
                    ))}
                </div>
                
                <p className="text-sm text-brand-yellow font-bold flex items-center gap-2">
                    <Zap size={16} /> Em menos de 5 minutos você pode ter seu primeiro teste rodando.
                </p>
            </div>
            
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-purple to-brand-yellow opacity-20 blur-3xl rounded-full"></div>
                <div className="relative bg-[#111]/90 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-6">Por que ele é diferente?</h3>
                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        Sem redirecionamentos ou iframes improvisados. O EasySplit injeta cada variante na mesma URL, mantendo performance e rastreamento intactos.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-neutral-800 text-neutral-300 text-sm border border-neutral-700">Landing Pages</span>
                        <span className="px-4 py-2 rounded-full bg-neutral-800 text-neutral-300 text-sm border border-neutral-700">Checkouts</span>
                        <span className="px-4 py-2 rounded-full bg-neutral-800 text-neutral-300 text-sm border border-neutral-700">Funis</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Video / How to Use Section */}
      <section className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-color-dodge"></div>
          
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <h3 className="text-brand-yellow font-bold uppercase tracking-widest mb-3 text-xs">Como Usar?</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">VEJA O EASYSPLIT EM AÇÃO</h2>
            <p className="text-neutral-400 mb-12 max-w-2xl mx-auto text-lg">
                Entenda como configurar um teste real em minutos. Assista ao vídeo demonstrativo abaixo.
            </p>
            
            {/* Video Placeholder */}
            <div className="relative aspect-video w-full bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group mb-12">
                <div className="absolute inset-0 bg-brand-purple/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/wdTEqxcQ7H8" 
                    title="EasySplit Demo Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="relative z-0"
                ></iframe>
            </div>

            <Link to="/pricing">
                <Button size="lg" variant="glow" className="uppercase px-12">Quero o EasySplit Agora</Button>
            </Link>
          </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-brand-dark relative">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-20 text-center">COMO FUNCIONA</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
                {[
                    { title: 'Passo 1', subtitle: 'Escolha suas páginas', desc: 'Selecione as versões que você quer comparar (WordPress, Elementor ou até HTML).' },
                    { title: 'Passo 2', subtitle: 'Defina o tráfego', desc: 'Escolha o peso: quantos % dos visitantes vão para cada versão da página.' },
                    { title: 'Passo 3', subtitle: 'EasySplit divide', desc: 'Cada visitante vê apenas uma versão, sempre a mesma até o fim do teste.' },
                    { title: 'Passo 4', subtitle: 'Acompanhe', desc: 'Veja seus dados diretamente no Google Analytics 4 e no Microsoft Clarity.' },
                ].map((step, i) => (
                    <div key={i} className="relative bg-neutral-900/40 p-8 rounded-2xl border border-white/5 hover:border-brand-yellow/50 transition-all group hover:-translate-y-2">
                        <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-dark border-2 border-brand-yellow rounded-xl flex items-center justify-center text-brand-yellow font-black text-xl shadow-lg z-10 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                            {i + 1}
                        </div>
                        <h4 className="mt-4 text-brand-yellow font-bold uppercase text-xs mb-2 tracking-wide">{step.title}</h4>
                        <h3 className="text-xl font-bold text-white mb-3">{step.subtitle}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
         {/* Background Texture */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-fixed opacity-[0.05]"></div>
         
         {/* Background Splashes */}
         <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px]"></div>

         <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h3 className="text-brand-purple font-bold uppercase tracking-widest mb-3 text-xs">Métricas</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
                DESCUBRA EM POUCOS CLIQUES <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">QUAL VERSÃO REALMENTE CONVERTE.</span>
            </h2>
            <p className="text-neutral-400 mb-20 max-w-2xl mx-auto text-lg">
                Sem configurações complexas. Dados enviados automaticamente.
            </p>

            <div className="grid md:grid-cols-2 gap-10 text-left">
                {/* Analytics Block */}
                <div className="bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 hover:border-orange-500/50 transition-colors group">
                    <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-4">
                            <img src="https://agenciamaximum.com/wp-content/uploads/2025/10/google-analytics.svg" alt="Google Analytics 4" className="w-12 h-12" />
                            <h4 className="text-2xl font-bold text-white">Google Analytics 4</h4>
                         </div>
                         <div className="text-[#E37400] opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrendingUp />
                         </div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-white/10 mb-8 shadow-2xl">
                        <img 
                            src="https://agenciamaximum.com/wp-content/uploads/2025/10/dashboard-google-analytics-4.webp" 
                            alt="Dashboard Google Analytics 4"
                            className="w-full h-auto hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <Check className="text-[#E37400] mt-0.5" size={18} />
                            <span className="text-neutral-300 text-sm">Identifique visitantes com <code>ab_experiment</code></span>
                        </li>
                        <li className="flex items-start gap-3">
                             <Check className="text-[#E37400] mt-0.5" size={18} />
                            <span className="text-neutral-300 text-sm">Relatórios claros de <strong>leads, vendas e funis</strong></span>
                        </li>
                    </ul>
                </div>

                {/* Clarity Block */}
                <div className="bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 hover:border-blue-500/50 transition-colors group">
                    <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-4">
                             <img src="https://agenciamaximum.com/wp-content/uploads/2025/10/siteIcon.webp" alt="Microsoft Clarity" className="w-12 h-12" />
                            <h4 className="text-2xl font-bold text-white">Microsoft Clarity</h4>
                         </div>
                         <div className="text-[#0078D4] opacity-0 group-hover:opacity-100 transition-opacity">
                            <Layout />
                         </div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-white/10 mb-8 shadow-2xl">
                        <img 
                            src="https://agenciamaximum.com/wp-content/uploads/2025/10/dashboard-clarity.webp" 
                            alt="Dashboard Microsoft Clarity"
                            className="w-full h-auto hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <Check className="text-[#0078D4] mt-0.5" size={18} />
                            <span className="text-neutral-300 text-sm">Heatmaps separados por variante</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="text-[#0078D4] mt-0.5" size={18} />
                            <span className="text-neutral-300 text-sm">Grave sessões e compare interações</span>
                        </li>
                    </ul>
                </div>
            </div>

             <div className="mt-16 text-center">
                <Link to="/pricing">
                    <Button size="lg" variant="primary" className="uppercase shadow-xl shadow-brand-yellow/10">Quero o EasySplit Agora</Button>
                </Link>
            </div>
         </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-brand-dark border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b01201b?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h3 className="text-brand-yellow font-bold uppercase tracking-widest mb-16 text-center text-sm">Benefícios Reais</h3>
             <div className="grid md:grid-cols-4 gap-6">
                {[
                    { icon: <TrendingUp className="text-brand-yellow" size={28} />, title: 'Mais Lucro', desc: 'Descubra qual versão da sua página realmente converte.' },
                    { icon: <Zap className="text-brand-purple" size={28} />, title: 'Simplicidade', desc: 'Use direto no WordPress, sem plataformas externas.' },
                    { icon: <DollarSign className="text-green-500" size={28} />, title: 'Economia', desc: 'Sem gastar caro em softwares em dólar.' },
                    { icon: <Layout className="text-blue-500" size={28} />, title: 'Velocidade', desc: 'Configure em minutos e rode testes ilimitados.' },
                ].map((item, i) => (
                    <div key={i} className="bg-[#111]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:bg-[#161616] transition-colors text-center md:text-left shadow-lg">
                        <div className="mb-6 inline-block p-3 bg-white/5 rounded-xl">{item.icon}</div>
                        <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
         {/* Background Texture */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05] mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h3 className="text-brand-purple font-bold uppercase tracking-widest mb-2 text-xs">Para quem é</h3>
                    <h2 className="text-4xl font-black text-white">PARA QUEM FOI FEITO?</h2>
                </div>
                <p className="text-neutral-400 max-w-md text-sm md:text-right">
                    Desenvolvido para profissionais que precisam de dados para escalar seus resultados.
                </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { title: 'Agências', desc: 'Ofereça CRO acessível para todos os clientes.', icon: <Briefcase /> },
                    { title: 'Gestores de Tráfego', desc: 'Aumente ROI testando LPs sem medo.', icon: <TrendingUp /> },
                    { title: 'Infoprodutores', desc: 'Valide páginas de vendas e maximize conversão.', icon: <UserCheck /> },
                    { title: 'E-commerces', desc: 'Teste checkout e produtos com segurança.', icon: <ShoppingCart /> }
                ].map((role, i) => (
                    <div key={i} className="p-8 bg-brand-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-brand-purple transition-all group hover:-translate-y-1 shadow-xl">
                        <div className="text-neutral-500 group-hover:text-brand-purple mb-6 transition-colors p-3 bg-white/5 w-fit rounded-lg">{role.icon}</div>
                        <h4 className="text-xl font-bold text-white mb-2">{role.title}</h4>
                        <p className="text-sm text-neutral-400 leading-relaxed">{role.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Pricing Embedded */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#111] to-brand-dark pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                 <h3 className="text-brand-yellow font-bold uppercase tracking-widest mb-3 text-xs">Planos & Preços</h3>
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6">INVISTA NO PLANO QUE TRAZ <br/> <span className="text-brand-yellow">MAIS CONVERSÃO</span></h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 {PLANS.map((plan) => (
                      <div 
                        key={plan.id} 
                        className={`relative flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-300 ${
                          plan.recommended 
                            ? 'border-brand-yellow bg-[#121212] shadow-[0_0_50px_rgba(250,204,21,0.15)] order-first md:order-last scale-100 md:scale-105 z-10' 
                            : 'border-white/10 bg-[#0A0A0A] hover:border-white/20'
                        }`}
                      >
                        {plan.promoTag && (
                          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg ${
                              plan.recommended ? 'bg-brand-yellow text-black' : 'bg-neutral-700 text-white'
                          }`}>
                            {plan.promoTag}
                          </div>
                        )}

                        <div className="mb-8 border-b border-white/5 pb-8">
                          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                          <div className="flex items-end gap-2 mb-2">
                             {plan.originalPrice && (
                                <span className="text-lg text-neutral-500 line-through mb-1 font-medium">{plan.originalPrice}</span>
                             )}
                            <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                          </div>
                           <p className="text-neutral-500 text-sm font-medium">{plan.period}</p>
                          {plan.description && (
                              <p className="text-neutral-300 text-sm mt-4 font-medium leading-relaxed">{plan.description}</p>
                          )}
                        </div>

                        <ul className="space-y-5 mb-10 flex-1">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className={`mt-0.5 p-0.5 rounded-full ${plan.recommended ? 'bg-brand-yellow text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                                <Check size={12} strokeWidth={4} />
                              </div>
                              <span className="text-neutral-300 text-sm font-medium">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {plan.link.startsWith('http') ? (
                           <a href={plan.link} target="_blank" rel="noopener noreferrer">
                              <Button 
                                variant={plan.recommended ? 'primary' : 'outline'} 
                                className="w-full mb-4"
                                size="lg"
                              >
                                {plan.buttonText}
                              </Button>
                           </a>
                        ) : (
                           <Link to={plan.link}>
                              <Button 
                                variant={plan.recommended ? 'primary' : 'outline'} 
                                className="w-full mb-4"
                                size="lg"
                              >
                                {plan.buttonText}
                              </Button>
                           </Link>
                        )}

                        {plan.footerNote && (
                            <p className="text-xs text-center text-neutral-500 font-medium">{plan.footerNote}</p>
                        )}
                      </div>
                 ))}
              </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#080808] relative">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
            <h3 className="text-brand-purple font-bold uppercase tracking-widest mb-3 text-xs text-center">FAQ</h3>
            <h2 className="text-3xl font-bold text-center text-white mb-16">DÚVIDAS FREQUENTES</h2>
            <div className="space-y-4">
                {FAQS.map((faq, index) => (
                    <div key={index} className="bg-[#111] rounded-xl overflow-hidden border border-white/5 transition-all hover:border-white/10 shadow-sm">
                        <button 
                            className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none hover:bg-white/5 transition-colors"
                            onClick={() => toggleFaq(index)}
                        >
                            <span className="font-bold text-white pr-8 text-sm md:text-base">{faq.question}</span>
                            {openFaq === index ? <ChevronUp className="text-brand-yellow flex-shrink-0" /> : <ChevronDown className="text-neutral-500 flex-shrink-0" />}
                        </button>
                        {openFaq === index && (
                            <div className="px-8 pb-8 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-6">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 relative overflow-hidden bg-brand-dark">
         <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-[#111] to-brand-dark"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-yellow/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <div className="w-24 h-24 bg-[#111] border-2 border-brand-yellow rounded-full flex items-center justify-center mx-auto mb-10 relative shadow-[0_0_40px_rgba(250,204,21,0.2)]">
                <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-md animate-pulse"></div>
                <div className="text-brand-yellow font-heading font-black text-4xl">7</div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                TESTE SEM RISCO: <br/> 7 DIAS DE GARANTIA
            </h2>
            <p className="text-neutral-400 text-lg mb-12 max-w-2xl mx-auto">
                Se não amar o EasySplit, devolvemos 100% do seu dinheiro. <br/>Sem perguntas, sem burocracia.
            </p>

            <div className="bg-[#151515]/90 backdrop-blur-md p-10 rounded-3xl border border-white/10 mb-12 shadow-2xl relative overflow-hidden group hover:border-brand-yellow/30 transition-colors">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Garanta suas melhores decisões com dados de verdade</h3>
                <p className="text-neutral-400 mb-10 relative z-10">Transforme seu WordPress em uma máquina de testes A/B — simples, rápido e acessível.</p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                    <Link to="/pricing">
                        <Button size="lg" className="w-full sm:w-auto px-10 uppercase">Comprar Agora por R$45,99</Button>
                    </Link>
                    <Link to="/pricing">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto uppercase">Plano Anual R$149,99</Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};