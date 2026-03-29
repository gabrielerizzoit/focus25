import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Timer from '@/components/Timer';

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="Focus25 — Free Pomodoro Timer Online | Study Timer"
      description="Focus25 is a free, minimal Pomodoro timer. No signup required. Start your focus session instantly with ambient sounds, session tracking, and customizable durations."
      canonical="/"
      keywords="pomodoro timer, focus timer, study timer, 25 minute timer, online timer, free timer, pomofocus alternative"
    />
    <Header />
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <Timer />
    </main>
    <Footer />
  </div>
);

export default Index;
