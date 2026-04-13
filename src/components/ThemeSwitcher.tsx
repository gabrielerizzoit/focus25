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
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="text-xs">{ui.theme}</span>
      <div className="flex gap-2">
        {themes.map(({ id, color }) => (
          <button
            key={id}
            onClick={() => apply(id)}
            title={labels[id]}
            className={`w-5 h-5 rounded-full border-2 transition-transform ${
              active === id ? 'border-foreground scale-110' : 'border-transparent'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      {active && (
        <button onClick={() => apply('')} className="text-xs underline hover:text-foreground">
          {ui.resetDefaults}
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
