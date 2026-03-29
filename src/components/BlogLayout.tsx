import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';
import Header from './Header';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogLayoutProps {
  slug: string;
}

const BlogLayout = ({ slug }: BlogLayoutProps) => {
  const { t, langPrefix } = useLanguage();
  const article = t.blogArticles[slug];
  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={article.title} description={article.description} canonical={`/blog/${slug}`} keywords={article.keywords} />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{article.heading}</h1>
          <div
            className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          {article.relatedLinks.length > 0 && (
            <p className="text-xs text-muted-foreground mt-6">
              {article.relatedLinks.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && ' · '}
                  <Link to={`${langPrefix}${link.href}`} className="text-primary hover:underline">{link.label}</Link>
                </span>
              ))}
            </p>
          )}
          <div className="mt-10 text-center">
            <Link to={langPrefix || '/'}>
              <Button className="rounded-full px-6">{t.ui.startFocusSession}</Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
