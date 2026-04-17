

The user wants two features:

1. **Seconds in timer settings**: Allow MM:SS format for focus, short break, long break. Min = 1 second, max stays at 99 minutes. If only minutes entered, seconds default to 00.

2. **Timer presets**: Below the theme switcher, add 3 clickable preset buttons:
   - 25/5 (focus 25 min, short break 5 min)
   - 50/10 (focus 50 min, short break 10 min)
   - 15/5 (focus 15 min, short break 5 min)
   - Long break always stays at 15 min

Let me check the current settings UI and timer hook to plan the changes.

# Add Seconds Support + Timer Presets

## 1. Seconds in Settings (MM:SS format)

### `src/hooks/useTimer.ts`
- `updateSettings` already accepts seconds — change validation: min `1` second, max `99*60 + 59` seconds (5999). Remove the "round to minutes" logic.

### `src/components/Timer.tsx`
Replace the single numeric input per duration with **two inputs** (MM and SS) separated by `:`:
- MM input: 0–99, validates digits only
- SS input: 0–59, validates digits only
- Combined value must be ≥ 1 second; if user clears both, fallback to default
- Display current setting as `MM` and `SS` derived from `settings[key]`

Layout per row:
```
[Focus duration]     [MM] : [SS]
```

## 2. Timer Presets

### `src/i18n/types.ts` + 7 language files
Add `UIStrings`:
- `presets: string` — "Presets" / "Preimpostati"
- `preset25: string` — "25 / 5"
- `preset50: string` — "50 / 10"
- `preset15: string` — "15 / 5"

### `src/components/TimerPresets.tsx` (new)
Compact component — 3 small pill buttons in a row, labeled "25/5", "50/10", "15/5". Receives `onSelect(focus, shortBreak)` callback. Long break stays unchanged at the user's current value (or default 15 min if not customized).

On click: call `updateSettings({ focus: X*60, shortBreak: Y*60 })` and reset the running timer to the new duration.

### `src/components/Timer.tsx`
Render `<TimerPresets />` below `<ThemeSwitcher />`. Pass `updateSettings` from the timer hook.

## File Summary

| File | Action |
|------|--------|
| `src/hooks/useTimer.ts` | Allow seconds in `updateSettings` (min 1 sec, max 5999 sec) |
| `src/components/Timer.tsx` | MM:SS dual inputs in settings; render `<TimerPresets />` |
| `src/components/TimerPresets.tsx` | New — 3 preset buttons (25/5, 50/10, 15/5) |
| `src/i18n/types.ts` | Add `presets`, `preset25`, `preset50`, `preset15` keys |
| `src/i18n/en.ts` ... `tl.ts` | Add preset translations (7 files) |

