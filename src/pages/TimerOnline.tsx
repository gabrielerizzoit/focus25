import TimerPage from '@/components/TimerPage';
import { Link } from 'react-router-dom';

const TimerOnline = () => (
  <TimerPage
    title="Timer Online — Free Web-Based Timer | Focus25"
    description="Free timer online. Use this web-based countdown timer for work, study, exercise, and more. No downloads, no signup. Works on any device."
    canonical="/timer-online"
    keywords="timer online, online timer free, web timer, browser countdown timer, timer website"
    heading="Timer Online"
  >
    <h2 className="text-lg font-semibold text-foreground">Free Timer Online</h2>
    <p>Looking for a reliable timer you can use right in your browser? Focus25's online timer works on any device — desktop, tablet, or phone. No app to download, no account to create. Just open the page, set your duration, and start timing.</p>
    <p>The timer uses your device's clock for accuracy, so it stays precise even when you navigate to other tabs or minimize your browser. When the countdown reaches zero, you'll hear an audio alert and see a browser notification (if enabled).</p>

    <h2 className="text-lg font-semibold text-foreground">Why Use a Web-Based Timer?</h2>
    <p>Web-based timers have several advantages over native apps. They work on any device without installation, they're always up to date, and they don't take up storage space on your phone. For productivity timers specifically, having the timer in your browser keeps it visible alongside your work, serving as a constant reminder to stay focused.</p>
    <p>Focus25 enhances the basic timer concept with Pomodoro-style presets, ambient background sounds, and automatic session tracking. All settings are saved locally in your browser, so your preferences persist between visits.</p>

    <h2 className="text-lg font-semibold text-foreground">Getting Started</h2>
    <p>Choose your duration using the preset tabs (Focus, Short Break, Long Break) or customize the time in settings. Hit the start button and begin your countdown. Enable auto-switch to automatically transition between focus and break sessions without manual intervention.</p>

    <p>Popular timers: <Link to="/pomodoro-timer" className="text-primary hover:underline">Pomodoro Timer</Link> · <Link to="/focus-timer" className="text-primary hover:underline">Focus Timer</Link> · <Link to="/free-timer" className="text-primary hover:underline">Free Timer</Link></p>
  </TimerPage>
);

export default TimerOnline;
