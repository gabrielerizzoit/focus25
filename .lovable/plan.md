

# Fix Break Colors Across Themes

## Problem

Break modes (short/long) use the `--secondary` CSS variable for their color. In the default theme this is yellow (#FFC107), but in pink and light themes it changes to pink/blue — the user wants yellow breaks in all themes.

## Solution

Update the `[data-theme="pink"]` and `[data-theme="light"]` blocks in `src/index.css` to keep `--secondary` as the same yellow from the default theme.

### `src/index.css`

In `[data-theme="pink"]`:
- Change `--secondary: 326 78% 90%` → `--secondary: 45 100% 51%`
- Change `--secondary-foreground: 224 71% 7%` → `--secondary-foreground: 216 30% 6%` (dark text on yellow, same as default)

In `[data-theme="light"]`:
- Change `--secondary: 217 60% 85%` → `--secondary: 45 100% 51%`
- Change `--secondary-foreground: 224 71% 7%` stays (dark text on yellow — already correct)

This ensures the yellow break indicator is consistent across all three themes.

| File | Change |
|------|--------|
| `src/index.css` | Update `--secondary` and `--secondary-foreground` in both theme blocks |

