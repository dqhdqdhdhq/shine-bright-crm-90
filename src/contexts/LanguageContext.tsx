
import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "@/translations/en";
import { sv } from "@/translations/sv";

type Language = "en" | "sv";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Translations> = {
  en,
  sv,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && (savedLanguage === "en" || savedLanguage === "sv") 
      ? savedLanguage 
      : "en";
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: keyof typeof en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
