import React from 'react';
import { LangProvider } from './src/contexts/LangContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <LangProvider>{element}</LangProvider>
  </ThemeProvider>
);
