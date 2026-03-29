import type { Translations, SupportedLang } from './types';
export type { SupportedLang } from './types';

// Lazy-load translations to keep bundle small
const translationModules: Record<SupportedLang, () => Promise<{ default: Translations }>> = {
  en: () => import('./en'),
  it: () => import('./it'),
  fr: () => import('./fr'),
  es: () => import('./es'),
  pt: () => import('./pt'),
  hi: () => import('./hi'),
  tl: () => import('./tl'),
};

// Cache loaded translations
const cache: Partial<Record<SupportedLang, Translations>> = {};

// English is loaded eagerly for fast initial render
import en from './en';
cache.en = en;

export const SUPPORTED_LANGS: SupportedLang[] = ['en', 'it', 'fr', 'es', 'pt', 'hi', 'tl'];

export const LANG_LABELS: Record<SupportedLang, string> = {
  en: 'EN',
  it: 'IT',
  fr: 'FR',
  es: 'ES',
  pt: 'PT',
  hi: 'HI',
  tl: 'TL',
};

export const LANG_NAMES: Record<SupportedLang, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  hi: 'हिन्दी',
  tl: 'Filipino',
};

export function getTranslations(lang: SupportedLang): Translations {
  return cache[lang] || cache.en!;
}

export async function loadTranslations(lang: SupportedLang): Promise<Translations> {
  if (cache[lang]) return cache[lang]!;
  const mod = await translationModules[lang]();
  cache[lang] = mod.default;
  return mod.default;
}
