import TimerPage from '@/components/TimerPage';
import { Link } from 'react-router-dom';

const Timer10Minutes = () => (
  <TimerPage
    title="10 Minute Timer — Free Online Countdown | Focus25"
    description="Free 10 minute timer online. Perfect for short focus sessions, quick tasks, and timed exercises. Start instantly."
    canonical="/timer-10-minutes"
    keywords="10 minute timer, 10 min timer, ten minute timer, 10 minute countdown"
    heading="10 Minute Timer"
    defaultDuration={10 * 60}
  >
    <h2 className="text-lg font-semibold text-foreground">Free 10 Minute Timer</h2>
    <p>A simple 10-minute countdown timer for quick tasks, short focus sessions, or timed activities. Ten minutes is an excellent duration for people who find 25-minute Pomodoro sessions too long, or for tasks that need quick, concentrated bursts of attention.</p>
    <p>Click start and the timer begins counting down from 10 minutes. The progress ring shows your elapsed time visually, and you'll hear alerts as the countdown approaches zero. The timer works accurately even if you switch to another tab.</p>

    <h2 className="text-lg font-semibold text-foreground">The Power of 10-Minute Focus Blocks</h2>
    <p>Not every task requires a full 25-minute session. Email processing, quick reviews, brainstorming, tidying up, or warming up before a longer work session are all perfect for 10-minute blocks. Some productivity experts recommend starting with shorter intervals if you struggle with procrastination — it's easier to commit to "just 10 minutes" than a longer session.</p>
    <p>Many people find that starting a 10-minute timer is enough to overcome inertia. Once you're focused, you often want to continue beyond the initial 10 minutes. The timer serves as a low-pressure entry point into productive work.</p>

    <p>Other durations: <Link to="/timer-5-minutes" className="text-primary hover:underline">5 Minutes</Link> · <Link to="/timer-15-minutes" className="text-primary hover:underline">15 Minutes</Link> · <Link to="/25-minute-timer" className="text-primary hover:underline">25 Minutes</Link> · <Link to="/pomodoro-timer" className="text-primary hover:underline">Pomodoro Timer</Link></p>
  </TimerPage>
);

export default Timer10Minutes;
