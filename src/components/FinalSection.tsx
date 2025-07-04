'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalSection = () => {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const video = videoRef.current as unknown as HTMLVideoElement;
    if (!video) return;

    let ctx: gsap.Context | undefined;
    const setupAnimations = () => {
      ctx = gsap.context(() => {
        // Set initial states - video at start, text and button hidden
        gsap.set(video, { currentTime: 0 });
        gsap.set([text1Ref.current, text2Ref.current, buttonRef.current], { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              console.log('ScrollTrigger progress:', self.progress);
            },
          },
        });

        // Animate from start to end as user scrolls
        tl.to(video, { currentTime: video.duration }, 0)
          .to([text1Ref.current, text2Ref.current, buttonRef.current], { opacity: 1 }, 0);
      }, sectionRef);
    };

    // Wait for video to be ready
    const handleVideoReady = () => {
      console.log('Video ready, duration:', video.duration);
      
      // Wait for all page resources to load, then setup animations
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setupAnimations();
          ScrollTrigger.refresh();
        }, 100);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            setupAnimations();
            ScrollTrigger.refresh();
          }, 100);
        });
      }
    };

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    if (video.readyState >= 2) {
      handleVideoReady();
    } else {
      video.addEventListener('loadedmetadata', handleVideoReady);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady);
      window.removeEventListener('resize', handleResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 py-24">
        {/* Text 1 - no mask for now */}
        <div ref={text1Ref}>
          <p className="mb-1 text-center text-base text-white/80 sm:text-xl">
            It&apos;s time to
          </p>
        </div>
        {/* Text 2 - no mask for now */}
        <div ref={text2Ref}>
          <h2 className="leading-tighter font-sans-2xl mb-8 text-center text-[32px] text-white sm:mb-14 sm:text-[48px]">
            Unlock your peak potential
          </h2>
        </div>
        {/* Button */}
        <div ref={buttonRef}>
          <a
            href="https://app.superpower.com/register"
            className="cursor-pointer"
          >
            <div className="relative inline-block">
              <div className="font-mono-sm relative z-10 inline-block bg-white px-8 py-4 text-zinc-900">
                <span>Join Today</span>
              </div>
              <div className="absolute inset-0 z-0 bg-white blur-2xl [@supports(-webkit-hyphens:none)]:hidden"></div>
            </div>
          </a>
        </div>
      </div>

      {/* Video background */}
      <div className="w-full bg-black">
        <div className="pointer-events-none relative mx-auto max-w-[1800px]">
          <div className="absolute bottom-0 right-0 top-0 h-full w-40 bg-gradient-to-r from-transparent to-black"></div>
          <div className="absolute bottom-0 left-0 top-0 h-full w-40 bg-gradient-to-l from-transparent to-black"></div>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ minHeight: '50svh', maxHeight: '750px' }}
            disablePictureInPicture
            preload="auto"
            muted
            playsInline
            src="/videos/zoom-in-footer.mp4"
            poster="/videos/zoom-in-footer-poster.jpg"
          ></video>
        </div>
      </div>
    </section>
  );
};

export default FinalSection; 