import { API_URL, MOCK_BLOG_POSTS, USE_MOCK_DATA } from '../constants';
import { BlogPost, BlogPostsResponse, WPCategory, WPTag, WPPagination } from '../types';
import { getStoredAuth } from './authService';

const DEFAULT_TIMEOUT = 10000;

/**
 * Creates an AbortController with timeout
 */
const createTimeoutController = (timeout: number = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
};

/**
 * Helper to return mock data when API is not available
 */
const getMockPostsResponse = (page: number = 1, perPage: number = 9): BlogPostsResponse => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedPosts = MOCK_BLOG_POSTS.slice(start, end);
  
  return {
    posts: paginatedPosts as unknown as BlogPost[],
    pagination: {
      total: MOCK_BLOG_POSTS.length,
      totalPages: Math.ceil(MOCK_BLOG_POSTS.length / perPage),
      currentPage: page
    }
  };
};

/**
 * Fetch posts from WordPress REST API with pagination
 */
export const fetchPosts = async (
  page: number = 1, 
  perPage: number = 9,
  categoryId?: number,
  searchQuery?: string
): Promise<BlogPostsResponse> => {
  if (USE_MOCK_DATA) {
    return getMockPostsResponse(page, perPage);
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    // WordPress REST API endpoint with _embed for featured images and author
    let url = `${API_URL}/posts?page=${page}&per_page=${perPage}&_embed`;
    
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const response = await fetch(url, { 
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const posts = await response.json();
    
    if (!Array.isArray(posts)) {
      throw new Error('Invalid API response format');
    }

    // Extract pagination info from WordPress headers
    const pagination: WPPagination = {
      total: parseInt(response.headers.get('X-WP-Total') || '0', 10),
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1', 10),
      currentPage: page
    };

    return { posts, pagination };
  } catch (error) {
    console.warn('Failed to fetch from WordPress API. Using mock data as fallback.', error);
    return getMockPostsResponse(page, perPage);
  }
};

/**
 * Helper to get a mock post by slug
 */
const getMockPostBySlug = (slug: string): BlogPost | null => {
  const mockPost = MOCK_BLOG_POSTS.find(p => p.slug === slug);
  if (mockPost) {
    return {
      ...mockPost,
      content: mockPost.content || { 
        rendered: `<p>${mockPost.excerpt.rendered}</p><p>Este é um conteúdo de exemplo. Inicie o servidor CMS para criar posts reais.</p>`,
        protected: false 
      },
      modified: mockPost.date,
      link: `#/blog/${mockPost.slug}`
    } as BlogPost;
  }
  return null;
};

/**
 * Fetch a single post by slug from WordPress
 */
export const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (USE_MOCK_DATA) {
    return getMockPostBySlug(slug);
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    // WordPress uses ?slug= parameter
    const response = await fetch(`${API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`, { 
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const posts = await response.json();
    
    // WordPress returns an array, get first item
    if (Array.isArray(posts) && posts.length > 0) {
      return posts[0];
    }
    
    return getMockPostBySlug(slug);
  } catch (error) {
    console.warn('Failed to fetch post from WordPress API.', error);
    return getMockPostBySlug(slug);
  }
};

/**
 * Fetch a single post by ID from WordPress
 */
export const fetchPostById = async (id: number): Promise<BlogPost | null> => {
  if (USE_MOCK_DATA) {
    const mockPost = MOCK_BLOG_POSTS.find(p => p.id === id);
    return mockPost as BlogPost | null;
  }

  const auth = getStoredAuth();
  
  try {
    const { controller, timeoutId } = createTimeoutController();

    const headers: HeadersInit = { 'Accept': 'application/json' };
    if (auth.token) {
      headers['Authorization'] = `Basic ${auth.token}`;
    }

    const response = await fetch(`${API_URL}/posts/${id}?_embed`, { 
      signal: controller.signal,
      headers
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch post from API.', error);
    return null;
  }
};

/**
 * Fetch all categories
 */
export const fetchCategories = async (): Promise<WPCategory[]> => {
  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/categories`, { 
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch categories from API.', error);
    return [];
  }
};

/**
 * Fetch all tags
 */
export const fetchTags = async (): Promise<WPTag[]> => {
  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/tags`, { 
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch tags from API.', error);
    return [];
  }
};

/**
 * Fetch related posts (by category)
 */
export const fetchRelatedPosts = async (
  postId: number, 
  categoryIds: number[], 
  limit: number = 3
): Promise<BlogPost[]> => {
  try {
    if (categoryIds.length === 0) {
      // Fetch any posts excluding current
      const { posts } = await fetchPosts(1, limit + 1);
      return posts.filter(p => p.id !== postId).slice(0, limit);
    }

    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(
      `${API_URL}/posts?category=${categoryIds[0]}&per_page=${limit + 1}`, 
      { 
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      }
    );
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return [];
    }
    
    const posts = await response.json();
    return posts.filter((p: BlogPost) => p.id !== postId).slice(0, limit);
  } catch (error) {
    console.warn('Failed to fetch related posts from API.', error);
    return [];
  }
};

/**
 * Search posts
 */
export const searchPosts = async (query: string, page: number = 1): Promise<BlogPostsResponse> => {
  return fetchPosts(page, 9, undefined, query);
};

// ==================== AUTHENTICATED ENDPOINTS (WordPress) ====================

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  status?: 'publish' | 'draft' | 'pending';
  categories?: number[];
  featured_media?: number;
}

export interface UpdatePostData extends Partial<CreatePostData> {}

/**
 * Create a new post in WordPress (requires authentication)
 */
export const createPost = async (data: CreatePostData): Promise<BlogPost> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para criar posts');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao criar post: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};

/**
 * Update an existing post in WordPress (requires authentication)
 */
export const updatePost = async (id: number, data: UpdatePostData): Promise<BlogPost> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para editar posts');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    // WordPress uses POST for updates (not PUT)
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao atualizar post: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update post:', error);
    throw error;
  }
};

/**
 * Delete a post in WordPress (requires authentication)
 */
export const deletePost = async (id: number): Promise<void> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para excluir posts');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/posts/${id}?force=true`, {
      method: 'DELETE',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao excluir post: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw error;
  }
};

