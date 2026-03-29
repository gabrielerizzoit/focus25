import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PomodoroTimer from "./pages/PomodoroTimer";
import FocusTimer from "./pages/FocusTimer";
import StudyTimer from "./pages/StudyTimer";
import TwentyFiveMinuteTimer from "./pages/TwentyFiveMinuteTimer";
import MarinaraTimerAlternative from "./pages/MarinaraTimerAlternative";
import PomofocusAlternative from "./pages/PomofocusAlternative";
import OnlineTimer from "./pages/OnlineTimer";
import Timer5Minutes from "./pages/Timer5Minutes";
import Timer10Minutes from "./pages/Timer10Minutes";
import Timer15Minutes from "./pages/Timer15Minutes";
import TimerOnline from "./pages/TimerOnline";
import FreeTimer from "./pages/FreeTimer";
import Blog from "./pages/Blog";
import WhatIsPomodoroTechnique from "./pages/blog/WhatIsPomodoroTechnique";
import BestPomodoroTimer2026 from "./pages/blog/BestPomodoroTimer2026";
import WhatHappenedToMarinaraTimer from "./pages/blog/WhatHappenedToMarinaraTimer";
import PomofocusAlternativeGuide from "./pages/blog/PomofocusAlternativeGuide";
import HowToStayFocused from "./pages/blog/HowToStayFocused";
import TwentyFiveMinuteTimerBenefits from "./pages/blog/TwentyFiveMinuteTimerBenefits";
import StudyTimerVsPomodoro from "./pages/blog/StudyTimerVsPomodoro";
import DeepWorkTechnique from "./pages/blog/DeepWorkTechnique";
import BestFreeStudyTools from "./pages/blog/BestFreeStudyTools";
import HowToAvoidDistractions from "./pages/blog/HowToAvoidDistractions";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
            <Route path="/focus-timer" element={<FocusTimer />} />
            <Route path="/study-timer" element={<StudyTimer />} />
            <Route path="/25-minute-timer" element={<TwentyFiveMinuteTimer />} />
            <Route path="/marinara-timer-alternative" element={<MarinaraTimerAlternative />} />
            <Route path="/pomofocus-alternative" element={<PomofocusAlternative />} />
            <Route path="/online-timer" element={<OnlineTimer />} />
            <Route path="/timer-5-minutes" element={<Timer5Minutes />} />
            <Route path="/timer-10-minutes" element={<Timer10Minutes />} />
            <Route path="/timer-15-minutes" element={<Timer15Minutes />} />
            <Route path="/timer-online" element={<TimerOnline />} />
            <Route path="/free-timer" element={<FreeTimer />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/what-is-pomodoro-technique" element={<WhatIsPomodoroTechnique />} />
            <Route path="/blog/best-pomodoro-timer-online-2026" element={<BestPomodoroTimer2026 />} />
            <Route path="/blog/what-happened-to-marinara-timer" element={<WhatHappenedToMarinaraTimer />} />
            <Route path="/blog/pomofocus-alternative-guide" element={<PomofocusAlternativeGuide />} />
            <Route path="/blog/how-to-stay-focused-while-studying" element={<HowToStayFocused />} />
            <Route path="/blog/25-minute-timer-benefits" element={<TwentyFiveMinuteTimerBenefits />} />
            <Route path="/blog/study-timer-vs-pomodoro" element={<StudyTimerVsPomodoro />} />
            <Route path="/blog/deep-work-technique-explained" element={<DeepWorkTechnique />} />
            <Route path="/blog/best-free-study-tools-online" element={<BestFreeStudyTools />} />
            <Route path="/blog/how-to-avoid-distractions" element={<HowToAvoidDistractions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
