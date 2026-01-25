import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS, TESTIMONIAL_STATS } from '../data/marketing';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-card',
        {
          opacity: 0,
          y: 80,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.stat-number',
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6">
              Loved by thousands<br />of teams
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-neutral-600">
              See what our customers have to say
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              className="testimonial-card bg-neutral-50 rounded-2xl p-8 border border-neutral-200 opacity-0"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote */}
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-neutral-200"
                  whileHover={{ scale: 1.1 }}
                >
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <p className="text-neutral-900">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-neutral-200">
          {TESTIMONIAL_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-number text-center opacity-0"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-4xl text-neutral-900 mb-2">{stat.value}</p>
              <p className="text-neutral-600">{stat.label}</p>
              {stat.sublabel && (
                <p className="text-xs text-neutral-400 mt-2">{stat.sublabel}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
