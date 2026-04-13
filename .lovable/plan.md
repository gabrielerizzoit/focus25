# Add Color Theme Switcher to Focus25

## Overview

Add 3 predefined color themes (Default, Pink, Light) switchable via a compact segmented control placed below the timer settings area. Uses pure CSS variables — no libraries, no re-renders.

## Technical Approach

Themes work by setting a `data-theme` attribute on `<html>`. CSS variables override in `index.css` via `[data-theme="pink"]` and `[data-theme="light"]` selectors. A tiny script in `index.html` reads localStorage before React loads to prevent flash.

## File Changes

### `index.html`

Add inline script in `<head>` (before React):

```js
(function(){var t=localStorage.getItem('focus25-theme');if(t)document.documentElement.setAttribute('data-theme',t)})()
```

### `src/index.css`

Add two theme blocks after `:root`:

```css
[data-theme="pink"] {
  --background: 224 71% 7%;
  --primary: 330 81% 70%;      /* #F472B6 */
  --ring: 330 81% 70%;
  --secondary: 326 78% 90%;   /* #FBCFE8 */
  /* card, muted, border adjusted for pink palette */
}

[data-theme="light"] {
  --background: 210 20% 98%;  /* #F9FAFB */
  --foreground: 224 71% 7%;   /* #111827 */
  --primary: 217 91% 68%;     /* #60A5FA */
  --card: 210 20% 94%;
  /* all foreground/text vars flipped to dark */
}
```

### `src/components/ThemeSwitcher.tsx` (new)

Compact component — 3 small colored circles in a row + a reset link. On click: sets `data-theme` attribute on `<html>` and saves to localStorage. No React state needed for the theme itself (DOM attribute drives it), but uses a local state for highlighting the active option.

### `src/components/Timer.tsx`

Import and render `<ThemeSwitcher />` after the settings panel and after `<AudioPlayer />`.

### `src/i18n/types.ts` + all 7 language files

Add to `UIStrings`:

- `theme: string` — "Theme" / "Tema" / etc.
- `themeDefault: string` — "Default"
- `themePink: string` — "Pink" / "Rosa"
- `themeLight: string` — "Light" / "Chiaro"

## File Summary


| File                               | Action                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `index.html`                       | Add inline theme loader script                                          |
| `src/index.css`                    | Add `[data-theme="pink"]` and `[data-theme="light"]` variable overrides |
| `src/components/ThemeSwitcher.tsx` | New — 3 color dots + reset link                                         |
| `src/components/Timer.tsx`         | Render `<ThemeSwitcher />` below settings                               |
| `src/i18n/types.ts`                | Add 4 theme strings to `UIStrings`                                      |
| `src/i18n/en.ts` ... `tl.ts`       | Add theme translations (7 files)                                        |
