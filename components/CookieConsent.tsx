import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Small delay before showing the banner
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-12 h-12 rounded-xl bg-brand-yellow/10 items-center justify-center flex-shrink-0">
            <Cookie className="w-6 h-6 text-brand-yellow" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">🍪 Este site usa cookies</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                  Ao continuar navegando, você concorda com nossa{' '}
                  <Link to="/politica-de-privacidade" className="text-brand-yellow hover:underline">
                    Política de Privacidade
                  </Link>.
                </p>
              </div>
              <button 
                onClick={acceptEssential}
                className="text-neutral-500 hover:text-white transition-colors p-1"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 bg-brand-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors text-sm"
              >
                Aceitar Todos
              </button>
              <button
                onClick={acceptEssential}
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Apenas Essenciais
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
