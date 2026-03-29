import { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Info } from 'lucide-react';
import { useTimer, type TimerMode } from '@/hooks/useTimer';
import { playBeep, playChime } from '@/hooks/useAudio';
import { useSessionStats } from '@/hooks/useSessionStats';
import ProgressRing from './ProgressRing';
import AudioPlayer from './AudioPlayer';
import SessionStats from './SessionStats';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useState } from 'react';

interface TimerProps {
  defaultDuration?: number;
  showAudio?: boolean;
}

const modes: { id: TimerMode; label: string }[] = [
  { id: 'focus', label: 'Focus' },
  { id: 'shortBreak', label: 'Short Break' },
  { id: 'longBreak', label: 'Long Break' },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const Timer = ({ defaultDuration, showAudio = true }: TimerProps) => {
  const { incrementSession } = useSessionStats();
  const lastBeepRef = useRef<number>(-1);
  const [showSettings, setShowSettings] = useState(false);

  const timer = useTimer(defaultDuration, (mode) => {
    playChime();
    if (mode === 'focus') incrementSession();
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focus25', {
        body: mode === 'focus' ? 'Focus session complete! Time for a break.' : 'Break over! Ready to focus?',
      });
    }
  });

  const { mode, remaining, totalDuration, isRunning, progress, settings, autoSwitch, setAutoSwitch, start, pause, reset, switchMode, updateSettings } = timer;
  const isBreak = mode !== 'focus';

  // Countdown beeps in last 5 seconds
  useEffect(() => {
    if (isRunning && remaining <= 5 && remaining > 0 && remaining !== lastBeepRef.current) {
      lastBeepRef.current = remaining;
      playBeep(remaining === 1 ? 1000 : 800, 100);
    }
    if (remaining > 5) lastBeepRef.current = -1;
  }, [remaining, isRunning]);

  // Request notification permission on first interaction
  const handleStart = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    start();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mode tabs */}
      {!defaultDuration && (
        <div className="flex gap-1 bg-muted/30 rounded-full p-1">
          {modes.map(({ id, label }) => (
            <span key={id} className="flex items-center gap-0.5">
              <button
                onClick={() => switchMode(id)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  mode === id
                    ? isBreak ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
              {id === 'longBreak' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>Long break starts after 4 focus sessions</TooltipContent>
                </Tooltip>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Progress ring + time */}
      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} isBreak={isBreak} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl sm:text-6xl font-light tracking-wider text-foreground tabular-nums">
            {formatTime(remaining)}
          </span>
          <span className="text-xs text-muted-foreground mt-1 capitalize">
            {mode === 'shortBreak' ? 'Short Break' : mode === 'longBreak' ? 'Long Break' : 'Focus'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={reset} className="rounded-full">
          <RotateCcw size={18} />
        </Button>
        <Button
          onClick={isRunning ? pause : handleStart}
          className={`rounded-full px-8 py-5 text-base ${
            isBreak ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''
          }`}
          size="lg"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} className="rounded-full">
          <Settings size={18} />
        </Button>
      </div>

      {/* Auto-switch */}
      {!defaultDuration && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Switch checked={autoSwitch} onCheckedChange={setAutoSwitch} />
          <span>Auto-switch</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} className="cursor-help" />
            </TooltipTrigger>
            <TooltipContent>Automatically switches between focus and break sessions</TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Settings */}
      {showSettings && !defaultDuration && (
        <div className="bg-card border border-border rounded-xl p-4 w-full max-w-xs space-y-3">
          <h3 className="text-sm font-medium text-foreground">Settings</h3>
          {[
            { key: 'focus' as const, label: 'Focus (min)' },
            { key: 'shortBreak' as const, label: 'Short Break (min)' },
            { key: 'longBreak' as const, label: 'Long Break (min)' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">{label}</label>
              <input
                type="number"
                min={1}
                max={120}
                value={settings[key] / 60}
                onChange={e => updateSettings({ [key]: Number(e.target.value) * 60 })}
                className="w-16 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground text-center"
              />
            </div>
          ))}
        </div>
      )}

      {/* Audio */}
      {showAudio && <AudioPlayer />}

      {/* Session stats */}
      <SessionStats />

      <p className="text-xs text-muted-foreground/60 text-center max-w-xs">
        Timer continues even if you switch tabs. Keep this page open for best experience.
      </p>
    </div>
  );
};

export default Timer;
