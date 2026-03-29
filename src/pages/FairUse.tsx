import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FairUse = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="Fair Use Policy — Focus25"
      description="Fair use policy for Focus25. Information about audio content attribution, open-source notices, and acceptable use."
      canonical="/fair-use"
    />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-6">Fair Use Policy</h1>
      <div className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4">
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-lg font-semibold text-foreground">Audio Content</h2>
        <p>Focus25 includes ambient sound files (rain, café ambiance, and white noise) designed to support focused work. These audio files are provided for personal, non-commercial use within the Focus25 application. Downloading, redistributing, or using these audio files outside of Focus25 is not permitted without prior consent.</p>

        <h2 className="text-lg font-semibold text-foreground">Website Content</h2>
        <p>All written content on Focus25, including blog articles, page descriptions, and guides, is original content created for this website. You may reference or link to our content, but reproducing it in full without attribution is not permitted.</p>

        <h2 className="text-lg font-semibold text-foreground">Acceptable Use</h2>
        <p>Focus25 is intended for personal and professional productivity. You may use the timer freely for work, study, or any personal activity. Automated access, scraping, or any use that places unreasonable load on the service is not permitted.</p>

        <h2 className="text-lg font-semibold text-foreground">Open Source</h2>
        <p>Focus25 is built using open-source technologies including React, Tailwind CSS, and various community libraries. We are grateful to the open-source community and comply with all applicable licenses.</p>

        <h2 className="text-lg font-semibold text-foreground">Trademarks</h2>
        <p>"Pomodoro Technique" and "Pomodoro" are registered trademarks of Francesco Cirillo. Focus25 is an independent tool and is not affiliated with or endorsed by Francesco Cirillo or the Pomodoro Technique trademark holders. References to the Pomodoro Technique are for descriptive purposes only.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default FairUse;
