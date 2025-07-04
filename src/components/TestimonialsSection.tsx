'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "“My Superpower test helped me find out I was pre-diabetic. Without Superpower, it would have totally flown under the radar”",
        author: "Alice Coleman",
        location: "36, Palo Alto",
        imgSrc: "/images/testimonials/alice-coleman.png"
    },
    {
        quote: "“I've never felt this in control. Superpower told me exactly what to do.”",
        author: "Wesley Tian",
        location: "28, San Francisco",
        imgSrc: "/images/testimonials/wesley-tian.png"
    },
    {
        quote: "“Superpower caught what others missed for years. My action plan is more thorough than anything I've ever gotten at a checkup”",
        author: "Linda Salito",
        location: "32, Dallas",
        imgSrc: "/images/testimonials/linda-salito.png"
    },
    {
        quote: "“Superpower put me on the road to feeling great.”",
        author: "Vinay Hiremath",
        location: "33, New York City",
        imgSrc: "/images/testimonials/vinay-hiremath.png"
    }
];

const TestimonialsSection = () => {
    const containerRef = useRef(null);
    const boxRef = useRef(null);
    const contentRef = useRef(null);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const goToSlide = useCallback((index: number) => {
        if (!swiper || swiper.destroyed || gsap.isTweening(boxRef.current)) return;

        const tl = gsap.timeline();

        tl.to(boxRef.current, {
            width: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                swiper.slideToLoop(index);
            }
        })
        .to(boxRef.current, {
            width: '750px',
            duration: 0.2,
            ease: 'power2.out'
        }, '+=0.1');

    }, [swiper]);

    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    
    const startAutoplay = useCallback(() => {
        stopAutoplay();
        intervalRef.current = setInterval(() => {
            if (swiper && !swiper.destroyed) {
                const nextIndex = (swiper.realIndex + 1) % testimonials.length;
                goToSlide(nextIndex);
            }
        }, 3000);
    }, [swiper, goToSlide]);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        tl.to(boxRef.current, {
            width: '750px',
            duration: 1,
            ease: 'power2.inOut',
        }).from(contentRef.current, {
            duration: 0.5,
        }, '-=0.5');

    }, []);
    
    useEffect(() => {
        if (swiper) {
            startAutoplay();
        }
        return () => stopAutoplay();
    }, [swiper, startAutoplay]);

    const handleBulletClick = (index: number) => {
        stopAutoplay();
        goToSlide(index);
        setTimeout(startAutoplay, 5000); 
    };

    return (
        <>
            <style jsx global>{`
                .custom-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background-color: #bbb;
                    border-radius: 50%;
                    opacity: 1;
                    transition: background-color 0.3s;
                }
                .custom-pagination .swiper-pagination-bullet-active {
                    background-color: #FC5F2B !important;
                }
            `}</style>
            <section ref={containerRef} className="relative z-10 flex min-h-[600px] items-center justify-center bg-white py-24 sm:py-32">
                <div className="absolute flex h-full w-full flex-col items-center justify-center gap-6">
                    <p className="font-sans-lg mb-4 text-[14px] text-zinc-500 md:mb-10 md:text-[24px]">
                        Join 150,000+ people taking control of their health
                    </p>
                    <div className="flex w-full flex-row items-center justify-center gap-12 px-4">
                        <div className="hidden flex-1 border-t border-zinc-300 md:block" />
                        
                        <div ref={boxRef} className="relative flex items-center justify-center overflow-hidden" style={{ width: '0px' }}>
                            {/* Borders */}
                            <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
                                <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-black" />
                                <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-black" />
                                <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-black" />
                                <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-black" />
                            </div>

                            {/* Content */}
                            <div ref={contentRef} className="flex min-h-[500px] w-full min-w-[300px] flex-col flex-wrap items-center justify-start p-4 pt-12 text-center md:min-w-[750px] md:pt-24">
                                <Swiper
                                    onSwiper={setSwiper}
                                    speed={0}
                                    allowTouchMove={false}
                                    loop={true}
                                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                                    className="w-full"
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex w-full flex-col items-center px-4">
                                                <p className="font-sans-xl mx-auto mb-10 w-full max-w-xl flex-1 text-center text-xl leading-tight md:text-[32px]">
                                                    {testimonial.quote}
                                                </p>
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                                        <Image
                                                            alt={testimonial.author}
                                                            fill
                                                            src={testimonial.imgSrc}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col items-start gap-1">
                                                        <p className="font-sans-sm">{testimonial.author}</p>
                                                        <p className="font-sans-sm text-zinc-500">{testimonial.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="custom-pagination mt-8 flex cursor-pointer gap-3">
                                    {testimonials.map((_, i) => (
                                        <div key={i} onClick={() => handleBulletClick(i)} className={`h-2 w-2 rounded-full ${activeIndex === i ? 'bg-[#FC5F2B]' : 'border border-solid border-[#bbb]'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden flex-1 border-t border-zinc-300 md:block" />
                    </div>
                    <div className="flex-grow"></div>
                </div>
            </section>
        </>
    );
};

export default TestimonialsSection;
