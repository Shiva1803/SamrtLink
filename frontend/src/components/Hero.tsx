import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline words
      gsap.fromTo(
        '.hero-word',
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // Animate stats with scale
      gsap.fromTo(
        '.stat-item',
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 1.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200"
            >
              <motion.span 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-neutral-700">Trusted by 50,000+ teams</span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-[1.1] tracking-tight perspective-1000">
                <div className="hero-word opacity-0">Simplify, Share,</div>
                <div className="hero-word opacity-0">and Track Your</div>
                <div className="hero-word opacity-0">Links Instantly</div>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl text-neutral-600 leading-relaxed max-w-xl"
            >
              Transform long URLs into powerful branded links. Track performance, 
              gain insights, and optimize your marketing with real-time analytics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-black hover:bg-neutral-800 text-white px-8 h-14 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="px-8 h-14 border-neutral-300 hover:bg-neutral-50 group"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap items-center gap-6 pt-4 text-sm text-neutral-500"
            >
              <span>No credit card required</span>
              <span>14-day free trial</span>
              <span>Cancel anytime</span>
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-neutral-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MDExMDE1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern workspace"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              
              {/* Floating Stats Card - PLACEHOLDER DATA */}
              {/* TODO: Fetch from /api/stats */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="stat-item opacity-0">
                    <motion.div 
                      className="text-2xl text-neutral-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      1.2M+
                    </motion.div>
                    <div className="text-sm text-neutral-500">Links Created</div>
                  </div>
                  <div className="stat-item opacity-0">
                    <motion.div 
                      className="text-2xl text-neutral-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      99.9%
                    </motion.div>
                    <div className="text-sm text-neutral-500">Uptime</div>
                  </div>
                  <div className="stat-item opacity-0">
                    <motion.div 
                      className="text-2xl text-neutral-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      142
                    </motion.div>
                    <div className="text-sm text-neutral-500">Countries</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
