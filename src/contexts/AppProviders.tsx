import * as React from 'react';
import { LangProvider } from './LangContext';
import { ThemeProvider } from './ThemeContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <AppProviders>{element}</AppProviders>
);
