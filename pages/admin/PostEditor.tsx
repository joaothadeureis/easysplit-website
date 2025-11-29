import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BlogPost, WPCategory } from '../../types';
import { fetchPostById, fetchCategories, createPost, updatePost } from '../../services/wordpressService';
import { 
  ArrowLeft, 
  Save, 
  Eye,
  Image,
  Tag,
  Folder,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending';
  categories: number[];
  featured_media?: number;
}

export const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = !!id && id !== 'new';

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    status: 'draft',
    categories: []
  });

  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Load categories
      const cats = await fetchCategories();
      setCategories(cats);

      // Load post if editing
      if (isEditing) {
        setLoading(true);
        const post = await fetchPostById(parseInt(id));
        if (post) {
          setFormData({
            title: post.title.rendered.replace(/<[^>]*>/g, ''),
            content: post.content.rendered,
            excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/\n/g, ''),
            slug: post.slug,
            status: 'publish',
            categories: post.categories || []
          });
        } else {
          setError('Post não encontrado');
        }
        setLoading(false);
      }
    };
    loadData();
  }, [id, isEditing]);

  const handleChange = (field: keyof PostFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    handleChange('title', title);
    if (!isEditing && !formData.slug) {
      handleChange('slug', generateSlug(title));
    }
  };

  const handleCategoryToggle = (catId: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter(c => c !== catId)
        : [...prev.categories, catId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('O título é obrigatório');
      return;
    }

    if (!formData.content.trim()) {
      setError('O conteúdo é obrigatório');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        slug: formData.slug || generateSlug(formData.title),
        status: formData.status,
        categories: formData.categories
      };

      if (isEditing) {
        await updatePost(parseInt(id), postData);
        setSuccess('Post atualizado com sucesso!');
      } else {
        const newPost = await createPost(postData);
        setSuccess('Post criado com sucesso!');
        // Redirect to edit page of new post
        setTimeout(() => {
          navigate(`/admin/posts/${newPost.id}/edit`);
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-brand-yellow animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-white">
              {isEditing ? 'Editar Post' : 'Novo Post'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Preview"
            >
              <Eye size={20} />
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-brand-yellow text-black font-bold px-5 py-2.5 rounded-xl hover:bg-brand-yellow/90 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      {(error || success) && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-300">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
              <p className="text-green-300">{success}</p>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Digite o título do post..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-lg placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 transition-all"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                URL (slug)
              </label>
              <div className="flex items-center">
                <span className="text-neutral-500 text-sm mr-2">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', generateSlug(e.target.value))}
                  placeholder="url-do-post"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 transition-all"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Conteúdo (HTML)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="<p>Digite o conteúdo do post...</p>"
                rows={20}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 transition-all resize-y"
              />
              <p className="text-neutral-500 text-xs mt-2">
                Use tags HTML para formatar: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Resumo
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Um breve resumo do post para listagens..."
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 transition-all resize-y"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Box */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Save size={18} className="text-brand-yellow" />
                Publicação
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-yellow/50 appearance-none cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="draft" className="bg-[#1a1a1a] text-white">Rascunho</option>
                    <option value="pending" className="bg-[#1a1a1a] text-white">Pendente de revisão</option>
                    <option value="publish" className="bg-[#1a1a1a] text-white">Publicado</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving}
                  className="w-full py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-brand-yellow/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {formData.status === 'publish' ? 'Publicar' : 'Salvar'}
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Folder size={18} className="text-brand-purple" />
                Categorias
              </h3>
              
              {categories.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <label 
                      key={cat.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-yellow focus:ring-brand-yellow focus:ring-offset-0"
                      />
                      <span className="text-neutral-300 text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">Nenhuma categoria disponível</p>
              )}
            </div>

            {/* Preview Card */}
            {showPreview && formData.title && (
              <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Eye size={18} className="text-green-400" />
                  Preview
                </h3>
                
                <div className="border border-white/5 rounded-xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-brand-yellow/20 to-brand-purple/20 flex items-center justify-center">
                    <Image className="text-white/30" size={32} />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-bold text-sm line-clamp-2">
                      {formData.title || 'Título do post'}
                    </h4>
                    <p className="text-neutral-500 text-xs mt-2 line-clamp-2">
                      {formData.excerpt || 'Resumo do post...'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
