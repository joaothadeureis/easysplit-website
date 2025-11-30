import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthState, WPUser, getStoredAuth, login as authLogin, logout as authLogout, validateToken } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: WPUser | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check stored auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const stored = getStoredAuth();
      if (stored.token) {
        const isValid = await validateToken();
        if (isValid) {
          setAuthState(stored);
        } else {
          authLogout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (username: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      const newAuth = await authLogin(username, password, rememberMe);
      setAuthState(newAuth);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      token: authState.token,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
