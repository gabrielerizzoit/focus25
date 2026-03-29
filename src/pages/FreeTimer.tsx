import TimerPage from '@/components/TimerPage';
import { Link } from 'react-router-dom';

const FreeTimer = () => (
  <TimerPage
    title="Free Timer — No Signup Countdown Timer | Focus25"
    description="Completely free timer with no ads, no signup, and no downloads. Use for Pomodoro sessions, study, exercise, or any timed activity."
    canonical="/free-timer"
    keywords="free timer, free online timer, free countdown timer, no signup timer, free pomodoro timer"
    heading="Free Timer — No Signup Required"
  >
    <h2 className="text-lg font-semibold text-foreground">100% Free Timer</h2>
    <p>Focus25 is a completely free timer — no premium plans, no ads, no data collection, and no signup required. Just a clean, well-designed countdown timer that respects your time and privacy. Your settings and session data stay on your device.</p>
    <p>Too many timer apps try to monetize a simple concept with ads, premium features, or mandatory account creation. Focus25 takes a different approach: give users a great timer experience with zero friction. Open the page, start your session, get to work.</p>

    <h2 className="text-lg font-semibold text-foreground">Features Included for Free</h2>
    <p>Every feature in Focus25 is available to everyone, always. This includes customizable Pomodoro durations (focus, short break, long break), three ambient sound options (rain, café, white noise), automatic session tracking, browser notifications, and an auto-switch mode that handles focus-to-break transitions.</p>
    <p>The dark-themed interface is designed for extended use without eye strain. The minimal design means there's nothing to distract you from your work — just the timer, your controls, and optional ambient sounds.</p>

    <h2 className="text-lg font-semibold text-foreground">Privacy-First Timer</h2>
    <p>Unlike many online tools, Focus25 doesn't track you. There are no analytics cookies, no user accounts, and no data sent to servers. Everything runs in your browser using localStorage for persistence. Your focus habits are your own business.</p>

    <p>Start with: <Link to="/pomodoro-timer" className="text-primary hover:underline">Pomodoro Timer</Link> · <Link to="/focus-timer" className="text-primary hover:underline">Focus Timer</Link> · <Link to="/study-timer" className="text-primary hover:underline">Study Timer</Link> · <Link to="/blog" className="text-primary hover:underline">Productivity Blog</Link></p>
  </TimerPage>
);

export default FreeTimer;
