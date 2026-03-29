

# Add GA4 Event Tracking for User Actions

## What Changes

Add `gtag` event calls to three areas:

### 1. Audio Selection (`useAudio.ts`)
In `playSound()` — fire `audio_select` event with the sound type (rain/cafe/white-noise).

### 2. Mode Switching (`Timer.tsx`)
In the mode tab click handler — fire `mode_switch` event with the selected mode (focus/shortBreak/longBreak).

### 3. Session Completion (`Timer.tsx`)
In the `onComplete` callback passed to `useTimer` — fire `session_complete` event with the completed mode.

## Files Modified

| File | Change |
|------|--------|
| `src/hooks/useAudio.ts` | Add `gtag('event', 'audio_select', {...})` in `playSound()` |
| `src/components/Timer.tsx` | Add `gtag` call in mode switch button `onClick` and in the `onComplete` callback |

## Helper

Create a small `trackEvent` utility to avoid repeating the `typeof gtag` check everywhere:

```ts
function trackEvent(name: string, params: Record<string, string>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
```

## Events Summary

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `audio_select` | User clicks a sound button | `sound_type`: rain/cafe/white-noise |
| `mode_switch` | User clicks Focus/Short/Long tab | `timer_mode`: focus/shortBreak/longBreak |
| `session_complete` | Timer reaches 0 | `completed_mode`: focus/shortBreak/longBreak |

