

# Focus25 — Updated Plan

## Key Changes from Original Plan

1. **Timer logic**: Timestamp-based (Date.now()) instead of setInterval-only
2. **Audio**: Local MP3 files from `/public/audio/` instead of Web Audio API synthesis
3. **SEO pages**: 12 total (7 original + 5 new)
4. **Session tracking**: localStorage-based daily counter displayed under timer
5. **Browser notifications**: Optional, on permission grant

## Architecture Note

This project runs on **React + Vite** (Lovable platform constraint). True static multi-page HTML (separate .html files) is not natively supported. The approach will be:
- React Router for routing (required by the platform)
- `react-helmet-async` for per-page meta tags (title, description, OG tags)
- Each page renders full semantic HTML (h1, article, nav) so crawlers that execute JS (Google, Bing) index it correctly
- Lightweight pages — no heavy JS per route

This achieves the SEO goals within platform constraints.

---

## Phase 1: Core Timer

### Timer Engine
- Use `Date.now()` to record start timestamp
- On each animation frame / 1s interval, compute `remaining = endTime - Date.now()`
- Accurate across tab switches — when user returns, timer reflects real elapsed time
- Store `endTime` in state so pause/resume works correctly

### Timer UI
- Large centered countdown (mm:ss)
- SVG progress ring animation
- Three mode tabs: Focus (25m), Short Break (5m), Long Break (15m)
- Start / Pause / Reset buttons
- Auto-switch toggle (focus → break → focus)
- Settings modal for custom durations (saved to localStorage)
- Small text below timer: "Today: X sessions completed"
- Info text: "Timer continues even if you switch tabs."

### Session Tracking (localStorage)
- `focusSessions`: count for today
- `lastSessionDate`: to reset daily
- Display under timer

### Design
- Background: #0B0F14, Focus green: #4CAF50, Break yellow: #FFC107
- "Focus25" text logo top-center
- System sans-serif, mobile-first, centered layout

---

## Phase 2: Audio System

### Background Sounds (local files)
- `/public/audio/rain.mp3`
- `/public/audio/cafe.mp3`
- `/public/audio/white-noise.mp3`
- HTML `<audio>` elements with `loop` attribute
- Only ONE sound active at a time — selecting a new one stops the previous
- Audio OFF by default; user clicks to start (browser autoplay policy)
- Simple volume slider
- Play/pause toggle per sound

### Alert Sounds
- Countdown tick in last 5 seconds (short beep via small inline audio or Web Audio oscillator — single beep is trivial)
- Final chime when session ends
- These are brief alerts, not background music

---

## Phase 3: SEO Landing Pages (12 pages)

Each page: embedded timer component + 300–600 words unique content + H1 with target keyword + internal links.

Original 7:
- `/pomodoro-timer`
- `/focus-timer`
- `/study-timer`
- `/25-minute-timer`
- `/marinara-timer-alternative`
- `/pomofocus-alternative`
- `/online-timer`

New 5:
- `/timer-5-minutes` (timer defaults to 5 min)
- `/timer-10-minutes` (timer defaults to 10 min)
- `/timer-15-minutes` (timer defaults to 15 min)
- `/timer-online`
- `/free-timer`

Each page component includes the shared Timer component with appropriate default duration and unique SEO copy.

---

## Phase 4: Blog (10 articles)

Route `/blog` (index) and `/blog/[slug]` for each. 800–1200 words each, internal links to timer pages and cross-links between articles. CTA button "Start Focus Session" linking to `/`.

Articles (unchanged list of 10).

---

## Phase 5: SEO & Polish

- `react-helmet-async` for dynamic meta tags on every page
- Open Graph + Twitter card meta
- Semantic HTML throughout
- Favicon (SVG clock icon)
- Browser notification on session end (if Notification permission granted)
- Internal linking footer on all pages

---

## File Structure (key new files)

```text
src/
  components/
    Timer.tsx              — core timer with Date.now() logic
    ProgressRing.tsx       — SVG ring
    AudioPlayer.tsx        — sound controls
    SessionStats.tsx       — daily session counter
    SEOHead.tsx            — react-helmet wrapper
    TimerPage.tsx          — shared layout for SEO pages
    BlogLayout.tsx         — blog article layout
  pages/
    Index.tsx              — homepage (timer only)
    PomodoroTimer.tsx      — /pomodoro-timer
    FocusTimer.tsx         — /focus-timer
    StudyTimer.tsx         — /study-timer
    ... (12 SEO pages total)
    Blog.tsx               — /blog index
    blog/
      [10 article pages]
  hooks/
    useTimer.ts            — timestamp-based timer hook
    useAudio.ts            — audio management hook
    useSessionStats.ts     — localStorage session tracking
  data/
    blogArticles.ts        — article content
    seoPages.ts            — SEO page content
```

## Implementation Order
1. Timer engine + UI (homepage)
2. Audio system
3. Session tracking
4. 12 SEO pages
5. 10 blog articles
6. Meta tags, favicon, notifications, final polish

