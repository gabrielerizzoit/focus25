import { Link } from 'react-router-dom';
import { Timer as TimerIcon } from 'lucide-react';

const Header = () => (
  <header className="w-full py-4 px-4 flex items-center justify-center">
    <Link to="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
      <TimerIcon size={20} className="text-primary" />
      <span className="text-lg font-semibold tracking-tight">Focus25</span>
    </Link>
  </header>
);

export default Header;
