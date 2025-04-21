"use client"

import { createContext, useState, useEffect, ReactNode } from "react";

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string, section?: string) => string;
};

export const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
    t: () => "",
});

type LanguageProviderProps = {
    children: ReactNode;
    initialLanguage?: string;
    translations: Record<string, any>;
};

export function LanguageProvider({
                                     children,
                                     initialLanguage = "en",
                                     translations,
                                 }: LanguageProviderProps) {
    const [language, setLanguage] = useState(initialLanguage);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("preferred-language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const handleSetLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("preferred-language", lang);
        // You could also set HTML lang attribute here
        document.documentElement.lang = lang;
    };

    // Translation function
    const t = (key: string, section?: string): string => {
        if (!translations[language]) return key;

        if (section) {
            return translations[language][section]?.[key] || translations.en[section]?.[key] || key;
        }

        return translations[language][key] || translations.en[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook for using the language context
import { useContext } from "react";

export function useLanguage() {
    return useContext(LanguageContext);
}