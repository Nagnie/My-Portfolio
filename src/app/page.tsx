"use client"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { FaGithub, FaLinkedin, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGit } from "react-icons/fa"
import { SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiPostgresql } from "react-icons/si";
import { Mail, Phone, MapPin, ExternalLink, Send, MoveRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "@/components/ui/carousel"
import { MapModal } from "@/components/ui/map-modal"
import { useState } from "react"

// Import data
import projects from "./data/projects.json"
import technologies from "./data/technologies.json"
import education from "./data/education.json"

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
  FaGit
};

export default function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false)
  const address = "Thu Duc, Ho Chi Minh City, Vietnam"

  return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
          <div className="min-h-screen flex flex-col items-center p-6">
            <div className="rounded-full w-65 h-65 mt-8 mb-8">
              <Image
                  src="/assets/avatar.jpg"
                  alt="Profile picture"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full outline-4 outline-gray-200"
              />
            </div>

            <h2 className="text-3xl font-bold mb-3">Tran Thao Ngan</h2>
            <p className="text-xl mb-6">Frontend Developer</p>

            <div className="mb-2 text-center flex items-center">
              <Mail className="h-5 w-5" />
              <a href="mailto:trthngan.it@gmail.com" className="ms-2 hover:text-primary">
                trthngan.it@gmail.com
              </a>
            </div>

            <div className="mb-2 text-center flex items-center">
              <Phone className="h-5 w-5" />
              <a href="tel:+84944130035" className="ms-2 hover:text-primary">
                (+84) 944 130 035
              </a>
            </div>

            <div className="mb-6 text-center flex items-center cursor-pointer" onClick={() => setIsMapOpen(true)}>
              <MapPin className="h-5 w-5" />
              <p className="ms-2">Thu Duc, Ho Chi Minh City, Vietnam</p>
            </div>

            <div className="flex gap-5 mb-6">
              <Link href="https://www.linkedin.com/in/trthngan101/" target={"_blank"} className="w-10 h-10 flex items-center justify-center rounded-full">
                <FaLinkedin size={30} />
              </Link>
              <Link href="https://github.com/Nagnie" target={"_blank"} className="w-10 h-10 flex items-center justify-center rounded-full">
                <FaGithub size={30} />
              </Link>
            </div>

            <Button asChild className="w-full mb-4">
              <Link href="#contact">Contact Me</Link>
            </Button>

            <Button variant="outline" asChild className="w-40">
              <Link href="/assets/resume.pdf" download>My Resume</Link>
            </Button>

            {/* Map Modal */}
            <MapModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                address={address}
            />
          </div>

          <div className="col-span-3 px-8 md:px-16 lg:px-20">
            {/* About section */}
            <section className="container items-center mt-12 gap-6 pb-8 pt-6 md:py-10">
              <div className="flex max-w-[980px] flex-col items-start gap-4">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter mb-3">
                  Hello, I am <span className="text-primary text-5xl md:text-8xl">Thao Ngan</span>
                </h1>
                <p className="max-w-[780px] text-xl text-muted-foreground">
                  I’m a third-year Software Engineering student at the University of Science - VNUHCM.                  I have a strong passion for Frontend Development and am currently expanding my knowledge of JavaScript frameworks like React, Vue.
                </p>
                <div className="flex gap-4 mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/assets/resume.pdf" download>My Resume</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Education section */}
            <section className="py-12" id="education">
              <div className="container">
                <h2 className="mb-8 border-b pb-2 text-2xl font-bold">Education</h2>
                <div className="space-y-8">
                  {education.map((edu) => (
                      <div key={edu.id} className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className={"flex items-center justify-between"}>
                          <h3 className="text-xl font-semibold">{edu.degree}</h3>
                          <p className={"font-bold"}>{edu.period}</p>
                        </div>

                        <div className="mt-1 flex items-center">
                          <p className="font-medium">{edu.institution}</p>
                          <span className="mx-2">•</span>
                          <p className="text-sm">{edu.location}</p>
                        </div>

                        <p className="mt-4">{edu.description}</p>

                        {/* Coursework Section */}
                        <div className="mt-4">
                          <h4 className="mb-2 font-medium">Coursework:</h4>
                          <div className="flex flex-wrap gap-3">
                            {edu.coursework.map((course, idx) => (
                                <Badge key={idx} variant="outline">{course}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects section */}
            <section className="py-12" id="projects">
              <div className="container">
                <div className={"mb-8 pb-2 border-b flex items-center justify-between"}>
                  <h2 className="text-2xl font-bold">My Projects</h2>
                  {projects.length > 2 && (
                      <a className={"flex items-center hover:underline cursor-pointer"}>
                        See all
                        <MoveRight size={15} className={"ms-2"}/>
                      </a>
                  )}
                </div>
                <div className="grid gap-10 md:grid-cols-2">
                  {projects.map((project) => (
                      <div key={project.id} className="rounded-lg border bg-card p-6 shadow-sm">
                        {/* Image Carousel */}
                        <ImageCarousel
                            images={project.images}
                            alt={project.title}
                        />

                        <h3 className="mb-2 mt-4 text-xl font-semibold">{project.title}</h3>
                        <p className="mb-4 text-muted-foreground">{project.description}</p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={project.githubUrl}>
                              <FaGithub className="mr-2" /> Code
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={project.liveUrl}>
                              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                            </Link>
                          </Button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Technologies section */}
            <section className="py-12" id="technologies">
              <div className="container">
                <h2 className="mb-8 text-2xl font-bold border-b pb-2">Technologies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                  {technologies.map((tech, index) => {
                      // @ts-ignore
                    const IconComponent = iconComponents[tech.icon];
                      return (
                          <div key={index} className="flex flex-col items-center px-4 py-6 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center justify-center mb-3">
                              <div className="bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                {IconComponent ? <IconComponent size={40}/> : null}
                              </div>
                            </div>
                            <h3 className="text-lg font-medium">{tech.name}</h3>
                          </div>
                      );
                  })}
                </div>
              </div>
            </section>

            {/* Contact form section */}
            <section className="py-12" id="contact">
              <div className="container">
                <h2 className="mb-8 text-2xl font-bold border-b pb-2">Contact Me</h2>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-medium">
                          Name
                        </label>
                        <input
                            id="name"
                            placeholder="Your name"
                            className="w-full rounded-md border border-input px-3 py-2 text-sm mt-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-medium">
                          Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            className="w-full rounded-md border border-input mt-2 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-medium">
                        Subject
                      </label>
                      <input
                          id="subject"
                          placeholder="Message subject"
                          className="w-full rounded-md border border-input mt-2 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-medium">
                        Message
                      </label>
                      <textarea
                          id="message"
                          placeholder="Your message"
                          rows={5}
                          className="w-full rounded-md border border-input mt-2 px-3 py-2 text-sm"
                      />
                    </div>
                    <Button type="submit" className="w-full md:w-auto border flex items-center justify-center">
                      <span className={"ms-2"}>Send Message</span>
                      <Send className={"mx-1"}/>
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="border-t py-6 mt-10 w-full">
          <div className="container max-w-screen flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-30">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 Tran Thao Ngan. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/Nagnie" target={"_blank"} className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link href="https://www.linkedin.com/in/trthngan101" target={"_blank"} className="text-sm text-muted-foreground hover:text-foreground">
                LinkedIn
              </Link>
            </div>
          </div>
        </footer>
      </div>
  )
}