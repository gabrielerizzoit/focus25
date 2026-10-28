import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const THEME_KEY = 'focus25-theme';

const themes = [
  { id: '', color: 'hsl(122, 39%, 49%)' },
  { id: 'pink', color: 'hsl(330, 81%, 70%)' },
  { id: 'light', color: 'hsl(217, 91%, 68%)' },
] as const;

const ThemeSwitcher = () => {
  const { t } = useLanguage();
  const ui = t.ui;
  const [active, setActive] = useState(() => {
    return localStorage.getItem(THEME_KEY) || '';
  });

  const apply = (id: string) => {
    if (id) {
      document.documentElement.setAttribute('data-theme', id);
      localStorage.setItem(THEME_KEY, id);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem(THEME_KEY);
    }
    setActive(id);
  };

  const labels: Record<string, string> = {
    '': ui.themeDefault,
    pink: ui.themePink,
    light: ui.themeLight,
  };

  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-foreground">{ui.theme}</span>
      <div className="flex gap-2">
        {themes.map(({ id, color }) => (
          <button
            key={id}
            onClick={() => apply(id)}
            title={labels[id]}
            className={`w-7 h-7 rounded-full border-2 transition-transform ${
              active === id ? 'border-foreground scale-110' : 'border-transparent'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
