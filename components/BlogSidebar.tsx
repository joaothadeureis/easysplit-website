import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WPCategory } from '../types';

interface BlogBanner {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  active: boolean;
}

const DEFAULT_BANNER: BlogBanner = {
  id: 'default',
  image: '',
  title: 'Teste A/B sem complicação',
  description: 'Aumente suas conversões com o EasySplit. Plugin WordPress simples, poderoso e sem mensalidade.',
  buttonText: 'Conhecer o EasySplit',
  buttonLink: '/pricing',
  backgroundColor: '#7C3AED',
  active: true
};

interface BlogSidebarProps {
  categories: WPCategory[];
  currentCategorySlug?: string;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ categories, currentCategorySlug }) => {
  const [banner, setBanner] = useState<BlogBanner>(DEFAULT_BANNER);

  useEffect(() => {
    // Load banner from localStorage
    const savedBanner = localStorage.getItem('blog_sidebar_banner');
    if (savedBanner) {
      try {
        const parsed = JSON.parse(savedBanner);
        setBanner({ ...DEFAULT_BANNER, ...parsed });
      } catch (e) {
        console.error('Error parsing banner data:', e);
      }
    }
  }, []);

  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-32 space-y-6">
        {/* CTA Banner */}
        {banner.active && (
          <div 
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ backgroundColor: banner.backgroundColor }}
          >
            {banner.image && (
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-yellow-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">Destaque</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">{banner.description}</p>
              <Link 
                to={banner.buttonLink}
                className="inline-flex items-center gap-2 bg-white text-neutral-900 font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-neutral-100 transition-colors w-full justify-center"
              >
                {banner.buttonText}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-neutral-100 mb-4">Categorias</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/blog/categoria/${cat.slug}`}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  currentCategorySlug === cat.slug
                    ? 'bg-brand-purple text-white'
                    : 'hover:bg-white/10 text-neutral-300'
                }`}
              >
                <span className="font-medium">{cat.name}</span>
                <span className={`text-sm ${currentCategorySlug === cat.slug ? 'text-white/70' : 'text-neutral-500'}`}>
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter or Secondary CTA */}
        <div className="bg-neutral-900 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Fique por dentro</h3>
          <p className="text-neutral-400 text-sm mb-4">
            Dicas de CRO, testes A/B e otimização direto no seu email.
          </p>
          <input
            type="email"
            placeholder="Seu melhor email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-500 text-sm mb-3 focus:outline-none focus:border-brand-yellow"
          />
          <button className="w-full bg-brand-yellow text-black font-bold py-3 rounded-xl text-sm hover:bg-brand-yellow/90 transition-colors">
            Inscrever-se
          </button>
        </div>
      </div>
    </aside>
  );
};
