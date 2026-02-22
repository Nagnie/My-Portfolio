"use client";

import workExperienceEn from "@/app/data/work_experience_en.json";

export default function WorkExperienceSection() {
  const workData = workExperienceEn;

  return (
    <div className='space-y-8'>
      {workData.map((work: any) => (
        <div key={work.id} className='rounded-lg border bg-card p-6 shadow-sm'>
          <div className={"flex items-center justify-between"}>
            <div className={"flex flex-col gap-2"}>
              <h3 className='text-xl font-semibold'>{work.company}</h3>
              <h4>{work.position}</h4>
            </div>
            <p className={"font-bold"}>{work.period}</p>
          </div>

          <div className='mt-4'>
            <ul className='list-disc space-y-2 pl-5'>
              {work.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className='text-muted-foreground'>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
