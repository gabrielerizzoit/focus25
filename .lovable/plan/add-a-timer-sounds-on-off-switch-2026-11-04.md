# Add a "Timer sounds" on/off switch

## What changes
- A new "Timer sounds" switch goes in the Sound box. It sits below the Rain/Café/Noise buttons and the volume slider. Its description appears underneath in smaller grey text, styled like the Auto-switch row. The switch stays visible even when no ambient sound is playing.
- When the switch is off, the beeps in the last 5 seconds and the chime at the end of a session don't play. Everything else works as it does now: ambient sounds, the browser notification, the timer and auto-switch.
- The switch is on by default. The choice is saved under "focus25-timer-sounds" and never expires. "Reset to defaults" leaves it alone.
- A change takes effect right away, even while a session is running or during its last 5 seconds.
- The switch is not added to fullscreen mode.

## Technical details
- `src/components/Timer.tsx`: hold `timerSounds` in state, starting from localStorage (`'0'` means off, anything else means on). Mirror it in a ref so the completion and countdown callbacks read the current value. Write to localStorage when it changes. Check the ref before calling `playChime()` (line 92) and `playBeep(...)` (line 111). In the Sound group (line 425), add a second `px-4 py-3` row with the label, the muted description and a `<Switch>`.
- `src/i18n/types.ts`: add `timerSounds` and `timerSoundsDesc` to UIStrings.
- Add the 7 given strings to en, it, fr, es, pt, hi and tl, next to `durations`.
