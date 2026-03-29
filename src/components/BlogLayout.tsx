import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import SEOHead from './SEOHead';
import Header from './Header';
import Footer from './Footer';
import { Button } from '@/components/ui/button';

interface BlogLayoutProps {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  heading: string;
  children: ReactNode;
}

const BlogLayout = ({ title, description, canonical, keywords, heading, children }: BlogLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <SEOHead title={title} description={description} canonical={canonical} keywords={keywords} />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <article>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{heading}</h1>
        <div className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4">
          {children}
        </div>
        <div className="mt-10 text-center">
          <Link to="/">
            <Button className="rounded-full px-6">Start Focus Session</Button>
          </Link>
        </div>
      </article>
    </main>
    <Footer />
  </div>
);

export default BlogLayout;
