import React, { useEffect, useState } from 'react';
import { WPCategory, WPTag } from '../types';
import { 
  fetchCategories, 
  fetchTags, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  createTag,
  updateTag,
  deleteTag
} from '../services/wordpressService';
import { 
  FolderOpen, 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

type TabType = 'categories' | 'tags';

interface EditingItem {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export const TaxonomyManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('categories');
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [tags, setTags] = useState<WPTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, tagsData] = await Promise.all([
        fetchCategories(),
        fetchTags()
      ]);
      setCategories(cats);
      setTags(tagsData);
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '' });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: WPCategory | WPTag) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description || ''
    });
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || ''
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSaving(true);
    setError(null);

    try {
      if (activeTab === 'categories') {
        if (editingItem) {
          const updated = await updateCategory(editingItem.id, formData);
          setCategories(categories.map(c => c.id === updated.id ? updated : c));
          setSuccess('Categoria atualizada com sucesso!');
        } else {
          const created = await createCategory(formData);
          setCategories([...categories, created]);
          setSuccess('Categoria criada com sucesso!');
        }
      } else {
        if (editingItem) {
          const updated = await updateTag(editingItem.id, formData);
          setTags(tags.map(t => t.id === updated.id ? updated : t));
          setSuccess('Tag atualizada com sucesso!');
        } else {
          const created = await createTag(formData);
          setTags([...tags, created]);
          setSuccess('Tag criada com sucesso!');
        }
      }
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    setSaving(true);
    setError(null);

    try {
      if (activeTab === 'categories') {
        await deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
        setSuccess('Categoria excluída com sucesso!');
      } else {
        await deleteTag(id);
        setTags(tags.filter(t => t.id !== id));
        setSuccess('Tag excluída com sucesso!');
      }
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const currentItems = activeTab === 'categories' ? categories : tags;

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-fit">
        <button
          onClick={() => { setActiveTab('categories'); resetForm(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'categories' 
              ? 'bg-brand-purple text-white' 
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <FolderOpen size={18} />
          Categorias ({categories.length})
        </button>
        <button
          onClick={() => { setActiveTab('tags'); resetForm(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'tags' 
              ? 'bg-brand-purple text-white' 
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tag size={18} />
          Tags ({tags.length})
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          <AlertCircle size={20} />
          {error}
          <button onClick={() => setError(null)} className="ml-auto hover:text-red-300">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
          <Check size={20} />
          {success}
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-brand-yellow text-black font-bold px-5 py-3 rounded-xl hover:bg-brand-yellow/90 transition-colors"
        >
          <Plus size={20} />
          Nova {activeTab === 'categories' ? 'Categoria' : 'Tag'}
        </button>
      )}

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">
              {editingItem ? 'Editar' : 'Nova'} {activeTab === 'categories' ? 'Categoria' : 'Tag'}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Nome *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={`Nome da ${activeTab === 'categories' ? 'categoria' : 'tag'}`}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="slug-da-url (opcional)"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50"
            />
            <p className="text-xs text-neutral-500 mt-1">Deixe vazio para gerar automaticamente</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrição (opcional)"
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow/50 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving || !formData.name.trim()}
              className="flex items-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-xl hover:bg-brand-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check size={18} />
                  {editingItem ? 'Atualizar' : 'Criar'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-brand-yellow" />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="p-12 text-center">
            {activeTab === 'categories' ? (
              <FolderOpen className="mx-auto text-neutral-600 mb-4" size={48} />
            ) : (
              <Tag className="mx-auto text-neutral-600 mb-4" size={48} />
            )}
            <h3 className="text-lg font-medium text-white mb-2">
              Nenhuma {activeTab === 'categories' ? 'categoria' : 'tag'} encontrada
            </h3>
            <p className="text-neutral-400">
              Clique no botão acima para criar
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {currentItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/20 flex items-center justify-center">
                    {activeTab === 'categories' ? (
                      <FolderOpen size={18} className="text-brand-purple" />
                    ) : (
                      <Tag size={18} className="text-brand-purple" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <p className="text-sm text-neutral-500">
                      /{item.slug}
                      {item.count !== undefined && (
                        <span className="ml-2">• {item.count} posts</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {deleteConfirm === item.id ? (
                    <>
                      <span className="text-sm text-red-400 mr-2">Confirmar exclusão?</span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={saving}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-neutral-400 hover:text-brand-yellow hover:bg-brand-yellow/10 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
