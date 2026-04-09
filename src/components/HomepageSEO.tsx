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

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{seo.benefitsTitle}</h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          {seo.benefitsItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
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
          <Link to={`${langPrefix}/study-timer`} className="underline hover:text-foreground">Study Timer</Link>
          <Link to={`${langPrefix}/focus-timer`} className="underline hover:text-foreground">Focus Timer</Link>
          <Link to={`${langPrefix}/blog/what-is-pomodoro-technique`} className="underline hover:text-foreground">What is the Pomodoro Technique?</Link>
        </div>
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
