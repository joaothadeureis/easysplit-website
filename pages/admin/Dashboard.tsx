import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BlogPost } from '../../types';
import { fetchPosts, deletePost } from '../../services/wordpressService';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  ExternalLink,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadPosts = async (page: number = 1, search?: string) => {
    setLoading(true);
    const { posts: data, pagination } = await fetchPosts(page, 10, undefined, search);
    setPosts(data);
    setTotalPages(pagination.totalPages);
    setCurrentPage(pagination.currentPage);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPosts(1, searchQuery);
  };

  const handleDelete = async (postId: number) => {
    setDeleteLoading(true);
    try {
      await deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
      setDeleteConfirm(null);
    } catch (error) {
      alert('Erro ao excluir post. Verifique suas permissões.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="text-brand-yellow" size={24} />
            <h1 className="text-xl font-bold text-white">Painel Admin</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <ExternalLink size={16} />
              Ver site
            </Link>
            
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              {user?.avatar_urls?.['48'] && (
                <img 
                  src={user.avatar_urls['48']} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-white text-sm font-medium hidden sm:block">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="text-brand-purple" size={28} />
              Gerenciar Posts
            </h2>
            <p className="text-neutral-400 mt-1">Crie, edite e gerencie os artigos do blog</p>
          </div>
          
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-brand-yellow text-black font-bold px-5 py-3 rounded-xl hover:bg-brand-yellow/90 transition-colors"
          >
            <Plus size={20} />
            Novo Post
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar posts..."
              className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          </div>
        </form>

        {/* Posts Table */}
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4, 5].map(n => (
                <div key={n} className="animate-pulse flex items-center gap-4">
                  <div className="w-16 h-12 bg-white/5 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/5 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-white/5 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="mx-auto text-neutral-600 mb-4" size={48} />
              <h3 className="text-lg font-medium text-white mb-2">Nenhum post encontrado</h3>
              <p className="text-neutral-400 mb-6">Comece criando seu primeiro artigo</p>
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 bg-brand-yellow text-black font-bold px-5 py-3 rounded-xl hover:bg-brand-yellow/90 transition-colors"
              >
                <Plus size={20} />
                Criar primeiro post
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <div className="col-span-1">Img</div>
                <div className="col-span-5">Título</div>
                <div className="col-span-2">Data</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Ações</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-white/5">
                {posts.map((post) => (
                  <div 
                    key={post.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors items-center"
                  >
                    {/* Image */}
                    <div className="hidden md:block col-span-1">
                      <img 
                        src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${post.id}/100/70`}
                        alt=""
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                    </div>

                    {/* Title */}
                    <div className="col-span-5">
                      <h3 
                        className="text-white font-medium line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <p className="text-neutral-500 text-sm mt-1 line-clamp-1">
                        /{post.slug}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 flex items-center gap-2 text-neutral-400 text-sm">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                        Publicado
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/posts/${post.id}/edit`}
                        className="p-2 text-neutral-400 hover:text-brand-yellow hover:bg-brand-yellow/10 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(post.id)}
                        className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                  <span className="text-sm text-neutral-400">
                    Página {currentPage} de {totalPages}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadPosts(currentPage - 1, searchQuery)}
                      disabled={currentPage === 1}
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => loadPosts(currentPage + 1, searchQuery)}
                      disabled={currentPage === totalPages}
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Excluir post?</h3>
                <p className="text-neutral-400 text-sm">Esta ação não pode ser desfeita.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleteLoading}
                className="flex-1 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteLoading}
                className="flex-1 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Excluir
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
