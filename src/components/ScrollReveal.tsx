import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const directionMap = {
      up: { y: 100, x: 0 },
      down: { y: -100, x: 0 },
      left: { y: 0, x: 100 },
      right: { y: 0, x: -100 },
    };

    const { x, y } = directionMap[direction];

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
        x,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
