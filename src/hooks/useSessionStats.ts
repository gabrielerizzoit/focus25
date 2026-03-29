import { useState, useCallback } from 'react';

interface SessionStats {
  todaySessions: number;
  lastDate: string;
  streak: number;
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function load(): SessionStats {
  try {
    const s = localStorage.getItem('focus25-stats');
    if (s) {
      const parsed = JSON.parse(s);
      if (parsed.lastDate !== getToday()) {
        // Check streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        return {
          todaySessions: 0,
          lastDate: getToday(),
          streak: parsed.lastDate === yStr ? parsed.streak : 0,
        };
      }
      return parsed;
    }
  } catch {}
  return { todaySessions: 0, lastDate: getToday(), streak: 0 };
}

function save(s: SessionStats) {
  localStorage.setItem('focus25-stats', JSON.stringify(s));
}

export function useSessionStats() {
  const [stats, setStats] = useState<SessionStats>(load);

  const incrementSession = useCallback(() => {
    setStats(prev => {
      const today = getToday();
      const isNewDay = prev.lastDate !== today;
      const next: SessionStats = {
        todaySessions: isNewDay ? 1 : prev.todaySessions + 1,
        lastDate: today,
        streak: isNewDay ? prev.streak + 1 : (prev.todaySessions === 0 ? prev.streak + 1 : prev.streak),
      };
      save(next);
      return next;
    });
  }, []);

  return { ...stats, incrementSession };
}
