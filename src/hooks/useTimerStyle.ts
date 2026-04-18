import { useEffect, useState, useCallback } from 'react';

export type TimerStyle = 'circle' | 'digital' | 'traffic';

const STYLE_KEY = 'focus25-timer-style';
const CLOCK_KEY = 'focus25-show-clock';
const EVENT = 'focus25-timerstyle-change';

function readStyle(): TimerStyle {
  if (typeof window === 'undefined') return 'circle';
  const v = localStorage.getItem(STYLE_KEY);
  return v === 'digital' || v === 'traffic' ? v : 'circle';
}

function readClock(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CLOCK_KEY) === '1';
}

export function useTimerStyle() {
  const [style, setStyleState] = useState<TimerStyle>(readStyle);
  const [showClock, setShowClockState] = useState<boolean>(readClock);

  useEffect(() => {
    const onChange = () => {
      setStyleState(readStyle());
      setShowClockState(readClock());
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const setStyle = useCallback((s: TimerStyle) => {
    localStorage.setItem(STYLE_KEY, s);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const setShowClock = useCallback((v: boolean) => {
    localStorage.setItem(CLOCK_KEY, v ? '1' : '0');
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STYLE_KEY);
    localStorage.removeItem(CLOCK_KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { style, setStyle, showClock, setShowClock, reset };
}
