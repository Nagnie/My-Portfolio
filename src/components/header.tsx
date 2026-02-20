import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/language-context";

import Logo from "../../public/assets/logo";
import translations from "../app/data/translations.json";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [activeLink, setActiveLink] = useState("/");
  // const [currentLanguage, setCurrentLanguage] = useState("en");
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Get all navigation links
    const links = document.querySelectorAll("nav a");

    // Set up ScrollTrigger for each section
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveLink(href),
            onEnterBack: () => setActiveLink(href),
          });
        }
      } else if (href === "/") {
        ScrollTrigger.create({
          trigger: "main",
          start: "top top",
          end: "10% top",
          onEnter: () => setActiveLink("/"),
          onEnterBack: () => setActiveLink("/"),
        });
      }
    });

    // Add click event to handle smooth scrolling
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: element, offsetY: 80 },
              ease: "power3.inOut",
            });
            setActiveLink(href);
          }
        }
      });
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  // Use current language for navigation text
  const t_nav = t(
    "navigation",
    "",
  ) as unknown as typeof translations.en.navigation;
  const t_header = t("header", "") as unknown as typeof translations.en.header;

  return (
    <header className='sticky top-0 z-40 w-full border-b'>
      <div className='container max-w-screen flex h-20 items-center justify-between px-10 md:px-20 lg:px-25 py-5'>
        <div className='flex items-center gap-6 md:gap-10'>
          <Link href='/' className='flex items-center font-bold text-2xl'>
            <Logo className='h-8 w-8 me-3' />
            {t_header.portfolio}
          </Link>
        </div>
        <div>
          <nav className='hidden text-xl lg:gap-10 lg:flex'>
            <Link
              href='#about'
              className={`transition-all duration-300 hover:font-bold ${activeLink === "/" ? "text-primary font-bold" : "hover:text-foreground/80"}`}
            >
              {t_nav.about}
            </Link>
            <Link
              href='#education'
              className={`transition-all duration-300 hover:font-bold ${activeLink === "#education" ? "text-primary font-bold" : "hover:text-foreground/80"}`}
            >
              {t_nav.education}
            </Link>
            <Link
              href='#projects'
              className={`transition-all duration-300 hover:font-bold ${activeLink === "#projects" ? "text-primary font-bold" : "hover:text-foreground/80"}`}
            >
              {t_nav.projects}
            </Link>
            <Link
              href='#technologies'
              className={`transition-all duration-300 hover:font-bold ${activeLink === "#technologies" ? "text-primary font-bold" : "hover:text-foreground/80"}`}
            >
              {t_nav.technologies}
            </Link>
            <Link
              href='#contact'
              className={`transition-all duration-300 hover:font-bold ${activeLink === "#contact" ? "text-primary font-bold" : "hover:text-foreground/80"}`}
            >
              {t_nav.contact}
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-2'>
          <LanguageSwitcher onChange={handleLanguageChange} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
