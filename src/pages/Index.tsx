import { Helmet } from 'react-helmet-async';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Timer from '@/components/Timer';
import HomepageSEO from '@/components/HomepageSEO';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.homepage.seo.faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={t.homepage.title}
        description={t.homepage.description}
        canonical="/"
        keywords={t.homepage.keywords}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
          {t.homepage.seo.h1}
        </h1>
        <Timer />
        <HomepageSEO />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
