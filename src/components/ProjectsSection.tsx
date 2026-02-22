"use client";

import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import projectEn from "@/app/data/projects_en.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectSection() {
  const projectData = projectEn;

  // Show only the 4 most recent projects (first 4 items)
  const recentProjects = projectData.slice(0, 4);

  return (
    <div className='space-y-8 text-custom'>
      <div className='grid gap-16 grid-cols-1 lg:grid-cols-2'>
        {recentProjects.map((project: any) => (
          <div
            key={project.id}
            className='rounded-lg hover:scale-102 p-6 transition-transform duration-300'
            style={{
              outline: "1px solid #D35270",
              boxShadow: "0 0 20px rgba(239, 106, 133, 0.40)",
            }}
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
                  style={{ border: "1px solid #D35270" }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className='flex gap-3'>
              <Button
                variant='outline'
                size='sm'
                asChild
              >
                <Link href={project.githubUrl} target='_blank'>
                  <FaGithub className='mr-2' /> Code
                </Link>
              </Button>
              <Button
                size='sm'
                asChild
              >
                <Link href={project.liveUrl} target='_blank'>
                  <ExternalLink className='mr-2 h-4 w-4' /> Demo
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
