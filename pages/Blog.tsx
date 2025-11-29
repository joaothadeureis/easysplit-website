import React, { useEffect, useState, useCallback } from 'react';
import { BlogPost, WPCategory, WPPagination } from '../types';
import { fetchPosts, fetchCategories } from '../services/wordpressService';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [pagination, setPagination] = useState<WPPagination>({ total: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const loadPosts = useCallback(async (page: number = 1) => {
    setLoading(true);
    const { posts: data, pagination: pag } = await fetchPosts(page, 9, selectedCategory, activeSearch);
    setPosts(data);
    setPagination(pag);
    setLoading(false);
  }, [selectedCategory, activeSearch]);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  const handlePageChange = (page: number) => {
    loadPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
        {/* Header */}
        <div className="relative bg-[#0A0A0A] border-b border-white/5 pt-44 pb-24 px-4 text-center overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40"></div>
            
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Blog EasySplit</h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                    Dicas de CRO, Tráfego Pago e Otimização de Conversão para WordPress.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar artigos..."
                      className="w-full px-6 py-4 pl-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 focus:bg-white/10 transition-all"
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                    {activeSearch && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-20 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X size={18} className="text-neutral-400" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-yellow text-black font-bold rounded-xl hover:bg-brand-yellow/90 transition-colors text-sm"
                    >
                      Buscar
                    </button>
                  </div>
                </form>
            </div>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-sm sticky top-20 z-30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    !selectedCategory 
                      ? 'bg-brand-yellow text-black' 
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id 
                        ? 'bg-brand-yellow text-black' 
                        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat.name}
                    <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(activeSearch || selectedCategory) && (
          <div className="max-w-7xl mx-auto px-4 pt-8">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-neutral-500">Filtrando por:</span>
              {activeSearch && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/20 text-brand-purple rounded-lg">
                  "{activeSearch}"
                  <button onClick={clearSearch} className="hover:text-white">
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/20 text-brand-yellow rounded-lg">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => handleCategoryChange(undefined)} className="hover:text-white">
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full relative z-10">
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <div key={n} className="animate-pulse bg-[#111] rounded-2xl p-4 border border-white/5">
                            <div className="bg-white/5 h-56 rounded-xl mb-6"></div>
                            <div className="bg-white/5 h-6 w-3/4 rounded mb-3"></div>
                            <div className="bg-white/5 h-4 w-full rounded mb-2"></div>
                            <div className="bg-white/5 h-4 w-1/2 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum artigo encontrado</h3>
                  <p className="text-neutral-400 mb-6">
                    {activeSearch 
                      ? `Não encontramos resultados para "${activeSearch}"`
                      : 'Não há artigos nesta categoria ainda'}
                  </p>
                  <button
                    onClick={() => {
                      clearSearch();
                      handleCategoryChange(undefined);
                    }}
                    className="text-brand-yellow hover:underline"
                  >
                    Ver todos os artigos
                  </button>
                </div>
            ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {posts.map((post) => (
                          <article key={post.id} className="bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-brand-yellow/30 transition-all hover:-translate-y-1 group flex flex-col h-full shadow-lg">
                              {/* Image */}
                              <div className="h-56 overflow-hidden bg-neutral-900 relative">
                                  <div className="absolute inset-0 bg-brand-dark/20 z-10 group-hover:bg-transparent transition-colors"></div>
                                  <img 
                                      src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${post.id}/600/400?grayscale`} 
                                      alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                              </div>
                              
                              <div className="p-8 flex flex-col flex-grow relative">
                                  <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

                                  <div className="relative z-10 flex flex-col h-full">
                                      <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
                                          <div className="flex items-center gap-1.5">
                                              <Calendar size={14} className="text-brand-yellow" />
                                              {new Date(post.date).toLocaleDateString('pt-BR')}
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                              <User size={14} className="text-brand-purple" />
                                              {post._embedded?.author?.[0]?.name || 'Admin'}
                                          </div>
                                      </div>
                                      
                                      <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-brand-yellow transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                      
                                      <div className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                      
                                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/5 px-4 py-2 rounded-lg hover:bg-brand-yellow hover:text-black transition-all w-fit mt-auto">
                                          Ler artigo <ArrowRight size={16} />
                                      </Link>
                                  </div>
                              </div>
                          </article>
                      ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-16">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          // Show first, last, current, and pages near current
                          return page === 1 || 
                                 page === pagination.totalPages || 
                                 Math.abs(page - pagination.currentPage) <= 1;
                        })
                        .map((page, index, arr) => (
                          <React.Fragment key={page}>
                            {index > 0 && arr[index - 1] !== page - 1 && (
                              <span className="text-neutral-500 px-2">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                                page === pagination.currentPage
                                  ? 'bg-brand-yellow text-black'
                                  : 'bg-white/5 text-white hover:bg-white/10'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  {/* Results info */}
                  <div className="text-center mt-8 text-sm text-neutral-500">
                    Mostrando {posts.length} de {pagination.total} artigos
                  </div>
                </>
            )}
        </div>
    </div>
  );
};