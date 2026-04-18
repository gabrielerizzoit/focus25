import { useLanguage } from '@/contexts/LanguageContext';
import { useTimerStyle, type TimerStyle } from '@/hooks/useTimerStyle';
import { Switch } from '@/components/ui/switch';

const TimerStyleSelector = () => {
  const { t } = useLanguage();
  const ui = t.ui;
  const { style, setStyle, showClock, setShowClock, reset } = useTimerStyle();

  const options: { id: TimerStyle; label: string }[] = [
    { id: 'circle', label: ui.styleCircle },
    { id: 'digital', label: ui.styleDigital },
    { id: 'traffic', label: ui.styleTraffic },
  ];

  const isDefault = style === 'circle' && !showClock;

  return (
    <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <span className="text-xs">{ui.timerStyle}</span>
        <div className="flex gap-1 bg-muted/30 rounded-full p-1">
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => setStyle(o.id)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                style === o.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={showClock} onCheckedChange={setShowClock} />
        <span className="text-xs">{ui.showCurrentTime}</span>
        {!isDefault && (
          <button onClick={reset} className="text-xs underline hover:text-foreground ml-2">
            {ui.resetDefaults}
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerStyleSelector;
