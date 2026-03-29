

# Focus25 — Complete Update Plan

## Overview

This update adds 7 features: audio file swap, timer tooltips, legal pages, footer update, blog/nav cleanup, and full multi-language support (7 languages × 23 pages = 161 localized routes).

---

## Phase 1: Quick Fixes (audio, tooltips, footer, nav)

### 1A. Audio Files
- Copy uploaded `Rain-2.wav`, `Cafe-2.mp3`, `white-noise-2.wav` to `public/audio/` as `rain.wav`, `cafe.mp3`, `white-noise.wav`
- Update `useAudio.ts` sound file paths: `rain.wav`, `cafe.mp3`, `white-noise.wav`

### 1B. Timer Tooltips
- In `Timer.tsx`, add `Info` icon + `Tooltip` next to:
  - Auto-switch toggle: "Automatically switches between focus and break sessions"
  - Long Break tab: "Long break starts after 4 focus sessions"
- Uses existing `Tooltip` component from `src/components/ui/tooltip.tsx`

### 1C. Footer Update
- Add legal links row: Terms, Privacy, Fair Use, FAQ, How It Works
- Keep existing structure, add new section below

### 1D. Navigation Cleanup
- Verify homepage has no blog links in main area (already clean)
- Blog articles already use CTA instead of embedded timer (already done)

---

## Phase 2: Legal & Info Pages (5 pages)

Create simple text content pages using `SEOHead`, `Header`, `Footer`:

| Page | Route | Content |
|------|-------|---------|
| Terms of Service | `/terms` | Usage terms, disclaimers, liability |
| Privacy Policy | `/privacy` | No data collection, localStorage only, no cookies |
| Fair Use | `/fair-use` | Audio attribution, open-source notice |
| FAQ | `/faq` | 8-10 common questions about the timer |
| How It Works | `/how-it-works` | Pomodoro method + Focus25 features explained |

Add all 5 routes to `App.tsx`.

---

## Phase 3: Multi-Language System

### Architecture

Create a translation system with static content per language. Each language gets prefixed routes.

**Languages:** `en` (default, no prefix), `it`, `fr`, `es`, `pt`, `hi`, `tl`

### File Structure
```text
src/i18n/
  types.ts          — TypeScript interfaces for translation shape
  en.ts             — English (UI strings + all page content)
  it.ts             — Italian
  fr.ts             — French
  es.ts             — Spanish
  pt.ts             — Portuguese
  hi.ts             — Hindi
  tl.ts             — Filipino
  index.ts          — registry + getTranslation helper
src/contexts/LanguageContext.tsx  — provider reading lang from URL
src/components/LanguageSwitcher.tsx — dropdown in header
```

### Translation File Shape
Each language file exports an object with:
- **UI strings**: timer labels, button text, tooltips, footer text, session stats
- **SEO pages** (12): title, description, keywords, heading, body paragraphs (300-600 words each)
- **Blog articles** (10): title, description, keywords, heading, full article content (800-1200 words)
- **Legal pages** (5): title, content

### Routing Strategy
Update `App.tsx` to register prefixed routes for each non-English language:

```tsx
const LANGS = ['it','fr','es','pt','hi','tl'];
// For each lang, duplicate all routes with /${lang}/ prefix
// Pages read language from URL param and pull correct translations
```

All page components (`TimerPage`, `BlogLayout`, SEO pages, blog articles) will be refactored to accept a `lang` prop and render translated content from the i18n files.

### SEO Implementation
- `SEOHead.tsx`: Add `hreflang` link tags for all 7 language variants of each page
- `SEOHead.tsx`: Set `<html lang="xx">` dynamically via Helmet
- Each page gets unique translated meta title + description

### Language Switcher
- Small dropdown in `Header.tsx` top-right
- Shows current language code (EN/IT/FR/ES/PT/HI/TL)
- On select, navigates to same page in selected language
- Clean, minimal design

### Content Generation Approach
Each language file will contain naturally adapted (not literally translated) content with localized SEO keywords. Articles will maintain the same structure but use natural phrasing for each language.

---

## Phase 4: Wire Everything Together

- Update `App.tsx` with all new routes (5 legal + ~138 i18n routes)
- Wrap app in `LanguageProvider`
- Update `Header.tsx` with `LanguageSwitcher`
- Update all page components to use translations
- Update internal links throughout to respect current language prefix

---

## Implementation Order

1. Audio files + tooltips + footer (quick wins)
2. Legal pages
3. i18n system (types, context, English extraction)
4. Translation files (one language at a time)
5. Route registration + component refactoring
6. Language switcher + hreflang tags

---

## Technical Notes

- Translation files will be large (~2000-3000 lines each) — this is intentional for static SEO content
- No runtime translation APIs — all content is pre-written
- Platform uses React Router (not true static HTML), but react-helmet-async ensures proper meta tags for crawlers
- Timer logic (`useTimer.ts`) remains unchanged — already uses `Date.now()`
- Blog articles do NOT embed the timer — only CTA button (already implemented)

