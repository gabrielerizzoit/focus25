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

const SETTINGS_TTL = 24 * 60 * 60 * 1000; // 24 hours

function loadSettings(): TimerSettings {
  try {
    const raw = localStorage.getItem('focus25-settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.timestamp && Date.now() - parsed.timestamp < SETTINGS_TTL) {
        return { focus: parsed.focus, shortBreak: parsed.shortBreak, longBreak: parsed.longBreak };
      }
      localStorage.removeItem('focus25-settings');
    }
  } catch {}
  return DEFAULT_SETTINGS;
}

function saveSettings(s: TimerSettings) {
  localStorage.setItem('focus25-settings', JSON.stringify({ ...s, timestamp: Date.now() }));
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
  const pendingAutoStartRef = useRef(false);
  const hasCompletedRef = useRef(false);

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
      hasCompletedRef.current = true;
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
    hasCompletedRef.current = false;
    const d = defaultDuration || settings[mode];
    pausedRemainingRef.current = d;
    setRemaining(d);
  }, [clearTimer, settings, mode, defaultDuration]);

  const switchMode = useCallback((newMode: TimerMode) => {
    clearTimer();
    endTimeRef.current = null;
    setIsRunning(false);
    hasCompletedRef.current = false;
    setMode(newMode);
    const d = defaultDuration || settings[newMode];
    pausedRemainingRef.current = d;
    setRemaining(d);
  }, [clearTimer, settings, defaultDuration]);

  const updateSettings = useCallback((s: Partial<TimerSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev };
      for (const key of Object.keys(s) as (keyof TimerSettings)[]) {
        if (s[key] !== undefined) {
          const seconds = Math.max(1, Math.min(99 * 60 + 59, Math.round(s[key]!)));
          next[key] = seconds;
        }
      }
      saveSettings(next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    localStorage.removeItem('focus25-settings');
    setSettingsState(DEFAULT_SETTINGS);
    // Reset current timer to new default duration
    const d = defaultDuration || DEFAULT_SETTINGS[mode];
    clearTimer();
    endTimeRef.current = null;
    setIsRunning(false);
    hasCompletedRef.current = false;
    pausedRemainingRef.current = d;
    setRemaining(d);
  }, [mode, defaultDuration, clearTimer]);

  // Handle completion — auto-switch and auto-start
  useEffect(() => {
    if (!hasCompletedRef.current) return;
    hasCompletedRef.current = false;

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
      pendingAutoStartRef.current = true;
      setTimeout(() => switchMode(nextMode), 500);
    }
  }, [remaining, isRunning, mode, autoSwitch, focusCount, switchMode, onComplete]);

  // Auto-start after mode switch triggered by auto-switch
  useEffect(() => {
    if (pendingAutoStartRef.current && !isRunning && remaining > 0 && endTimeRef.current === null) {
      pendingAutoStartRef.current = false;
      setTimeout(() => start(), 100);
    }
  }, [mode, remaining, isRunning, start]);

  // Reset duration when settings or mode changes (only when not running)
  useEffect(() => {
    if (!isRunning) {
      const settingsChanged = prevSettingsRef.current !== settings;
      const modeChanged = prevModeRef.current !== mode;
      if (settingsChanged || modeChanged) {
        const d = defaultDuration || settings[mode];
        pausedRemainingRef.current = d;
        setRemaining(d);
      }
    }
    prevSettingsRef.current = settings;
    prevModeRef.current = mode;
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
    resetSettings,
  };
}
