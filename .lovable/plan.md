# Sitemap, Robots.txt & AI Discoverability — Plan

## Current State

- `robots.txt` exists but has **no Sitemap reference** and no AI bot rules
- **No `sitemap.xml**` exists anywhere
- No structured data (JSON-LD) for search engines or AI crawlers

## What We'll Add

### 1. Static `sitemap.xml` in `/public/`

Generate a complete sitemap covering all routes across all 7 languages:

- `/` + 6 localized homepages = 7 URLs
- 12 SEO pages × 7 languages = 84 URLs
- `/blog` + 10 blog articles × 7 languages = 77 URLs
- 5 legal pages × 7 languages = 35 URLs

**Total: ~203 URLs**, all with `<lastmod>`, `<changefreq>`, and `<priority>`.

### 2. Update `robots.txt`

- Add `Sitemap: https://focus25.io/sitemap.xml`
- Add rules for AI crawlers (GPTBot, Google-Extended, ChatGPT-User, Amazonbot, ClaudeBot, PerplexityBot, Applebot) — all set to `Allow`
- Keep existing bot rules

### 3. Structured Data (JSON-LD) in `index.html`

Add `WebApplication` schema markup so Google/AI understand Focus25 is a web app:

```json
{
  "@type": "WebApplication",
  "name": "Focus25",
  "applicationCategory": "ProductivityApplication",
  "offers": { "price": "0" }
}
```

### 4. Add `llms.txt` in `/public/`

Emerging standard for AI discoverability — a plain text file describing the site for LLMs.

---

## Files


| File                 | Action                                        |
| -------------------- | --------------------------------------------- |
| `public/sitemap.xml` | Create — full sitemap with all routes         |
| `public/robots.txt`  | Update — add Sitemap directive + AI bot rules |
| `public/llms.txt`    | Create — AI-readable site description         |
| `index.html`         | Add JSON-LD structured data                   |
