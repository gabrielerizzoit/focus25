import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGS, LANG_LABELS, type SupportedLang } from '@/i18n';

const LanguageSwitcher = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (newLang: SupportedLang) => {
    if (newLang === lang) return;
    const pathWithoutLang = lang === 'en'
      ? location.pathname
      : location.pathname.replace(`/${lang}`, '') || '/';
    const newPath = newLang === 'en' ? pathWithoutLang : `/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    navigate(newPath || '/');
  };

  return (
    <select
      value={lang}
      onChange={e => handleChange(e.target.value as SupportedLang)}
      className="bg-muted border border-border rounded px-2 py-1 text-xs text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
      aria-label="Select language"
    >
      {SUPPORTED_LANGS.map(l => (
        <option key={l} value={l}>{LANG_LABELS[l]}</option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
