import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Check, ChevronDown } from 'lucide-react';
import { FEATURES_DATA } from './featuresData';

export const FeatureDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const feature = FEATURES_DATA.find(f => f.slug === slug);

  if (!feature) {
    return <Navigate to="/funcionalidades" replace />;
  }

  // Get related features (excluding current)
  const relatedFeatures = FEATURES_DATA.filter(f => f.slug !== slug).slice(0, 3);

  return (
    <div className="pt-24 min-h-screen bg-brand-dark flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                {feature.badge && (
                  <span className="px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase tracking-wider">
                    {feature.badge}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {feature.title}
              </h1>
              
              <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pricing">
                  <Button size="lg" className="w-full sm:w-auto">
                    Quero o EasySplit
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-yellow to-brand-purple opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={feature.heroImage} 
                alt={feature.title}
                className="relative rounded-2xl border border-white/10 shadow-2xl w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Benefícios de {feature.title}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feature.benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="bg-[#111]/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Como Funciona
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto text-lg">
            {feature.howItWorksIntro}
          </p>
          
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-0">
            {feature.steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 max-w-xs mx-auto lg:mx-0">
                  <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-xl hover:border-brand-yellow/30 transition-all h-full">
                    <div className="w-10 h-10 rounded-full bg-brand-yellow text-black font-bold flex items-center justify-center mb-4">
                      {idx + 1}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-neutral-400 text-sm">{step.description}</p>
                  </div>
                </div>
                {idx < feature.steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center px-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neutral-600">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      {feature.useCases && feature.useCases.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Casos de Uso
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {feature.useCases.map((useCase, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-8 rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{useCase.title}</h3>
                  <p className="text-neutral-400 mb-6">{useCase.description}</p>
                  {useCase.example && (
                    <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                      <p className="text-sm text-brand-yellow font-mono">{useCase.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {feature.faqs && feature.faqs.length > 0 && (
        <section className="py-20 bg-[#080808] border-t border-white/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-4">
              {feature.faqs.map((faq, idx) => (
                <details 
                  key={idx}
                  className="group bg-neutral-900/50 border border-white/5 rounded-xl [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors list-none">
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Outras Funcionalidades
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedFeatures.map((relFeature, idx) => (
              <Link 
                key={idx}
                to={`/funcionalidades/${relFeature.slug}`}
                className="group bg-[#111]/80 border border-white/5 p-8 rounded-2xl hover:border-brand-yellow/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-yellow/10 transition-colors">
                  {relFeature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                  {relFeature.title}
                </h3>
                <p className="text-neutral-400 text-sm">{relFeature.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#080808] to-brand-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para testar {feature.title}?
          </h2>
          <p className="text-neutral-400 mb-10 text-lg">
            Comece hoje mesmo a otimizar suas páginas com o EasySplit. Sem complicação, sem mensalidades abusivas.
          </p>
          <Link to="/pricing">
            <Button size="lg" className="px-12 uppercase">
              Comprar o EasySplit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
