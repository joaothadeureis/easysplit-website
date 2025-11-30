import { API_URL } from '../constants';

export interface WPUser {
  id: number;
  name: string;
  email?: string;
  description?: string;
  slug?: string;
  avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
  capabilities?: Record<string, boolean>;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: WPUser | null;
  token: string | null; // Base64 encoded credentials for WordPress Basic Auth
}

const AUTH_STORAGE_KEY = 'blog_auth';
const REMEMBER_KEY = 'blog_auth_remember';

/**
 * Check if user chose to be remembered
 */
const isRemembered = (): boolean => {
  return localStorage.getItem(REMEMBER_KEY) === 'true';
};

/**
 * Get the appropriate storage based on remember preference
 */
const getStorage = (): Storage => {
  return isRemembered() ? localStorage : sessionStorage;
};

/**
 * Get stored auth state from storage
 */
export const getStoredAuth = (): AuthState => {
  try {
    // Check localStorage first (for remembered sessions)
    let stored = localStorage.getItem(AUTH_STORAGE_KEY);
    
    // If not in localStorage, check sessionStorage
    if (!stored) {
      stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    }
    
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        isAuthenticated: !!parsed.token,
        user: parsed.user || null,
        token: parsed.token || null
      };
    }
  } catch (e) {
    console.error('Error reading auth state:', e);
  }
  return { isAuthenticated: false, user: null, token: null };
};

/**
 * Store auth state in appropriate storage
 */
const storeAuth = (auth: AuthState, rememberMe: boolean): void => {
  try {
    const data = JSON.stringify(auth);
    
    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, 'true');
      localStorage.setItem(AUTH_STORAGE_KEY, data);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.setItem(AUTH_STORAGE_KEY, data);
    }
  } catch (e) {
    console.error('Error storing auth state:', e);
  }
};

/**
 * Clear auth state from all storages
 */
const clearAuth = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing auth state:', e);
  }
};

/**
 * Fetch with retry for connection issues
 */
const fetchWithRetry = async (url: string, options: RequestInit, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Falha na conexão após múltiplas tentativas');
};

/**
 * Login with WordPress username and Application Password
 * Creates a Base64 encoded token for Basic Authentication
 * @param rememberMe - If true, saves session in localStorage for persistence across browser sessions
 */
export const login = async (username: string, password: string, rememberMe: boolean = false): Promise<AuthState> => {
  try {
    // Remove spaces from Application Password (WordPress shows it with spaces for readability)
    const cleanPassword = password.replace(/\s/g, '');
    const cleanUsername = username.trim();
    
    // Create Base64 encoded credentials for WordPress Basic Auth
    const credentials = `${cleanUsername}:${cleanPassword}`;
    const token = btoa(unescape(encodeURIComponent(credentials)));
    
    console.log('Attempting login for:', cleanUsername);

    // Validate credentials by fetching user info (with retry)
    const response = await fetchWithRetry(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${token}`,
        'Cache-Control': 'no-cache'
      },
      credentials: 'omit'
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      if (response.status === 401) {
        throw new Error('Credenciais inválidas. Use uma Senha de Aplicativo do WordPress.');
      }
      if (response.status === 403) {
        throw new Error('Acesso negado. Verifique suas permissões no WordPress.');
      }
      throw new Error('Erro ao conectar com WordPress');
    }

    const user = await response.json();
    console.log('User authenticated:', user.name, 'ID:', user.id);

    const authState: AuthState = {
      isAuthenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        slug: user.slug,
        avatar_urls: user.avatar_urls,
        capabilities: user.capabilities
      },
      token
    };

    storeAuth(authState, rememberMe);
    return authState;
  } catch (error) {
    console.error('Login error:', error);
    // Improve error message for network issues
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    throw error;
  }
};

/**
 * Logout - clear stored auth
 */
export const logout = (): void => {
  clearAuth();
};

/**
 * Get auth headers for WordPress API requests (Basic Auth)
 */
export const getAuthHeaders = (): HeadersInit => {
  const auth = getStoredAuth();
  if (auth.token) {
    return {
      'Authorization': `Basic ${auth.token}`,
      'Content-Type': 'application/json'
    };
  }
  return {
    'Content-Type': 'application/json'
  };
};

/**
 * Check if current token is still valid
 */
export const validateToken = async (): Promise<boolean> => {
  const auth = getStoredAuth();
  if (!auth.token) return false;

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Basic ${auth.token}`
      }
    });
    return response.ok;
  } catch {
    return false;
  }
};
