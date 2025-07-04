'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tilt } from 'react-tilt';
import SuperpowerLogo from './SuperpowerLogo';
import CheckIcon from './CheckIcon';

const PricingSection = () => {
    const features = [
        {
            title: '100+ Lab Tests Yearly',
            description: 'Test 60 labs when you join and 60 at your 6-month re-test. More comprehensive than a typical annual physical',
        },
        {
            title: 'Medical Insights & Action Plan',
            description: 'Get insights from top doctors, a biological age and personalized action plan with lifestyle, diet, and supplement recommendations. We call you early if urgent results arise.',
        },
        {
            title: 'Track Results Over a Lifetime',
            description: 'Your medical records and health tracked over time all in-one-place. Share with doctors anytime.',
        },
    ];

    const tiltOptions = {
        reverse: true,
        max: 8,
        scale: 1,
        speed: 1000,
        perspective: 1000,
        glare: true,
        'max-glare': 0.15,
    };

    return (
        <section className="relative mb-36 px-6 md:mt-20">
            <div className="align-center mb-10 flex justify-center px-6 md:mb-20">
                <div className="flex w-full flex-col items-center justify-center pt-[100px] md:gap-5 md:pt-[300px]">
                    <h3 className="mx-4 text-center text-[14px] text-zinc-500 lg:font-sans-xl">What could cost you $15,000 is $499</h3>
                    <h2 className="font-sans-3xl mx-4 mb-6 text-center text-[32px] lg:font-sans-2xl">Become the best version of yourself</h2>
                </div>
            </div>
            <div className="mx-auto grid h-full w-full max-w-6xl gap-24 md:grid-cols-2 md:gap-8">
                <div className="flex h-full flex-col gap-12">
                    <Tilt options={tiltOptions} className="group relative aspect-[400/250] w-full overflow-hidden rounded-xl shadow-2xl shadow-orange-500/75 transition-all duration-300 ease-out md:rounded-3xl">
                        <div className="absolute inset-0 z-20 flex flex-col justify-between rounded-xl p-6" style={{ transform: 'translateZ(20px)' }}>
                            <div className="max-w-64 md:max-w-96">
                                <SuperpowerLogo />
                            </div>
                            <div className="flex flex-col">
                                <p className="mb-0.5 text-3xl leading-none text-white md:text-[48px]">
                                    $42<span className="text-base"> / month</span>
                                </p>
                                <p className="text-sm text-white md:text-base">Charged annually at $499</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-b from-transparent via-red-800/20 via-70% to-red-800/80" style={{ transform: 'translateZ(10px)' }}></div>
                        <div className="duration-[1500ms] absolute inset-0 z-40 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform ease-in-out group-hover:translate-x-[100%]" style={{ transform: 'translateZ(40px)' }}></div>
                        <Image alt="Pricing Card Background" src="/images/card-background.webp" fill className="absolute inset-0 rounded-xl object-cover" sizes="100vw" />
                    </Tilt>
                    <Link href="https://app.superpower.com/register" className="w-full cursor-pointer rounded-full border-white/20 bg-black py-4 text-center text-lg text-white transition-all duration-300 hover:bg-zinc-800 focus-visible:outline-black">
                        Start Testing
                    </Link>
                </div>
                <div className="w-full">
                    <ul className="ml-auto max-w-md space-y-10 antialiased">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <CheckIcon className="mt-1 h-6 w-6 shrink-0 text-[#FC5F2B]" />
                                <div>
                                    <h3 className="font-sans-xl mb-2">{feature.title}</h3>
                                    <p className="font-sans-md leading-tight text-zinc-500">{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default PricingSection; 