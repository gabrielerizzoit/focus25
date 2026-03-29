import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Timer from '@/components/Timer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={t.homepage.title}
        description={t.homepage.description}
        canonical="/"
        keywords={t.homepage.keywords}
      />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <Timer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
