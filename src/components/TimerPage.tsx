import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';
import Header from './Header';
import Footer from './Footer';
import Timer from './Timer';
import { Button } from '@/components/ui/button';

interface TimerPageProps {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  heading: string;
  defaultDuration?: number;
  children: ReactNode;
}

const TimerPage = ({ title, description, canonical, keywords, heading, defaultDuration, children }: TimerPageProps) => (
  <div className="min-h-screen flex flex-col">
    <SEOHead title={title} description={description} canonical={canonical} keywords={keywords} />
    <Header />
    <main className="flex-1 flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">{heading}</h1>
      <Timer defaultDuration={defaultDuration} />
      <div className="mt-12 mb-8">
        <Link to="/">
          <Button className="rounded-full px-6">Start Focus Session</Button>
        </Link>
      </div>
      <article className="prose prose-invert max-w-2xl text-muted-foreground text-sm leading-relaxed space-y-4">
        {children}
      </article>
    </main>
    <Footer />
  </div>
);

export default TimerPage;
