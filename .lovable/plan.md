# Fill in the Privacy Policy page (7 languages)

## What changes
- The page /privacy and its language versions (/it, /fr, /es, /pt, /hi, /tl) get the full privacy text you provided, translated into each language.
- Page title: "Privacy Policy" (translated). Description: "How Focus25 handles your data on the website and in the Android app." (translated).
- Last updated: October 25, 2026. Contact: focus25.timer@gmail.com.
- Sections: introduction, Android app, Website (with Google Analytics and opt-out links that open in a new tab), Children, Changes, Contact.
- The page layout and style stay the same. Nothing else on the site changes.
- I'll check that the "Privacy" link in the footer goes to this page in every language.

## Technical details
- Add a structured, text-only `privacy` object to each i18n file (title, lastUpdated, intro, sections with heading + paragraphs/bullets). No HTML in the i18n files.
- In `LegalPage.tsx`, when slug is `privacy`, render that content in JSX (h1, h2, ul, mailto link, external links with target="_blank" rel="noopener noreferrer") inside the existing container and prose classes. Other legal pages keep their current behavior.
- Update `legalPages.privacy.title/description` in all 7 files; extend `types.ts`.
- Check Footer privacy links for each locale prefix; fix only if one is wrong.
- Check in the preview for /privacy and /it/privacy.
