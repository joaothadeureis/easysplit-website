import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../components/Button';
import { PLANS } from '../constants';

export const Pricing: React.FC = () => {
  return (
    <div className="pt-36 min-h-screen bg-brand-dark flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
      
      <section className="relative z-10 py-16 text-center px-4">
        <h3 className="text-brand-yellow font-bold uppercase tracking-widest mb-3 text-xs">Planos & Preços</h3>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          INVISTA NO PLANO QUE TRAZ <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">MAIS CONVERSÃO</span>
        </h1>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 pb-24">
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-300 ${
              plan.recommended 
                ? 'border-brand-yellow bg-[#121212] shadow-[0_0_60px_rgba(250,204,21,0.1)] order-first md:order-last z-10 scale-100 md:scale-105' 
                : 'border-white/10 bg-[#0A0A0A]/80 backdrop-blur-sm hover:border-white/20'
            }`}
          >
            {plan.promoTag && (
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg ${
                  plan.recommended ? 'bg-brand-yellow text-black' : 'bg-neutral-800 text-white border border-white/10'
              }`}>
                {plan.promoTag}
              </div>
            )}

            <div className="mb-8 border-b border-white/5 pb-8">
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-end gap-3 mb-2">
                 {plan.originalPrice && (
                    <span className="text-xl text-neutral-500 line-through mb-1.5 font-medium decoration-neutral-600">{plan.originalPrice}</span>
                 )}
                <span className="text-5xl md:text-6xl font-black text-white tracking-tight">{plan.price}</span>
              </div>
               <span className="text-neutral-500 font-medium text-sm">{plan.period}</span>
              {plan.description && (
                  <p className="text-neutral-300 text-sm mt-6 font-medium leading-relaxed">{plan.description}</p>
              )}
            </div>

            <ul className="space-y-5 mb-10 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-0.5 rounded-full flex-shrink-0 ${plan.recommended ? 'bg-brand-yellow text-black' : 'bg-neutral-800 text-neutral-500'}`}>
                     <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-neutral-300 text-sm font-medium">{feat}</span>
                </li>
              ))}
            </ul>

            <a href={plan.link} target="_blank" rel="noopener noreferrer" className="block">
              <Button 
                variant={plan.recommended ? 'primary' : 'outline'} 
                className="w-full mb-4"
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </a>

            {plan.footerNote && (
                <p className="text-xs text-center text-neutral-500 font-medium">{plan.footerNote}</p>
            )}
          </div>
        ))}
      </section>

      <section className="py-20 bg-[#080808] border-t border-white/5 mt-auto relative z-10">
         <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full border-2 border-brand-yellow flex items-center justify-center text-brand-yellow font-black text-4xl relative shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                  <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-xl animate-pulse"></div>
                  7
                </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Teste sem Risco: 7 Dias de Garantia Total</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Se não amar o EasySplit, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                Compre com tranquilidade — seu investimento está protegido.
            </p>
         </div>
      </section>
    </div>
  );
};