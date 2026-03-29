import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const articles = [
  { slug: 'what-is-pomodoro-technique', title: 'What is the Pomodoro Technique?', excerpt: 'Learn the science behind the world\'s most popular time management method.' },
  { slug: 'best-pomodoro-timer-online-2026', title: 'Best Pomodoro Timer Online (2026)', excerpt: 'A comparison of the top free Pomodoro timers available today.' },
  { slug: 'what-happened-to-marinara-timer', title: 'What Happened to Marinara Timer?', excerpt: 'The story of Marinara Timer and where to find the best alternatives.' },
  { slug: 'pomofocus-alternative-guide', title: 'Pomofocus Alternative: Simple Timer Guide', excerpt: 'Looking for a Pomofocus alternative? Here\'s what to look for.' },
  { slug: 'how-to-stay-focused-while-studying', title: 'How to Stay Focused While Studying', excerpt: 'Practical strategies for maintaining concentration during study sessions.' },
  { slug: '25-minute-timer-benefits', title: '25 Minute Timer Benefits Explained', excerpt: 'Why 25 minutes is the optimal duration for focused work.' },
  { slug: 'study-timer-vs-pomodoro', title: 'Study Timer vs Pomodoro: Which is Better?', excerpt: 'Comparing different timer approaches for academic productivity.' },
  { slug: 'deep-work-technique-explained', title: 'Deep Work Technique Explained', excerpt: 'Cal Newport\'s Deep Work method and how to apply it daily.' },
  { slug: 'best-free-study-tools-online', title: 'Best Free Study Tools Online', excerpt: 'A curated list of free tools every student should know about.' },
  { slug: 'how-to-avoid-distractions', title: 'How to Avoid Distractions While Working', excerpt: 'Evidence-based methods for eliminating distractions and staying on task.' },
];

const Blog = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="Focus25 Blog — Productivity Tips & Timer Guides"
      description="Articles on the Pomodoro Technique, focus strategies, study tips, and productivity tools. Learn how to make the most of your time."
      canonical="/blog"
      keywords="pomodoro technique, productivity tips, study tips, focus strategies, time management"
    />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Productivity Blog</h1>
      <div className="space-y-6">
        {articles.map(a => (
          <Link key={a.slug} to={`/blog/${a.slug}`} className="block group">
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

export default Blog;
