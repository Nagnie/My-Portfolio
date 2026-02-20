"use client"

import React from "react"
import { useLanguage } from "@/components/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "@/app/globals.css"

import projectEn from "@/app/data/projects_en.json"
import projectVi from "@/app/data/projects_vi.json"

export default function ProjectSection() {
    const { language } = useLanguage()
    const projectData = language === "vi" ? projectVi : projectEn;

    return (
        <div className="space-y-8">
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-2">
                {projectData.map((project: any) => (
                    <div
                        key={project.id}
                        className="rounded-lg border bg-card hover:bg-[var(--sidebar-border)] p-6"
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
                            className="relative h-80 w-full overflow-hidden"
                        >
                            {project.images.map((img: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="w-full h-full bg-cover bg-center rounded"
                                        style={{
                                            backgroundImage: `url(${img})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <h3 className="mb-2 mt-4 text-xl font-semibold">{project.title}</h3>
                        <p className="mb-4 text-muted-foreground">{project.description}</p>
                        <div className="mb-4 flex flex-wrap gap-2">
                            {project.technologies.map((tech: string, index: number) => (
                                <Badge key={index} variant="outline" style={{ backgroundColor: "var(--background)" }}>
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" asChild style={{ backgroundColor: "var(--background)" }}>
                                <Link href={project.githubUrl} target="_blank">
                                    <FaGithub className="mr-2" /> Code
                                </Link>
                            </Button>
                            <Button size="sm" asChild style={{ backgroundColor: "var(--background)" }}>
                                <Link href={project.liveUrl} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
