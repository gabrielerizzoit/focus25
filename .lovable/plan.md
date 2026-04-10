

# Fix Auto-Switch & Add Settings Reset

## Issues

### 1. Auto-switch not working (especially mobile)
The completion detection effect (line 139) uses a fragile guard: `pausedRemainingRef.current !== settings[mode]`. But a later effect (line 169-173) keeps overwriting `pausedRemainingRef` back to `remaining` (which is 0), causing the completion effect to fire multiple times or creating race conditions with the `switchMode` setTimeout.

**Fix**: Replace the ref-based guard with a dedicated `hasCompletedRef` boolean. Set it to `true` when the timer naturally reaches 0 (inside `tick`), and consume it in the completion effect. This eliminates all race conditions.

### 2. No "Reset to defaults" button in settings
**Fix**: Add a `resetSettings` function in `useTimer` that restores `DEFAULT_SETTINGS` and clears localStorage. Add a small "Reset" button at the bottom of the settings panel in `Timer.tsx`.

## File Changes

### `src/hooks/useTimer.ts`
- Add `hasCompletedRef = useRef(false)`. Set it to `true` inside `tick` when `left <= 0`.
- Rewrite completion effect: check `hasCompletedRef.current` instead of the pausedRemaining guard. Set it to `false` after handling.
- Remove the sync effect (lines 169-173) that overwrites `pausedRemainingRef` — it causes the race condition. Instead, only update `pausedRemainingRef` explicitly in `pause`, `reset`, `switchMode`, and the settings-change effect.
- Add `resetSettings` function: sets state to `DEFAULT_SETTINGS`, removes localStorage key, resets current timer duration.
- Export `resetSettings`.

### `src/components/Timer.tsx`
- Destructure `resetSettings` from `useTimer`.
- Add a "Reset to defaults" button at the bottom of the settings panel.
- Add translation key `ui.resetDefaults` usage (fallback to "Reset").

### `src/i18n/types.ts` + all language files
- Add `resetDefaults: string` to UI translations (e.g., "Reset to defaults", "Ripristina predefiniti", etc.).

