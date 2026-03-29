import TimerPage from '@/components/TimerPage';
import { Link } from 'react-router-dom';

const OnlineTimer = () => (
  <TimerPage
    title="Free Online Timer — Countdown Timer | Focus25"
    description="Simple free online timer. Set any duration, start counting down instantly. Perfect for work, study, exercise, and cooking. No downloads needed."
    canonical="/online-timer"
    keywords="online timer, free online timer, countdown timer online, web timer, browser timer"
    heading="Free Online Timer"
  >
    <h2 className="text-lg font-semibold text-foreground">Simple Online Timer</h2>
    <p>Sometimes you just need a timer. No fancy features, no complicated setup — just a clean countdown that works in your browser. Focus25's online timer does exactly that. Open the page, set your duration, and start the countdown.</p>
    <p>This timer works on any device with a web browser: desktop computers, laptops, tablets, and phones. There's nothing to install and no account to create. Your timer settings are saved locally, so they'll be remembered the next time you visit.</p>

    <h2 className="text-lg font-semibold text-foreground">Uses for an Online Timer</h2>
    <p>An online timer is incredibly versatile. Use it for focused work sessions, study intervals, exercise routines, cooking, meditation, presentations, meetings, or any activity that benefits from a time constraint. The visual progress ring gives you an at-a-glance sense of how much time remains.</p>
    <p>For productivity-focused use, the timer comes with built-in Pomodoro presets: 25-minute focus sessions, 5-minute short breaks, and 15-minute long breaks. But you can customize these durations to anything that works for you, from 1 minute to 2 hours.</p>

    <h2 className="text-lg font-semibold text-foreground">Features</h2>
    <p>Despite its simplicity, this online timer packs useful features: ambient background sounds to aid concentration, countdown alerts in the final 5 seconds, browser notifications when sessions complete, and automatic session tracking. The timer stays accurate even when you switch tabs or minimize your browser.</p>

    <p>Try specific timers: <Link to="/timer-5-minutes" className="text-primary hover:underline">5 Minutes</Link> · <Link to="/timer-10-minutes" className="text-primary hover:underline">10 Minutes</Link> · <Link to="/timer-15-minutes" className="text-primary hover:underline">15 Minutes</Link> · <Link to="/25-minute-timer" className="text-primary hover:underline">25 Minutes</Link></p>
  </TimerPage>
);

export default OnlineTimer;
