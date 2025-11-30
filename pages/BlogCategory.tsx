import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost, WPCategory, WPPagination } from '../types';
import { fetchPosts, fetchCategories } from '../services/wordpressService';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { BlogSidebar } from '../components/BlogSidebar';

export const BlogCategory: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState<WPCategory | null>(null);
  const [pagination, setPagination] = useState<WPPagination>({ total: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
      const current = cats.find(c => c.slug === slug);
      setCurrentCategory(current || null);
    };
    loadCategories();
  }, [slug]);

  const loadPosts = useCallback(async (page: number = 1) => {
    if (!currentCategory) return;
    setLoading(true);
    const { posts: data, pagination: pag } = await fetchPosts(page, 9, currentCategory.id);
    setPosts(data);
    setPagination(pag);
    setLoading(false);
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory) {
      loadPosts(1);
    }
  }, [currentCategory, loadPosts]);

  const handlePageChange = (page: number) => {
    loadPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentCategory && !loading) {
    return (
      <div className="min-h-screen bg-brand-dark pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Categoria não encontrada</h1>
          <Link to="/blog" className="text-brand-purple hover:underline">
            Voltar ao Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark border-b border-white/10 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Voltar ao Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-brand-purple text-white text-xs font-bold uppercase tracking-wider rounded-full">
              Categoria
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {currentCategory?.name || 'Carregando...'}
          </h1>
          
          {currentCategory?.description && (
            <p className="text-xl text-neutral-300 max-w-2xl">
              {currentCategory.description}
            </p>
          )}
          
          <p className="text-neutral-400 mt-4">
            {pagination.total} {pagination.total === 1 ? 'artigo' : 'artigos'} nesta categoria
          </p>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-[#111] border-b border-white/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Link
              to="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-white/10 text-neutral-300 hover:bg-white/20 transition-colors"
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/blog/categoria/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat.slug === slug 
                    ? 'bg-brand-purple text-white' 
                    : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Posts Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="animate-pulse bg-[#111]/80 rounded-2xl overflow-hidden border border-white/10">
                    <div className="bg-white/10 h-56"></div>
                    <div className="p-6">
                      <div className="bg-white/10 h-6 w-3/4 rounded mb-3"></div>
                      <div className="bg-white/10 h-4 w-full rounded mb-2"></div>
                      <div className="bg-white/10 h-4 w-1/2 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-[#111]/80 rounded-2xl border border-white/10">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum artigo encontrado</h3>
                <p className="text-neutral-400 mb-6">
                  Ainda não há artigos nesta categoria.
                </p>
                <Link to="/blog" className="text-brand-purple hover:underline">
                  Ver todos os artigos
                </Link>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-[#111]/80 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-brand-purple/10 transition-all group border border-white/10">
                      <Link to={`/blog/${post.slug}`}>
                        <div className="h-56 overflow-hidden">
                          <img 
                            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${post.id}/600/400`} 
                            alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User size={14} />
                            {post._embedded?.author?.[0]?.name || 'Admin'}
                          </div>
                        </div>
                        
                        <Link to={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-bold text-neutral-100 mb-3 line-clamp-2 group-hover:text-brand-purple transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        </Link>
                        
                        <div className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                        
                        <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm hover:gap-3 transition-all">
                          Ler artigo <ArrowRight size={16} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="p-3 bg-[#1a1a1a] rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                    >
                      <ChevronLeft size={20} className="text-neutral-300" />
                    </button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === pagination.totalPages || Math.abs(page - pagination.currentPage) <= 1)
                      .map((page, index, arr) => (
                        <React.Fragment key={page}>
                          {index > 0 && arr[index - 1] !== page - 1 && (
                            <span className="text-neutral-500 px-2">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`w-12 h-12 rounded-xl font-bold transition-all ${
                              page === pagination.currentPage
                                ? 'bg-brand-purple text-white'
                                : 'bg-[#1a1a1a] text-neutral-300 hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="p-3 bg-[#1a1a1a] rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                    >
                      <ChevronRight size={20} className="text-neutral-300" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar categories={categories} currentCategorySlug={slug} />
        </div>
      </div>
    </div>
  );
};
