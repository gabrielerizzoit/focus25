

# SEO Infrastructure Fix

## Problem Found

The critical bug: `src/components/SEOHead.tsx` line 12 uses `https://focus25.app` instead of `https://focus25.io`. This means ALL canonical tags and hreflang tags across every page are pointing to the wrong domain.

Everything else (sitemap, robots.txt, index.html JSON-LD) already uses `focus25.io` correctly.

## Changes

### 1. Fix domain in SEOHead.tsx
Change `const BASE = 'https://focus25.app'` to `const BASE = 'https://focus25.io'` — this single fix corrects canonical and hreflang tags on all ~203 pages.

### 2. Standardize sitemap priorities per requirements
Adjust priorities to match the requested values:
- Homepage: 1.0 (already correct)
- SEO pages: 0.8 (some currently 0.9, 0.7, 0.6 — normalize all to 0.8)
- Blog articles: 0.6 (some currently 0.7 — normalize)
- Legal pages: 0.3 (keep as-is)

### 3. Add OG URL tag to SEOHead
Add `<meta property="og:url">` with the correct canonical URL for better social sharing.

## Files

| File | Change |
|------|--------|
| `src/components/SEOHead.tsx` | Fix BASE domain to `focus25.io`, add `og:url` |
| `public/sitemap.xml` | Normalize priorities |

## What's Already Correct
- `robots.txt` — has `Sitemap: https://focus25.io/sitemap.xml` and all AI bot rules
- `index.html` — has JSON-LD with correct domain, `inLanguage`, `operatingSystem`
- Hreflang logic in SEOHead — already generates tags for all 7 languages + x-default
- Canonical tag logic — already handles lang prefixes correctly (just wrong domain)

