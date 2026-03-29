import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="Privacy Policy — Focus25"
      description="Privacy policy for Focus25. We don't collect personal data. All settings are stored locally in your browser."
      canonical="/privacy"
    />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <div className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4">
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-lg font-semibold text-foreground">Our Commitment to Privacy</h2>
        <p>Focus25 is built with privacy as a core principle. We believe a productivity timer should help you focus — not track your behavior or collect your data.</p>

        <h2 className="text-lg font-semibold text-foreground">What Data We Collect</h2>
        <p><strong>None.</strong> Focus25 does not collect, store, or transmit any personal information to external servers. There are no analytics trackers, no cookies, no user accounts, and no data processing.</p>

        <h2 className="text-lg font-semibold text-foreground">Local Storage</h2>
        <p>Focus25 uses your browser's localStorage to save your preferences (timer durations, volume settings) and session statistics (daily session count). This data never leaves your device. You can clear it at any time by clearing your browser's site data.</p>

        <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
        <p>Focus25 does not use cookies of any kind — no tracking cookies, no analytics cookies, no advertising cookies.</p>

        <h2 className="text-lg font-semibold text-foreground">Third-Party Services</h2>
        <p>Focus25 does not integrate with any third-party analytics, advertising, or tracking services. The website is self-contained and does not make external API calls.</p>

        <h2 className="text-lg font-semibold text-foreground">Audio Files</h2>
        <p>The ambient sound files (rain, café, white noise) are served directly from our servers. No external audio services or CDNs are used.</p>

        <h2 className="text-lg font-semibold text-foreground">Browser Notifications</h2>
        <p>Focus25 may request permission to send browser notifications when a timer session completes. This is entirely optional and controlled by your browser's notification settings. No notification data is stored or transmitted.</p>

        <h2 className="text-lg font-semibold text-foreground">Changes to This Policy</h2>
        <p>If we make changes to this privacy policy, we will update this page with the new date. Our commitment to not collecting personal data will remain unchanged.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
