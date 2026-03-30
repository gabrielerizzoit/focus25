

# Content Quality & Design Upgrade — Plan

## Scope

This is a massive content effort: **22 content pieces** (12 SEO pages + 10 blog articles) × **7 languages** = **154 content rewrites**, plus design/styling improvements to the rendering components.

---

## Part A: Design & Styling Improvements (Components)

### 1. Add global prose styles (`src/index.css`)
Add CSS classes for the HTML content rendered via `dangerouslySetInnerHTML`:

- **Highlight boxes**: `.content-tip` — bordered box with subtle background for definitions/tips
- **Section separators**: Style `<hr>` within prose as subtle dividers
- **Bold emphasis**: Already supported via `<strong>` in HTML content
- **Emoji spacing**: Minor utility styles
- **CTA block**: `.content-cta` — highlighted box at end of articles

### 2. Update `BlogLayout.tsx`
- Improve prose styling classes for better spacing, paragraph sizing, mobile readability
- The CTA button already exists — enhance it into a highlighted box with background

### 3. Update `TimerPage.tsx`
- Same prose styling improvements for SEO page content

### 4. Images
Add 2-3 royalty-free stock images to `/public/images/` (study desk, focus, productivity). Reference them in article HTML content using `<img>` tags. Keep images lightweight (~50-100KB each, WebP or compressed JPG).

---

## Part B: Content Rewrite (Translation Files)

Each of the 7 translation files will be fully rewritten for `seoPages` and `blogArticles` sections.

### Content structure (every article/SEO page):
1. Engaging introduction with emoji accent (🍅, ⏱️, 🎯, ⚡)
2. Core concept explanation (H2)
3. Step-by-step explanation (H2 + numbered/bulleted list)
4. Why it works — psychology/benefits (H2)
5. Common mistakes (H2 + bullet points)
6. Variations/adaptations (H2)
7. Getting started section (H2)
8. Internal links woven throughout
9. CTA block at end (highlight box + "Start Focus Session" button link)
10. `<hr>` separators between major sections

### HTML formatting rules:
- Short paragraphs (2-3 sentences max)
- `<strong>` for key ideas
- `<ul><li>` for lists
- H2 and H3 subheadings
- `.content-tip` div for highlight boxes
- `<img>` tags for 1-2 images per article
- `<hr>` between sections
- Max 1-2 emojis per section

### Target word counts:
- Blog articles: 800-1200 words each
- SEO pages: 500-800 words each

### Files to update:
| File | Lines (est.) |
|------|-------------|
| `src/i18n/en.ts` | ~800 → ~1500 |
| `src/i18n/it.ts` | ~290 → ~1500 |
| `src/i18n/fr.ts` | similar |
| `src/i18n/es.ts` | similar |
| `src/i18n/pt.ts` | similar |
| `src/i18n/hi.ts` | similar |
| `src/i18n/tl.ts` | similar |

---

## Part C: Implementation Order

Due to the massive size of translation files, this must be done in **multiple steps**:

1. **Step 1**: Add CSS styles + update BlogLayout + TimerPage components + add images
2. **Step 2**: Rewrite `en.ts` with full formatting (template for all languages)
3. **Step 3**: Rewrite `it.ts` matching English depth
4. **Step 4**: Rewrite `fr.ts`
5. **Step 5**: Rewrite `es.ts`
6. **Step 6**: Rewrite `pt.ts`
7. **Step 7**: Rewrite `hi.ts`
8. **Step 8**: Rewrite `tl.ts`

Each step will need to be a separate message due to file size constraints.

---

## Technical Notes

- All content is static HTML strings in TypeScript files — no runtime translation
- Content is rendered via `dangerouslySetInnerHTML`, so all formatting is pure HTML + CSS classes
- Images will be self-hosted in `/public/images/` for performance (no external URLs)
- No new dependencies required
- Each translation file will be ~1500 lines (large but acceptable for static content)

