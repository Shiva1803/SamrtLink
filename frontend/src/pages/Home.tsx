import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Analytics } from '../components/Analytics';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { LinkShortenerDemo } from '../components/LinkShortenerDemo';
import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'motion/react';
import { MARKET_INSIGHTS, MONETIZATION_TRACKS, USP_POINTS } from '../data/marketing';

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />

      {/* Live Demo Section */}
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

      {/* USP + Market Insights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl text-neutral-900 mb-6">
                  The SmartLink advantage
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg text-neutral-600 mb-8">
                  Purpose-built for growth teams that need speed, attribution, and brand control in one unified platform.
                </p>
              </ScrollReveal>
              <div className="grid gap-6">
                {USP_POINTS.map((point, index) => (
                  <ScrollReveal key={point.title} delay={0.2 + index * 0.1}>
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                        <point.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl text-neutral-900 mb-2">{point.title}</h3>
                        <p className="text-neutral-600">{point.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <ScrollReveal>
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
                  <h3 className="text-2xl text-neutral-900 mb-4">Market pulse</h3>
                  <div className="space-y-6">
                    {MARKET_INSIGHTS.map((insight, index) => (
                      <div key={insight.title} className="space-y-2">
                        <p className="text-lg text-neutral-900">{insight.title}</p>
                        <p className="text-neutral-600">{insight.summary}</p>
                        {insight.metric && (
                          <p className="text-sm text-neutral-500">{insight.metric}</p>
                        )}
                        {index < MARKET_INSIGHTS.length - 1 && (
                          <div className="h-px bg-neutral-200 mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-black text-white rounded-2xl p-8">
                  <h3 className="text-2xl mb-4">Monetization-ready</h3>
                  <div className="space-y-6">
                    {MONETIZATION_TRACKS.map((track) => (
                      <div key={track.title}>
                        <p className="text-lg font-medium">{track.title}</p>
                        <p className="text-sm text-neutral-300">{track.description}</p>
                        <p className="text-sm text-green-300 mt-2">{track.highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </motion.div>
  );
}
