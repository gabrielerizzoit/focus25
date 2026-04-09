import { ReactNode } from 'react';

export type SupportedLang = 'en' | 'it' | 'fr' | 'es' | 'pt' | 'hi' | 'tl';

export interface UIStrings {
  focus: string;
  shortBreak: string;
  longBreak: string;
  start: string;
  pause: string;
  reset: string;
  settings: string;
  autoSwitch: string;
  autoSwitchTooltip: string;
  longBreakTooltip: string;
  focusDuration: string;
  shortBreakDuration: string;
  longBreakDuration: string;
  todaySessions: string;
  tabMessage: string;
  startFocusSession: string;
  rain: string;
  cafe: string;
  whiteNoise: string;
  sessionComplete: string;
  breakOver: string;
  productivityBlog: string;
}

export interface SEOPageContent {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  content: string; // HTML string
}

export interface BlogArticleContent {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  content: string; // HTML string
  relatedLinks: { href: string; label: string }[];
}

export interface LegalPageContent {
  title: string;
  description: string;
  content: string; // HTML string
}

export interface FooterStrings {
  timers: string;
  presetTimers: string;
  resources: string;
  pomodoroTimer: string;
  focusTimer: string;
  studyTimer: string;
  onlineTimer: string;
  freeTimer: string;
  minuteTimer25: string;
  minuteTimer15: string;
  minuteTimer10: string;
  minuteTimer5: string;
  pomofocusAlt: string;
  marinaraAlt: string;
  timerOnline: string;
  blog: string;
  howItWorks: string;
  faq: string;
  terms: string;
  privacy: string;
  fairUse: string;
  copyright: string;
}

export interface HomepageSEOContent {
  h1: string;
  howItWorksTitle: string;
  howItWorksP1: string;
  howItWorksP2: string;
  howItWorksSteps: string[];
  benefitsTitle: string;
  benefitsItems: string[];
  whyTitle: string;
  whyP1: string;
  whyFeatures: string[];
  ctaText: string;
  faqTitle: string;
  faqItems: { q: string; a: string }[];
}

export interface HomepageContent {
  title: string;
  description: string;
  keywords: string;
  seo: HomepageSEOContent;
}

export interface BlogIndexContent {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  articles: { slug: string; title: string; excerpt: string }[];
}

export interface Translations {
  ui: UIStrings;
  footer: FooterStrings;
  homepage: HomepageContent;
  blogIndex: BlogIndexContent;
  seoPages: Record<string, SEOPageContent>;
  blogArticles: Record<string, BlogArticleContent>;
  legalPages: Record<string, LegalPageContent>;
  langName: string;
  langNameEnglish: string;
}
