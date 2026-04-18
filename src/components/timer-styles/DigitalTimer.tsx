interface Props {
  time: string;
  modeLabel: string;
  isBreak: boolean;
  size?: number;
}

const DigitalTimer = ({ time, modeLabel, isBreak, size }: Props) => {
  const fontSize = size ? size * 0.28 : undefined;
  const labelSize = size ? Math.max(10, Math.min(size * 0.04, 16)) : undefined;
  const dotColor = isBreak ? 'bg-secondary' : 'bg-primary';

  return (
    <div className="flex flex-col items-center justify-center" style={size ? { width: size, height: size } : undefined}>
      <span
        className="font-light tabular-nums tracking-tight text-foreground leading-none"
        style={fontSize ? { fontSize } : undefined}
      >
        {size ? time : <span className="text-7xl sm:text-8xl">{time}</span>}
      </span>
      <div className="flex items-center gap-2 mt-4">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span
          className="uppercase tracking-[0.3em] text-muted-foreground"
          style={labelSize ? { fontSize: labelSize } : undefined}
        >
          {modeLabel}
        </span>
      </div>
    </div>
  );
};

export default DigitalTimer;
