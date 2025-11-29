import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../types';
import { fetchPostBySlug, fetchRelatedPosts } from '../services/wordpressService';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

// Utility to strip HTML tags and get plain text
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Post não encontrado');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const data = await fetchPostBySlug(slug);
      
      if (!data) {
        setError('Post não encontrado');
        setLoading(false);
        return;
      }

      setPost(data);

      // Fetch related posts if we have categories
      if (data.categories && data.categories.length > 0) {
        const related = await fetchRelatedPosts(data.id, data.categories, 3);
        setRelatedPosts(related);
      }

      setLoading(false);
    };

    loadPost();
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
      alert('Link copiado!');
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-white/5 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-white/5 rounded w-3/4 mb-4"></div>
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
            className="inline-flex items-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-xl hover:bg-brand-yellow/90 transition-colors"
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
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const readingTime = getReadingTime(post.content.rendered);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background */}
        {featuredImage && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 blur-2xl scale-110"
              style={{ backgroundImage: `url(${featuredImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark"></div>
          </>
        )}

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao Blog
          </Link>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat: any) => (
                <span 
                  key={cat.id}
                  className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase tracking-wider rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 
            className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
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
                    className="w-10 h-10 rounded-full border-2 border-white/10"
                  />
                )}
                <div>
                  <p className="text-white font-medium">{author.name}</p>
                  <p className="text-xs text-neutral-500">Autor</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-brand-yellow" />
              {new Date(post.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-purple" />
              {readingTime} min de leitura
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="max-w-5xl mx-auto px-4 -mt-4 mb-12">
          <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <img 
              src={featuredImage}
              alt={stripHtml(post.title.rendered)}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <article 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-neutral-300 prose-p:leading-relaxed
            prose-a:text-brand-yellow prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-blockquote:border-l-brand-yellow prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
            prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-brand-yellow prose-code:font-mono prose-code:text-sm
            prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:border prose-img:border-white/5
            prose-ul:text-neutral-300 prose-ol:text-neutral-300
            prose-li:marker:text-brand-yellow"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 flex-wrap">
              <Tag size={18} className="text-neutral-500" />
              {tags.map((tag: any) => (
                <span 
                  key={tag.id}
                  className="px-3 py-1 bg-white/5 text-neutral-400 text-sm rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-neutral-400 font-medium flex items-center gap-2">
              <Share2 size={18} />
              Compartilhar este artigo
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleShare('facebook')}
                className="p-3 bg-white/5 rounded-xl hover:bg-[#1877F2] transition-colors group"
                aria-label="Compartilhar no Facebook"
              >
                <Facebook size={20} className="text-neutral-400 group-hover:text-white" />
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="p-3 bg-white/5 rounded-xl hover:bg-[#1DA1F2] transition-colors group"
                aria-label="Compartilhar no Twitter"
              >
                <Twitter size={20} className="text-neutral-400 group-hover:text-white" />
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="p-3 bg-white/5 rounded-xl hover:bg-[#0A66C2] transition-colors group"
                aria-label="Compartilhar no LinkedIn"
              >
                <Linkedin size={20} className="text-neutral-400 group-hover:text-white" />
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-neutral-400 hover:text-white text-sm font-medium"
              >
                Copiar link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-white/5 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-2xl font-bold text-white mb-8">Artigos Relacionados</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <Link 
                  key={relPost.id}
                  to={`/blog/${relPost.slug}`}
                  className="group"
                >
                  <article className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-yellow/30 transition-all hover:-translate-y-1">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${relPost.id}/600/400?grayscale`}
                        alt={stripHtml(relPost.title.rendered)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                        <Calendar size={12} />
                        {new Date(relPost.date).toLocaleDateString('pt-BR')}
                      </div>
                      <h3 
                        className="text-lg font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2"
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
      <div className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Gostou do conteúdo?
          </h2>
          <p className="text-neutral-400 mb-8">
            Descubra como o EasySplit pode ajudar você a otimizar suas conversões com testes A/B.
          </p>
          <Link 
            to="/pricing"
            className="inline-flex items-center gap-2 bg-brand-yellow text-black font-bold px-8 py-4 rounded-xl hover:bg-brand-yellow/90 transition-colors"
          >
            Conhecer o EasySplit
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
