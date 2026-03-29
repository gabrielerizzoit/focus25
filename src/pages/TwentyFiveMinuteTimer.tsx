import TimerPage from '@/components/TimerPage';
import { Link } from 'react-router-dom';

const TwentyFiveMinuteTimer = () => (
  <TimerPage
    title="25 Minute Timer — Free Online Countdown | Focus25"
    description="Free 25 minute timer online. Perfect for Pomodoro sessions, quick tasks, and focused work. Start instantly with one click."
    canonical="/25-minute-timer"
    keywords="25 minute timer, 25 min timer, twenty five minute timer, 25 minute countdown"
    heading="25 Minute Timer"
    defaultDuration={25 * 60}
  >
    <h2 className="text-lg font-semibold text-foreground">Free 25 Minute Timer</h2>
    <p>This is a simple, free 25-minute timer that you can use for Pomodoro sessions, focused work, exercise intervals, cooking, or any activity that needs a 25-minute countdown. Just click start and the timer begins immediately.</p>
    <p>The 25-minute duration is the foundation of the Pomodoro Technique, one of the most popular productivity methods in the world. It's long enough to make meaningful progress on a task, yet short enough to maintain intense focus without fatigue.</p>

    <h2 className="text-lg font-semibold text-foreground">Why 25 Minutes?</h2>
    <p>Research on attention spans suggests that most people can maintain peak concentration for 20-30 minutes before their mind starts to wander. The 25-minute interval hits the sweet spot — it pushes you to focus while respecting your cognitive limits.</p>
    <p>Francesco Cirillo, who developed the Pomodoro Technique, chose 25 minutes after experimenting with different durations. He found that shorter intervals didn't allow enough time to enter a flow state, while longer ones led to diminishing returns. Twenty-five minutes became the gold standard.</p>

    <h2 className="text-lg font-semibold text-foreground">How to Use This Timer</h2>
    <p>Click the start button to begin your 25-minute countdown. The progress ring will show how much time has passed. You'll hear a gentle alert in the last 5 seconds and a chime when the timer completes. You can optionally enable background sounds to help you focus during the session.</p>
    <p>For a full Pomodoro workflow with automatic breaks, visit our <Link to="/pomodoro-timer" className="text-primary hover:underline">Pomodoro Timer</Link>. Need a different duration? Try our <Link to="/timer-15-minutes" className="text-primary hover:underline">15 Minute Timer</Link> or <Link to="/timer-10-minutes" className="text-primary hover:underline">10 Minute Timer</Link>.</p>
  </TimerPage>
);

export default TwentyFiveMinuteTimer;
