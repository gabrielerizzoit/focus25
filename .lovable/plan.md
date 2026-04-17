

# Fullscreen: Restore Ring + Mode Tabs

## Changes

In `src/components/Timer.tsx`, replace the current minimal fullscreen layout with one that mirrors the normal layout but scaled up:

1. **Mode tabs at top** — same segmented control as normal mode (Focus / Short Break / Long Break), with the active mode colored. Reuse existing `modes.map(...)` block. Long break tab respects `settings.longBreakEnabled`.

2. **Progress ring with timer inside** — render `<ProgressRing>` at a much larger size (responsive: ~`min(70vh, 70vw)`), with the time text + mode label centered inside it, just like the normal layout. Pass a dynamic `size` prop based on viewport (compute via `useEffect` + window resize, or simply use a CSS-based wrapper).

3. **Controls below** — Reset + Start/Pause buttons (large rounded pills), same theme-aware styling.

4. **Exit fullscreen button** — kept top-right corner.

5. **Hidden in fullscreen**: Settings, AudioPlayer, ThemeSwitcher, TimerPresets, SessionStats, autoSwitch toggle, tab message, info popovers (keep tabs clean).

## ProgressRing sizing

`ProgressRing` already accepts a `size` prop. Compute size in fullscreen via:
```ts
const fsSize = Math.min(window.innerHeight, window.innerWidth) * 0.7;
```
Track via a `useState` + `resize` listener, only active when `isFullscreen`. Use a slightly thicker stroke (`strokeWidth={10}`) for visibility on large screens.

Inside the ring, scale the time text responsively: `text-7xl sm:text-8xl md:text-9xl` (the ring size cap keeps it bounded).

## File Summary

| File | Change |
|------|--------|
| `src/components/Timer.tsx` | Rewrite fullscreen layout: mode tabs + large `<ProgressRing>` with centered timer + controls |

