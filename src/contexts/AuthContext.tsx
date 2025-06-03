
"use client";

import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserProfile, AuthContextType, AuthState } from '@/types';
import { ROLES, type Role } from '@/lib/constants';
import { login as authServiceLogin, logout as authServiceLogout } from '@/lib/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Simulating fetching user role from Firestore
          // In a real app, you'd fetch this based on firebaseUser.uid
          let role: Role = ROLES.TRANSLATOR; // Default role
          let name = firebaseUser.displayName || firebaseUser.email;

          // This is a mock for login logic, replace with actual Firestore fetch
          if (firebaseUser.email === 'admin@translatorhub.com' || firebaseUser.uid === 'admin') { // Check against known admin UID if possible
             role = ROLES.ADMIN;
             name = 'Administrator';
          } else if (firebaseUser.email === 'translator@translatorhub.com' || firebaseUser.uid === 'translator') {
            role = ROLES.TRANSLATOR;
            name = 'Translator User';
          } else {
            // Attempt to fetch user profile if not special cased
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data() as UserProfile;
                role = userData.role || ROLES.TRANSLATOR;
                name = userData.name || firebaseUser.displayName || firebaseUser.email;
            }
          }
          
          const userProfile: UserProfile = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: name,
            role: role,
            avatarUrl: firebaseUser.photoURL || undefined,
          };
          setAuthState({ user: userProfile, loading: false, error: null });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setAuthState({ user: null, loading: false, error: error instanceof Error ? error : new Error('Failed to load user profile') });
        }
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (identifier: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await authServiceLogin(identifier, password);
      // Auth state will be updated by onAuthStateChanged listener
    } catch (error) {
      console.error("Login failed:", error);
      setAuthState(prev => ({ ...prev, loading: false, error: error instanceof Error ? error : new Error('Login failed') }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await authServiceLogout();
      // Auth state will be updated by onAuthStateChanged listener
    } catch (error) {
      console.error("Logout failed:", error);
      setAuthState(prev => ({ ...prev, loading: false, error: error instanceof Error ? error : new Error('Logout failed') }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
