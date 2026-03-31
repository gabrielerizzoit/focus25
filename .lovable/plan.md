

# Add 14 ADHD Blog Articles (All 7 Languages)

## Scope

14 new articles × 7 languages = 98 article translations. Each 800–1200 words of HTML content following the existing `blogArticles` pattern.

**Due to the massive volume (~100,000+ words of content), this will be implemented in batches across multiple steps.**

## Article Slugs

| # | Slug |
|---|------|
| 1 | `adhd-and-focus` |
| 2 | `best-study-techniques-for-adhd` |
| 3 | `pomodoro-technique-for-adhd` |
| 4 | `how-to-stay-focused-with-adhd` |
| 5 | `time-management-tips-adhd` |
| 6 | `25-minute-timer-for-adhd` |
| 7 | `adhd-study-timer` |
| 8 | `adhd-and-procrastination` |
| 9 | `deep-work-with-adhd` |
| 10 | `adhd-productivity-hacks` |
| 11 | `why-adhd-makes-tasks-hard` |
| 12 | `adhd-brain-explained` |
| 13 | `adhd-and-time-perception` |
| 14 | `adhd-burnout-signs-solutions` |

## Changes Per File

### `src/App.tsx`
- Add 14 new slugs to `BLOG_SLUGS` array

### `src/i18n/en.ts`
- Add 14 entries to `blogArticles` (each ~800–1200 words HTML with tips, CTAs, internal links)
- Add 14 entries to `blogIndex.articles`

### `src/i18n/it.ts`, `fr.ts`, `es.ts`, `pt.ts`, `hi.ts`, `tl.ts`
- Same: 14 `blogArticles` entries + 14 `blogIndex.articles` entries per language
- Full native translations, not simplified

### `public/sitemap.xml`
- Add 14 × 7 = 98 new blog URLs with priority 0.6

## Content Structure (Each Article)

1. Engaging intro (empathetic, relatable to ADHD)
2. Problem explanation (ADHD + focus/time)
3. Practical solutions with step-by-step tips
4. Psychology/behavior explanation
5. Common mistakes
6. Practical examples
7. Getting started section
8. CTA button → "Start Focus Session" linking to `/`
9. `relatedLinks` to other ADHD articles and SEO timer pages

## Content Design
- Short paragraphs, bold key concepts, bullet points
- `.content-tip` highlight boxes for tips/insights
- `.content-cta` block at end
- 1–2 image references per article
- Empathetic, supportive tone — no medical claims

## Implementation Order (Batched)

1. **Batch 1**: Articles 1–5 in English → register routes → update sitemap
2. **Batch 2**: Articles 6–10 in English
3. **Batch 3**: Articles 11–14 in English
4. **Batch 4**: Italian translations (all 14)
5. **Batch 5**: French translations
6. **Batch 6**: Spanish translations
7. **Batch 7**: Portuguese translations
8. **Batch 8**: Hindi translations
9. **Batch 9**: Filipino translations

Each batch will be a separate implementation step to stay within file size limits.

## Internal Linking Network

Each ADHD article will link to 2–3 other ADHD articles + 1–2 timer SEO pages, creating a strong topic cluster around "ADHD + productivity."

