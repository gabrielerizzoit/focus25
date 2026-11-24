import { describe, it, expect } from 'vitest';
import { isSuppressed, suppressUntil, TOAST_DISMISS_DAYS, TOAST_DOWNLOAD_DAYS } from './appToastPolicy';
const D = 86400000;
describe('app toast', () => {
  it('closing hides it for 7 days', () => {
    const raw = JSON.stringify({ until: suppressUntil(0, TOAST_DISMISS_DAYS) });
    expect(isSuppressed(raw, 7 * D - 1)).toBe(true);
    expect(isSuppressed(raw, 7 * D)).toBe(false);
  });
  it('download hides it for 60 days', () => {
    const raw = JSON.stringify({ until: suppressUntil(0, TOAST_DOWNLOAD_DAYS) });
    expect(isSuppressed(raw, 60 * D - 1)).toBe(true);
    expect(isSuppressed(raw, 60 * D)).toBe(false);
  });
});
