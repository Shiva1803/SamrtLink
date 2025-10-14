import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Analytics } from '../components/Analytics';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { LinkShortenerDemo } from '../components/LinkShortenerDemo';
import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'motion/react';

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* PLACEHOLDER: Live Demo Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
                Try it yourself
              </h2>
              <p className="text-xl text-neutral-600">
                Shorten a link in seconds. No signup required.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <LinkShortenerDemo />
          </ScrollReveal>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Analytics />
      <Testimonials />
      <CTA />
    </motion.div>
  );
}
