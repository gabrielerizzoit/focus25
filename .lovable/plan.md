

User wants:
1. **Fix seconds input bug**: When typing 2 digits in seconds field, leading zero stays. Currently `value={ss.toString().padStart(2, '0')}` causes "05" to show, then typing "3" produces "053" → sliced to "05". Need to display raw number when focused, or handle differently.
2. **Configurable long-break interval** (default 4, min 1) in settings.
3. **Disable long break** toggle in settings.
4. **Reset to defaults** must also reset interval and the disable toggle.

Let me check the current input behavior. Looking at Timer.tsx seconds input:
```
value={ss.toString().padStart(2, '0')}  // displays "05"
onChange: raw = e.target.value.replace(...).slice(0, 2)
```
If user has "05" and types "3" before/after → becomes "053" → slice(0,2) = "05". Bug confirmed. Fix: don't pad displayed value, or strip leading zeros when length > 1.

# Fix Seconds Input + Configurable Long-Break Interval

## 1. Fix Seconds Input Bug

**Problem**: Seconds field displays padded `"05"`. Typing extra digits gets sliced and the leading zero is preserved, making it impossible to overwrite.

**Fix in `src/components/Timer.tsx`**: 
- Display seconds as plain number (`String(ss)`) instead of `padStart(2, '0')`
- In onChange, strip leading zeros: if raw length > 1, remove leading zero(s)
- Same fix for minutes input (already uses `String(mm)`, but apply consistent strip)

## 2. Long-Break Interval Setting

### `src/hooks/useTimer.ts`
- Extend `TimerSettings` with:
  - `longBreakInterval: number` (default `4`, min `1`)
  - `longBreakEnabled: boolean` (default `true`)
- Update `DEFAULT_SETTINGS`, `loadSettings`, `saveSettings`, `updateSettings` validation
- Update auto-switch completion logic: 
  - If `!longBreakEnabled` → always `shortBreak` after focus
  - Else use `longBreakInterval` instead of hard-coded `4`
- `resetSettings` already resets all settings — works automatically

### `src/components/Timer.tsx`
Add to settings panel below the 3 duration rows:
- **Number input** "Long break after" (1–20 rounds), disabled when long break disabled
- **Switch** "Enable long break" (on by default)
- Both above the "Reset to defaults" button

Also: hide the "Long break" mode tab in the mode selector when `longBreakEnabled === false`.

### `src/i18n/types.ts` + 7 language files
Add to `UIStrings`:
- `longBreakInterval: string` — "Long break after" / "Long break dopo"
- `rounds: string` — "rounds" / "round"
- `enableLongBreak: string` — "Enable long break" / "Abilita long break"

## File Summary

| File | Change |
|------|--------|
| `src/hooks/useTimer.ts` | Add `longBreakInterval` + `longBreakEnabled` settings; update auto-switch logic |
| `src/components/Timer.tsx` | Fix seconds input zero-strip bug; add interval input + enable toggle; hide long-break tab when disabled |
| `src/i18n/types.ts` | Add 3 new UI keys |
| `src/i18n/{en,it,es,fr,pt,hi,tl}.ts` | Add translations |

