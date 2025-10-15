import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      timeline.fromTo(
        '.cta-content',
        {
          opacity: 0,
          x: -100,
          rotationY: -30,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      timeline.fromTo(
        '.cta-image',
        {
          opacity: 0,
          scale: 0.8,
          x: 100,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="relative bg-black rounded-3xl overflow-hidden perspective-1000"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="cta-content p-12 lg:p-16 space-y-8 opacity-0">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to transform your link management?
              </motion.h2>

              <motion.p
                className="text-xl text-neutral-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join thousands of teams using SmartLink to streamline their workflows and boost performance.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg"
                    className="bg-white hover:bg-neutral-100 text-black px-8 h-14 group"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-neutral-700 hover:border-neutral-600 text-white hover:bg-neutral-900 px-8 h-14"
                  >
                    Contact Sales
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6 text-neutral-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span>✓ No credit card required</span>
                <span>✓ 14-day free trial</span>
                <span>✓ Cancel anytime</span>
              </motion.div>
            </div>

            {/* Right Image */}
            <div className="cta-image hidden lg:block relative h-full min-h-[500px] opacity-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjAxMTAxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Team collaboration"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
