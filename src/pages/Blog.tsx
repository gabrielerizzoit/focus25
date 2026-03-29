import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { t, langPrefix } = useLanguage();
  const b = t.blogIndex;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={b.title} description={b.description} canonical="/blog" keywords={b.keywords} />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">{b.heading}</h1>
        <div className="space-y-6">
          {b.articles.map(a => (
            <Link key={a.slug} to={`${langPrefix}/blog/${a.slug}`} className="block group">
              <article className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{a.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{a.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
