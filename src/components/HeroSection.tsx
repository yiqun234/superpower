'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpinningCircle } from './SpinningCircle';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const svgSectionRef = useRef<HTMLDivElement>(null);
  const biomarkerSectionRef = useRef<HTMLDivElement>(null);
  const biomarkerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const textOverlay = textOverlayRef.current;
    const svgSection = svgSectionRef.current;
    const biomarkerSection = biomarkerSectionRef.current;
    const biomarkerContent = biomarkerContentRef.current;

    if (!video || !textOverlay || !svgSection || !biomarkerSection || !biomarkerContent) return;

    const initAnimation = () => {
      video.pause();
      video.currentTime = 0;
      
      gsap.set(biomarkerSection, { yPercent: 100 });
      gsap.set(biomarkerContent, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=6000',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const duration = video.duration || 10; // Fallback duration
            if(video) {
              video.currentTime = Math.min(duration, duration * progress * 2);
            }
          },
        },
      });

      // 1. Text fade out
      tl.to(textOverlay, { opacity: 0, duration: 2 }, 0);
      
      // 2. SVG appears and scales up
      tl.fromTo(svgSection, { scale: 0.5, opacity: 0 }, { scale: 1.47, opacity: 1, duration: 4 }, 4);

      // 3. Biomarker section slides in
      tl.to(biomarkerSection, { yPercent: 0, duration: 10 }, 4);
      
      // 4. Fade in biomarker content (background + text)
      tl.to(biomarkerContent, { opacity: 1, duration: 5 }, 5);
      
      // 5. Scale down SVG while biomarker section is sliding
      tl.to(svgSection, { scale: 0.8, duration: 10 }, 6);
    };

    if (video.readyState >= 2) {
      initAnimation();
    } else {
      video.addEventListener('loadeddata', initAnimation);
    }

    return () => {
      video.removeEventListener('loadeddata', initAnimation);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black">
      <section ref={containerRef} className="relative h-[100vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 h-full w-full object-cover"
            playsInline
            muted
            preload="auto"
            src="/videos/hero-scroll-video-1080p.mp4"
          />

          <div ref={textOverlayRef} className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="max-w-4xl text-center text-white">
              <h1 className="text-6xl font-bold">Peak health starts now</h1>
              <p className="mt-4 text-xl text-white/80">
                100+ lab tests, results tracked over your life time, and a private
                medical team. All for just $499.
              </p>
            </div>
          </div>

          <div ref={svgSectionRef} className="absolute inset-0 z-20 flex items-center justify-center opacity-0">
            <div className="h-1/2 w-1/2 animate-spin-slow">
              <SpinningCircle />
            </div>
          </div>

          <div ref={biomarkerSectionRef} className="absolute top-0 left-0 z-30 h-full w-full">
            <div className="relative h-full w-full">
              <div ref={biomarkerContentRef} className="absolute inset-0">
                <Image
                  src="/images/biomarker-background.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="Biomarker Background"
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                  <div className="max-w-3xl px-4">
                    <h2 className="text-5xl font-bold leading-tight md:text-6xl">
                      Your Superpower test,<br />
                      10x better than an annual physical
                    </h2>
                    <p className="mt-6 text-lg text-white/80 md:text-xl">
                      Test 100+ lab markers across heart, hormones, liver,
                      inflammation + more
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 h-[70%] w-full max-w-[1000px] -translate-x-1/2">
                <Image
                  alt="woman-dark"
                  layout="fill"
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                  src="https://superpower.com/landing/biomarker-section/nextImageExportOptimizer/woman-dark-opt-2048.WEBP"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;