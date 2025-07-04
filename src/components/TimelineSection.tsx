'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelinePoints = [
  {
    age: 'Born',
    title: 'C-Section',
    details: ['Microbiome optimization', 'Genetic test', 'Diet personalized to genome'],
    pathProgress: 0.0, // 在路径上的进度位置 (0-1)
    align: 'left',
  },
  {
    age: 'Age 26',
    title: 'Know your baseline with Superpower',
    details: ['100+ lab tests', 'Personalized supplement stack'],
    pathProgress: 0.15,
    align: 'left',
  },
  {
    age: 'Age 27',
    title: 'Take control of your health',
    details: ['Bi-annual blood test', 'Your health data in-one-place'],
    pathProgress: 0.25,
    align: 'right',
  },
  {
    age: 'Age 30',
    title: 'Gut protocol',
    details: ['Microbiome testing', 'Probiotics & diet stack'],
    pathProgress: 0.4,
    align: 'right',
  },
  {
    age: 'Age 35',
    title: 'Hormone optimization protocol',
    details: ['Enhance Testosterone', 'Manage Estrogen'],
    pathProgress: 0.55,
    align: 'right',
  },
  {
    age: 'Age 40',
    title: 'Prevent disease',
    details: ['Full body MRI', 'Grail Galleri cancer screening'],
    pathProgress: 0.7,
    align: 'left',
  },
  {
    age: 'Age 60',
    title: 'Longevity protocol',
    details: ["Prevent Alzheimer's, heart disease, cancer", 'Look and feel younger'],
    pathProgress: 0.85,
    align: 'left',
  },
  {
    age: 'Age 120',
    title: 'Aging goal',
    details: [],
    pathProgress: 1.0,
    align: 'right',
  },
];

// 完整的路径数据 - 将所有路径段连接成一个完整路径
const fullPath = "M1 2C299.481 2 593.937 49.2507 835.5 142.213C1143.67 260.81 1365.77 453.804 1400.3 718C1403.41 741.749 1405 766.074 1405 790.972C1405 1015.35 1206.5 1177.61 971 1343.12C752.77 1496.48 502.766 1652.64 349.5 1863.6C261.584 1984.61 205.499 2123.65 205.499 2290.54C205.499 2453.35 257.153 2581.89 336.864 2690.5C493.17 2903.47 757.359 3039.79 951.5 3207.49C1091.79 3328.68 1195.5 3466.25 1195.5 3660.98C1195.5 3836.03 1099.14 3925.77 980.477 4006.5C790.36 4135.85 542.999 4242.07 542.999 4639";

