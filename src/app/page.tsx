"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, MoveRight, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DiMsqlServer } from "react-icons/di";
import {
  FaBootstrap,
  FaCss3Alt,
  FaDocker,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJenkins,
  FaJira,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaTrello,
  FaVuejs,
} from "react-icons/fa";
import {
  SiAntdesign,
  SiBitbucket,
  SiCplusplus,
  SiDrizzle,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiNextdotjs,
  SiPostgresql,
  SiPrometheus,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

import EducationSection from "@/components/EducationSection";
import FadeInSection from "@/components/FadeInSection";
import { Header } from "@/components/header";
import ProjectSection from "@/components/ProjectsSection";
import ScrollNavLink from "@/components/ScrollNavLink";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

import Icon from "../../public/assets/icon";
import Icon2 from "../../public/assets/icon2";
// Import data
import projects from "./data/projects_en.json";
import technologies from "./data/technologies.json";
import translations from "./data/translations.json";

const iconComponents = {
  FaReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  SiPostgresql,
  FaGit,
  FaVuejs,
  FaBootstrap,
  FaDocker,
  FaGithub,
  TbBrandCSharp,
  SiBitbucket,
  DiMsqlServer,
  FaJenkins,
  FaLinux,
  SiKubernetes,
  SiPrometheus,
  SiGrafana,
  SiRedux,
  SiShadcnui,
  FaJira,
  FaTrello,
  SiAntdesign,
  SiDrizzle,
  SiCplusplus,
  SiUnity,
};

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const boxRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Animation for technologies section with staggered appearance
    const techItems = document.querySelectorAll("#technologies .grid > div");
    gsap.fromTo(
      techItems,
      {
        y: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: "#technologies",
          start: "top bottom-=100",
          end: "center center",
          toggleActions: "play none none reverse",
          // toggleActions format: onEnter onLeave onEnterBack onLeaveBack
          scrub: false,
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      },
    );

    if (boxRef.current) {
      gsap.to(boxRef.current, {
        duration: 4,
        rotation: 360,
        repeat: -1,
        transformOrigin: "50% 50%",
        ease: "linear",
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    if (!form.current) {
      console.error("Form reference is null");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // @ts-ignore
    emailjs
      .sendForm(
        "service_6fblbe9",
        "template_q58wl3k",
        form.current,
        "9mhvHBIIsHaKk8kNa",
      )
      .then((result) => {
        console.log("Email sent!", result.text);
        setSubmitStatus("success");
        form.current?.reset();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const t = translations.en;

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grid grid-cols-1 lg:grid-cols-4 min-h-screen px-8 md:px-16 lg:px-25'>
        <FadeInSection>
          <div className='border-x border-b h-210 flex flex-col items-center p-6 sticky'>
            <div className='rounded-full w-70 h-70 mt-12 mb-10'>
              <Image
                src='/assets/avatar.png'
                alt='Profile picture'
                width={350}
                height={350}
                className='w-full h-full object-cover rounded-full outline-4 out'
                style={{ outlineColor: "var(--foreground)" }}
              />
            </div>

            <h2 className='text-4xl font-bold text-center mb-3'>
              {t.info.name}
            </h2>
            <p className='text-xl mb-6 border-b'>{t.info.role}</p>

            <div className='mb-2 text-center flex items-center'>
              <Mail className='h-5 w-5' />
              <a
                href='mailto:trthngan.it@gmail.com'
                className='ms-2 hover:text-primary'
              >
                trthngan.it@gmail.com
              </a>
            </div>

            <div className='mb-2 text-center flex items-center'>
              <Phone className='h-5 w-5' />
              <a href='tel:+84944130035' className='ms-2 hover:text-primary'>
                (+84) 944 130 035
              </a>
            </div>

            <div className='mb-6 text-center flex items-center'>
              <MapPin className='h-5 w-5' />
              <p className='ms-2'>{t.info.address}</p>
            </div>

            <div className='flex gap-5 mb-6'>
              <Link
                href='https://www.linkedin.com/in/trthngan101/'
                target={"_blank"}
                className='w-10 h-10 flex items-center justify-center rounded-full'
              >
                <FaLinkedin size={30} />
              </Link>
              <Link
                href='https://github.com/Nagnie'
                target={"_blank"}
                className='w-10 h-10 flex items-center justify-center rounded-full'
              >
                <FaGithub size={30} />
              </Link>
            </div>

            <div className='mb-4'>
              <Link href='#contact'>{t.info.button1}</Link>
            </div>

            <Button
              variant='outline'
              asChild
              className='hover:bg-[var(--sidebar-border)] px-5'
            >
              <Link href='/assets/resume.pdf' target={"_blank"} download>
                {t.info.button2}
              </Link>
            </Button>
          </div>
        </FadeInSection>

        <div className='col-span-3 lg:ps-20'>
          {/* About section */}
          <FadeInSection>
            <section
              id={"about"}
              className='container items-center gap-6 pt-14 md:pt-20'
            >
              <div className='flex max-w-[1120px] items-start justify-between gap-4'>
                <div>
                  <div className='text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter mb-8 flex flex-col lg:flex-none'>
                    {t.about.intro}{" "}
                    <span className='text-primary text-7xl md:text-9xl playball-regular'>
                      {t.about.name}
                    </span>
                  </div>
                  <p className='max-w-[780px] text-xl text-muted-foreground'>
                    {t.about.description}
                  </p>
                  <div className='flex gap-4 mt-8'>
                    <Button
                      variant='outline'
                      className='hover:bg-[var(--sidebar-border)] px-5'
                      asChild
                    >
                      <Link
                        href='/assets/resume.pdf'
                        target={"_blank"}
                        download
                      >
                        {t.info.button2}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <Icon
                    ref={boxRef}
                    className='h-40 w-40 mt-10 hidden md:inline'
                  />
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Work Experience section */}
          <FadeInSection>
            <section className='mt-15 pt-15' id='work-experience'>
              <div className='container'>
                <div className={"mb-2 pb-2 flex items-center"}>
                  <Icon2 className={"h-6"} />
                  <h2 className='ms-3 text-3xl font-bold'>
                    {t["work-experience"].title}
                  </h2>
                </div>
                <ScrollNavLink>
                  <div className='border mb-8'></div>
                </ScrollNavLink>

                <WorkExperienceSection />
              </div>
            </section>
          </FadeInSection>

          {/* Education section */}
          <FadeInSection>
            <section className='mt-15 pt-15' id='education'>
              <div className='container'>
                <div className={"mb-2 pb-2 flex items-center"}>
                  <Icon2 className={"h-6"} />
                  <h2 className='ms-3 text-3xl font-bold'>
                    {t.education.title}
                  </h2>
                </div>
                <ScrollNavLink>
                  <div className='border mb-8'></div>
                </ScrollNavLink>

                <EducationSection />
              </div>
            </section>
          </FadeInSection>

          {/* Projects section */}
          <FadeInSection>
            <section className='mt-15 pt-15' id='projects'>
              <div className='container'>
                <div className={"mb-2 pb-2 flex items-center justify-between"}>
                  <div className='flex items-center justify-between'>
                    <Icon2 className={"h-6"} />
                    <h2 className='ms-3 text-3xl font-bold'>
                      {t.projects.title}
                    </h2>
                  </div>

                  {projects.length > 4 && (
                    <Link
                      href='/projects'
                      className={
                        "flex items-center hover:underline cursor-pointer"
                      }
                    >
                      See all
                      <MoveRight size={15} className={"ms-2"} />
                    </Link>
                  )}
                </div>
                <ScrollNavLink>
                  <div className='border mb-8'></div>
                </ScrollNavLink>
                <ProjectSection />
              </div>
            </section>
          </FadeInSection>

          {/* Technologies section */}
          <FadeInSection>
            <section className='mt-15 pt-15' id='technologies'>
              <div className='container'>
                <div className={"mb-2 pb-2 flex items-center"}>
                  <Icon2 className={"h-6"} />
                  <h2 className='ms-3 text-3xl font-bold'>
                    {t.technologies.title}
                  </h2>
                </div>
                <ScrollNavLink>
                  <div className='border mb-8'></div>
                </ScrollNavLink>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                  {technologies.map((tech, index) => {
                    // @ts-ignore
                    const IconComponent = iconComponents[tech.icon];
                    return (
                      <div
                        key={index}
                        className='flex flex-col items-center px-4 py-6 rounded-lg border bg-card shadow-sm'
                      >
                        <div className='flex items-center justify-center mb-3'>
                          <div className='bg-primary/10 rounded-full flex items-center justify-center text-primary'>
                            {IconComponent ? <IconComponent size={40} /> : null}
                          </div>
                        </div>
                        <h3 className='text-lg text-center font-medium'>
                          {tech.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Contact form section */}
          <FadeInSection>
            <section className='mt-15 pt-15 mb-25' id='contact'>
              <div className='container'>
                <div className={"mb-2 pb-2 flex items-center"}>
                  <Icon2 className={"h-6"} />
                  <h2 className='ms-3 text-3xl font-bold'>{t.contact.title}</h2>
                </div>
                <ScrollNavLink>
                  <div className='border mb-8'></div>
                </ScrollNavLink>

                <div className='rounded-lg border bg-card p-6 shadow-sm'>
                  {submitStatus === "success" ? (
                    <div className='p-4 bg-green-50 text-green-700 rounded-md mb-4'>
                      {t.contact.success}
                    </div>
                  ) : submitStatus === "error" ? (
                    <div className='p-4 bg-red-50 text-red-700 rounded-md mb-4'>
                      {t.contact.error}
                    </div>
                  ) : null}

                  <form
                    className='space-y-6'
                    ref={form}
                    onSubmit={handleSubmit}
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div className='space-y-2'>
                        <label htmlFor='name' className='font-medium'>
                          {t.contact.name}
                        </label>
                        <input
                          id='name'
                          name='name'
                          placeholder='Your name'
                          className='w-full rounded-md border border-input px-3 py-2 text-sm mt-2'
                          required
                        />
                      </div>
                      <div className='space-y-2'>
                        <label htmlFor='email' className='font-medium'>
                          {t.contact.email}
                        </label>
                        <input
                          id='email'
                          name='email'
                          type='email'
                          placeholder='Your email'
                          className='w-full rounded-md border border-input mt-2 px-3 py-2 text-sm'
                          required
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label htmlFor='subject' className='font-medium'>
                        {t.contact.subject}
                      </label>
                      <input
                        id='subject'
                        name='subject'
                        placeholder='Message subject'
                        className='w-full rounded-md border border-input mt-2 px-3 py-2 text-sm'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <label htmlFor='message' className='font-medium'>
                        {t.contact.message}
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        placeholder='Your message'
                        rows={5}
                        className='w-full rounded-md border border-input mt-2 px-3 py-2 text-sm'
                        required
                      />
                    </div>
                    <button
                      type='submit'
                      className='hover:bg-[var(--sidebar-border)] w-full md:w-auto px-4 py-2 border rounded-md flex items-center justify-center'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className={"ms-2 me-1"}>
                            {t.contact.sending}
                          </span>
                          <svg
                            className='animate-spin mx-1 h-4 w-4 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                        </>
                      ) : (
                        <>
                          <span className='ms-2 me-1'>{t.contact.send}</span>
                          <Send className='mx-1' size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </FadeInSection>
        </div>
      </main>
      <footer className='border-t py-6 w-full'>
        <div className='container max-w-screen flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-30'>
          <p className='text-center text-sm text-muted-foreground'>
            © 2025 Tran Thao Ngan. All rights reserved.
          </p>
          <div className='flex gap-4'>
            <Link
              href='https://github.com/Nagnie'
              target={"_blank"}
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              GitHub
            </Link>
            <Link
              href='https://www.linkedin.com/in/trthngan101'
              target={"_blank"}
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
