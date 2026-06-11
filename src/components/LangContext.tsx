'use client';

import { createContext, useContext } from 'react';

export type Lang = 'ru' | 'en';

export const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: 'ru',
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);
