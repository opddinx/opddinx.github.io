import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | null;

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ theme: null, toggleTheme: () => {} });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('km-theme') as Theme;
    return stored === 'dark' || stored === 'light' ? stored : null;
  });

  useEffect(() => {
    const h = document.documentElement;
    if (theme) {
      h.dataset.theme = theme;
    } else {
      delete h.dataset.theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const eff = theme ?? (sysDark ? 'dark' : 'light');
    const next = eff === 'dark' ? 'light' : 'dark';
    localStorage.setItem('km-theme', next);
    setTheme(next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
