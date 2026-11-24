import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { appPromo } from '@/i18n/appPromo';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.focus25.app';
export const MICROSOFT_STORE_URL = 'https://apps.microsoft.com/detail/9NZ2TZBT14DK';

type Device = 'ios' | 'android' | 'desktop' | null;
export function useDevice(): Device {
  const [d, setD] = useState<Device>(null);
  useEffect(() => {
    const ua = navigator.userAgent;
    const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    if (/iPhone|iPad|iPod/i.test(ua) || iPadOS) setD('ios');
    else if (/Android/i.test(ua)) setD('android');
    else setD('desktop');
  }, []);
  return d;
}

export const track = (name: string, location: string) => {
  if (typeof window.gtag === 'function') window.gtag('event', name, { location });
};

export const usePromoText = () => {
  const { lang } = useLanguage();
  return appPromo[lang] || appPromo.en;
};

export function PlayButton({ location, className = '', onClick }: { location: string; className?: string; onClick?: () => void }) {
  const s = usePromoText();
  return (
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => { track('click_android_app', location); onClick?.(); }}
      className={`inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-lg bg-foreground px-4 py-2 font-semibold text-background hover:opacity-90 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
        <path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Zm11.3 11.3 2.4 2.4-11.2 6.4 8.8-8.8Zm3.6-3.6 2.8 1.6c.8.5.8 1.3 0 1.8l-2.8 1.6-2.6-2.5 2.6-2.5ZM6.1 2.1l11.2 6.4-2.4 2.4-8.8-8.8Z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-normal uppercase opacity-80">{s.availableOn}</span>
        Google Play
      </span>
    </a>
  );
}

export function MicrosoftBadge({ location, className = '', label = true }: { location: string; className?: string; label?: boolean }) {
  const s = usePromoText();
  return (
    <div className={className}>
      {label && <div className="mb-1 text-xs text-muted-foreground">{s.alsoWindows}</div>}
      <a href={MICROSOFT_STORE_URL} target="_blank" rel="noopener noreferrer"
        onClick={() => track('click_windows_app', location)} className="inline-block hover:opacity-90">
        <img src="/microsoft-store-badge-it.svg" alt={s.msAlt} width={161} height={44} loading="lazy" className="h-10 w-auto" />
      </a>
    </div>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
    {items.map((i) => <li key={i}>✓ {i}</li>)}
  </ul>
);

export function AppPromoSection() {
  const device = useDevice();
  const s = usePromoText();
  if (!device || device === 'ios') return null;
  const desktop = device === 'desktop';
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-2xl font-bold">{desktop ? s.titleDesktop : s.titleAndroid}</h2>
      <div className={desktop ? 'mt-6 grid gap-5 md:grid-cols-2' : 'mt-4'}>
        <div className={desktop ? 'rounded-xl border border-border p-5 flex items-start gap-4' : ''}>
          <div className="flex-1">
            {desktop && <h3 className="text-lg font-semibold text-primary">{s.android}</h3>}
            <List items={s.androidItems} />
            <PlayButton location="home_section" className="mt-5" />
          </div>
          {desktop && (
            <div className="text-center shrink-0">
              <img src="/qr-android-app.svg" alt={s.qrAlt} width={110} height={110} loading="lazy" className="mx-auto rounded-lg" />
              <p className="mt-2 text-xs text-muted-foreground">{s.scan}</p>
            </div>
          )}
        </div>
        {desktop && (
          <div className="rounded-xl border border-border p-5">
            <h3 className="text-lg font-semibold text-primary">{s.windows}</h3>
            <List items={s.windowsItems} />
            <MicrosoftBadge location="home_section" className="mt-5" label={false} />
          </div>
        )}
      </div>
    </div>
  );
}

export function AppPromoFooter() {
  const device = useDevice();
  const s = usePromoText();
  if (!device || device === 'ios') return null;
  return (
    <div>
      <h4 className="font-medium text-foreground mb-3">{s.footerTitle}</h4>
      {device === 'desktop' && <img src="/qr-android-app.svg" alt={s.qrAlt} width={80} height={80} loading="lazy" className="mb-2 rounded" />}
      <PlayButton location="footer" className="text-xs px-3 py-1.5" />
      {device === 'desktop' && <MicrosoftBadge location="footer" className="mt-3" />}
    </div>
  );
}
