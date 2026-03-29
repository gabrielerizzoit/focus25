import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const FAQ = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="FAQ — Focus25 Pomodoro Timer"
      description="Frequently asked questions about Focus25. Learn how the timer works, how to customize it, and get the most out of your focus sessions."
      canonical="/faq"
      keywords="pomodoro timer FAQ, focus timer help, how to use pomodoro timer"
    />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h1>
      <div className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">What is Focus25?</h2>
          <p>Focus25 is a free, web-based Pomodoro timer. It helps you work in focused 25-minute sessions with short breaks. No signup, no downloads — just open the page and start.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Is Focus25 really free?</h2>
          <p>Yes, completely free. There are no premium plans, no ads, and no hidden costs. Every feature is available to everyone.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Do I need to create an account?</h2>
          <p>No. Focus25 requires no registration or login. Your settings and session data are saved locally in your browser.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Does the timer work when I switch tabs?</h2>
          <p>Yes. The timer uses timestamp-based logic (Date.now()) to calculate remaining time, so it stays accurate even when you switch to another tab or minimize your browser.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Can I customize the timer durations?</h2>
          <p>Yes. Click the settings icon below the timer to adjust focus duration, short break, and long break lengths. Your preferences are saved automatically.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">What are the ambient sounds?</h2>
          <p>Focus25 includes three ambient sound options: gentle rain, café ambiance, and white noise. These sounds help mask distractions and create a consistent focus environment. You can adjust the volume or turn them off at any time.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">What does "auto-switch" do?</h2>
          <p>When auto-switch is enabled, the timer automatically transitions between focus and break sessions. After a focus session, it starts a short break. After a short break, it starts the next focus session. After 4 focus sessions, it starts a long break.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Does Focus25 collect my data?</h2>
          <p>No. Focus25 does not collect, store, or transmit any personal data. All information stays in your browser. Read our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">How is Focus25 different from Pomofocus?</h2>
          <p>Focus25 prioritizes simplicity and speed. The homepage is the timer — no landing pages or onboarding. It includes ambient sounds, uses timestamp-based timing for accuracy, and collects zero data. See our <Link to="/pomofocus-alternative" className="text-primary hover:underline">Pomofocus Alternative</Link> page for a detailed comparison.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Can I use Focus25 on my phone?</h2>
          <p>Yes. Focus25 is fully responsive and works on any device with a web browser — phones, tablets, laptops, and desktops.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQ;
