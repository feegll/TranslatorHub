
import type { Role, TranslatorLevel, LanguageCode } from '@/lib/constants';

export interface UserProfile {
  id: string;
  email?: string | null;
  name?: string | null;
  role: Role;
  avatarUrl?: string;
}

export interface Translator {
  id: string;
  name: string;
  level: TranslatorLevel;
  weeklyBalance?: number;
  weeklyActions?: number;
  monthlyBalance?: number;
  avatarUrl?: string;
  // Add more stats as needed
}

export interface Spender {
  id: string;
  name: string;
  amountSpent: number;
}

// For language context
export type Translations = {
  [key: string]: string | Translations;
};

export type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
};

// For auth context
export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// For data input forms
export interface DailyInputData {
  date: Date;
  translatorId: string;
  balance: number;
}

// Example for one of the AI flow types
export interface AnalyzeTranslatorLevelInput {
  name: string;
  weeklyBalance: number;
  weeklyActions: number;
  monthlyBalance: number;
}

export interface AnalyzeTranslatorLevelOutput {
  level: TranslatorLevel;
}
