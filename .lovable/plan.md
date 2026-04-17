

Let me explore the relevant files to understand the current Timer structure.
<lov-tool-use id="toolu_vrtx_01R1zQY2FNMKf8TrHm5tfknw" name="code--view" integration-id="code" data="{\"file_path\": \"src/components/ProgressRing.tsx\"}">
</lov-tool-use>
<lov-plan>

# Add Fullscreen Mode to Focus25

## Approach

Add a fullscreen toggle button next to the existing controls. When activated, render the timer in a dedicated overlay that uses the browser's native Fullscreen API (with graceful fallback to a fixed-position page-level overlay).

## Implementation

### `src/hooks/useFullscreen.ts` (new)
Tiny hook that:
- Tracks `isFullscreen` state
- `enter(element)` — calls `element.requestFullscreen()` if supported, otherwise sets a fallback flag
- `exit()` — calls `document.exitFullscreen()` or clears fallback flag
- Listens to `fullscreenchange` event + Esc key
- Returns `{ isFullscreen, isFallback, enter, exit, toggle }`

### `src/components/Timer.tsx`
- Add a `Maximize2` icon button next to Settings/Reset (rounded ghost button)
- Wrap timer in a ref'd container for `requestFullscreen`
- When `isFullscreen` is true:
  - Render a separate **minimal layout**: mode label (top), huge centered time, Start/Pause + small Reset, exit button (top-right `X` icon)
  - Hide ThemeSwitcher, TimerPresets, SessionStats, AudioPlayer, settings panel, mode tabs, autoSwitch toggle, tab message
- When `isFallback` is true, apply `fixed inset-0 z-50 bg-background` to the container so it covers the whole viewport (Header/Footer hidden via the same overlay covering them)

### Fullscreen layout details
- Container: `flex flex-col items-center justify-center min-h-screen` with theme background
- Mode label: `text-sm uppercase tracking-widest text-muted-foreground`
- Timer text: `text-[20vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw]` with `max-text-[40rem]` cap, tabular-nums, light weight (preserves current style at scale)
- Buttons: large rounded pills, theme-aware (yellow for breaks, primary for focus — same as current)
- Exit button: top-right corner, `Minimize2` or `X` icon, ghost style
- Works in portrait + landscape via flex centering and viewport-relative font sizing

### Behavior
- Esc exits (handled natively in real fullscreen; manual listener for fallback)
- Switching mode tabs disabled in fullscreen (kept minimal); user exits to change settings
- Theme colors preserved (uses existing CSS variables — no overrides)
- Notifications, audio chimes, beeps continue working unchanged

### `src/i18n/types.ts` + 7 language files
Add to `UIStrings`:
- `fullscreen: string` — "Fullscreen" / "Schermo intero"
- `exitFullscreen: string` — "Exit fullscreen" / "Esci da schermo intero"

## File Summary

| File | Action |
|------|--------|
| `src/hooks/useFullscreen.ts` | New — Fullscreen API wrapper with fallback |
| `src/components/Timer.tsx` | Add fullscreen button + minimal overlay layout |
| `src/i18n/types.ts` | Add 2 keys |
| `src/i18n/{en,it,es,fr,pt,hi,tl}.ts` | Add translations |

