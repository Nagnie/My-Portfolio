"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./portfolio-gradient-bg.css";

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
import emailjs from "@emailjs/browser";

import Icon from "../../public/assets/icon";
import Icon2 from "../../public/assets/icon2";
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

// Orb config: index → CSS speed var
const ORB_SPEEDS = [0.12, 0.07, 0.2, 0.09, 0.05, 0.15];

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boxRef = useRef<SVGSVGElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  // ─── Clear submit status after 3.5s ──────────────────────────────────────
  useEffect(() => {
    if (!submitStatus) return;
    const t = setTimeout(() => setSubmitStatus(null), 3500);
    return () => clearTimeout(t);
  }, [submitStatus]);

  // ─── GSAP + Scroll Parallax ───────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Tech section stagger
    const techItems = document.querySelectorAll("#technologies .grid > div");
    gsap.fromTo(
      techItems,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#technologies",
          start: "top bottom-=100",
          end: "center center",
          toggleActions: "play none none reverse",
          scrub: false,
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      },
    );

    // Spinning icon
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        duration: 4,
        rotation: 360,
        repeat: -1,
        transformOrigin: "50% 50%",
        ease: "linear",
      });
    }

    // ── Scroll parallax for orbs ──────────────────────────────────────────
    // Each orb translates at a different speed, creating depth.
    // We use requestAnimationFrame + lerp for buttery smooth ease-in-out feel.
    let currentY = 0;
    let targetY = 0;
    let rafId: number;

    const onScroll = () => {
      targetY = window.scrollY;
    };

    const tick = () => {
      // Lerp towards scroll target (ease factor = 0.08 → smooth lag)
      currentY += (targetY - currentY) * 0.08;

      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const speed = ORB_SPEEDS[i];
        // Parallax offset: slower orbs appear further back
        const offsetY = currentY * speed;
        orb.style.transform = `translateY(${offsetY}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    if (!form.current) {
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
      .then(() => {
        setSubmitStatus("success");
        form.current?.reset();
      })
      .catch(() => setSubmitStatus("error"))
      .finally(() => setIsSubmitting(false));
  };

  const t = translations.en;

  return (
    <div style={{ backgroundColor: "#fff5e4" }}>
      <Header />
      <div className='flex min-h-screen flex-col portfolio-bg text-black'>
        {/* ── GRAIN TEXTURE (fixed, decorative) ──────────────────────────────── */}
        <div className='grain-overlay' />

        {/* ── ORB CANVAS (absolute = scrolls with page) ──────────────────────── */}
        <div className='orb-canvas' aria-hidden='true'>
          {/* Each orb gets a ref for JS parallax + its CSS animation class */}
          <div
            className='orb orb-1'
            ref={(el) => {
              orbRefs.current[0] = el;
            }}
          />
          <div
            className='orb orb-2'
            ref={(el) => {
              orbRefs.current[1] = el;
            }}
          />
          <div
            className='orb orb-3'
            ref={(el) => {
              orbRefs.current[2] = el;
            }}
          />
          <div
            className='orb orb-4'
            ref={(el) => {
              orbRefs.current[3] = el;
            }}
          />
          <div
            className='orb orb-5'
            ref={(el) => {
              orbRefs.current[4] = el;
            }}
          />
          <div
            className='orb orb-6'
            ref={(el) => {
              orbRefs.current[5] = el;
            }}
          />
        </div>

        <main className='min-h-screen px-8 md:px-16 lg:px-25'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
            <FadeInSection>
              {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
              <div className='sidebar-card min-w-85 h-210 flex flex-col items-center py-6 sticky'>
                <div className='rounded-full w-60 h-70 mt-12 mb-10'>
                  <Image
                    src='/assets/avatar.png'
                    alt='Profile picture'
                    width={300}
                    height={300}
                    className='w-full h-full object-cover rounded-full'
                    style={{
                      outline: "3px solid #D35270",
                      boxShadow: "0 0 40px rgba(239, 106, 133, 0.80)",
                    }}
                  />
                </div>

                <h2 className='text-3xl font-bold text-center mb-3 text-custom'>
                  {t.info.name}
                </h2>

                <p
                  className='text-xl mb-6 border-b border-red-500/30 pb-2'
                  style={{
                    background:
                      "linear-gradient(135deg, #ee6983 0%, #860F37 50%, #F694A1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.info.role}
                </p>

                <div className='mb-2 text-center flex items-center text-custom'>
                  <Mail className='h-5 w-5 text-red-800' />
                  <a
                    href='mailto:trthngan.it@gmail.com'
                    className='ms-2 hover:text-red-700 transition-colors'
                  >
                    trthngan.it@gmail.com
                  </a>
                </div>

                <div className='mb-2 text-center flex items-center text-custom'>
                  <Phone className='h-5 w-5 text-red-800' />
                  <a
                    href='tel:+84944130035'
                    className='ms-2 hover:text-red-700 transition-colors'
                  >
                    (+84) 944 130 035
                  </a>
                </div>

                <div className='mb-6 text-center flex items-center text-custom'>
                  <MapPin className='h-5 w-5 text-red-800' />
                  <p className='ms-2'>{t.info.address}</p>
                </div>

                <div className='flex gap-5 mb-6'>
                  <Link
                    href='https://www.linkedin.com/in/trthngan101/'
                    target='_blank'
                    className='social-btn w-10 h-10 flex items-center justify-center rounded-full'
                  >
                    <FaLinkedin size={30} />
                  </Link>
                  <Link
                    href='https://github.com/Nagnie'
                    target='_blank'
                    className='social-btn w-10 h-10 flex items-center justify-center rounded-full'
                  >
                    <FaGithub size={30} />
                  </Link>
                </div>

                <div className='mb-4'>
                  <Link
                    href='#contact'
                    className='text-red-800 hover:text-red-700 transition-colors'
                  >
                    {t.info.button1}
                  </Link>
                </div>

                <button className='btn-gradient px-5 py-2 rounded-md text-sm font-medium cursor-pointer'>
                  <Link href='/assets/resume.pdf' target='_blank' download>
                    {t.info.button2}
                  </Link>
                </button>
              </div>
            </FadeInSection>

            <div className='col-span-3 lg:ps-20'>
              {/* ── ABOUT ─────────────────────────────────────────────────────── */}
              <FadeInSection>
                <section
                  id='about'
                  className='container items-center gap-6 pt-14 md:pt-20'
                >
                  <div className='flex max-w-[1120px] items-start justify-between gap-4'>
                    <div>
                      <div className='text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter mb-8 flex flex-col lg:flex-none text-custom'>
                        {t.about.intro}{" "}
                        <span
                          className='text-7xl md:text-9xl playball-regular'
                          style={{
                            background:
                              "linear-gradient(135deg, #ee6983 0%, #860F37 40%, #F694A1 80%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter:
                              "drop-shadow(0 0 30px rgba(255, 198, 197, 0.4))",
                          }}
                        >
                          {t.about.name}
                        </span>
                      </div>
                      <p className='max-w-[780px] text-xl text-custom-light'>
                        {t.about.description}
                      </p>
                      <div className='flex gap-4 mt-8'>
                        <button className='btn-gradient px-5 py-2 rounded-md text-sm font-medium cursor-pointer'>
                          <Link
                            href='/assets/resume.pdf'
                            target='_blank'
                            download
                          >
                            {t.info.button2}
                          </Link>
                        </button>
                      </div>
                    </div>
                    <div>
                      <Icon
                        ref={boxRef}
                        className='h-40 w-40 mt-10 hidden md:inline'
                        style={{
                          filter:
                            "drop-shadow(0 0 20px rgba(239, 106, 133, 0.5))",
                        }}
                      />
                    </div>
                  </div>
                </section>
              </FadeInSection>

              {/* ── WORK EXPERIENCE ───────────────────────────────────────────── */}
              <FadeInSection>
                <section className='mt-15 pt-15' id='work-experience'>
                  <div className='container'>
                    <div className='mb-2 pb-2 flex items-center'>
                      <Icon2 className='h-6' />
                      <h2 className='ms-3 text-3xl font-bold text-custom'>
                        {t["work-experience"].title}
                      </h2>
                    </div>
                    <ScrollNavLink>
                      <div className='section-divider' />
                    </ScrollNavLink>
                    <WorkExperienceSection />
                  </div>
                </section>
              </FadeInSection>

              {/* ── EDUCATION ─────────────────────────────────────────────────── */}
              <FadeInSection>
                <section className='mt-15 pt-15' id='education'>
                  <div className='container'>
                    <div className='mb-2 pb-2 flex items-center'>
                      <Icon2 className='h-6' />
                      <h2 className='ms-3 text-3xl font-bold text-custom'>
                        {t.education.title}
                      </h2>
                    </div>
                    <ScrollNavLink>
                      <div className='section-divider' />
                    </ScrollNavLink>
                    <EducationSection />
                  </div>
                </section>
              </FadeInSection>
            </div>
          </div>
          <div className='flex flex-col gap-12'>
            {/* ── PROJECTS ──────────────────────────────────────────────────── */}
            <FadeInSection>
              <section className='mt-15 pt-15' id='projects'>
                <div className='container'>
                  <div className='mb-2 pb-2 flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Icon2 className='h-6' />
                      <h2 className='ms-3 text-3xl font-bold text-custom'>
                        {t.projects.title}
                      </h2>
                    </div>
                    {projects.length > 4 && (
                      <Link
                        href='/projects'
                        className='flex items-center text-red-500 hover:text-red-600 hover:underline cursor-pointer transition-colors'
                      >
                        See all <MoveRight size={15} className='ms-2' />
                      </Link>
                    )}
                  </div>
                  <ScrollNavLink>
                    <div className='section-divider' />
                  </ScrollNavLink>
                  <ProjectSection />
                </div>
              </section>
            </FadeInSection>

            {/* ── TECHNOLOGIES ──────────────────────────────────────────────── */}
            <FadeInSection>
              <section className='mt-15 pt-15' id='technologies'>
                <div className='container'>
                  <div className='mb-2 pb-2 flex items-center'>
                    <Icon2 className='h-6' />
                    <h2 className='ms-3 text-3xl font-bold text-custom'>
                      {t.technologies.title}
                    </h2>
                  </div>
                  <ScrollNavLink>
                    <div className='section-divider' />
                  </ScrollNavLink>
                  <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5'>
                    {technologies.map((tech, index) => {
                      // @ts-ignore
                      const IconComponent = iconComponents[tech.icon];
                      return (
                        <div
                          key={index}
                          className='tech-card flex flex-col items-center px-4 py-6 rounded-lg'
                        >
                          <div className='flex items-center justify-center mb-3'>
                            <div className='rounded-full flex items-center justify-center text-custom-tech tech-icon'>
                              {IconComponent ? (
                                <IconComponent size={40} />
                              ) : null}
                            </div>
                          </div>
                          <h3 className='text-lg text-center font-medium text-custom-light'>
                            {tech.name}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </FadeInSection>

            {/* ── CONTACT ───────────────────────────────────────────────────── */}
            <FadeInSection>
              <section className='mt-15 pt-15 mb-25' id='contact'>
                <div className='container'>
                  <div className='mb-2 pb-2 flex items-center'>
                    <Icon2 className='h-6' />
                    <h2 className='ms-3 text-3xl font-bold text-custom'>
                      {t.contact.title}
                    </h2>
                  </div>
                  <ScrollNavLink>
                    <div className='section-divider' />
                  </ScrollNavLink>

                  <div className='contact-card p-6'>
                    {submitStatus === "success" && (
                      <div className='p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-md mb-4'>
                        {t.contact.success}
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className='p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-md mb-4'>
                        {t.contact.error}
                      </div>
                    )}

                    <form
                      className='space-y-6'
                      ref={form}
                      onSubmit={handleSubmit}
                    >
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='space-y-2'>
                          <label
                            htmlFor='name'
                            className='font-medium text-custom'
                          >
                            {t.contact.name}
                          </label>
                          <input
                            id='name'
                            name='name'
                            placeholder='Your name'
                            className='contact-input w-full rounded-md border px-3 py-2 text-sm mt-2'
                            required
                          />
                        </div>
                        <div className='space-y-2'>
                          <label
                            htmlFor='email'
                            className='font-medium text-custom'
                          >
                            {t.contact.email}
                          </label>
                          <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Your email'
                            className='contact-input w-full rounded-md border mt-2 px-3 py-2 text-sm'
                            required
                          />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <label
                          htmlFor='subject'
                          className='font-medium text-custom'
                        >
                          {t.contact.subject}
                        </label>
                        <input
                          id='subject'
                          name='subject'
                          placeholder='Message subject'
                          className='contact-input w-full rounded-md border mt-2 px-3 py-2 text-sm'
                          required
                        />
                      </div>
                      <div className='space-y-2'>
                        <label
                          htmlFor='message'
                          className='font-medium text-custom'
                        >
                          {t.contact.message}
                        </label>
                        <textarea
                          id='message'
                          name='message'
                          placeholder='Your message'
                          rows={5}
                          className='contact-input w-full rounded-md border mt-2 px-3 py-2 text-sm'
                          required
                        />
                      </div>
                      <button
                        type='submit'
                        className='btn-send w-full md:w-auto px-6 py-2 rounded-md flex items-center justify-center font-medium cursor-pointer'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className='ms-2 me-1'>
                              {t.contact.sending}
                            </span>
                            <svg
                              className='animate-spin mx-1 h-4 w-4 text-black'
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
                              />
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              />
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

        {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
        <footer className='border-t border-red-500/20 py-6 w-full backdrop-blur-sm'>
          <div className='container max-w-screen flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-30'>
            <p className='text-center text-sm text-custom'>
              © 2025 Tran Thao Ngan. All rights reserved.
            </p>
            <div className='flex gap-4'>
              <Link
                href='https://github.com/Nagnie'
                target='_blank'
                className='text-sm text-black hover:text-red-600 transition-colors'
              >
                GitHub
              </Link>
              <Link
                href='https://www.linkedin.com/in/trthngan101'
                target='_blank'
                className='text-sm text-black hover:text-red-600 transition-colors'
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
