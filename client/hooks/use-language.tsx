"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { UserProfile } from '@/lib/types';
import { i18n } from '@/lib/i18n';

type Language = UserProfile['preferredLanguage'];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof i18n.translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('English');

  const t = (key: keyof typeof i18n.translations) => {
    return i18n.translations[key][language] || i18n.translations[key]['English'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
