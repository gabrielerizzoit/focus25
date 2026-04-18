import { useEffect, useState } from 'react';

function format(d: Date) {
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

interface Props {
  className?: string;
}

const CurrentClock = ({ className = '' }: Props) => {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    let interval: number | undefined;
    const tick = () => setTime(format(new Date()));
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, msToNextMinute);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <span className={`text-sm text-muted-foreground tabular-nums ${className}`}>{time}</span>
  );
};

export default CurrentClock;
