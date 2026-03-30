

# Fix: Scroll to Top on Page Navigation

## Problem
When navigating between pages, the browser keeps the current scroll position instead of scrolling to the top. This is a common issue with React Router SPAs — the browser doesn't reset scroll like it would with traditional page loads.

## Solution
Add a small `ScrollToTop` component that listens to route changes and calls `window.scrollTo(0, 0)` on every navigation.

### New file: `src/components/ScrollToTop.tsx`
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
```

### Update: `src/App.tsx`
Import `ScrollToTop` and place it inside `<BrowserRouter>` / `<LanguageProvider>`, before `<Routes>`.

---

**Files changed:** 2 (1 new component, 1 minor edit to App.tsx)

