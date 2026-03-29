import TimerPage from '@/components/TimerPage';
import { Link } from 'react-router-dom';

const Timer5Minutes = () => (
  <TimerPage
    title="5 Minute Timer — Free Online Countdown | Focus25"
    description="Free 5 minute timer online. Quick countdown for short tasks, breaks, exercises, and more. Start instantly with one click."
    canonical="/timer-5-minutes"
    keywords="5 minute timer, 5 min timer, five minute timer, 5 minute countdown"
    heading="5 Minute Timer"
    defaultDuration={5 * 60}
  >
    <h2 className="text-lg font-semibold text-foreground">Free 5 Minute Timer</h2>
    <p>This is a quick, free 5-minute countdown timer. Perfect for short breaks between Pomodoro sessions, quick exercises, meditation, brewing tea, or any task that needs a 5-minute limit. Click start and the countdown begins instantly.</p>
    <p>Five minutes is the standard break duration in the Pomodoro Technique. It's enough time to stand up, stretch, grab water, and rest your eyes before diving back into focused work. Using a timer for breaks is just as important as timing your work — it prevents breaks from stretching into procrastination.</p>

    <h2 className="text-lg font-semibold text-foreground">When to Use a 5 Minute Timer</h2>
    <p>Short breaks between study sessions, quick stretching routines, timing a plank or exercise set, steeping tea or coffee, speed writing challenges, brainstorming sprints, or simply as a reminder to check in with yourself. The 5-minute interval is surprisingly versatile.</p>
    <p>The timer runs accurately in the background, so you can switch tabs during your break and trust that you'll hear the alert when time is up. The countdown sound in the last 5 seconds gives you a heads-up that your break is ending.</p>

    <p>Need more time? <Link to="/timer-10-minutes" className="text-primary hover:underline">10 Minute Timer</Link> · <Link to="/timer-15-minutes" className="text-primary hover:underline">15 Minute Timer</Link> · <Link to="/25-minute-timer" className="text-primary hover:underline">25 Minute Timer</Link></p>
  </TimerPage>
);

export default Timer5Minutes;
