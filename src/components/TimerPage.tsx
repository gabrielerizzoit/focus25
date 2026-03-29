import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';
import Header from './Header';
import Footer from './Footer';
import Timer from './Timer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimerPageProps {
  slug: string;
  defaultDuration?: number;
}

const TimerPage = ({ slug, defaultDuration }: TimerPageProps) => {
  const { t, langPrefix } = useLanguage();
  const page = t.seoPages[slug];
  if (!page) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={page.title} description={page.description} canonical={`/${slug}`} keywords={page.keywords} />
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">{page.heading}</h1>
        <Timer defaultDuration={defaultDuration} />
        <div className="mt-12 mb-8">
          <Link to={langPrefix || '/'}>
            <Button className="rounded-full px-6">{t.ui.startFocusSession}</Button>
          </Link>
        </div>
        <article
          className="prose prose-invert max-w-2xl text-muted-foreground text-sm leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TimerPage;