const TimelineSection = () => {
  const topTransitionRef = useRef<HTMLDivElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const mainTimelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [visibleNodeIndex, setVisibleNodeIndex] = useState(-1);
  const [nodePositions, setNodePositions] = useState<Array<{x: number, y: number}>>([]);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    let isInitialized = false;

    const setupAnimations = () => {
      if (isInitialized) return;
      
      // Kill all existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === topTransitionRef.current || trigger.trigger === mainTimelineRef.current) {
          trigger.kill();
        }
      });

      ctx = gsap.context(() => {
        // Reset all elements to initial state
        gsap.set([topImageRef.current, titleRef.current], { clearProps: 'all' });
        gsap.set(roadRef.current, { clearProps: 'all' });

        // Top Transition Animation
        gsap.set(topImageRef.current, { scaleY: 0 });
        gsap.to(topImageRef.current, {
          scaleY: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: topTransitionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            refreshPriority: -1,
          },
        });

        // Calculate node positions along the path
        const svg = roadRef.current?.querySelector('svg');
        const pathElement = svg?.querySelector('path') as SVGPathElement;
        if (pathElement) {
          const pathLength = pathElement.getTotalLength();
          const positions = timelinePoints.map(point => {
            const pointOnPath = pathElement.getPointAtLength(pathLength * point.pathProgress);
            return { x: pointOnPath.x, y: pointOnPath.y };
          });
          setNodePositions(positions);
        }

        // Main Timeline Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainTimelineRef.current,
            start: 'top top',
            end: '+=7000',
            scrub: 1,
            refreshPriority: -1,
            onUpdate: (self) => {
              // 更新进度条和可见节点
              const progress = self.progress;
              const currentNodeIndex = Math.floor(progress * timelinePoints.length);
              setVisibleNodeIndex(currentNodeIndex);
              
              // 更新黄色进度条
              if (progressPathRef.current) {
                const pathLength = progressPathRef.current.getTotalLength();
                const dashOffset = pathLength * (1 - progress);
                progressPathRef.current.style.strokeDashoffset = dashOffset.toString();
              }
            },
          },
        });

        // 3D road animation
        tl.to(roadRef.current, { y: -3800, scale: 0.45, rotationX: 70, ease: 'power1.inOut' }, 0);

        // Title animation
        if (titleRef.current) {
          tl.from(titleRef.current, { opacity: 0, duration: 0.5 }, 0);
        }

        isInitialized = true;
      });
    };

    // Initialize with multiple fallbacks
    const initWithDelay = (delay = 0) => {
      setTimeout(() => {
        if (!isInitialized && topTransitionRef.current && mainTimelineRef.current && roadRef.current) {
          setupAnimations();
          ScrollTrigger.refresh();
        }
      }, delay);
    };

    // Try immediate initialization
    initWithDelay(0);

    // Fallback: try after DOM updates
    setTimeout(() => initWithDelay(100), 0);

    // Fallback: try after images load
    const handleLoad = () => {
      initWithDelay(200);
    };

    // Fallback: try when everything is loaded
    if (document.readyState === 'complete') {
      initWithDelay(300);
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Handle resize
    const handleResize = () => {
      if (isInitialized) {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      isInitialized = false;
      ctx?.revert();
    };
  }, []);

  return (
    <>
      {/* Top Transition */}
      <section
        ref={topTransitionRef}
        className="pointer-events-none relative z-10 h-[75vh] bg-white"
      >
        <div className="flex h-full w-full" style={{ alignItems: 'flex-end' }}>
          <div className="relative h-[225vh] w-screen">
            <div className="sticky top-0 flex h-screen w-full" style={{ alignItems: 'flex-end' }}>
              <div className="absolute left-0 h-auto w-full" style={{ bottom: '-5px', top: 'auto' }}>
                <div ref={topImageRef} className="flex origin-bottom flex-row">
                  <Image
                    src="/images/transition.webp"
                    width={3840}
                    height={200}
                    alt="transition-bg"
                    className="pointer-events-none h-full grow origin-bottom-left"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Timeline */}
      <section ref={mainTimelineRef} className="w-full bg-black pt-24">
        <div className="transition-opacity duration-500" style={{ opacity: 1 }}>
          <div className="sticky top-0 z-20 h-fit w-full bg-[rgba(0,0,0,.8)] pt-12 text-center text-white">
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 ref={titleRef} className="text-6xl font-bold mx-auto mb-4 max-w-[18ch] lg:text-5xl">
                <div className="mt-20 h-fit">Unlock all the potential your life holds</div>
              </h3>
            </div>
          </div>
          <div style={{ opacity: 1 }}>
            <div className="mt-[800px] flex h-[7000px] w-full overflow-hidden bg-black">
              <div
                ref={roadRef}
                className="sticky top-[30vh] w-screen sm:top-[30vh]"
                style={{
                  minWidth: '720px',
                  transformOrigin: 'center top',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                  opacity: 1,
                }}
              >
                <svg viewBox="0 0 1405 4641" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute overflow-visible">
                  {/* 背景路径 (白色) */}
                  <path 
                    d={fullPath} 
                    stroke="#FFF" 
                    strokeWidth="6" 
                    fill="none"
                    opacity="0.3"
                  />
                  {/* 进度路径 (黄色) */}
                  <path
                    ref={progressPathRef}
                    d={fullPath}
                    stroke="#FE8000"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="100%"
                    strokeDashoffset="100%"
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                  />
                  
                  {/* 节点 - 直接在SVG内部 */}
                  {nodePositions.map((position, index) => {
                    const point = timelinePoints[index];
                    const isVisible = index <= visibleNodeIndex;
                    
                    return (
                      <g key={point.age} transform={`translate(${position.x}, ${position.y})`}>
                        {/* 节点圆圈 */}
                        <circle
                          cx="0"
                          cy="0"
                          r="8"
                          fill={isVisible ? "#FE8000" : "#666"}
                          stroke="#FFF"
                          strokeWidth="3"
                        />
                        
                        {/* 文字组 */}
                        <g transform={`rotateX(70deg)`}>
                          {/* 年龄 */}
                          <text
                            x={point.align === 'left' ? 20 : -20}
                            y="-15"
                            fill={isVisible ? "#FE8000" : "#FFF"}
                            fontSize="18"
                            fontWeight="bold"
                            textAnchor={point.align === 'left' ? 'start' : 'end'}
                          >
                            {point.age}
                          </text>
                          
                          {/* 标题 */}
                          <text
                            x={point.align === 'left' ? 20 : -20}
                            y="5"
                            fill="#FFF"
                            fontSize="24"
                            fontWeight="600"
                            textAnchor={point.align === 'left' ? 'start' : 'end'}
                          >
                            {point.title}
                          </text>
                          
                          {/* 详细信息 */}
                          {point.details.map((detail, detailIndex) => (
                            <text
                              key={detail}
                              x={point.align === 'left' ? 25 : -25}
                              y={30 + detailIndex * 20}
                              fill="#CCC"
                              fontSize="16"
                              textAnchor={point.align === 'left' ? 'start' : 'end'}
                            >
                              • {detail}
                            </text>
                          ))}
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimelineSection; 