import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/i18n';

interface LegalPageProps {
  slug: string;
}

const LegalPage = ({ slug }: LegalPageProps) => {
  const { t } = useLanguage();
  const page = t.legalPages[slug];
  if (!page) return null;

  // Fallback to English content if translation content is empty
  const content = page.content || getTranslations('en').legalPages[slug]?.content || '';

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={page.title} description={page.description} canonical={`/${slug}`} />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <div
          className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
