import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HowItWorks = () => (
  <div className="min-h-screen flex flex-col">
    <SEOHead
      title="How It Works — Focus25 Pomodoro Timer"
      description="Learn how Focus25 works. Understand the Pomodoro Technique and how to use our free online timer for maximum productivity."
      canonical="/how-it-works"
      keywords="how pomodoro works, how to use pomodoro timer, focus timer guide"
    />
    <Header />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-6">How Focus25 Works</h1>
      <div className="prose prose-invert text-muted-foreground text-sm leading-relaxed space-y-4">
        <p>Focus25 is a Pomodoro timer built for simplicity. Here's how to get the most out of it.</p>

        <h2 className="text-lg font-semibold text-foreground">Step 1: Start a Focus Session</h2>
        <p>Open Focus25 and press Start. The default focus session is 25 minutes — the classic Pomodoro duration. During this time, work on one task with full attention. The progress ring shows how much time remains at a glance.</p>

        <h2 className="text-lg font-semibold text-foreground">Step 2: Take a Short Break</h2>
        <p>When the timer rings, take a 5-minute break. Stand up, stretch, grab water. This rest period is essential — it helps your brain consolidate information and recharge for the next session.</p>

        <h2 className="text-lg font-semibold text-foreground">Step 3: Repeat</h2>
        <p>After your break, start another focus session. After completing 4 focus sessions, the timer suggests a longer 15-minute break. This cycle of focused work and intentional rest is the core of the Pomodoro Technique.</p>

        <h2 className="text-lg font-semibold text-foreground">Auto-Switch Mode</h2>
        <p>Enable auto-switch to let Focus25 handle transitions automatically. The timer moves from focus to break and back without you pressing any buttons. Perfect for getting into a flow state without interruptions.</p>

        <h2 className="text-lg font-semibold text-foreground">Ambient Sounds</h2>
        <p>Choose from three background sounds to help you concentrate: rain for a calming atmosphere, café ambiance for warm background noise, or white noise to block distractions. Only one sound plays at a time, and you control the volume with a slider.</p>

        <h2 className="text-lg font-semibold text-foreground">Session Tracking</h2>
        <p>Focus25 automatically counts your completed focus sessions for the day. This simple counter helps you see your progress and build a consistent productivity habit. Session data is stored locally in your browser — no account needed.</p>

        <h2 className="text-lg font-semibold text-foreground">Customization</h2>
        <p>Click the settings icon to adjust your timer durations. Set focus time from 1 to 120 minutes, and customize short break and long break lengths. Your settings are saved automatically and persist across visits.</p>

        <h2 className="text-lg font-semibold text-foreground">Accurate Timing</h2>
        <p>Focus25 uses timestamp-based calculations to ensure accuracy. The timer stays correct even when you switch browser tabs, minimize your window, or your device briefly sleeps. When you return, the timer reflects real elapsed time.</p>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button className="rounded-full px-6">Start Your First Session</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default HowItWorks;
