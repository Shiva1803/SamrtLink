import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ParallaxSection } from './ParallaxSection';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOW_IT_WORKS } from '../data/marketing';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      HOW_IT_WORKS.forEach((_, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: `.step-${index}`,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // Animate number
        timeline.fromTo(
          `.step-${index} .step-number`,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );

        // Animate content
        timeline.fromTo(
          `.step-${index} .step-content`,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );

        // Animate image
        timeline.fromTo(
          `.step-${index} .step-image`,
          { opacity: 0, scale: 0.8, rotation: index % 2 === 0 ? 5 : -5 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          style={{ scale }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6"
          >
            How it works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-600"
          >
            Get started in three simple steps
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-32">
          {HOW_IT_WORKS.map((step, index) => (
            <div
              key={step.number}
              className={`step-${index} grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="step-number inline-block px-4 py-2 bg-black text-white rounded-full text-sm">
                  Step {step.number}
                </div>

                <div className="step-content">
                  <h3 className="text-3xl md:text-4xl text-neutral-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>

                  {index === HOW_IT_WORKS.length - 1 && (
                    <motion.button
                      className="inline-flex items-center gap-2 text-neutral-900 mt-6 group"
                      whileHover={{ x: 10 }}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>

              <ParallaxSection speed={index % 2 === 0 ? 0.3 : -0.3} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <motion.div
                  className="step-image relative rounded-2xl overflow-hidden shadow-2xl shadow-neutral-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageWithFallback
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </motion.div>
              </ParallaxSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
