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
    <div className="flex flex-col gap-2 w-full">
      <span className="text-sm text-foreground">{ui.presets}</span>
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map(({ key, focus, shortBreak }) => {
          const active = current.focus === focus * 60 && current.shortBreak === shortBreak * 60;
          return (
            <button
              key={key}
              onClick={() => onSelect(focus * 60, shortBreak * 60)}
              className={`py-2.5 rounded-xl text-sm border transition-colors ${
                active
                  ? 'bg-primary/15 text-primary border-primary/60'
                  : 'bg-muted/50 text-foreground border-transparent hover:bg-muted'
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
