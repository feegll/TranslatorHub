
"use client";

import LanguageContext from '@/contexts/LanguageContext';
import type { LanguageContextType } from '@/types';
import { useContext } from 'react';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
