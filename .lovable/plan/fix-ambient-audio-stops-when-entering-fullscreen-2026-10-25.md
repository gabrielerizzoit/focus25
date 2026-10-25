# Fix: ambient audio stops when entering fullscreen

## Problem

`Timer.tsx` renders two completely different trees: the fullscreen layout (early `return` at line 103) does not include `<AudioPlayer />`, while the normal layout does (line 343).

When fullscreen is toggled, React unmounts `AudioPlayer`. Its `useAudio` hook has a cleanup effect (`useEffect(() => () => stopCurrent(), ...)`) that pauses and discards the `Audio` element — so rain / café / noise stop, and the selected sound and volume are lost.

## Solution

Move the audio state out of the component that unmounts, so playback survives the layout switch.

1. Create an `AudioProvider` context wrapping the existing `useAudio` logic (single shared `Audio` element, active sound, volume, play/stop).
2. Mount the provider high in the tree (in `App.tsx`, alongside the other providers) so it never unmounts on fullscreen toggle.
3. `AudioPlayer` consumes the context instead of calling `useAudio()` directly — no behavioural change in the normal layout.
4. In the fullscreen layout, show a compact version of the sound controls (the three sound pills, no volume slider) below the Start/Reset buttons so users can still switch or mute ambience without leaving fullscreen.

Alert sounds (`playBeep`, `playChime`) are module-level functions and are unaffected.

## Technical notes

- New file: `src/contexts/AudioContext.tsx` — holds current `useAudio` implementation, exports `AudioProvider` and `useAudioContext()`.
- `src/hooks/useAudio.ts` — keeps `playBeep` / `playChime` exports; the hook body moves into the context (or is imported by it), and the unmount cleanup is dropped since the provider lives for the app's lifetime.
- `src/components/AudioPlayer.tsx` — swap `useAudio()` for `useAudioContext()`; add an optional `compact` prop for the fullscreen variant.
- `src/components/Timer.tsx` — render `<AudioPlayer compact />` inside the fullscreen branch.
- `src/App.tsx` — wrap routes with `AudioProvider`.

**Files changed:** 4 edited, 1 new.
