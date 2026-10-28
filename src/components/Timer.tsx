import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, X, ChevronRight } from 'lucide-react';
import { useTimer, type TimerMode } from '@/hooks/useTimer';
import { playBeep, playChime } from '@/hooks/useAudio';
import { useSessionStats } from '@/hooks/useSessionStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFullscreen } from '@/hooks/useFullscreen';
import ProgressRing from './ProgressRing';
import AudioPlayer from './AudioPlayer';
import ThemeSwitcher from './ThemeSwitcher';
import TimerPresets from './TimerPresets';
import SessionStats from './SessionStats';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function useMinWidth(px: number) {
  const q = `(min-width: ${px}px)`;
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mql = window.matchMedia(q);
    const on = () => setM(mql.matches);
    mql.addEventListener('change', on);
    return () => mql.removeEventListener('change', on);
  }, [q]);
  return m;
}

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="w-full">
    <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-4 mb-2">{title}</h2>
    <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">{children}</div>
  </section>
);

interface TimerProps {
  defaultDuration?: number;
  showAudio?: boolean;
}

const HINTS_KEY = 'focus25-focus-hints';
const HIDE_DELAY = 3000;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const Timer = ({ defaultDuration, showAudio = true }: TimerProps) => {
  const { t } = useLanguage();
  const ui = t.ui;
  const { incrementSession } = useSessionStats();
  const lastBeepRef = useRef<number>(-1);
  const fsContainerRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const isDesktop = useMinWidth(1024);
  const { isFullscreen, isFallback, toggle, exit } = useFullscreen();
  const calcFsSize = () => Math.max(160, Math.min(window.innerWidth * 0.88, 520, window.innerHeight - 260));
  const [fsSize, setFsSize] = useState(() => (typeof window !== 'undefined' ? calcFsSize() : 400));
  const [hintCount, setHintCount] = useState<number>(() => {
    try { return Number(localStorage.getItem(HINTS_KEY)) || 0; } catch { return 0; }
  });
  const [hintsActive, setHintsActive] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showTapHint, setShowTapHint] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const tapHintTimerRef = useRef<number | null>(null);
  const focusInsideRef = useRef(false);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (!isFullscreen) return;
    const update = () => setFsSize(calcFsSize());
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [isFullscreen]);

  const allModes: { id: TimerMode; label: string }[] = [
    { id: 'focus', label: ui.focus },
    { id: 'shortBreak', label: ui.shortBreak },
    { id: 'longBreak', label: ui.longBreak },
  ];

  const timer = useTimer(defaultDuration, (mode) => {
    playChime();
    if (mode === 'focus') incrementSession();
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'session_complete', { completed_mode: mode });
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focus25', {
        body: mode === 'focus' ? ui.sessionComplete : ui.breakOver,
      });
    }
  });

  const { mode, remaining, totalDuration, isRunning, progress, settings, autoSwitch, setAutoSwitch, start, pause, reset, switchMode, updateSettings, resetSettings } = timer;
  const isBreak = mode !== 'focus';
  const modes = allModes.filter(m => m.id !== 'longBreak' || settings.longBreakEnabled);

  useEffect(() => {
    if (isRunning && remaining <= 5 && remaining > 0 && remaining !== lastBeepRef.current) {
      lastBeepRef.current = remaining;
      playBeep(remaining === 1 ? 1000 : 800, 100);
    }
    if (remaining > 5) lastBeepRef.current = -1;
  }, [remaining, isRunning]);

  const handleStart = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'timer_start', { event_category: 'engagement', event_label: mode });
    }
    start();
  };

  const handleToggleFullscreen = () => {
    toggle(fsContainerRef.current);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'fullscreen_toggle', { fullscreen: !isFullscreen });
    }
  };

  isRunningRef.current = isRunning;

  const clearHide = () => {
    if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
  };
  const scheduleHide = () => {
    clearHide();
    if (!isRunningRef.current || focusInsideRef.current) return;
    hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), HIDE_DELAY);
  };
  const reveal = () => {
    setControlsVisible(true);
    scheduleHide();
  };

  // Count fullscreen openings for hints
  useEffect(() => {
    if (!isFullscreen) { clearHide(); setControlsVisible(true); setShowTapHint(false); return; }
    const next = hintCount + 1;
    setHintsActive(next <= 5);
    setHintCount(next);
    try { localStorage.setItem(HINTS_KEY, String(next)); } catch { /* noop */ }
    setControlsVisible(true);
    scheduleHide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  // Keep controls visible while paused; start auto-hide while running
  useEffect(() => {
    if (!isFullscreen) return;
    if (!isRunning) { clearHide(); setControlsVisible(true); }
    else scheduleHide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isFullscreen]);

  // Tap hint when controls hide
  useEffect(() => {
    if (!isFullscreen || !hintsActive) return;
    if (!controlsVisible) {
      setShowTapHint(true);
      tapHintTimerRef.current = window.setTimeout(() => setShowTapHint(false), 3000);
    } else {
      setShowTapHint(false);
    }
    return () => { if (tapHintTimerRef.current) window.clearTimeout(tapHintTimerRef.current); };
  }, [controlsVisible, isFullscreen, hintsActive]);

  useEffect(() => () => clearHide(), []);

  // Keyboard: Space = start/pause, Escape = exit, any key reveals
  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { exit(); return; }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (isRunningRef.current) pause(); else handleStart();
      }
      reveal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const modeLabel = mode === 'shortBreak' ? ui.shortBreak : mode === 'longBreak' ? ui.longBreak : ui.focus;

  // ============ Fullscreen layout ============
  if (isFullscreen) {
    const fade = `transition-opacity duration-200 ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const focusHandlers = {
      onFocus: () => { focusInsideRef.current = true; clearHide(); setControlsVisible(true); },
      onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) { focusInsideRef.current = false; scheduleHide(); }
      },
    };
    return (
      <div
        ref={fsContainerRef}
        onMouseMove={reveal}
        onPointerDown={reveal}
        className={`${isFallback ? 'fixed inset-0 z-50' : ''} relative bg-background text-foreground flex flex-col items-center justify-center h-screen w-full p-3 overflow-hidden`}
        style={{ cursor: controlsVisible ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className={`flex gap-1 bg-muted/30 rounded-full p-1 ${fade}`} {...focusHandlers}>
            {modes.map(({ id, label }) => (
              <button
                key={id}
                tabIndex={0}
                onClick={() => switchMode(id)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  mode === id
                    ? (id !== 'focus' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground')
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center" style={{ width: fsSize, height: fsSize }}>
            <ProgressRing progress={progress} isBreak={isBreak} size={fsSize} strokeWidth={10} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-light tracking-wider tabular-nums text-foreground leading-none" style={{ fontSize: fsSize * 0.22 }}>
                {formatTime(remaining)}
              </span>
              <span className="uppercase tracking-[0.3em] text-muted-foreground mt-3" style={{ fontSize: Math.max(10, Math.min(fsSize * 0.04, 16)) }}>
                {modeLabel}
              </span>
            </div>
          </div>

          <div className={`flex flex-col items-center gap-3 ${fade}`} {...focusHandlers}>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={reset} className="rounded-full h-12 w-12" aria-label={ui.reset}>
                <RotateCcw size={22} />
              </Button>
              <Button
                onClick={isRunning ? pause : handleStart}
                className={`rounded-full px-8 py-5 text-base ${isBreak ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
              >
                {isRunning ? <Pause size={22} /> : <Play size={22} />}
                {isRunning ? ui.pause : ui.start}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleToggleFullscreen} className="rounded-full h-12 w-12" aria-label={ui.exitFullscreen}>
                {isFallback ? <X size={22} /> : <Minimize2 size={22} />}
              </Button>
            </div>
            {showAudio && <AudioPlayer compact />}
            <p className={`text-xs text-muted-foreground/70 text-center max-w-xs min-h-4 ${hintsActive && isRunning ? '' : 'invisible'}`}>
              {ui.focusHintAutohide}
            </p>
          </div>
        </div>

        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-muted/40 text-xs text-muted-foreground transition-opacity duration-200 pointer-events-none ${showTapHint && !controlsVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {ui.focusHintTap}
        </div>
      </div>
    );
  }

  // ============ Normal layout ============
  const fmtMin = (sec: number) => (sec % 60 ? `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}` : String(sec / 60));
  const durationSummary = [settings.focus, settings.shortBreak, ...(settings.longBreakEnabled ? [settings.longBreak] : [])].map(fmtMin).join(' · ') + ' min';
  const clean = (v: string) => v.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '').slice(0, 2);

  const durationsPanel = (
    <div className="space-y-3 p-1">
      {([
        { key: 'focus' as const, label: ui.focusDuration, def: 25 * 60 },
        { key: 'shortBreak' as const, label: ui.shortBreakDuration, def: 5 * 60 },
        { key: 'longBreak' as const, label: ui.longBreakDuration, def: 15 * 60 },
      ]).map(({ key, label, def }) => {
        const totalSec = settings[key];
        const mm = Math.floor(totalSec / 60);
        const ss = totalSec % 60;
        const commit = (newMm: number, newSs: number) => {
          const total = Math.max(1, Math.min(99 * 60 + 59, newMm * 60 + newSs));
          updateSettings({ [key]: total });
        };
        return (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm text-foreground">{label}</label>
            <div className="flex items-center gap-1">
              <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2} value={String(mm)}
                onChange={e => { const r = clean(e.target.value); commit(r === '' ? 0 : Math.min(99, Number(r)), ss); }}
                onBlur={() => { if (mm * 60 + ss < 1) updateSettings({ [key]: def }); }}
                className="w-12 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center"
                aria-label={`${label} minutes`} />
              <span className="text-sm text-muted-foreground">:</span>
              <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2} value={String(ss)}
                onChange={e => { const r = clean(e.target.value); commit(mm, r === '' ? 0 : Math.min(59, Number(r))); }}
                onBlur={() => { if (mm * 60 + ss < 1) updateSettings({ [key]: def }); }}
                className="w-12 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center"
                aria-label={`${label} seconds`} />
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <label className="text-sm text-foreground">{ui.longBreakInterval}</label>
        <div className="flex items-center gap-1">
          <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2}
            value={String(settings.longBreakInterval)} disabled={!settings.longBreakEnabled}
            onChange={e => { const r = clean(e.target.value); updateSettings({ longBreakInterval: r === '' ? 1 : Math.max(1, Math.min(20, Number(r))) }); }}
            className="w-12 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center disabled:opacity-50"
            aria-label={ui.longBreakInterval} />
          <span className="text-xs text-muted-foreground">{ui.rounds}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground">{ui.enableLongBreak}</label>
        <Switch checked={settings.longBreakEnabled} onCheckedChange={(checked) => {
          updateSettings({ longBreakEnabled: checked });
          if (!checked && mode === 'longBreak') switchMode('focus');
        }} />
      </div>
      <Button variant="ghost" size="sm" onClick={resetSettings} className="w-full text-xs text-muted-foreground hover:text-foreground">
        {ui.resetDefaults}
      </Button>
    </div>
  );

  const ringSize = isDesktop ? 340 : 280;

  return (
    <div ref={fsContainerRef} className="w-full max-w-[1120px] mx-auto grid gap-8 lg:grid-cols-2 lg:gap-10">
      <section className="flex flex-col items-center justify-center gap-6 lg:bg-card lg:border lg:border-border lg:rounded-3xl lg:p-8">
        {!defaultDuration && (
          <div className="flex gap-1 bg-muted/30 rounded-full p-1">
            {modes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { switchMode(id); if (typeof window.gtag === 'function') window.gtag('event', 'mode_switch', { timer_mode: id }); }}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  mode === id
                    ? isBreak ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="relative flex items-center justify-center">
          <ProgressRing progress={progress} isBreak={isBreak} size={ringSize} strokeWidth={8} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-wider text-foreground tabular-nums">
              {formatTime(remaining)}
            </span>
            <span className="text-xs text-muted-foreground mt-1 capitalize">{modeLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="secondary" size="icon" onClick={reset} aria-label={ui.reset}
            className="rounded-full h-14 w-14 bg-muted text-foreground hover:bg-muted/80">
            <RotateCcw size={20} />
          </Button>
          <Button
            onClick={isRunning ? pause : handleStart}
            className={`rounded-full h-14 px-12 text-lg font-semibold gap-2 ${isBreak ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? ui.pause : ui.start}
          </Button>
          <div className="w-14 h-14" aria-hidden="true" />
        </div>

        <div className="flex flex-col items-center gap-1.5 -mt-2">
          <Button variant="outline" onClick={handleToggleFullscreen} className="rounded-full gap-2 px-5">
            <Maximize2 size={16} />
            {ui.fullscreen}
          </Button>
          {hintCount === 0 && (
            <p className="text-xs text-muted-foreground/70 text-center max-w-xs">{ui.focusModeCaption}</p>
          )}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 lg:content-between">
        <Group title={ui.groupTimer}>
          {!defaultDuration && (
            <>
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="text-sm text-foreground">{ui.autoSwitch}</p>
                  <p className="text-xs text-muted-foreground">{ui.autoSwitchTooltip}</p>
                </div>
                <Switch checked={autoSwitch} onCheckedChange={setAutoSwitch} />
              </div>
              <button onClick={() => setShowSettings(true)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors">
                <span className="text-sm text-foreground">{ui.durations}</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">{durationSummary}<ChevronRight size={16} /></span>
              </button>
            </>
          )}
          <div className="px-4 py-3">
            <TimerPresets
              onSelect={(focus, shortBreak) => updateSettings({ focus, shortBreak })}
              current={{ focus: settings.focus, shortBreak: settings.shortBreak }}
            />
          </div>
        </Group>
        {showAudio && (
          <Group title={ui.groupSound}>
            <div className="px-4 py-3"><AudioPlayer /></div>
          </Group>
        )}
        <Group title={ui.groupAppearance}>
          <div className="px-4 py-3"><ThemeSwitcher /></div>
        </Group>
        <Group title={ui.groupToday}>
          <div className="px-4 py-3"><SessionStats /></div>
        </Group>
        <p className="text-xs text-muted-foreground/60 text-center md:col-span-2 lg:col-span-1">{ui.tabMessage}</p>
      </div>

      {isDesktop ? (
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>{ui.durations}</DialogTitle></DialogHeader>
            {durationsPanel}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={showSettings} onOpenChange={setShowSettings}>
          <DrawerContent>
            <DrawerHeader><DrawerTitle>{ui.durations}</DrawerTitle></DrawerHeader>
            <div className="px-4 pb-8 max-w-md mx-auto w-full">{durationsPanel}</div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Timer;
