'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';
import Marquee from './Marquee';

gsap.registerPlugin(ScrollTrigger);

const protocolItems = [
    {
      title: 'Improve Immunity',
      imgSrc: '/images/protocols/improve-immunity.webp',
      iconSrc: '/images/protocols/disease-risk.svg',
      detailsLeft: ['Inflammation', 'Micronutrients'],
      detailsRight: ['Faster Recovery'],
    },
    {
      title: 'Body Composition',
      imgSrc: '/images/protocols/body-composition.webp',
      iconSrc: '/images/protocols/body-composition.svg',
      detailsLeft: ['Lose Weight', 'Gain Muscle'],
      detailsRight: ['Look Younger'],
    },
    {
      title: 'Prevent Cancer',
      imgSrc: '/images/protocols/prevent-cancer.webp',
      iconSrc: '/images/protocols/prevent-cancer.svg',
      detailsLeft: ['Screen Cancer', 'Monitor Risk'],
      detailsRight: ['Cellular Health'],
    },
    {
      title: 'Improve Gut Health',
      imgSrc: '/images/protocols/gut-health.webp',
      iconSrc: '/images/protocols/gut-health.svg',
      detailsLeft: ['Microbiome Diversity', 'Digestion'],
      detailsRight: ['Food Insensitivities'],
    },
    {
      title: 'Enhanced Cognition',
      imgSrc: '/images/protocols/cognitive-health.webp',
      iconSrc: '/images/protocols/cognitive-health.svg',
      detailsLeft: ['Focus', 'Memory'],
      detailsRight: ['Lower Stress & Cortisol'],
    },
    {
      title: 'Prevent Heart Disease',
      imgSrc: '/images/protocols/prevent-heart-disease.webp',
      iconSrc: '/images/protocols/prevent-heart-disease.svg',
      detailsLeft: ['Blood Sugar', 'ApoB'],
      detailsRight: ['Lower Cholesterol'],
    },
    {
      title: 'Male Hormones',
      imgSrc: '/images/protocols/male-hormones.webp',
      iconSrc: '/images/protocols/male-hormones.svg',
      detailsLeft: ['Muscle Growth', 'Confidence'],
      detailsRight: ['Boost Testosterone'],
    },
    {
      title: 'Female Hormones',
      imgSrc: '/images/protocols/female-hormones.webp',
      iconSrc: '/images/protocols/female-hormones.svg',
      detailsLeft: ['Cycle Health', 'Menopause'],
      detailsRight: ['Estrogen & Progesterone'],
    },
    {
      title: 'Aging & Longevity',
      imgSrc: '/images/protocols/ageing.webp',
      iconSrc: '/images/protocols/ageing.svg',
      detailsLeft: ['Epigenetics', 'Senescence'],
      detailsRight: ['Healthspan'],
    },
    {
      title: 'Toxins Testing',
      imgSrc: '/images/protocols/toxins.webp',
      iconSrc: '/images/protocols/toxins.svg',
      detailsLeft: ['Plastics', 'Heavy Metals'],
      detailsRight: ['Mold'],
    },
];


