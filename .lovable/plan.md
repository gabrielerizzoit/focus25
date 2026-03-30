

# Fix: Timer Pause/Resume Reset + Mobile Tooltips

## Bug 1: Timer resets to full duration on pause/resume

**Root cause:** In `useTimer.ts`, the effect on lines 148-154 resets `remaining` to full duration whenever `isRunning` is false. When the user pauses, `isRunning` becomes false, triggering this effect which overwrites the paused time with the full duration.

**Fix:** Track previous settings and mode values so the reset effect only fires when settings or mode *actually change*, not when `isRunning` changes.

In `useTimer.ts`:
- Add `useRef` to track previous settings and mode
- Change the effect on lines 148-154 to only reset when settings or mode differ from previous values (not on every `isRunning` change)

```ts
const prevSettingsRef = useRef(settings);
const prevModeRef = useRef(mode);

useEffect(() => {
  if (!isRunning) {
    const settingsChanged = prevSettingsRef.current !== settings;
    const modeChanged = prevModeRef.current !== mode;
    if (settingsChanged || modeChanged) {
      const d = defaultDuration || settings[mode];
      pausedRemainingRef.current = d;
      setRemaining(d);
    }
  }
  prevSettingsRef.current = settings;
  prevModeRef.current = mode;
}, [settings, mode, defaultDuration, isRunning]);
```

---

## Bug 2: Tooltips don't work on mobile

**Root cause:** Radix UI `Tooltip` is hover-only by design — no touch/tap support on mobile.

**Fix:** Replace the two tooltip instances in `Timer.tsx` with a `Popover` component (from existing `src/components/ui/popover.tsx`), which opens on click/tap and works on both desktop and mobile. The visual appearance stays the same — small info text appearing near the `Info` icon.

In `Timer.tsx`:
- Import `Popover, PopoverTrigger, PopoverContent` instead of `Tooltip, TooltipTrigger, TooltipContent`
- Replace both tooltip usages (Long Break info icon and Auto-switch info icon) with `Popover` equivalents
- The `Info` icon becomes the `PopoverTrigger` — tap on mobile, click on desktop

---

## Files Modified

| File | Change |
|------|--------|
| `src/hooks/useTimer.ts` | Fix reset effect to only trigger on settings/mode change |
| `src/components/Timer.tsx` | Replace `Tooltip` with `Popover` for the two info icons |

