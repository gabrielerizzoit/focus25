import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/i18n';
import { privacyContent, PRIVACY_EMAIL } from '@/i18n/privacy';

interface LegalPageProps {
  slug: string;
}

const LegalPage = ({ slug }: LegalPageProps) => {
  const { t, lang } = useLanguage();
  const page = t.legalPages[slug];
  if (!page) return null;

  // Fallback to English content if translation content is empty
  const content = page.content || getTranslations('en').legalPages[slug]?.content || '';
  const privacy = slug === 'privacy' ? (privacyContent[lang] || privacyContent.en) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={page.title} description={page.description} canonical={`/${slug}`} />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        {privacy ? (
          <article className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">{privacy.heading}</h1>
            <p className="text-xs">{privacy.lastUpdated}</p>
            <p>{privacy.intro}</p>
            {privacy.sections.map((s) => (
              <section key={s.h} className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">{s.h}</h2>
                {s.p && <p>{s.p}</p>}
                {s.items && (
                  <ul className="list-disc pl-5 space-y-1">
                    {s.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                )}
                {s.links && (
                  <ul className="list-disc pl-5 space-y-1">
                    {s.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{l.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">{privacy.contact.h}</h2>
              <p>
                {privacy.contact.p}{' '}
                <a href={`mailto:${PRIVACY_EMAIL}`} className="underline hover:text-foreground">{PRIVACY_EMAIL}</a>
              </p>
            </section>
          </article>
        ) : (
          <div
            className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
