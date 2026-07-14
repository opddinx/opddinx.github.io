import './src/styles/global.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { LangProvider } from './src/contexts/LangContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <LangProvider>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Helmet>
      {element}
    </LangProvider>
  </ThemeProvider>
);
