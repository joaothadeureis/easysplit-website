import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost as BlogPostType, WPCategory } from '../types';
import { fetchPostBySlug, fetchRelatedPosts, fetchCategories } from '../services/wordpressService';
import { Calendar, ArrowLeft, ArrowRight, Clock, Tag, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { BlogSidebar } from '../components/BlogSidebar';

// Utility to strip HTML tags
const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Estimate reading time
const getReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = stripHtml(content).split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) {
        setError('Post não encontrado');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const [data, cats] = await Promise.all([
        fetchPostBySlug(slug),
        fetchCategories()
      ]);
      
      setCategories(cats);
      
      if (!data) {
        setError('Post não encontrado');
        setLoading(false);
        return;
      }

      setPost(data);

      if (data.categories && data.categories.length > 0) {
        const related = await fetchRelatedPosts(data.id, data.categories, 3);
        setRelatedPosts(related);
      }

      setLoading(false);
    };

    loadData();
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post ? stripHtml(post.title.rendered) : '';

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      copy: ''
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-white/5 rounded w-48 mb-8"></div>
            <div className="h-10 bg-white/5 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-white/5 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-white/5 rounded-2xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/5 rounded w-full"></div>
              <div className="h-4 bg-white/5 rounded w-full"></div>
              <div className="h-4 bg-white/5 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-brand-dark pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-neutral-400 mb-8">{error || 'Post não encontrado'}</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 bg-brand-purple text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-purple/90 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar ao Blog
          </button>
        </div>
      </div>
    );
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0];
  const postCategories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const readingTime = getReadingTime(post.content.rendered);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-white/10 pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="hover:text-white">Blog</Link>
            {postCategories[0] && (
              <>
                <ChevronRight size={14} />
                <Link to={`/blog/categoria/${postCategories[0].slug}`} className="hover:text-white">
                  {postCategories[0].name}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10 pb-12">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          {/* Categories */}
          {postCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {postCategories.map((cat: any) => (
                <Link 
                  key={cat.id}
                  to={`/blog/categoria/${cat.slug}`}
                  className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider rounded-full hover:bg-brand-purple/30 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
            {author && (
              <div className="flex items-center gap-3">
                {author.avatar_urls?.['48'] && (
                  <img 
                    src={author.avatar_urls['48']} 
                    alt={author.name}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="text-white font-medium">{author.name}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {readingTime} min de leitura
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Featured Image */}
            {featuredImage && (
              <div className="mb-10">
                <img 
                  src={featuredImage}
                  alt={stripHtml(post.title.rendered)}
                  className="w-full h-auto rounded-2xl"
                  loading="eager"
                />
              </div>
            )}

            {/* Article Content */}
            <article className="bg-[#111] rounded-2xl border border-white/10 p-8 md:p-12">
              <style>{`
                .article-content {
                  font-size: 1.125rem;
                  line-height: 1.8;
                  color: #a3a3a3;
                }
                
                .article-content p {
                  margin-bottom: 1.75rem;
                }
                
                .article-content h2 {
                  font-size: 1.75rem;
                  font-weight: 800;
                  color: #ffffff;
                  margin-top: 3rem;
                  margin-bottom: 1.25rem;
                  padding-bottom: 0.75rem;
                  border-bottom: 2px solid rgba(255,255,255,0.1);
                }
                
                .article-content h3 {
                  font-size: 1.375rem;
                  font-weight: 700;
                  color: #e5e5e5;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }
                
                .article-content h4 {
                  font-size: 1.125rem;
                  font-weight: 600;
                  color: #d4d4d4;
                  margin-top: 2rem;
                  margin-bottom: 0.75rem;
                }
                
                .article-content ul {
                  margin: 1.5rem 0;
                  padding-left: 0;
                  list-style: none;
                }
                
                .article-content ul li {
                  position: relative;
                  padding-left: 1.75rem;
                  margin-bottom: 0.875rem;
                  line-height: 1.7;
                }
                
                .article-content ul li::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0.65rem;
                  width: 8px;
                  height: 8px;
                  background: #8B5CF6;
                  border-radius: 50%;
                }
                
                .article-content ol {
                  margin: 1.5rem 0;
                  padding-left: 0;
                  list-style: none;
                  counter-reset: item;
                }
                
                .article-content ol li {
                  position: relative;
                  padding-left: 2.5rem;
                  margin-bottom: 1rem;
                  line-height: 1.7;
                  counter-increment: item;
                }
                
                .article-content ol li::before {
                  content: counter(item);
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 1.75rem;
                  height: 1.75rem;
                  background: #8B5CF6;
                  color: white;
                  font-size: 0.875rem;
                  font-weight: 700;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                
                .article-content figure {
                  margin: 2.5rem 0;
                }
                
                .article-content figure img {
                  width: 100%;
                  height: auto;
                  border-radius: 1rem;
                }
                
                .article-content figcaption {
                  text-align: center;
                  font-size: 0.875rem;
                  color: #737373;
                  margin-top: 0.75rem;
                  font-style: italic;
                }
                
                .article-content .sponsor-box {
                  background: linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(250,204,21,0.1) 100%);
                  border: 1px solid rgba(139,92,246,0.3);
                  border-radius: 1rem;
                  padding: 1.5rem;
                  margin: 2rem 0;
                }
                
                .article-content .sponsor-box p {
                  margin-bottom: 0.75rem;
                  color: #a3a3a3;
                }
                
                .article-content .sponsor-box p:last-child {
                  margin-bottom: 0;
                }
                
                .article-content .sponsor-box a {
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  background: #8B5CF6;
                  color: white;
                  padding: 0.625rem 1.25rem;
                  border-radius: 0.5rem;
                  font-weight: 600;
                  font-size: 0.875rem;
                  text-decoration: none;
                  transition: all 0.2s;
                }
                
                .article-content .sponsor-box a:hover {
                  background: #7C3AED;
                }
                
                .article-content blockquote {
                  border-left: 4px solid #8B5CF6;
                  background: rgba(255,255,255,0.03);
                  padding: 1.5rem 2rem;
                  margin: 2rem 0;
                  border-radius: 0 1rem 1rem 0;
                  font-style: italic;
                  color: #a3a3a3;
                }
                
                .article-content blockquote p {
                  margin-bottom: 0;
                }
                
                .article-content pre {
                  background: #0a0a0a;
                  border: 1px solid rgba(255,255,255,0.1);
                  border-radius: 1rem;
                  padding: 1.5rem;
                  overflow-x: auto;
                  margin: 2rem 0;
                }
                
                .article-content code {
                  background: rgba(139,92,246,0.15);
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.375rem;
                  font-size: 0.875rem;
                  color: #a78bfa;
                  font-family: 'Fira Code', monospace;
                }
                
                .article-content pre code {
                  background: transparent;
                  padding: 0;
                  color: #E5E7EB;
                }
                
                .article-content a {
                  color: #a78bfa;
                  text-decoration: none;
                  font-weight: 500;
                  transition: all 0.2s;
                }
                
                .article-content a:hover {
                  text-decoration: underline;
                  color: #c4b5fd;
                }
                
                .article-content strong {
                  color: #ffffff;
                  font-weight: 600;
                }
                
                .article-content hr {
                  border: none;
                  border-top: 1px solid rgba(255,255,255,0.1);
                  margin: 3rem 0;
                }
                
                .article-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 2rem 0;
                  font-size: 0.9375rem;
                }
                
                .article-content th, .article-content td {
                  border: 1px solid rgba(255,255,255,0.1);
                  padding: 0.875rem 1rem;
                  text-align: left;
                }
                
                .article-content th {
                  background: rgba(255,255,255,0.05);
                  font-weight: 600;
                  color: #ffffff;
                }
                
                .article-content tr:hover {
                  background: rgba(255,255,255,0.02);
                }
              `}</style>
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </article>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-8 bg-[#111] rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={18} className="text-neutral-500" />
                  {tags.map((tag: any) => (
                    <span 
                      key={tag.id}
                      className="px-3 py-1.5 bg-white/5 text-neutral-300 text-sm rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 bg-[#111] rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-neutral-300 font-medium flex items-center gap-2">
                  <Share2 size={18} />
                  Compartilhar este artigo
                </p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="p-3 bg-white/5 text-neutral-400 rounded-xl hover:bg-[#1877F2] hover:text-white transition-colors"
                    aria-label="Compartilhar no Facebook"
                  >
                    <Facebook size={20} />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="p-3 bg-white/5 text-neutral-400 rounded-xl hover:bg-[#1DA1F2] hover:text-white transition-colors"
                    aria-label="Compartilhar no Twitter"
                  >
                    <Twitter size={20} />
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="p-3 bg-white/5 text-neutral-400 rounded-xl hover:bg-[#0A66C2] hover:text-white transition-colors"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <Linkedin size={20} />
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="p-3 bg-white/5 text-neutral-400 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <LinkIcon size={18} />
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Author Box */}
            {author && (
              <div className="mt-8 bg-[#111] rounded-2xl border border-white/10 p-8">
                <div className="flex items-start gap-6">
                  {author.avatar_urls?.['96'] && (
                    <img 
                      src={author.avatar_urls['96']} 
                      alt={author.name}
                      className="w-20 h-20 rounded-full flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Autor</p>
                    <h3 className="text-xl font-bold text-white mb-2">{author.name}</h3>
                    {author.description && (
                      <p className="text-neutral-400">{author.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar categories={categories} />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-brand-dark border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-white mb-8">Artigos Relacionados</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <Link 
                  key={relPost.id}
                  to={`/blog/${relPost.slug}`}
                  className="group"
                >
                  <article className="bg-[#111]/80 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-brand-purple/10 transition-all border border-white/10">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${relPost.id}/600/400`}
                        alt={stripHtml(relPost.title.rendered)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                        <Calendar size={14} />
                        {new Date(relPost.date).toLocaleDateString('pt-BR')}
                        <span>•</span>
                        <Clock size={14} />
                        {getReadingTime(relPost.content?.rendered || relPost.excerpt.rendered)} min
                      </div>
                      <h3 
                        className="text-lg font-bold text-neutral-100 group-hover:text-brand-purple transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: relPost.title.rendered }}
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-brand-purple">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pronto para aumentar suas conversões?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            O EasySplit é o plugin de testes A/B mais simples e acessível para WordPress. Sem mensalidade, sem complicação.
          </p>
          <Link 
            to="/pricing"
            className="inline-flex items-center gap-2 bg-white text-brand-purple font-bold px-8 py-4 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            Conhecer o EasySplit
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
