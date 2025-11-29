import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
                <div className="p-1.5 bg-brand-yellow rounded-md">
                    <Zap className="h-4 w-4 text-black fill-black" />
                </div>
                <span className="text-lg font-heading font-black text-white uppercase tracking-tight">Easy<span className="text-brand-yellow">Split</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 font-light">
              Aumente suas conversões sem gastar uma fortuna. Testes A/B simples e acessíveis no WordPress.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading tracking-wide text-sm uppercase">Produto</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/funcionalidades" className="hover:text-brand-yellow transition-colors">Funcionalidades</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-yellow transition-colors">Preços</Link></li>
              <li><Link to="/blog" className="hover:text-brand-yellow transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading tracking-wide text-sm uppercase">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/termos-de-uso" className="hover:text-brand-yellow transition-colors">Termos de Uso</Link></li>
              <li><Link to="/politica-de-privacidade" className="hover:text-brand-yellow transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading tracking-wide text-sm uppercase">Contato</h4>
             <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                <Mail size={16} className="text-brand-yellow" /> <span className="text-neutral-300">suporte@easysplit.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-6">
          <p className="text-xs">&copy; {new Date().getFullYear()} EasySplit. Todos os direitos reservados.</p>
          <div className="text-center md:text-right">
            <p className="text-neutral-500 text-xs mb-1">
              EasySplit é um produto oficial da <a href="https://agenciamaximum.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-300 font-bold hover:text-brand-purple transition-colors cursor-pointer">Agência Maximum</a>
            </p>
            <p className="text-[#333] text-[10px] uppercase tracking-widest font-bold">
              Performance & Tecnologia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};