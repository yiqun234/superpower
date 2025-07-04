'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

const Marquee = ({ children, direction = 'left', speed = 40 }: MarqueeProps) => {
    const marqueeContent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!marqueeContent.current) return;

        const content = marqueeContent.current;
        const contentWidth = content.offsetWidth / 2;

        const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'linear' }});

        if (direction === 'left') {
            tl.fromTo(content, { x: 0 }, { x: -contentWidth, duration: speed });
        } else {
            tl.fromTo(content, { x: -contentWidth }, { x: 0, duration: speed });
        }
        
        return () => {
            tl.kill();
        }

    }, [direction, speed, children]);

    return (
        <div className="w-full overflow-hidden whitespace-nowrap">
            <div ref={marqueeContent} className="flex">
                <div className="flex-shrink-0 flex items-center justify-around space-x-8 pr-8">
                    {children}
                </div>
                <div className="flex-shrink-0 flex items-center justify-around space-x-8 pr-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Marquee; 