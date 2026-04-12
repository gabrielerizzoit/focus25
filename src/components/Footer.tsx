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
              <li>
                <a
                  href="https://youtube.com/@Focus25_timer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  {f.youtube}
                </a>
              </li>
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
