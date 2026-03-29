import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getTranslations, type SupportedLang, SUPPORTED_LANGS } from '@/i18n';
import type { Translations } from '@/i18n/types';

interface LanguageContextValue {
  lang: SupportedLang;
  t: Translations;
  langPrefix: string; // '' for en, '/it' for Italian, etc.
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  const lang = useMemo<SupportedLang>(() => {
    const firstSegment = location.pathname.split('/')[1];
    if (firstSegment && SUPPORTED_LANGS.includes(firstSegment as SupportedLang) && firstSegment !== 'en') {
      return firstSegment as SupportedLang;
    }
    return 'en';
  }, [location.pathname]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    t: getTranslations(lang),
    langPrefix: lang === 'en' ? '' : `/${lang}`,
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
