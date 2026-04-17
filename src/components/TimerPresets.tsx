import { useLanguage } from '@/contexts/LanguageContext';

interface TimerPresetsProps {
  onSelect: (focusSec: number, shortBreakSec: number) => void;
  current: { focus: number; shortBreak: number };
}

const PRESETS = [
  { key: 'preset25' as const, focus: 25, shortBreak: 5 },
  { key: 'preset50' as const, focus: 50, shortBreak: 10 },
  { key: 'preset15' as const, focus: 15, shortBreak: 5 },
];

const TimerPresets = ({ onSelect, current }: TimerPresetsProps) => {
  const { t } = useLanguage();
  const ui = t.ui;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-muted-foreground">{ui.presets}</span>
      <div className="flex gap-2">
        {PRESETS.map(({ key, focus, shortBreak }) => {
          const active = current.focus === focus * 60 && current.shortBreak === shortBreak * 60;
          return (
            <button
              key={key}
              onClick={() => onSelect(focus * 60, shortBreak * 60)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/30 text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {ui[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimerPresets;
