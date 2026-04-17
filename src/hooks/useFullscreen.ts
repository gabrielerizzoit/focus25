import { useCallback, useEffect, useState } from 'react';

export function useFullscreen() {
  const [isNative, setIsNative] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const onChange = () => setIsNative(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(async (el?: HTMLElement | null) => {
    const target = el ?? document.documentElement;
    if (target.requestFullscreen) {
      try {
        await target.requestFullscreen();
        return;
      } catch {
        // fall through to fallback
      }
    }
    setIsFallback(true);
  }, []);

  const exit = useCallback(async () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      try { await document.exitFullscreen(); } catch { /* noop */ }
    }
    setIsFallback(false);
  }, []);

  const isFullscreen = isNative || isFallback;

  const toggle = useCallback(
    (el?: HTMLElement | null) => (isFullscreen ? exit() : enter(el)),
    [isFullscreen, enter, exit]
  );

  useEffect(() => {
    if (!isFallback) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFallback(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFallback]);

  return { isFullscreen, isFallback, enter, exit, toggle };
}
