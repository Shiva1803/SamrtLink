import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: 'lines,words',
      linesClass: 'line-wrapper',
    });

    gsap.set(textRef.current, { perspective: 400 });

    gsap.fromTo(
      split.words,
      {
        opacity: 0,
        y: 100,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        delay,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      split.revert();
    };
  }, [delay, children]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
