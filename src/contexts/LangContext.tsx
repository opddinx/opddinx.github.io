import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Lang } from '../types/i18n';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} });

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null;
    if (stored === 'en' || stored === 'ja') setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    localStorage.setItem('portfolio-lang', l);
    setLangState(l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
