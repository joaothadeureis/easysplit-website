import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FEATURES_DATA } from './featuresData';
import { ArrowRight } from 'lucide-react';

export const FeaturesIndex: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark flex flex-col">
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b01201b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8">
            O TESTE A/B MAIS <span className="text-brand-yellow relative inline-block">
              FÁCIL
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-purple opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span> DO WORDPRESS
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Recursos criados para quem quer testar de verdade — sem complicação técnica e sem mensalidades.
          </p>
          <Link to="/pricing">
            <Button size="lg" variant="glow" className="shadow-2xl">Ver Preços e Planos</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-[0.02] pointer-events-none"></div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {FEATURES_DATA.map((feature, idx) => (
            <Link 
              key={idx} 
              to={`/funcionalidades/${feature.slug}`}
              className="group bg-[#111]/80 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:border-brand-yellow/30 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                {feature.badge && (
                  <span className="px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase tracking-wider">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-yellow transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm mb-6">
                {feature.shortDescription}
              </p>
              <div className="flex items-center gap-2 text-brand-yellow text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Saiba mais <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-yellow to-brand-purple opacity-20 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
              alt="Analytics Visualization" 
              className="relative rounded-2xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Controle Total do Tráfego</h2>
            <p className="text-neutral-400 mb-8 text-lg">
              Você define exatamente quanto tráfego vai para cada versão. Quer começar devagar? Sem problemas.
            </p>
            <div className="space-y-6 mb-10">
              <div className="bg-[#151515] p-6 rounded-xl border border-white/5">
                <div className="flex justify-between mb-3 text-sm font-medium text-neutral-300">
                  <span>Variante A (Original)</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-neutral-600 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="bg-[#151515] p-6 rounded-xl border border-white/5 shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                <div className="flex justify-between mb-3 text-sm font-bold text-brand-yellow">
                  <span>Variante B (Teste)</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-brand-yellow h-full rounded-full shadow-[0_0_15px_rgba(250,204,21,0.6)]" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            <p className="text-neutral-400 text-sm">
              Ideal para testar mudanças radicais em landing pages de alta conversão sem arriscar todo o seu faturamento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-brand-dark">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Pronto para otimizar?</h2>
          <Link to="/pricing">
            <Button size="lg" className="px-12 animate-pulse uppercase">Compre o EasySplit Agora</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
