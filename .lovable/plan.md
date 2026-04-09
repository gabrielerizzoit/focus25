

# Fix 3 Timer Issues

## Issues Identified

### 1. Auto-switch doesn't auto-start the next timer
In `useTimer.ts` line 135, after auto-switching mode, `switchMode()` is called which sets `isRunning = false`. The next mode is never started automatically. Fix: after `switchMode`, call `start()` with a small delay so the break/focus begins immediately.

### 2. Countdown beep sounds not audible
The `playBeep` function creates a new `AudioContext` each time. On mobile browsers and some desktops, `AudioContext` requires a user gesture to resume. The context may be created in "suspended" state and never resumed. Fix: call `ctx.resume()` before playing, and similarly for `playChime`.

### 3. Settings input: leading zeros, max 99, and persistence issues
- The `<input type="number">` allows leading zeros (e.g., "025") and values above 99. Fix: replace with a controlled text input that clamps to 1–99 and strips leading zeros.
- Settings persist via localStorage forever, but the user expects them to reset to defaults after ~24h. Fix: store a timestamp alongside settings and expire them after 24 hours, restoring defaults.

## File Changes

### `src/hooks/useTimer.ts`
- **Auto-start after switch**: Add a `switchAndStart` function that calls `switchMode` then `start` after a brief delay. Use it in the completion effect when `autoSwitch` is true.
- **Settings expiry**: Modify `loadSettings()` to check a saved timestamp. If older than 24 hours, return `DEFAULT_SETTINGS` and clear the stored value. Modify `saveSettings()` to include `Date.now()` as a timestamp.
- **Clamp settings**: In `updateSettings`, clamp values to 1–99 minutes (60–5940 seconds).

### `src/hooks/useAudio.ts`
- **playBeep**: Add `await ctx.resume()` before `osc.start()` to ensure the AudioContext is active.
- **playChime**: Same fix — add `ctx.resume()`.

### `src/components/Timer.tsx`
- **Settings input**: Change `type="number"` to a controlled text input with `maxLength={2}`, `pattern="[0-9]*"`. On change, strip non-digits and leading zeros, clamp 1–99. On blur, if empty or 0, reset to default.

