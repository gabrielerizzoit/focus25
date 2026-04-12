

# Advanced SEO Improvements + YouTube Integration

## Changes

### 1. Expand Homepage Content to ~700 words

Add 3 new sections to `HomepageSEOContent` type and all 7 language files:

- **"Best Ways to Use a Pomodoro Timer"** (H2) — 3-4 use cases with bullets
- **"Who Should Use a Focus Timer"** (H2) — students, developers, writers, remote workers
- **"Pomodoro vs Traditional Studying"** (H2) — comparison paragraph

Add more internal links (3-5 per section) connecting to articles and SEO pages.

**Files**: `src/i18n/types.ts`, `src/i18n/en.ts`, `it.ts`, `fr.ts`, `es.ts`, `pt.ts`, `hi.ts`, `tl.ts`, `src/components/HomepageSEO.tsx`

### 2. Add Images to Homepage

Add 1-2 `<img>` tags in `HomepageSEO.tsx` between sections, using existing images from `public/images/` (`study-desk.jpg`, `focus-work.jpg`). Include keyword-rich alt text and `loading="lazy"`.

### 3. YouTube Footer Link

Add a YouTube icon link to `Footer.tsx` in a new social row:
- Link: `https://youtube.com/@Focus25_timer`
- `target="_blank" rel="noopener noreferrer"`
- Use a simple YouTube SVG icon or text label
- Add `youtube` key to `FooterStrings` type and all language files

### 4. Update JSON-LD with sameAs

In `index.html`, add `"sameAs": ["https://youtube.com/@Focus25_timer"]` to the existing WebApplication schema.

### 5. Fix robots.txt

Replace current verbose robots.txt with clean version:
```
User-agent: *
Allow: /
Sitemap: https://focus25.io/sitemap.xml
```

### 6. Remove Duplicate Title from index.html

Line 15 has a hardcoded `<title>` that duplicates the one from `SEOHead`. Remove it.

### 7. YouTube Mentions in Content

Add a small "Watch focus sessions on YouTube" link at the bottom of `HomepageSEO.tsx` (in the Why Focus25 section) and optionally in article footer areas.

### 8. Performance Note

This is a client-side React SPA — true SSR requires a framework change (Next.js). Within current constraints, we ensure all SEO content renders immediately in the component tree (no lazy loading of text content) and keep bundle size minimal.

## File Summary

| File | Action |
|------|--------|
| `src/i18n/types.ts` | Add 3 new section fields + `youtube` footer key |
| `src/i18n/en.ts` + 6 langs | Add new section content + YouTube label |
| `src/components/HomepageSEO.tsx` | Add 3 sections, images, YouTube mention, more internal links |
| `src/components/Footer.tsx` | Add YouTube icon link |
| `index.html` | Remove duplicate title, add sameAs to JSON-LD |
| `public/robots.txt` | Simplify to standard format |

