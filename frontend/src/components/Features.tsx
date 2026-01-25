import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURES } from '../data/marketing';

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6">
              Everything you need to<br />manage your links
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-neutral-600">
              Powerful features designed for modern teams
            </p>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              className="feature-card group opacity-0"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full bg-white rounded-2xl p-8 border border-neutral-200 hover:border-neutral-300 hover:shadow-2xl transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl text-neutral-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>

                {feature.usp && (
                  <p className="text-sm text-neutral-500 mt-4">
                    {feature.usp}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
