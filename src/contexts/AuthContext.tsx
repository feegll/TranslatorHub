
"use client";

import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType, AuthState, UserProfile } from '@/types';
import { ROLES } from '@/lib/constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user: UserProfile = JSON.parse(storedUser);
        setAuthState({ user, loading: false, error: null });
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      setAuthState({ user: null, loading: false, error: new Error('Failed to load user data') });
    }
  }, []);

  const login = async (identifier: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    if (identifier === "admin" && password === "1269") {
      const user: UserProfile = {
        id: "admin",
        email: "admin@example.com",
        name: "Administrator",
        role: ROLES.ADMIN,
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      setAuthState({ user, loading: false, error: null });
    } else {
      setAuthState({ user: null, loading: false, error: new Error('Invalid username or password') });
    }
  };

  const logout = async (): Promise<void> => {
    setAuthState({ user: null, loading: false, error: null });
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
