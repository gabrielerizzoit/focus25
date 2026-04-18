

# Timer Style Selector + Optional Current Time

## New components

### `src/components/TimerStyleSelector.tsx` (new)
- Reads/writes `focus25-timer-style` in localStorage; values: `circle` | `digital` | `traffic`
- Reads/writes `focus25-show-clock` boolean in localStorage
- Renders, matching `ThemeSwitcher` style:
  - Label "Timer style" + 3 small pill buttons (Circle / Digital / Traffic)
  - Toggle Switch + label "Show current time"
  - Small "Reset to defaults" link when style != circle or clock on
- Exposes a tiny event-based subscription so `Timer.tsx` re-renders when changes happen (use a custom hook `useTimerStyle()` returning `{ style, setStyle, showClock, setShowClock }` backed by `useState` + a window event `'focus25-timerstyle-change'`).

### `src/components/timer-styles/DigitalTimer.tsx` (new)
- Pure presentational. Props: `time: string`, `modeLabel: string`, `isBreak: boolean`, `size: number` (used in fullscreen for scaling).
- Layout: massive monospace digital numerals, thin uppercase mode label below. No ring. Uses `tabular-nums font-light`. Color follows current foreground; no break-color flood (keeps it minimal). Mode label colored with primary/secondary accent dot.

### `src/components/timer-styles/TrafficLightTimer.tsx` (new)
- Pure presentational. Props: `time`, `modeLabel`, `mode`, `progress`, `size`.
- Layout: 3 stacked circles (vertical on tall, horizontal on wide via `flex-col sm:flex-row` choice driven by aspect — keep simple: always vertical). Active light per mode:
  - `focus` → red lit
  - `shortBreak` → yellow lit
  - `longBreak` → green lit
- Inactive lights dimmed to `bg-muted/30`. Active light uses theme tokens (`bg-primary` for focus accent or fixed `#ef4444 / #facc15 / #22c55e`? Use fixed traffic colors for clarity, with subtle `shadow-[0_0_24px_color]`).
- Time text shown beside/below the lights (large tabular-nums). Mode label small uppercase.

### `src/components/CurrentClock.tsx` (new)
- Shows `HH:MM` (24h, browser local). Updates via `setInterval(60_000)` aligned to next minute boundary on mount.
- Tiny: `text-sm text-muted-foreground tabular-nums`.
- Used only in fullscreen overlay (top-right, with safe spacing from the exit button — exit button stays top-right, clock just below it OR exit moves slightly: place clock at `top-3 left-3`, exit stays `top-3 right-3` to avoid overlap on small screens).

## Hook

### `src/hooks/useTimerStyle.ts` (new, lightweight)
```ts
type TimerStyle = 'circle' | 'digital' | 'traffic';
// reads localStorage, listens for window event 'focus25-timerstyle-change',
// returns { style, setStyle, showClock, setShowClock, reset }
```
Setters dispatch the event so all subscribers update without a context.

## `src/components/Timer.tsx` integration

- Call `useTimerStyle()` at top.
- Build a `<TimerDisplay>` inline switch:
  - `circle` → existing `<ProgressRing>` + centered text (current code, unchanged)
  - `digital` → `<DigitalTimer>`
  - `traffic` → `<TrafficLightTimer>`
- Use this same switch in **both** normal and fullscreen layouts, passing appropriate `size` (current default for normal; `fsSize` for fullscreen).
- In fullscreen: render `<CurrentClock>` at `top-3 left-3` when `showClock` is true (works for all 3 styles).
- Place `<TimerStyleSelector>` after `<ThemeSwitcher />` and before `<TimerPresets ...>`.

## i18n

Add to `UIStrings` in `src/i18n/types.ts`:
- `timerStyle`, `styleCircle`, `styleDigital`, `styleTraffic`, `showCurrentTime`

Add translations to all 7 language files (en/it/fr/es/pt/hi/tl).

## Performance

- No new libs.
- Clock re-renders once per minute only.
- Digital/Traffic components are pure SVG-free divs/spans → cheaper than ring.
- localStorage reads happen once at mount; updates via single window event.

## File Summary

| File | Action |
|------|--------|
| `src/hooks/useTimerStyle.ts` | New — style + clock toggle persistence |
| `src/components/TimerStyleSelector.tsx` | New — selector UI |
| `src/components/timer-styles/DigitalTimer.tsx` | New |
| `src/components/timer-styles/TrafficLightTimer.tsx` | New |
| `src/components/CurrentClock.tsx` | New — local time HH:MM, updates per minute |
| `src/components/Timer.tsx` | Integrate selector + style switch in normal & fullscreen, render clock in fullscreen |
| `src/i18n/types.ts` | Add 5 UI keys |
| `src/i18n/{en,it,fr,es,pt,hi,tl}.ts` | Add translations |

