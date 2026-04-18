import type { TimerMode } from '@/hooks/useTimer';

interface Props {
  time: string;
  modeLabel: string;
  mode: TimerMode;
  size?: number;
}

const lights: { id: TimerMode; color: string; glow: string }[] = [
  { id: 'focus', color: '#ef4444', glow: 'rgba(239,68,68,0.55)' },
  { id: 'shortBreak', color: '#facc15', glow: 'rgba(250,204,21,0.55)' },
  { id: 'longBreak', color: '#22c55e', glow: 'rgba(34,197,94,0.55)' },
];

const TrafficLightTimer = ({ time, modeLabel, mode, size }: Props) => {
  const dia = size ? Math.max(40, size * 0.18) : 56;
  const fontSize = size ? size * 0.18 : undefined;
  const labelSize = size ? Math.max(10, Math.min(size * 0.04, 16)) : undefined;

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10" style={size ? { width: size, height: size } : undefined}>
      <div className="flex flex-col gap-3 p-3 rounded-2xl bg-muted/20 border border-border/40">
        {lights.map(l => {
          const active = l.id === mode;
          return (
            <div
              key={l.id}
              className="rounded-full transition-all"
              style={{
                width: dia,
                height: dia,
                backgroundColor: active ? l.color : 'hsl(var(--muted))',
                opacity: active ? 1 : 0.25,
                boxShadow: active ? `0 0 24px ${l.glow}` : 'none',
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-start">
        <span
          className="font-light tabular-nums tracking-tight text-foreground leading-none"
          style={fontSize ? { fontSize } : undefined}
        >
          {size ? time : <span className="text-5xl sm:text-6xl">{time}</span>}
        </span>
        <span
          className="uppercase tracking-[0.3em] text-muted-foreground mt-3"
          style={labelSize ? { fontSize: labelSize } : { fontSize: 12 }}
        >
          {modeLabel}
        </span>
      </div>
    </div>
  );
};

export default TrafficLightTimer;
