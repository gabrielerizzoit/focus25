

# SEO Homepage Optimization (Revised Plan)

## Overview

Optimize the Focus25 homepage with proper heading structure, SEO content below the timer, FAQ section with JSON-LD, and mid-content CTA. All text content stays as plain strings in i18n files — JSX structure is built in React components.

## Changes

### 1. Clean `index.html` — Remove Duplicate Meta Tags

Remove lines 15–22 (title, description, keywords, og:*, twitter:card, canonical) since `SEOHead` handles these dynamically. Keep: charset, viewport, favicon, GA script, JSON-LD.

### 2. Extend Translation Types (`src/i18n/types.ts`)

Add `homepageSEO` to `HomepageContent` with **plain text strings only** (no HTML):

```ts
interface HomepageContent {
  title: string;
  description: string;  // trimmed to ~150 chars
  keywords: string;
  seo: {
    h1: string;                    // "Free Pomodoro Timer Online"
    howItWorksTitle: string;       // "How the Pomodoro Technique Works"
    howItWorksP1: string;
    howItWorksP2: string;
    howItWorksSteps: string[];     // 4 steps
    benefitsTitle: string;         // "Benefits of Using a Focus Timer"
    benefitsItems: string[];       // 4–5 bullet points
    whyTitle: string;              // "Why Choose Focus25"
    whyP1: string;
    whyFeatures: string[];         // 4 feature bullets
    ctaText: string;               // "Start a 25-minute focus session now"
    faqTitle: string;              // "Frequently Asked Questions"
    faqItems: { q: string; a: string }[];  // 3 FAQ items
  };
}
```

### 3. New Component: `HomepageSEO` (`src/components/HomepageSEO.tsx`)

A React component that builds proper JSX structure using translated text:

- **H2** "How the Pomodoro Technique Works" + paragraphs + ordered list of steps
- **H2** "Benefits of Using a Focus Timer" + unordered list
- **Mid-content CTA button** linking to `#` (scroll to top / timer)
- **H2** "Why Choose Focus25" + paragraph + feature list
- **H2** "Frequently Asked Questions" + accordion or simple Q&A blocks
- External links to Wikipedia Pomodoro Technique and francescocirillo.com with `target="_blank" rel="noopener noreferrer"`
- Internal links to `/study-timer`, `/focus-timer`, `/blog/what-is-pomodoro-technique`
- Styled with `max-w-3xl mx-auto` for readability

### 4. Update `Index.tsx`

- Add **H1** ("Free Pomodoro Timer Online") **above** the timer, visible above the fold
- Render `<HomepageSEO />` **below** the timer
- Add FAQ JSON-LD via `<Helmet>` with `FAQPage` schema

### 5. Populate Translations (all 7 languages)

Add `seo` object to `homepage` in `en.ts`, `it.ts`, `fr.ts`, `es.ts`, `pt.ts`, `hi.ts`, `tl.ts` — plain text strings only, properly localized with natural keyword usage.

Shorten `description` to ~150 chars in all languages.

### 6. FAQ JSON-LD

Injected via `<Helmet>` in `Index.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

Questions dynamically pulled from `t.homepage.seo.faqItems`.

## File Summary

| File | Action |
|------|--------|
| `index.html` | Remove duplicate meta tags (lines 15–22) |
| `src/i18n/types.ts` | Extend `HomepageContent` with `seo` field |
| `src/components/HomepageSEO.tsx` | New — JSX structure with translated text |
| `src/pages/Index.tsx` | Add H1 above timer, HomepageSEO below, FAQ JSON-LD |
| `src/i18n/en.ts` | Add `seo` strings, shorten description |
| `src/i18n/it.ts` | Same (Italian) |
| `src/i18n/fr.ts` | Same (French) |
| `src/i18n/es.ts` | Same (Spanish) |
| `src/i18n/pt.ts` | Same (Portuguese) |
| `src/i18n/hi.ts` | Same (Hindi) |
| `src/i18n/tl.ts` | Same (Filipino) |

