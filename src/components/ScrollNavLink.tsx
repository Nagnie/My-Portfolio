"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect, useRef } from "react";

interface ScrollNavLinkProps {
  children: ReactNode;
}

export default function ScrollNavLink({ children }: ScrollNavLinkProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
      });
    }
  }, []);

  return <div ref={ref}>{children}</div>;
}
