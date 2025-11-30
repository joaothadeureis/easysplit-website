import React, { useState, useEffect } from 'react';
import { Save, Image, Link as LinkIcon, Type, Palette, Eye, EyeOff } from 'lucide-react';

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

export const BannerEditor: React.FC = () => {
  const [banner, setBanner] = useState<BlogBanner>(DEFAULT_BANNER);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedBanner = localStorage.getItem('blog_sidebar_banner');
    if (savedBanner) {
      try {
        const parsed = JSON.parse(savedBanner);
        setBanner({ ...DEFAULT_BANNER, ...parsed });
      } catch (e) {
        console.error('Error parsing banner:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('blog_sidebar_banner', JSON.stringify(banner));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: keyof BlogBanner, value: string | boolean) => {
    setBanner(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Banner Lateral do Blog</h2>
          <p className="text-sm text-neutral-500">Configure o banner de CTA exibido na sidebar do blog</p>
        </div>
        <button
          onClick={() => handleChange('active', !banner.active)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            banner.active 
              ? 'bg-green-100 text-green-700' 
              : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          {banner.active ? <Eye size={18} /> : <EyeOff size={18} />}
          {banner.active ? 'Ativo' : 'Inativo'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-5">
          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Image size={16} />
              URL da Imagem (opcional)
            </label>
            <input
              type="text"
              value={banner.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
            />
            <p className="text-xs text-neutral-400 mt-1">Deixe vazio para não exibir imagem</p>
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Type size={16} />
              Título
            </label>
            <input
              type="text"
              value={banner.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Título do banner"
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Type size={16} />
              Descrição
            </label>
            <textarea
              value={banner.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descrição do banner"
              rows={3}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors resize-none"
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Type size={16} />
              Texto do Botão
            </label>
            <input
              type="text"
              value={banner.buttonText}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              placeholder="Texto do botão"
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
            />
          </div>

          {/* Button Link */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <LinkIcon size={16} />
              Link do Botão
            </label>
            <input
              type="text"
              value={banner.buttonLink}
              onChange={(e) => handleChange('buttonLink', e.target.value)}
              placeholder="/pricing ou https://..."
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors"
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Palette size={16} />
              Cor de Fundo
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={banner.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-14 h-12 rounded-xl border border-neutral-200 cursor-pointer"
              />
              <input
                type="text"
                value={banner.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                placeholder="#7C3AED"
                className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-purple transition-colors font-mono"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {['#7C3AED', '#1E40AF', '#047857', '#B91C1C', '#0369A1', '#171717'].map(color => (
                <button
                  key={color}
                  onClick={() => handleChange('backgroundColor', color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    banner.backgroundColor === color ? 'border-neutral-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              saved 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-purple text-white hover:bg-brand-purple/90'
            }`}
          >
            <Save size={18} />
            {saved ? 'Salvo com sucesso!' : 'Salvar Banner'}
          </button>
        </div>

        {/* Preview */}
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-3">Preview</p>
          <div className="sticky top-4">
            <div 
              className="w-80 rounded-2xl overflow-hidden shadow-lg"
              style={{ backgroundColor: banner.backgroundColor }}
            >
              {banner.image && (
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-300">✨</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80">Destaque</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{banner.title || 'Título do Banner'}</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  {banner.description || 'Descrição do banner aparece aqui...'}
                </p>
                <div className="inline-flex items-center gap-2 bg-white text-neutral-900 font-bold px-4 py-2.5 rounded-xl text-sm w-full justify-center">
                  {banner.buttonText || 'Texto do Botão'}
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
