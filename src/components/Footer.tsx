import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, langPrefix } = useLanguage();
  const f = t.footer;
  const p = (path: string) => `${langPrefix}${path}`;

  return (
    <footer className="w-full border-t border-border mt-16 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-3">{f.timers}</h4>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to={p('/pomodoro-timer')} className="hover:text-foreground transition-colors">{f.pomodoroTimer}</Link></li>
              <li><Link to={p('/focus-timer')} className="hover:text-foreground transition-colors">{f.focusTimer}</Link></li>
              <li><Link to={p('/study-timer')} className="hover:text-foreground transition-colors">{f.studyTimer}</Link></li>
              <li><Link to={p('/online-timer')} className="hover:text-foreground transition-colors">{f.onlineTimer}</Link></li>
              <li><Link to={p('/free-timer')} className="hover:text-foreground transition-colors">{f.freeTimer}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3">{f.presetTimers}</h4>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to={p('/25-minute-timer')} className="hover:text-foreground transition-colors">{f.minuteTimer25}</Link></li>
              <li><Link to={p('/timer-15-minutes')} className="hover:text-foreground transition-colors">{f.minuteTimer15}</Link></li>
              <li><Link to={p('/timer-10-minutes')} className="hover:text-foreground transition-colors">{f.minuteTimer10}</Link></li>
              <li><Link to={p('/timer-5-minutes')} className="hover:text-foreground transition-colors">{f.minuteTimer5}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3">{f.resources}</h4>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to={p('/pomofocus-alternative')} className="hover:text-foreground transition-colors">{f.pomofocusAlt}</Link></li>
              <li><Link to={p('/marinara-timer-alternative')} className="hover:text-foreground transition-colors">{f.marinaraAlt}</Link></li>
              <li><Link to={p('/timer-online')} className="hover:text-foreground transition-colors">{f.timerOnline}</Link></li>
              <li><Link to={p('/blog')} className="hover:text-foreground transition-colors">{f.blog}</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
          <Link to={p('/how-it-works')} className="hover:text-foreground transition-colors">{f.howItWorks}</Link>
          <Link to={p('/faq')} className="hover:text-foreground transition-colors">{f.faq}</Link>
          <Link to={p('/terms')} className="hover:text-foreground transition-colors">{f.terms}</Link>
          <Link to={p('/privacy')} className="hover:text-foreground transition-colors">{f.privacy}</Link>
          <Link to={p('/fair-use')} className="hover:text-foreground transition-colors">{f.fairUse}</Link>
        </div>
        <div className="mt-4 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          {f.copyright.replace('{year}', String(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