const ProtocolCard = ({ item, onHover, isHovered }: { item: typeof protocolItems[0], onHover: () => void, isHovered: boolean }) => {
    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const leftPanel = el.querySelector('.left-panel') as HTMLElement;
        const rightPanel = el.querySelector('.right-panel') as HTMLElement;
        const imageContainer = el.querySelector('.image-container') as HTMLElement;

        // Let's use a dynamic width based on flex-grow for smoother animation
        gsap.to(el, { 
            flexGrow: isHovered ? 2.5 : 1, 
            duration: 0.4, 
            ease: 'power2.inOut' 
        });
        gsap.to(imageContainer, { 
            filter: `grayscale(${isHovered ? 0 : 1})`, 
            duration: 0.4 
        });
        gsap.to([leftPanel, rightPanel], { 
            opacity: isHovered ? 1 : 0, 
            duration: 0.4,
            ease: 'power1.inOut'
        });

    }, [isHovered]);

    return (
        <button
            ref={cardRef}
            onMouseEnter={onHover}
            className="relative flex h-full grow items-center justify-center overflow-hidden outline-none"
        >
            <div className="left-panel pointer-events-none absolute left-0 flex h-full w-[168px] flex-row items-center border-l border-l-zinc-300 text-sm opacity-0">
                <div className="flex w-full flex-col items-center justify-center">
                    {item.detailsLeft.map((text) => (
                        <div key={text} className="flex h-full w-full items-center justify-center border-b border-b-zinc-300 px-2 text-center leading-tight last:border-b-transparent">{text}</div>
                    ))}
                </div>
            </div>
            <div className="image-container relative z-10 h-full w-full overflow-hidden rounded-2xl">
                 <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                 <Image alt={item.title} fill src={item.imgSrc} className="h-full w-full object-cover" />
            </div>
            <div className="right-panel pointer-events-none absolute right-0 flex h-full w-[168px] flex-row items-center border-r border-r-zinc-300 text-sm opacity-0">
                 <div className="flex w-full flex-col items-center justify-center">
                    {item.detailsRight.map((text) => (
                        <div key={text} className="flex h-full w-full items-center justify-center">
                             <div className="flex w-full items-center justify-center gap-2 px-2">
                                <div className="h-px w-full bg-zinc-300" />
                                <span className="whitespace-nowrap text-center leading-tight">{text}</span>
                                <div className="h-px w-full bg-zinc-300" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between p-3 text-white">
                <Image alt="" width="20" height="20" src={item.iconSrc} />
                <div className="flex flex-wrap justify-center gap-x-1 text-base font-medium leading-tight">
                    {item.title.split(' ').map(t => <span key={t}>{t}</span>)}
                </div>
            </div>
        </button>
    );
}

const MobileProtocolList = () => {
     return (
         <div className="flex flex-col items-center gap-4 px-4">
             {protocolItems.map((item, index) => (
                <div key={index} className="relative w-full overflow-hidden rounded-xl">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                    <Image alt={item.title} src={item.imgSrc} width={400} height={250} className="w-full object-cover" />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-4 text-white">
                        <Image alt="" width="24" height="24" src={item.iconSrc} />
                        <div className="text-lg font-bold">{item.title}</div>
                    </div>
                 </div>
            ))}
         </div>
     )
}


const DesktopProtocolGrid = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const rows = [protocolItems.slice(0, 5), protocolItems.slice(5, 10)];

    return (
        <div className="mx-auto my-8 hidden w-full max-w-[1550px] flex-col gap-[14px] px-8 lg:flex" onMouseLeave={() => setHoveredIndex(null)}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex h-[220px] flex-grow flex-row gap-[14px]">
                    {row.map((item, itemIndex) => {
                         const overallIndex = rowIndex * 5 + itemIndex;
                         return (
                            <ProtocolCard 
                                key={overallIndex} 
                                item={item} 
                                onHover={() => setHoveredIndex(overallIndex)} 
                                isHovered={hoveredIndex === overallIndex}
                            />
                         )
                    })}
                </div>
            ))}
        </div>
    );
}

const ProtocolsSection = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && isDesktop) {
            // ... (existing desktop grid animation)
        }
    }, [isMounted, isDesktop]);

    return (
        <section className="bg-[#F3F3F3] py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-sans-xl text-3xl font-semibold tracking-tight text-black sm:text-5xl">
                        One size fits none. Get a plan that&apos;s 100% for you.
                    </h2>
                </div>

                <div className="mt-16">
                    {isMounted && (isDesktop ? <DesktopProtocolGrid /> : <MobileProtocolList />)}
                </div>
            </div>
            <div className="w-full space-y-4 py-16">
                <Marquee direction="left" speed={40}>
                    <div className="font-mono text-3xl font-light text-[#F7861E]">LipoProtein (A)</div>
                    <div className="font-mono text-3xl font-light text-black">HDL Cholesterol</div>
                    <div className="font-mono text-3xl font-light text-[#F7861E]">Cortisol</div>
                    <div className="font-mono text-3xl font-light text-black">Mercury</div>
                    <div className="font-mono text-3xl font-light text-[#F7861E]">Vitamin D</div>
                </Marquee>
                <Marquee direction="right" speed={40}>
                    <div className="font-mono text-3xl font-light text-black">Testosterone</div>
                    <div className="font-mono text-3xl font-light text-[#F7861E]">Estrogen</div>
                    <div className="font-mono text-3xl font-light text-black">C-reactive protein (CRP)</div>
                    <div className="font-mono text-3xl font-light text-[#F7861E]">TSH</div>
                </Marquee>
            </div>
        </section>
    );
};

export default ProtocolsSection;