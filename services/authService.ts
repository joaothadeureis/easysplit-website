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

/**
 * Get stored auth state from localStorage
 */
export const getStoredAuth = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
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
 * Store auth state in localStorage
 */
const storeAuth = (auth: AuthState): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } catch (e) {
    console.error('Error storing auth state:', e);
  }
};

/**
 * Clear auth state from localStorage
 */
const clearAuth = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing auth state:', e);
  }
};

/**
 * Login with WordPress username and Application Password
 * Creates a Base64 encoded token for Basic Authentication
 */
export const login = async (username: string, password: string): Promise<AuthState> => {
  try {
    // Remove spaces from Application Password (WordPress shows it with spaces for readability)
    const cleanPassword = password.replace(/\s/g, '');
    const cleanUsername = username.trim();
    
    // Debug: log what we're sending
    console.log('Attempting login with username:', cleanUsername);
    console.log('Password length after removing spaces:', cleanPassword.length);
    
    // Create Base64 encoded credentials for WordPress Basic Auth
    // Use encodeURIComponent to handle special characters properly
    const credentials = `${cleanUsername}:${cleanPassword}`;
    const token = btoa(unescape(encodeURIComponent(credentials)));
    
    console.log('Making request to:', `${API_URL}/users/me`);

    // Validate credentials by fetching user info
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${token}`
      },
      credentials: 'omit' // Don't send cookies
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      if (response.status === 401) {
        throw new Error('Credenciais inválidas. Use uma Senha de Aplicativo do WordPress.');
      }
      throw new Error('Erro ao conectar com WordPress');
    }

    const user = await response.json();

    // User authenticated successfully - if we got here, the user is valid
    // WordPress API returns user data only for authenticated users
    // Administrator users always have all permissions
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

    storeAuth(authState);
    return authState;
  } catch (error) {
    console.error('Login error:', error);
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
