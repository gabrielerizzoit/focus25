import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGS } from '@/i18n';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
}

const BASE = 'https://focus25.io';

const SEOHead = ({ title, description, canonical, keywords }: SEOHeadProps) => {
  const { lang } = useLanguage();

  // Build hreflang URLs from canonical path (always the English path without prefix)
  const canonicalPath = canonical || '/';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={`${BASE}${lang === 'en' ? canonicalPath : `/${lang}${canonicalPath === '/' ? '' : canonicalPath}`}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:url" content={`${BASE}${lang === 'en' ? canonicalPath : `/${lang}${canonicalPath === '/' ? '' : canonicalPath}`}`} />
      {/* hreflang tags for all languages */}
      {SUPPORTED_LANGS.map(l => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l === 'tl' ? 'fil' : l}
          href={`${BASE}${l === 'en' ? canonicalPath : `/${l}${canonicalPath === '/' ? '' : canonicalPath}`}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${canonicalPath}`} />
    </Helmet>
  );
};

export default SEOHead;
