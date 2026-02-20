"use client";

import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import projectEn from "@/app/data/projects_en.json";
import projectVi from "@/app/data/projects_vi.json";
import translations from "@/app/data/translations.json";
import { Header } from "@/components/header";
import { useLanguage } from "@/components/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const projectData = language === "vi" ? projectVi : projectEn;
  const t = translations[language as keyof typeof translations];
  const router = useRouter();

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Sort projects by date
  const sortedProjects = [...projectData].sort((a: any, b: any) => {
    if (sortOrder === "newest") {
      return b.date.localeCompare(a.date);
    } else {
      return a.date.localeCompare(b.date);
    }
  });

  return (
    <div className='min-h-screen container mx-auto px-4 py-20'>
      <Header />
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-4'>{t.projects.allProjects}</h1>
        <div className='flex gap-4 items-center'>
          <span className='text-muted-foreground'>{t.projects.filterBy}:</span>
          <Button
            variant={sortOrder === "newest" ? "default" : "outline"}
            onClick={() => setSortOrder("newest")}
          >
            {t.projects.newest}
          </Button>
          <Button
            variant={sortOrder === "oldest" ? "default" : "outline"}
            onClick={() => setSortOrder("oldest")}
          >
            {t.projects.oldest}
          </Button>
        </div>
      </div>

      <div className='grid gap-10 grid-cols-1 lg:grid-cols-2'>
        {sortedProjects.map((project: any) => (
          <div
            key={project.id}
            onClick={() => router.push(`/projects/${project.id}`)}
            className='rounded-lg border bg-card hover:bg-[var(--sidebar-border)] p-6 transition-all cursor-pointer'
          >
            <style>
              {`
                              .swiper-pagination-bullet {
                                opacity: 0.5;
                                width: 12px;
                                height: 12px;
                                background-color: var(--primary);
                              }
                              .swiper-pagination-bullet-active {
                                opacity: 1;
                                background-color: var(--primary);
                              }
                              .swiper-pagination {
                                bottom: 20px !important;
                              }
                            `}
            </style>

            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Autoplay, Pagination]}
              className='relative h-80 w-full overflow-hidden'
            >
              {project.images.map((img: string, index: number) => (
                <SwiperSlide key={index}>
                  <div
                    className='w-full h-full bg-cover bg-center rounded'
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <h3 className='mb-2 mt-4 text-xl font-semibold'>{project.title}</h3>
            <p className='mb-4 text-muted-foreground'>{project.description}</p>
            <div className='mb-4 flex flex-wrap gap-2'>
              {project.technologies.map((tech: string, index: number) => (
                <Badge
                  key={index}
                  variant='outline'
                  style={{ backgroundColor: "var(--background)" }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className='flex gap-3' onClick={(e) => e.stopPropagation()}>
              <Button
                variant='outline'
                size='sm'
                asChild
                style={{ backgroundColor: "var(--background)" }}
              >
                <a
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaGithub className='mr-2' /> Code
                </a>
              </Button>
              <Button
                size='sm'
                asChild
                style={{ backgroundColor: "var(--background)" }}
              >
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ExternalLink className='mr-2 h-4 w-4' /> Demo
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-12'>
        <Button variant='outline' asChild>
          <Link href='/#projects'>{t.projects.backToProjects}</Link>
        </Button>
      </div>
    </div>
  );
}
