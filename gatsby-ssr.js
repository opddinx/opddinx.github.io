import React from 'react';
import { LangProvider } from './src/contexts/LangContext';

export const wrapRootElement = ({ element }) => (
  <LangProvider>{element}</LangProvider>
);
