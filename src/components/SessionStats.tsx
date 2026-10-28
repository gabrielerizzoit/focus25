import { useSessionStats } from '@/hooks/useSessionStats';

const SessionStats = () => {
  const { todaySessions, streak } = useSessionStats();

  return (
    <div className="flex items-center justify-between text-sm text-foreground">
      <p>Today: {todaySessions} session{todaySessions !== 1 ? 's' : ''} completed</p>
      {streak > 1 && <p className="text-muted-foreground">🔥 {streak} day streak</p>}
    </div>
  );
};

export default SessionStats;
