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
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 top",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        }
      );
    });

    // Proper cleanup: kill gsap context which kills all ScrollTriggers inside it
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-orisun-deep">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
          {timelineEvents.map((event, idx) => (
            <div
              key={idx}
              className="h-screen w-screen flex flex-col items-center justify-center px-12 relative"
            >
              {/* Horizontal rule */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-orisun-gold/20 -z-10" />

              {/* Giant watermark year */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none opacity-[0.03]">
                <h2 className="text-[40vw] font-fraunces text-orisun-gold whitespace-nowrap leading-none transform translate-y-20">
                  {event.year}
                </h2>
              </div>

              <div className="max-w-xl text-center group z-10">
                <span className="inline-block px-6 py-2 bg-orisun-gold text-orisun-deep font-unbounded text-sm font-bold mb-8 transform transition-transform group-hover:scale-110">
                  {event.year}
                </span>
                <h3 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory mb-6 italic leading-tight">
                  {event.title}
                </h3>
                <p className="text-xl font-dm-sans text-orisun-ivory/60 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="mt-12 w-4 h-4 rounded-full bg-orisun-gold animate-ping" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
