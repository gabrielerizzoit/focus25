# Fix home page search and social metadata

The scan found that the page served to search engines and link previews (WhatsApp, LinkedIn, Facebook) has no title, description or social preview text. Those tags are only added after the page loads, and many crawlers never see them.

## Changes
Add fixed default tags to `index.html` (English, matching the homepage):
- `<title>Free Pomodoro Timer Online – Focus25</title>`
- `<meta name="description">`: "Free, minimal Pomodoro timer. No signup. Start a 25-minute focus session instantly with ambient sounds and session tracking."
- `og:title`, `og:description`, `og:type=website`, `og:site_name=Focus25`
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`

Per-page tags (canonical, hreflang, translated titles) stay as they are now. For crawlers that run JavaScript, they still override these defaults page by page.

## Afterwards
Mark both findings as fixed. The changes show up on focus25.io after the next publish.
