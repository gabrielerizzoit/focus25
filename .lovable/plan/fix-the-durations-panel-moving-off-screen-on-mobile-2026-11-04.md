# Fix the Durations panel moving off screen on mobile

## Cause
The number boxes in the panel use text smaller than 16 px. On iPhone, tapping a box with text that small makes Safari zoom in automatically. After the zoom, the panel is pushed off the left side of the screen, as your screenshot shows. On PC this doesn't happen, so it stays fixed there.

## What changes (mobile only, nothing else)
- The number boxes (minutes, seconds, rounds) use 16 px text on phones, so Safari no longer zooms in. On PC they stay as they are now.
- The panel scrolls up and down when the keyboard is open, so every field and "Reset to defaults" stays reachable.
- The panel stays in place when the keyboard opens.

## Technical details
- `src/components/Timer.tsx`: on the 3 `input` elements (lines 311, 317, 329), change `text-sm` to `text-base md:text-sm`. That gives 16 px on phones and stops iOS from auto-zooming.
- On the mobile `DrawerContent`, add `max-h-[85dvh]` and wrap the content in `overflow-y-auto`. Pass `repositionInputs={false}` to the `Drawer` if the installed vaul version supports it; otherwise leave it out.
- Check at 390 px with Playwright: tap a field and confirm the panel stays inside the screen.
