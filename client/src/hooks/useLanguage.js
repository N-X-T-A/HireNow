import React, { createContext, useState, useEffect, useContext } from "react";
import vi from "../assets/languages/vi.json";
import en from "../assets/languages/en.json";

const LanguageContext = createContext();

const availableTranslations = {
  vi,
  en,
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("vi");
  const [translations, setTranslations] = useState(availableTranslations.vi);

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "vi";
    setLanguage(storedLang);
    setTranslations(
      availableTranslations[storedLang] || availableTranslations.vi
    );
  }, []);

  const changeLanguage = (newLang) => {
    if (availableTranslations[newLang]) {
      localStorage.setItem("language", newLang);
      window.location.reload();
    } else {
      console.warn(`Language "${newLang}" is not available.`);
    }
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, translations, changeLanguage } },
    children
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
