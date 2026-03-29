import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTranslations, loadTranslations, type SupportedLang, SUPPORTED_LANGS } from '@/i18n';
import type { Translations } from '@/i18n/types';

interface LanguageContextValue {
  lang: SupportedLang;
  t: Translations;
  langPrefix: string;
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

  const [translations, setTranslations] = useState<Translations>(getTranslations(lang));

  useEffect(() => {
    if (lang !== 'en') {
      loadTranslations(lang).then(setTranslations);
    } else {
      setTranslations(getTranslations('en'));
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    t: translations,
    langPrefix: lang === 'en' ? '' : `/${lang}`,
  }), [lang, translations]);

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
