"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

import educationEn from "@/app/data/education_en.json";
import { Badge } from "@/components/ui/badge";

export default function EducationSection() {
  const educationData = educationEn;

  return (
    <div className='space-y-8 text-custom'>
      {educationData.map((edu: any) => (
        <div
          key={edu.id}
          className='rounded-lg bg-card p-6 shadow-sm'
          style={{
            outline: "1px solid #D35270",
            boxShadow: "0 0 40px rgba(239, 106, 133, 0.40)",
          }}
        >
          <div className={"flex items-center justify-between"}>
            <h3 className='text-xl font-semibold'>{edu.degree}</h3>
            <p className={"font-bold"}>{edu.period}</p>
          </div>

          <div className='mt-1 flex items-center'>
            <p className='font-medium'>{edu.institution}</p>
            <span className='mx-2'>•</span>
            <p className='text-sm'>{edu.location}</p>
          </div>

          <p className='mt-4'>{edu.description}</p>

          <div className='mt-4'>
            <h4 className='mb-2 font-medium'>Coursework:</h4>
            <div className='flex flex-wrap gap-3'>
              {edu.coursework.map(
                (
                  course:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined,
                  idx: Key | null | undefined,
                ) => (
                  <Badge key={idx} variant='outline'>
                    {course}
                  </Badge>
                ),
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
