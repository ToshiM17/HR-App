import React, { createContext, useContext, useState, useEffect } from 'react';
import Languages from './Languages';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  document.documentElement.lang = language;
  const lang = Languages[language];

  useEffect(() => {
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  return (
    <LanguageContext.Provider value={{ language, lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