/**
 * Upload media to WordPress (requires authentication)
 */
export const uploadMedia = async (file: File): Promise<{ id: number; source_url: string }> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para fazer upload');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Disposition': `attachment; filename="${file.name}"`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao fazer upload: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to upload media:', error);
    throw error;
  }
};

// ==================== CATEGORIES & TAGS MANAGEMENT ====================

export interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
  parent?: number;
}

export interface CreateTagData {
  name: string;
  slug?: string;
  description?: string;
}

/**
 * Create a new category in WordPress (requires authentication)
 */
export const createCategory = async (data: CreateCategoryData): Promise<WPCategory> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para criar categorias');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao criar categoria: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create category:', error);
    throw error;
  }
};

/**
 * Update a category in WordPress (requires authentication)
 */
export const updateCategory = async (id: number, data: Partial<CreateCategoryData>): Promise<WPCategory> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para editar categorias');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao atualizar categoria: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update category:', error);
    throw error;
  }
};

/**
 * Delete a category in WordPress (requires authentication)
 */
export const deleteCategory = async (id: number): Promise<void> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para excluir categorias');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/categories/${id}?force=true`, {
      method: 'DELETE',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao excluir categoria: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete category:', error);
    throw error;
  }
};

/**
 * Create a new tag in WordPress (requires authentication)
 */
export const createTag = async (data: CreateTagData): Promise<WPTag> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para criar tags');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/tags`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao criar tag: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create tag:', error);
    throw error;
  }
};

/**
 * Update a tag in WordPress (requires authentication)
 */
export const updateTag = async (id: number, data: Partial<CreateTagData>): Promise<WPTag> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para editar tags');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao atualizar tag: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update tag:', error);
    throw error;
  }
};

/**
 * Delete a tag in WordPress (requires authentication)
 */
export const deleteTag = async (id: number): Promise<void> => {
  const auth = getStoredAuth();
  if (!auth.token) {
    throw new Error('Autenticação necessária para excluir tags');
  }

  try {
    const { controller, timeoutId } = createTimeoutController();

    const response = await fetch(`${API_URL}/tags/${id}?force=true`, {
      method: 'DELETE',
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${auth.token}`
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao excluir tag: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete tag:', error);
    throw error;
  }
};
