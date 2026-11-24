import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PlayButton, MicrosoftBadge, track, usePromoText } from './AppPromo';
import { isSuppressed, suppressUntil, TOAST_DISMISS_DAYS, TOAST_DOWNLOAD_DAYS } from '@/lib/appToastPolicy';

const KEY = 'focus25-app-toast';

function isDesktop() {
  const ua = navigator.userAgent;
  const mobile = /Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle/i.test(ua);
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return window.innerWidth >= 1024 && !mobile && !iPadOS && !window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints === 0;
}
const busy = () => !!document.fullscreenElement || document.documentElement.dataset.timerBusy === '1';

const AppPromoToast = () => {
  const s = usePromoText();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let sup = false;
    try { sup = isSuppressed(localStorage.getItem(KEY), Date.now()); } catch { /* ignore */ }
    if (!isDesktop() || sup) return;
    const t = window.setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    }, 3000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setInterval(() => setHidden(busy()), 500);
    setHidden(busy());
    return () => window.clearInterval(id);
  }, [mounted]);

  if (!mounted || hidden) return null;

  const close = (days: number) => {
    try { localStorage.setItem(KEY, JSON.stringify({ until: suppressUntil(Date.now(), days) })); } catch { /* ignore */ }
    setOpen(false);
    window.setTimeout(() => setMounted(false), 400);
  };

  return (
    <div role="dialog" aria-label="Focus25 app"
      className={`fixed left-4 top-20 z-50 w-[360px] rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-xl transition-all duration-500 ease-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'}`}>
      <button type="button" aria-label={s.close}
        onClick={() => { track('dismiss_android_toast', 'toast'); close(TOAST_DISMISS_DAYS); }}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <img src="/favicon.ico" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
            <div className="text-lg font-bold text-primary">Focus25</div>
          </div>
          <p className="mt-3 text-sm leading-snug">{s.toastText}</p>
          <PlayButton location="toast" className="mt-4 text-sm px-3 py-1.5" onClick={() => close(TOAST_DOWNLOAD_DAYS)} />
          <MicrosoftBadge location="toast" className="mt-3" />
        </div>
        <div className="text-center pt-8 shrink-0">
          <img src="/qr-android-app.svg" alt={s.qrAlt} width={90} height={90} className="rounded" />
          <p className="mt-1 text-[10px] text-muted-foreground">{s.scan}</p>
        </div>
      </div>
    </div>
  );
};
export default AppPromoToast;
