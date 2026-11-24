export const TOAST_DISMISS_DAYS = 7;
export const TOAST_DOWNLOAD_DAYS = 60;
const DAY = 86400000;
export const suppressUntil = (now: number, days: number) => now + days * DAY;
export const isSuppressed = (raw: string | null, now: number) => {
  try { const v = JSON.parse(raw || 'null'); return !!v && typeof v.until === 'number' && now < v.until; } catch { return false; }
};
