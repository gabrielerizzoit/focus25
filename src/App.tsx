import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import TimerPage from "@/components/TimerPage";
import BlogLayout from "@/components/BlogLayout";
import LegalPage from "./pages/LegalPage";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

// SEO page routes with optional defaultDuration
const SEO_PAGES: { path: string; slug: string; duration?: number }[] = [
  { path: "pomodoro-timer", slug: "pomodoro-timer" },
  { path: "focus-timer", slug: "focus-timer" },
  { path: "study-timer", slug: "study-timer" },
  { path: "25-minute-timer", slug: "25-minute-timer", duration: 25 * 60 },
  { path: "marinara-timer-alternative", slug: "marinara-timer-alternative" },
  { path: "pomofocus-alternative", slug: "pomofocus-alternative" },
  { path: "online-timer", slug: "online-timer" },
  { path: "timer-5-minutes", slug: "timer-5-minutes", duration: 5 * 60 },
  { path: "timer-10-minutes", slug: "timer-10-minutes", duration: 10 * 60 },
  { path: "timer-15-minutes", slug: "timer-15-minutes", duration: 15 * 60 },
  { path: "timer-online", slug: "timer-online" },
  { path: "free-timer", slug: "free-timer" },
];

const BLOG_SLUGS = [
  "what-is-pomodoro-technique",
  "best-pomodoro-timer-online-2026",
  "what-happened-to-marinara-timer",
  "pomofocus-alternative-guide",
  "how-to-stay-focused-while-studying",
  "25-minute-timer-benefits",
  "study-timer-vs-pomodoro",
  "deep-work-technique-explained",
  "best-free-study-tools-online",
  "how-to-avoid-distractions",
];

const LEGAL_SLUGS = ["terms", "privacy", "fair-use", "faq", "how-it-works"];
const LANGS = ["it", "fr", "es", "pt", "hi", "tl"];

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <LanguageProvider>
            <ScrollToTop />
            <Routes>
              {/* English routes */}
              <Route path="/" element={<Index />} />
              {SEO_PAGES.map(p => (
                <Route key={p.path} path={`/${p.path}`} element={<TimerPage slug={p.slug} defaultDuration={p.duration} />} />
              ))}
              <Route path="/blog" element={<Blog />} />
              {BLOG_SLUGS.map(slug => (
                <Route key={slug} path={`/blog/${slug}`} element={<BlogLayout slug={slug} />} />
              ))}
              {LEGAL_SLUGS.map(slug => (
                <Route key={slug} path={`/${slug}`} element={<LegalPage slug={slug} />} />
              ))}

              {/* Localized routes */}
              {LANGS.map(lang => [
                <Route key={`${lang}-home`} path={`/${lang}`} element={<Index />} />,
                ...SEO_PAGES.map(p => (
                  <Route key={`${lang}-${p.path}`} path={`/${lang}/${p.path}`} element={<TimerPage slug={p.slug} defaultDuration={p.duration} />} />
                )),
                <Route key={`${lang}-blog`} path={`/${lang}/blog`} element={<Blog />} />,
                ...BLOG_SLUGS.map(slug => (
                  <Route key={`${lang}-blog-${slug}`} path={`/${lang}/blog/${slug}`} element={<BlogLayout slug={slug} />} />
                )),
                ...LEGAL_SLUGS.map(slug => (
                  <Route key={`${lang}-${slug}`} path={`/${lang}/${slug}`} element={<LegalPage slug={slug} />} />
                )),
              ])}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
