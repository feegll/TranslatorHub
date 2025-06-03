
"use client";

import type { LanguageCode } from '@/lib/constants';
import { LANGUAGES } from '@/lib/constants';
import type { LanguageContextType, Translations } from '@/types';
import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';

import enTranslations from '@/locales/en.json';
import ruTranslations from '@/locales/ru.json';

const translations: Record<LanguageCode, Translations> = {
  en: enTranslations,
  ru: ruTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('translator_hub_language') as LanguageCode | null;
    if (storedLang && LANGUAGES.some(lang => lang.code === storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (langCode: LanguageCode) => {
    setLanguage(langCode);
    localStorage.setItem('translator_hub_language', langCode);
  };

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: string | Translations | undefined = translations[language];

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = (result as Translations)[k];
      } else {
        result = undefined; // Key not found
        break;
      }
    }
    
    if (typeof result !== 'string') {
      // console.warn(`Translation key "${key}" not found for language "${language}".`);
      return key; // Return the key itself if not found or not a string
    }

    if (replacements) {
      return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
        return acc.replace(new RegExp(`{{${placeholder}}}`, 'g'), String(value));
      }, result as string);
    }

    return result as string;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
