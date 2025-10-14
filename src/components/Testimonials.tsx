import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// PLACEHOLDER DATA - Replace with API calls
// TODO: Fetch from /api/testimonials
// ============================================
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechFlow Inc',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYwMTEwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'SmartLink has transformed how we track our marketing campaigns. The analytics are incredibly detailed and the interface is intuitive.',
  },
  {
    name: 'Michael Chen',
    role: 'Founder & CEO',
    company: 'Digital Ventures',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDExMDE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'The best link management tool we\'ve ever used. Custom domains, QR codes, and real-time tracking all in one place.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Social Media Manager',
    company: 'Creative Studio',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwMTEwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Managing links for multiple clients used to be chaos. SmartLink\'s team features have made everything so much easier.',
  },
];

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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="testimonial-card bg-neutral-50 rounded-2xl p-8 border border-neutral-200 opacity-0"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote */}
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                "{testimonial.quote}"
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
          {[
            { value: '50,000+', label: 'Active Users' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-number text-center opacity-0"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-4xl text-neutral-900 mb-2">{stat.value}</p>
              <p className="text-neutral-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
