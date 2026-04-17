

User reports two issues in fullscreen on mobile landscape:
1. Layout not well centered, parts cut off
2. Timer text larger than the ring (overflowing)

Looking at current Timer.tsx fullscreen layout:
- Container uses `min-h-screen` + `p-6` + mode tabs (mb-8) + ring + controls (mt-10) → in landscape (e.g. 844x390), total vertical content exceeds viewport, causing cutoff
- `fsSize = min(innerHeight, innerWidth) * 0.7` → in landscape 390h × 844w → 273px ring
- Time text `text-7xl sm:text-8xl md:text-9xl` → on 844px wide it hits `sm:` (640+) → text-8xl = 6rem = 96px, but at md: (768+) → text-9xl = 8rem = 128px, larger than 273px ring diameter visually overflows

# Fix Fullscreen Layout on Mobile Landscape

## Problems
1. In landscape, `min-h-screen` + fixed margins (mb-8, mt-10) + p-6 push content past viewport edges → tabs/buttons cut off
2. Timer text scales by viewport width breakpoints (`sm:`/`md:`) but ring scales by the smaller of width/height → in landscape the text breakpoint triggers `text-9xl` while the ring stays small → text overflows ring

## Fix in `src/components/Timer.tsx` (fullscreen branch only)

1. **Tighter centered layout that always fits**:
   - Replace `min-h-screen` + `p-6` + fixed `mb-8`/`mt-10` with `h-screen`, `gap-4 sm:gap-6`, smaller padding (`p-3 sm:p-6`)
   - Use `justify-center` and let flex distribute space; remove individual large margins

2. **Scale text from ring size, not from viewport breakpoints**:
   - Compute time text size from `fsSize`: `fontSize: fsSize * 0.22` (inline style) — guarantees it fits inside the ring regardless of orientation
   - Mode label: `fontSize: fsSize * 0.04`, capped reasonably
   - Drop the Tailwind `text-7xl sm:text-8xl md:text-9xl` classes for the fullscreen timer

3. **Ring sizing already responsive** (`min(innerH, innerW) * 0.7`) — keep, but reduce to `* 0.6` to leave room for tabs above and controls below in landscape. Add a max cap of ~600px so it doesn't get absurd on TVs while still huge.

4. **Smaller controls in landscape**: use `size="default"` button + slightly smaller paddings on short viewports (use `h-screen` flexbox so it auto-fits)

## File Summary

| File | Change |
|------|--------|
| `src/components/Timer.tsx` | Fullscreen branch: switch to `h-screen` flex layout, scale timer text from `fsSize` via inline style, reduce ring factor to 0.6, tighten paddings/gaps |

