import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const HomepageSEO = () => {
  const { t, langPrefix } = useLanguage();
  const seo = t.homepage.seo;
  const p = (path: string) => `${langPrefix}${path}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 space-y-12 text-foreground/90">
      {/* How it works */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.howItWorksTitle}</h2>
        <p className="mb-3 leading-relaxed">{seo.howItWorksP1}</p>
        <p className="mb-4 leading-relaxed">{seo.howItWorksP2}</p>
        <ol className="list-decimal list-inside space-y-2 pl-2">
          {seo.howItWorksSteps.map((step, i) => (
            <li key={i} className="leading-relaxed">{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          Learn more about the{' '}
          <a
            href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Pomodoro Technique on Wikipedia
          </a>{' '}
          or visit{' '}
          <a
            href="https://francescocirillo.com/products/the-pomodoro-technique"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Francesco Cirillo's official site
          </a>.
        </p>
      </div>

      {/* Image: study desk */}
      <div>
        <img
          src="/images/study-desk.jpg"
          alt="Clean desk setup for focused Pomodoro study session with laptop and timer"
          loading="lazy"
          width={800}
          height={512}
          className="w-full rounded-lg"
        />
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.benefitsTitle}</h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          {seo.benefitsItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link to={p('/pomodoro-timer')} className="underline hover:text-foreground">Pomodoro Timer</Link>
          <Link to={p('/blog/25-minute-timer-benefits')} className="underline hover:text-foreground">25 Minute Timer Benefits</Link>
        </div>
      </div>

      {/* Mid-content CTA */}
      <div className="text-center">
        <Button
          onClick={scrollToTop}
          size="lg"
          className="gap-2"
        >
          <ArrowUp className="h-4 w-4" />
          {seo.ctaText}
        </Button>
      </div>

      {/* Best Ways to Use */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.bestWaysTitle}</h2>
        <p className="mb-4 leading-relaxed">{seo.bestWaysIntro}</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          {seo.bestWaysItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link to={p('/study-timer')} className="underline hover:text-foreground">Study Timer</Link>
          <Link to={p('/focus-timer')} className="underline hover:text-foreground">Focus Timer</Link>
          <Link to={p('/blog/how-to-stay-focused-while-studying')} className="underline hover:text-foreground">How to Stay Focused</Link>
        </div>
      </div>

      {/* Image: focus work */}
      <div>
        <img
          src="/images/focus-work.jpg"
          alt="Person focused on deep work at computer using a focus timer"
          loading="lazy"
          width={800}
          height={512}
          className="w-full rounded-lg"
        />
      </div>

      {/* Who Should Use */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.whoShouldUseTitle}</h2>
        <p className="mb-4 leading-relaxed">{seo.whoShouldUseIntro}</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          {seo.whoShouldUseItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link to={p('/online-timer')} className="underline hover:text-foreground">Online Timer</Link>
          <Link to={p('/free-timer')} className="underline hover:text-foreground">Free Timer</Link>
          <Link to={p('/blog/deep-work-technique-explained')} className="underline hover:text-foreground">Deep Work Technique</Link>
        </div>
      </div>

      {/* Pomodoro vs Traditional */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.pomodoroVsTitle}</h2>
        <p className="mb-3 leading-relaxed">{seo.pomodoroVsP1}</p>
        <p className="leading-relaxed">{seo.pomodoroVsP2}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link to={p('/blog/study-timer-vs-pomodoro')} className="underline hover:text-foreground">Study Timer vs Pomodoro</Link>
          <Link to={p('/blog/what-is-pomodoro-technique')} className="underline hover:text-foreground">What is the Pomodoro Technique?</Link>
        </div>
      </div>

      {/* Why Focus25 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.whyTitle}</h2>
        <p className="mb-4 leading-relaxed">{seo.whyP1}</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          {seo.whyFeatures.map((feat, i) => (
            <li key={i} className="leading-relaxed">{feat}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link to={p('/pomofocus-alternative')} className="underline hover:text-foreground">Pomofocus Alternative</Link>
          <Link to={p('/marinara-timer-alternative')} className="underline hover:text-foreground">Marinara Timer Alternative</Link>
          <a
            href="https://youtube.com/@Focus25_timer"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            {seo.youtubeCtaText}
          </a>
        </div>
      </div>

      {/* Second CTA */}
      <div className="text-center">
        <Button
          onClick={scrollToTop}
          size="lg"
          className="gap-2"
        >
          <ArrowUp className="h-4 w-4" />
          {seo.ctaText}
        </Button>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.faqTitle}</h2>
        <Accordion type="single" collapsible className="w-full">
          {seo.faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HomepageSEO;
