import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LanguageSwitcherProps {
  onChange?: (lang: string) => void;
}

export function LanguageSwitcher({ onChange }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
  ];

  useEffect(() => {
    // You can load the initial language from localStorage or some context
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("preferred-language", lang);
    if (onChange) {
      onChange(lang);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='h-9 w-9 cursor-pointer'
          aria-label='Switch Language'
        >
          <Globe className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className={"mt-1"}
        style={{ backgroundColor: "var(--background)" }}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={
              currentLanguage === language.code
                ? "bg-muted font-medium cursor-pointer"
                : "cursor-pointer"
            }
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
