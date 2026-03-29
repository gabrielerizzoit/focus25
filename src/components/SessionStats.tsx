import { useSessionStats } from '@/hooks/useSessionStats';

const SessionStats = () => {
  const { todaySessions, streak } = useSessionStats();

  return (
    <div className="text-center text-sm text-muted-foreground space-y-1">
      <p>Today: {todaySessions} session{todaySessions !== 1 ? 's' : ''} completed</p>
      {streak > 1 && <p className="text-xs">🔥 {streak} day streak</p>}
    </div>
  );
};

export default SessionStats;
