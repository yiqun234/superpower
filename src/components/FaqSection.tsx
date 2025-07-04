'use client';

import React, { useState } from 'react';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqItemProps {
    item: FaqItem;
    isOpen: boolean;
    onClick: () => void;
    isFirst: boolean;
}

const faqData: FaqItem[] = [
    {
        question: 'What do I get in a membership?',
        answer: 'A membership covers two lab panels per year. The first establishes your baseline across 60 labs — each handpicked by our board of MDs. And the second, six months later, rechecks the same 60 to track progress. You can find the full list of tested biomarkers <a target="_blank" class="text-vermilion-900 underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none" href="https://superpower.com/biomarkers">here</a>. Our membership also includes a custom written action plan and access to a concierge medical team via text.',
    },
    {
        question: "Don't I already get a blood test in my general checkup?",
        answer: "Your general check up generally includes anywhere from 10 to 30 labs, which means you don't get a comprehensive view of your health. We take it a step further by testing more labs in 17 core areas of health (e.g. heart, liver, inflammation, hormones and more) to ensure we give you a precise and tailored action plan on how to take your health to the next level.",
    },
    {
        question: 'How many blood tests are included?',
        answer: "Your membership includes two blood tests. This means you'll be testing every 6 months which is the ideal timeframe to keep the most accurate and up-to-date understanding of your health.",
    },
    {
        question: 'Are there additional costs?',
        answer: 'Your baseline membership includes two blood tests but you can pay an additional $99 to have your blood drawn from home. We also sell additional advanced diagnostics and supplements from our marketplace for an additional fee such as toxins and Grail cancer tests. These are priced competitively for our members through exclusive partnerships.',
    },
    {
        question: 'Does Superpower accept health insurance?',
        answer: 'At this time, Superpower does not accept health insurance. You may be eligible to use your HSA/FSA funds for your superpower membership.',
    },
];

const FaqItemComponent = ({ item, isOpen, onClick, isFirst }: FaqItemProps) => {
    return (
        <div
            className={`border-b border-gray-200 mb-4 ${
                isFirst ? "border-t" : ""
            }`}
        >
            <button
                className="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 outline-none focus-visible:bg-zinc-100"
                onClick={onClick}
            >
                <h4 className="text-left text-lg transition-all group-hover:text-vermilion-900">
                    {item.question}
                </h4>
                <div className="relative h-4 w-4">
                    <div
                        className={`absolute top-1/2 z-10 h-0.5 w-full -translate-y-1/2 rounded-full bg-zinc-400 transition-all duration-300 ease-in-out group-hover:bg-vermilion-900 ${
                            isOpen ? 'bg-vermilion-900' : ''
                        }`}
                    ></div>
                    <div
                        className={`absolute top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-zinc-400 transition-all duration-300 ease-in-out group-hover:bg-vermilion-900 ${
                            isOpen ? 'rotate-0 bg-vermilion-900' : 'rotate-90'
                        }`}
                    ></div>
                </div>
            </button>
            <div
                className={`overflow-hidden text-zinc-500 transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className="py-2 transition-opacity duration-300 ease-in-out">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                </div>
            </div>
        </div>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative min-h-[600px] px-6 bg-white text-black">
            <div className="align-center mb-6 flex justify-center px-6 py-12 md:mb-20">
                <div className="flex w-full flex-col items-center justify-center md:gap-8">
                    <h3 className="mx-4 text-center text-[32px]">Frequently Asked Questions</h3>
                </div>
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
                {faqData.map((faq, index) => (
                    <FaqItemComponent
                        key={index}
                        isFirst={index === 0}
                        item={faq}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FaqSection; 