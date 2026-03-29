import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full border-t border-border mt-16 py-8 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="font-medium text-foreground mb-3">Timers</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/pomodoro-timer" className="hover:text-foreground transition-colors">Pomodoro Timer</Link></li>
            <li><Link to="/focus-timer" className="hover:text-foreground transition-colors">Focus Timer</Link></li>
            <li><Link to="/study-timer" className="hover:text-foreground transition-colors">Study Timer</Link></li>
            <li><Link to="/online-timer" className="hover:text-foreground transition-colors">Online Timer</Link></li>
            <li><Link to="/free-timer" className="hover:text-foreground transition-colors">Free Timer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-3">Preset Timers</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/25-minute-timer" className="hover:text-foreground transition-colors">25 Minute Timer</Link></li>
            <li><Link to="/timer-15-minutes" className="hover:text-foreground transition-colors">15 Minute Timer</Link></li>
            <li><Link to="/timer-10-minutes" className="hover:text-foreground transition-colors">10 Minute Timer</Link></li>
            <li><Link to="/timer-5-minutes" className="hover:text-foreground transition-colors">5 Minute Timer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-3">Resources</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/pomofocus-alternative" className="hover:text-foreground transition-colors">Pomofocus Alternative</Link></li>
            <li><Link to="/marinara-timer-alternative" className="hover:text-foreground transition-colors">Marinara Timer Alternative</Link></li>
            <li><Link to="/timer-online" className="hover:text-foreground transition-colors">Timer Online</Link></li>
            <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Focus25 — Free Pomodoro Timer Online
      </div>
    </div>
  </footer>
);

export default Footer;
