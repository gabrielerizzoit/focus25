import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="Terms of Service — Focus25"
      description="Terms of service for Focus25, a free online Pomodoro timer. Read our usage terms, disclaimers, and liability information."
      canonical="/terms"
    />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-6">Terms of Service</h1>
      <div className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4">
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
        <p>By accessing and using Focus25 (focus25.app), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>

        <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
        <p>Focus25 is a free, web-based Pomodoro timer designed to help users manage their time and improve productivity. The service is provided as-is, free of charge, with no account or registration required.</p>

        <h2 className="text-lg font-semibold text-foreground">3. Use of Service</h2>
        <p>You may use Focus25 for personal and professional productivity purposes. You agree not to misuse the service, attempt to reverse-engineer it, or use it in any way that could damage, disable, or impair the website.</p>

        <h2 className="text-lg font-semibold text-foreground">4. No Warranty</h2>
        <p>Focus25 is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or meet your specific requirements. Timer accuracy depends on your browser and device.</p>

        <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
        <p>In no event shall Focus25 or its creators be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this service.</p>

        <h2 className="text-lg font-semibold text-foreground">6. Data Storage</h2>
        <p>Focus25 does not collect, store, or transmit any personal data to external servers. All user preferences and session data are stored locally in your browser using localStorage. Clearing your browser data will remove this information.</p>

        <h2 className="text-lg font-semibold text-foreground">7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>

        <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
        <p>For questions about these terms, please reach out through our website.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
