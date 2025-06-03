
"use client";

import React, { type ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
};
