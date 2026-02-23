"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/globals.css";
import { useParams } from "next/navigation";

import projectEn from "@/app/data/projects_en.json";
import translations from "@/app/data/translations.json";

export default function ProjectDetailPage() {
  const projectData = projectEn;
  const t = translations.en;
  const params = useParams();
  const projectId = parseInt(params.id as string);

  const project = projectData.find((p: any) => p.id === projectId);

  if (!project) {
    return (
      <div className='min-h-screen container mx-auto px-4 py-20'>
        <h1 className='text-4xl font-bold'>Project not found</h1>
        <Button className='mt-4' asChild>
          <Link href='/projects'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            {t.projects.backToProjects}
          </Link>
        </Button>
      </div>
    );
  }

  // Check if liveUrl is a YouTube link
  const isYouTubeLink = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isYouTube = isYouTubeLink(project.liveUrl);
  const videoId = isYouTube ? getYouTubeVideoId(project.liveUrl) : null;

  return (
    <div style={{ backgroundColor: "#fff5e4" }}>
      <div className='min-h-screen container mx-auto px-4 py-20 text-custom'>
        <Button variant='outline' className='mb-6 btn-send' asChild>
          <Link href='/projects'>
            <ArrowLeft className='h-4 w-4' />
            {t.projects.backToProjects}
          </Link>
        </Button>

        <div className='space-y-8'>
          <div>
            <h1 className='text-4xl font-bold mb-4'>{project.title}</h1>
            <p className='text-xl text-muted-foreground mb-6'>
              {project.description}
            </p>

            <div className='flex gap-3 mb-6'>
              <Button variant='outline' asChild>
                <Link href={project.githubUrl} target='_blank'>
                  <FaGithub className='mr-2' /> {t.projects.viewCode}
                </Link>
              </Button>
              <Button asChild>
                <Link href={project.liveUrl} target='_blank'>
                  <ExternalLink className='mr-2 h-4 w-4' />{" "}
                  {t.projects.viewDemo}
                </Link>
              </Button>
            </div>
          </div>

          <div className='grid gap-14 grid-cols-1 lg:grid-cols-3'>
            <div className='lg:col-span-2 space-y-6'>
              {/* YouTube Video if liveUrl is YouTube */}
              {isYouTube && videoId && (
                <div className='w-full aspect-video rounded-lg overflow-hidden'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={project.title}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    className='w-full h-full'
                  ></iframe>
                </div>
              )}

              {/* Image Swiper */}
              <div className='rounded-lg overflow-hidden border'>
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
                          .swiper-button-next,
                          .swiper-button-prev {
                            color: var(--primary) !important;
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
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className='relative h-[500px] w-full overflow-hidden'
                >
                  {project.images.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div
                        className='w-full h-full bg-cover bg-center'
                        style={{
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Technologies */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold mb-4'>
                {t.projects.technologies}
              </h2>
              <div className='flex flex-wrap gap-3'>
                {project.technologies.map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    variant='outline'
                    className='text-base py-2 px-4'
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Project Details */}
              {project.details && project.details.length > 0 && (
                <div>
                  <h2 className='text-2xl font-semibold mb-4'>
                    {t.projects.features}
                  </h2>
                  <ul className='space-y-3'>
                    {project.details.map((detail: string, index: number) => (
                      <li key={index} className='flex items-start'>
                        <span className='mr-3 mt-1 flex-shrink-0 w-2 h-2 rounded-full'>
                          •
                        </span>
                        <span className='text-lg'>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
