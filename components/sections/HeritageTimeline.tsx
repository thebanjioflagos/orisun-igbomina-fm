"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "Ancient",
    title: "The Descent",
    description: "Oduduwa's descent from heaven, the beginning of the Yoruba race and the lineage of the Igbomina kings.",
  },
  {
    year: "12th Century",
    title: "Founding of Ila-Orangun",
    description: "Orangun Fagbamila Ajagun-nla establishes the capital of the Igbomina kingdom — a seat of culture, law, and power.",
  },
  {
    year: "19th Century",
    title: "The Golden Era",
    description: "Ila-Orangun emerges as a major centre of Yoruba culture and commerce, attracting scholars and traders from across the region.",
  },
  {
    year: "2024",
    title: "The New Source",
    description: "Orisun Igbomina FM 102.1 is founded to amplify the community's voice — carrying the ancestral flame into the digital age.",
  },
];

export default function HeritageTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !triggerRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: () => {
            if (!sectionRef.current) return 0;
            return -(sectionRef.current.scrollWidth - window.innerWidth);
          },
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${sectionRef.current ? sectionRef.current.scrollWidth * 0.8 : 1200}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-orisun-deep border-t border-orisun-gold/10">
      <div ref={triggerRef}>
        <div 
          ref={sectionRef} 
          className="h-screen flex flex-row items-center relative pl-[6vw] pr-[12vw] gap-8 md:gap-16"
          style={{ width: "fit-content" }}
        >
          {timelineEvents.map((event, idx) => (
            <div
              key={idx}
              className="h-[70vh] w-[90vw] md:w-[45vw] max-w-lg flex flex-col items-center justify-center px-4 relative flex-shrink-0"
            >
              {/* Horizontal line running behind cards */}
              <div className="absolute top-1/2 left-[-8vw] w-[116%] h-px bg-gradient-to-r from-orisun-gold/20 via-orisun-gold/45 to-orisun-gold/20 -z-10" />

              {/* Giant watermark year */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none opacity-[0.03]">
                <h2 className="text-[20vw] font-fraunces text-orisun-gold whitespace-nowrap leading-none transform translate-y-8">
                  {event.year}
                </h2>
              </div>

              <div className="w-full text-center group z-10 bg-orisun-deep/80 border border-orisun-gold/20 p-6 md:p-10 backdrop-blur-xl rounded-sm hover:border-orisun-gold/50 transition-all duration-500 shadow-2xl shadow-black/60">
                <span className="inline-block px-4 py-1.5 bg-orisun-gold text-orisun-deep font-unbounded text-xs font-bold mb-6 transform transition-transform group-hover:scale-105">
                  {event.year}
                </span>
                <h3 className="text-3xl md:text-4xl font-fraunces text-orisun-ivory mb-4 italic leading-tight">
                  {event.title}
                </h3>
                <p className="text-sm md:text-base font-dm-sans text-orisun-ivory/80 leading-relaxed text-justify sm:text-center max-w-md mx-auto">
                  {event.description}
                </p>
              </div>

              <div className="mt-8 w-2.5 h-2.5 rounded-full bg-orisun-gold animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
