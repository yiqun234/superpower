'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advisors = [
    {
      name: 'Dr Anant Vinjamoori, MD',
      title: 'Superpower Chief Longevity Officer, Harvard MD & MBA',
      imgSrc: '/images/advisors/dr-anant-vinjamoori-opt-128.WEBP',
    },
    {
      name: 'Dr Leigh Erin Connealy, MD',
      title: 'Clinician & Founder of The Centre for New Medicine',
      imgSrc: '/images/advisors/dr-leigh-connealy-opt-128.WEBP',
    },
    {
      name: 'Dr Robert Lufkin, MD',
      title: 'Physician & UCLA Medical School Professor, NYT bestselling author',
      imgSrc: '/images/advisors/dr-robert-lufkin-opt-128.WEBP',
    },
    {
      name: 'Giannis Antetokounmpo',
      title: 'Professional Basketball Player, Milwaukee Bucks of the NBA',
      imgSrc: '/images/advisors/giannis-antetokounmpo-opt-128.WEBP',
    },
    {
      name: 'Vanessa Hudgens',
      title: 'Actress & Singer, Co-founder of Caliwater',
      imgSrc: '/images/advisors/vanessa-hudgens-opt-128.WEBP',
    },
    {
      name: 'Steve Aoki',
      title: 'Grammy-Nominated Producer, Founder of Dim Mak Records',
      imgSrc: '/images/advisors/steve-aoki-opt-128.WEBP',
    },
    {
      name: 'Shaan Puri',
      title: '6x Founder, investor, co-host of My First Million podcast',
      imgSrc: '/images/advisors/shaan-puri-opt-128.WEBP',
    },
    {
      name: 'Arielle Zuckerberg',
      title: 'Partner at Long Journey Ventures, formerly Coatue',
      imgSrc: '/images/advisors/arielle-opt-128.WEBP',
    },
    {
      name: 'Kirsten Green',
      title: 'Founder & Managing Partner, Forerunner Ventures',
      imgSrc: '/images/advisors/kirsten-green-opt-128.WEBP',
    },
    {
      name: 'Masha Bucher',
      title: 'Founder & General Partner, Day One Ventures',
      imgSrc: '/images/advisors/masha-bucher-opt-128.WEBP',
    },
];

const institutions = [
    {
        name: 'Stanford',
        imgSrc: '/images/advisors/stanford-opt-256.WEBP',
    },
    {
        name: 'Harvard Medical School',
        imgSrc: '/images/advisors/harvard-ms-opt-256.WEBP',
    },
    {
        name: 'UCLA',
        imgSrc: '/images/advisors/ucla-opt-256.WEBP',
    }
];

const AdvisorItem = ({ advisor }: { advisor: typeof advisors[0] }) => {
    const el = useRef(null);
    useEffect(() => {
        gsap.from(el.current, {
            y: 20,
            scrollTrigger: {
                trigger: el.current,
                start: 'top bottom-=100',
                toggleActions: 'play none none none',
            },
        });
    }, []);
    return (
        <div ref={el} className="my-[-0.5px] flex flex-row items-center gap-6 border-y border-[#E4E4E7] py-4 md:border-y-0 md:py-2.5">
            <Image
                alt={`Photo of ${advisor.name}`}
                loading="lazy"
                width="64"
                height="64"
                src={advisor.imgSrc}
                className="aspect-square h-[64px] w-[64px] rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
                <div className="font-bold text-black">{advisor.name}</div>
                <div className="max-w-[260px] text-balance text-sm leading-normal text-gray-500">
                    {advisor.title}
                </div>
            </div>
        </div>
    );
};


const InstitutionLogo = ({ institution }: { institution: typeof institutions[0]}) => {
    const el = useRef(null);
    useEffect(() => {
        gsap.from(el.current, {
            y: 20,
            scrollTrigger: {
                trigger: el.current,
                start: 'top bottom-=100',
                toggleActions: 'play none none none',
            },
        });
    }, []);
    return (
        <div ref={el} className="my-[-0.5px] flex items-center gap-6 py-4">
            <Image
                alt={institution.name}
                loading="lazy"
                width="128"
                height="128"
                src={institution.imgSrc}
                className="h-12 w-48 object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
        </div>
    );
};


const AdvisorsSection = () => {
    return (
        <section className="relative mt-[min(10vw,8rem)] flex h-auto flex-col items-center bg-white px-4">
            <div className="flex max-w-[1132px] flex-col items-center gap-[72px] pb-7">
                <div className="flex w-full max-w-[585px] flex-col items-center gap-6 px-4">
                    <h1 className="text-center text-4xl font-bold text-black lg:text-5xl">Backed by the best</h1>
                    <p className="w-full max-w-[533px] text-center text-lg text-black/50">
                        Trusted by the world&apos;s top medical professionals, technologists, and athletes.
                    </p>
                </div>

                <div className="relative grid gap-x-24 md:grid-cols-2">
                    <div className="absolute left-[50%] top-[50%] hidden h-[115%] translate-x-[-50%] translate-y-[-50%] md:block">
                        <div className="flex h-full flex-col items-center justify-center gap-0">
                            <div className="h-px w-16 bg-[#E4E4E7]" />
                            <div className="h-full w-px bg-[#E4E4E7]" />
                            <div className="h-px w-[544px] bg-[#E4E4E7]" />
                        </div>
                    </div>
                    {advisors.map((advisor) => (
                        <AdvisorItem key={advisor.name} advisor={advisor} />
                    ))}
                </div>
            </div>

            <div>
                <div className="flex w-full flex-col justify-center gap-4 pt-8 md:flex-row md:pb-8">
                    {institutions.map((institution) => (
                        <InstitutionLogo key={institution.name} institution={institution} />
                    ))}
                </div>
                <div className="hidden h-32 md:block">
                    <div className="flex h-full flex-col items-center justify-center gap-0">
                        <div className="h-px w-[544px] bg-[#E4E4E7]" />
                        <div className="h-full w-px bg-[#E4E4E7]" />
                        <div className="h-px w-16 bg-[#E4E4E7]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvisorsSection; 