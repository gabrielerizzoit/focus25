import { useState, useEffect, useCallback, useRef } from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

interface TimerState {
  mode: TimerMode;
  remaining: number;
  totalDuration: number;
  isRunning: boolean;
  progress: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function loadSettings(): TimerSettings {
  try {
    const s = localStorage.getItem('focus25-settings');
    if (s) return JSON.parse(s);
  } catch {}
  return DEFAULT_SETTINGS;
}

function saveSettings(s: TimerSettings) {
  localStorage.setItem('focus25-settings', JSON.stringify(s));
}

export function useTimer(
  defaultDuration?: number,
  onComplete?: (mode: TimerMode) => void
) {
  const [settings, setSettingsState] = useState<TimerSettings>(loadSettings);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [focusCount, setFocusCount] = useState(0);

  const duration = defaultDuration || settings[mode];
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const endTimeRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef<number>(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevSettingsRef = useRef(settings);
  const prevModeRef = useRef(mode);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    if (!endTimeRef.current) return;
    const now = Date.now();
    const left = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
    setRemaining(left);
    if (left <= 0) {
      clearTimer();
      setIsRunning(false);
      endTimeRef.current = null;
    }
  }, [clearTimer]);

  const start = useCallback(() => {
    const r = pausedRemainingRef.current;
    if (r <= 0) return;
    endTimeRef.current = Date.now() + r * 1000;
    setIsRunning(true);
    clearTimer();
    intervalRef.current = setInterval(tick, 250);
  }, [tick, clearTimer]);

  const pause = useCallback(() => {
    if (!endTimeRef.current) return;
    const left = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
    pausedRemainingRef.current = left;
    setRemaining(left);
    endTimeRef.current = null;
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    endTimeRef.current = null;
    setIsRunning(false);
    const d = defaultDuration || settings[mode];
    pausedRemainingRef.current = d;
    setRemaining(d);
  }, [clearTimer, settings, mode, defaultDuration]);

  const switchMode = useCallback((newMode: TimerMode) => {
    clearTimer();
    endTimeRef.current = null;
    setIsRunning(false);
    setMode(newMode);
    const d = defaultDuration || settings[newMode];
    pausedRemainingRef.current = d;
    setRemaining(d);
  }, [clearTimer, settings, defaultDuration]);

  const updateSettings = useCallback((s: Partial<TimerSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...s };
      saveSettings(next);
      return next;
    });
  }, []);

  // Handle completion
  useEffect(() => {
    if (remaining <= 0 && !isRunning && endTimeRef.current === null && pausedRemainingRef.current !== (defaultDuration || settings[mode])) {
      onComplete?.(mode);
      if (mode === 'focus') {
        setFocusCount(c => c + 1);
      }
      if (autoSwitch) {
        let nextMode: TimerMode;
        if (mode === 'focus') {
          nextMode = (focusCount + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
        } else {
          nextMode = 'focus';
        }
        setTimeout(() => switchMode(nextMode), 500);
      }
      // Reset pausedRemaining to mark as "fresh"
      pausedRemainingRef.current = defaultDuration || settings[mode];
    }
  }, [remaining, isRunning, mode, autoSwitch, focusCount, switchMode, onComplete, settings, defaultDuration]);

  // Sync remaining to pausedRef when not running
  useEffect(() => {
    if (!isRunning) {
      pausedRemainingRef.current = remaining;
    }
  }, [remaining, isRunning]);

  // Reset duration when settings or mode changes
  useEffect(() => {
    if (!isRunning) {
      const d = defaultDuration || settings[mode];
      pausedRemainingRef.current = d;
      setRemaining(d);
    }
  }, [settings, mode, defaultDuration, isRunning]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const totalDuration = defaultDuration || settings[mode];
  const progress = totalDuration > 0 ? (totalDuration - remaining) / totalDuration : 0;

  const state: TimerState = { mode, remaining, totalDuration, isRunning, progress };

  return {
    ...state,
    settings,
    autoSwitch,
    setAutoSwitch,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
  };
}
