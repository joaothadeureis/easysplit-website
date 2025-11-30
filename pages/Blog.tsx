import React, { useEffect, useState, useCallback } from 'react';
import { BlogPost, WPCategory, WPPagination } from '../types';
import { fetchPosts, fetchCategories } from '../services/wordpressService';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { BlogSidebar } from '../components/BlogSidebar';

// Utility to strip HTML tags
const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Estimate reading time
const getReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [pagination, setPagination] = useState<WPPagination>({ total: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const loadPosts = useCallback(async (page: number = 1) => {
    setLoading(true);
    const { posts: data, pagination: pag } = await fetchPosts(page, 10, undefined, activeSearch);
    
    if (page === 1 && data.length > 0 && !activeSearch) {
      setFeaturedPost(data[0]);
      setPosts(data.slice(1));
    } else {
      setFeaturedPost(null);
      setPosts(data);
    }
    
    setPagination(pag);
    setLoading(false);
  }, [activeSearch]);

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

  const handlePageChange = (page: number) => {
    loadPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Blog EasySplit
            </h1>
            <p className="text-xl text-neutral-400 mb-8">
              Dicas de CRO, Tráfego Pago e Otimização de Conversão para WordPress.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artigos..."
                  className="w-full px-6 py-4 pl-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-purple focus:bg-white/10 transition-all"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple/90 transition-colors text-sm"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-[#0a0a0a] border-b border-white/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Link
              to="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-brand-purple text-white"
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/blog/categoria/${cat.slug}`}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-white/5 text-neutral-300 hover:bg-white/10 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Active Search Notice */}
      {activeSearch && (
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <div className="flex items-center gap-4 text-sm bg-white/5 p-4 rounded-xl border border-white/10">
            <span className="text-neutral-400">Resultados para:</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/20 text-brand-purple font-medium rounded-lg">
              "{activeSearch}"
              <button onClick={clearSearch} className="hover:text-brand-purple/70">
                <X size={14} />
              </button>
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="space-y-8">
            {/* Featured Skeleton */}
            <div className="animate-pulse bg-[#111] rounded-2xl overflow-hidden border border-white/10">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-white/5 h-80"></div>
                <div className="p-8">
                  <div className="bg-white/5 h-4 w-24 rounded mb-4"></div>
                  <div className="bg-white/5 h-8 w-3/4 rounded mb-4"></div>
                  <div className="bg-white/5 h-4 w-full rounded mb-2"></div>
                  <div className="bg-white/5 h-4 w-2/3 rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="animate-pulse bg-[#111] rounded-2xl overflow-hidden border border-white/10">
                  <div className="bg-white/5 h-48"></div>
                  <div className="p-6">
                    <div className="bg-white/5 h-6 w-3/4 rounded mb-3"></div>
                    <div className="bg-white/5 h-4 w-full rounded mb-2"></div>
                    <div className="bg-white/5 h-4 w-1/2 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : posts.length === 0 && !featuredPost ? (
          <div className="text-center py-20 bg-[#111] rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-white mb-2">Nenhum artigo encontrado</h3>
            <p className="text-neutral-400 mb-6">
              {activeSearch 
                ? `Não encontramos resultados para "${activeSearch}"`
                : 'Ainda não há artigos publicados'}
            </p>
            {activeSearch && (
              <button
                onClick={clearSearch}
                className="text-brand-purple hover:underline font-medium"
              >
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Featured Post */}
              {featuredPost && (
                <article className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 mb-12 group">
                  <div className="grid md:grid-cols-2 gap-0">
                    <Link to={`/blog/${featuredPost.slug}`} className="block overflow-hidden">
                      <img 
                        src={featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${featuredPost.id}/800/600`} 
                        alt={stripHtml(featuredPost.title.rendered)}
                        className="w-full h-full object-cover min-h-[320px] group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                      />
                    </Link>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-brand-yellow text-black text-xs font-bold uppercase tracking-wider rounded-full">
                          Destaque
                        </span>
                        {featuredPost._embedded?.['wp:term']?.[0]?.[0] && (
                          <Link 
                            to={`/blog/categoria/${featuredPost._embedded['wp:term'][0][0].slug}`}
                            className="text-brand-purple text-sm font-medium hover:underline"
                          >
                            {featuredPost._embedded['wp:term'][0][0].name}
                          </Link>
                        )}
                      </div>
                      
                      <Link to={`/blog/${featuredPost.slug}`}>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-yellow transition-colors line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }} />
                      </Link>
                      
                      <div className="text-neutral-400 mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }} />
                      
                      <div className="flex items-center gap-6 text-sm text-neutral-500 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(featuredPost.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {getReadingTime(featuredPost.content?.rendered || featuredPost.excerpt.rendered)} min
                        </div>
                      </div>
                      
                      <Link 
                        to={`/blog/${featuredPost.slug}`} 
                        className="inline-flex items-center gap-2 text-brand-purple font-bold hover:gap-3 transition-all"
                      >
                        Ler artigo completo <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Posts Grid */}
              {posts.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                      <article key={post.id} className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group">
                        <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                          <img 
                            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${post.id}/600/400`} 
                            alt={stripHtml(post.title.rendered)}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </Link>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            {post._embedded?.['wp:term']?.[0]?.[0] && (
                              <Link 
                                to={`/blog/categoria/${post._embedded['wp:term'][0][0].slug}`}
                                className="text-brand-purple text-xs font-bold uppercase tracking-wider hover:underline"
                              >
                                {post._embedded['wp:term'][0][0].name}
                              </Link>
                            )}
                            <span className="text-neutral-600 text-xs">•</span>
                            <span className="text-neutral-500 text-xs">
                              {getReadingTime(post.content?.rendered || post.excerpt.rendered)} min de leitura
                            </span>
                          </div>
                          
                          <Link to={`/blog/${post.slug}`}>
                            <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-yellow transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          </Link>
                          
                          <div className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {post._embedded?.author?.[0]?.avatar_urls?.['48'] && (
                                <img 
                                  src={post._embedded.author[0].avatar_urls['48']}
                                  alt={post._embedded.author[0].name}
                                  className="w-8 h-8 rounded-full"
                                  loading="lazy"
                                />
                              )}
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {post._embedded?.author?.[0]?.name || 'Admin'}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {new Date(post.date).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>
                            
                            <Link to={`/blog/${post.slug}`} className="text-brand-yellow hover:text-brand-yellow/80">
                              <ArrowRight size={20} />
                            </Link>
                          </div>
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
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
                                  : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} className="text-neutral-300" />
                      </button>
                    </div>
                  )}

                  <div className="text-center mt-6 text-sm text-neutral-500">
                    Mostrando {posts.length + (featuredPost ? 1 : 0)} de {pagination.total} artigos
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <BlogSidebar categories={categories} />
          </div>
        )}
      </div>
    </div>
  );
};
