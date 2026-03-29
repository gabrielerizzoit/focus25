import { Link } from 'react-router-dom';
import { Timer as TimerIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { langPrefix } = useLanguage();
  return (
    <header className="w-full py-4 px-4 flex items-center justify-between max-w-4xl mx-auto">
      <Link to={langPrefix || '/'} className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
        <TimerIcon size={20} className="text-primary" />
        <span className="text-lg font-semibold tracking-tight">Focus25</span>
      </Link>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
