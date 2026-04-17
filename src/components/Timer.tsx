import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Settings, Info, Maximize2, Minimize2, X } from 'lucide-react';
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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface TimerProps {
  defaultDuration?: number;
  showAudio?: boolean;
}

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
  const { isFullscreen, isFallback, toggle, exit } = useFullscreen();
  const [fsSize, setFsSize] = useState(() =>
    typeof window !== 'undefined' ? Math.min(Math.min(window.innerHeight, window.innerWidth) * 0.6, 600) : 400
  );

  useEffect(() => {
    if (!isFullscreen) return;
    const update = () => setFsSize(Math.min(Math.min(window.innerHeight, window.innerWidth) * 0.6, 600));
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

  const modeLabel = mode === 'shortBreak' ? ui.shortBreak : mode === 'longBreak' ? ui.longBreak : ui.focus;

  // ============ Fullscreen layout ============
  if (isFullscreen) {
    return (
      <div
        ref={fsContainerRef}
        className={`${isFallback ? 'fixed inset-0 z-50' : ''} bg-background text-foreground flex flex-col items-center justify-center min-h-screen w-full p-6`}
      >
        <button
          onClick={handleToggleFullscreen}
          aria-label={ui.exitFullscreen}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
        >
          {isFallback ? <X size={24} /> : <Minimize2 size={24} />}
        </button>

        <div className="flex gap-1 bg-muted/30 rounded-full p-1 mb-8">
          {modes.map(({ id, label }) => (
            <button
              key={id}
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
            <span className="text-7xl sm:text-8xl md:text-9xl font-light tracking-wider tabular-nums text-foreground">
              {formatTime(remaining)}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-3">
              {modeLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <Button variant="ghost" size="icon" onClick={reset} className="rounded-full h-12 w-12">
            <RotateCcw size={22} />
          </Button>
          <Button
            onClick={isRunning ? pause : handleStart}
            className={`rounded-full px-10 py-6 text-lg ${isBreak ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
            size="lg"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
            {isRunning ? ui.pause : ui.start}
          </Button>
        </div>
      </div>
    );
  }

  // ============ Normal layout ============
  return (
    <div ref={fsContainerRef} className="flex flex-col items-center gap-6">
      {!defaultDuration && (
        <div className="flex gap-1 bg-muted/30 rounded-full p-1">
          {modes.map(({ id, label }) => (
            <span key={id} className="flex items-center gap-0.5">
              <button
                onClick={() => { switchMode(id); if (typeof window.gtag === 'function') window.gtag('event', 'mode_switch', { timer_mode: id }); }}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  mode === id
                    ? isBreak ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
              {id === 'longBreak' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto max-w-xs text-sm p-2">{ui.longBreakTooltip}</PopoverContent>
                </Popover>
              )}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} isBreak={isBreak} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl sm:text-6xl font-light tracking-wider text-foreground tabular-nums">
            {formatTime(remaining)}
          </span>
          <span className="text-xs text-muted-foreground mt-1 capitalize">{modeLabel}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={reset} className="rounded-full">
          <RotateCcw size={18} />
        </Button>
        <Button
          onClick={isRunning ? pause : handleStart}
          className={`rounded-full px-8 py-5 text-base ${isBreak ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
          size="lg"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? ui.pause : ui.start}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} className="rounded-full">
          <Settings size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleToggleFullscreen} className="rounded-full" aria-label={ui.fullscreen}>
          <Maximize2 size={18} />
        </Button>
      </div>

      {!defaultDuration && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Switch checked={autoSwitch} onCheckedChange={setAutoSwitch} />
          <span>{ui.autoSwitch}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Info size={14} className="cursor-help" />
            </PopoverTrigger>
            <PopoverContent className="w-auto max-w-xs text-sm p-2">{ui.autoSwitchTooltip}</PopoverContent>
          </Popover>
        </div>
      )}

      {showSettings && !defaultDuration && (
        <div className="bg-card border border-border rounded-xl p-4 w-full max-w-xs space-y-3">
          <h3 className="text-sm font-medium text-foreground">{ui.settings}</h3>
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
                <label className="text-xs text-muted-foreground">{label}</label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={String(mm)}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '').slice(0, 2);
                      const n = raw === '' ? 0 : Math.min(99, Number(raw));
                      commit(n, ss);
                    }}
                    onBlur={() => {
                      if (mm * 60 + ss < 1) updateSettings({ [key]: def });
                    }}
                    className="w-12 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center"
                    aria-label={`${label} minutes`}
                  />
                  <span className="text-sm text-muted-foreground">:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={String(ss)}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '').slice(0, 2);
                      const n = raw === '' ? 0 : Math.min(59, Number(raw));
                      commit(mm, n);
                    }}
                    onBlur={() => {
                      if (mm * 60 + ss < 1) updateSettings({ [key]: def });
                    }}
                    className="w-12 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center"
                    aria-label={`${label} seconds`}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <label className="text-xs text-muted-foreground">{ui.longBreakInterval}</label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={String(settings.longBreakInterval)}
                disabled={!settings.longBreakEnabled}
                onChange={e => {
                  const raw = e.target.value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '').slice(0, 2);
                  const n = raw === '' ? 1 : Math.max(1, Math.min(20, Number(raw)));
                  updateSettings({ longBreakInterval: n });
                }}
                onBlur={() => {
                  if (settings.longBreakInterval < 1) updateSettings({ longBreakInterval: 4 });
                }}
                className="w-12 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center disabled:opacity-50"
                aria-label={ui.longBreakInterval}
              />
              <span className="text-xs text-muted-foreground">{ui.rounds}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">{ui.enableLongBreak}</label>
            <Switch
              checked={settings.longBreakEnabled}
              onCheckedChange={(checked) => {
                updateSettings({ longBreakEnabled: checked });
                if (!checked && mode === 'longBreak') switchMode('focus');
              }}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetSettings}
            className="w-full text-xs text-muted-foreground hover:text-foreground mt-1"
          >
            {ui.resetDefaults}
          </Button>
        </div>
      )}

      {showAudio && <AudioPlayer />}
      <ThemeSwitcher />
      <TimerPresets
        onSelect={(focus, shortBreak) => updateSettings({ focus, shortBreak })}
        current={{ focus: settings.focus, shortBreak: settings.shortBreak }}
      />
      <SessionStats />
      <p className="text-xs text-muted-foreground/60 text-center max-w-xs">{ui.tabMessage}</p>
    </div>
  );
};

export default Timer;
