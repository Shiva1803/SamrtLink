import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Target, Users, Zap, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe in making link management simple and accessible for everyone.',
  },
  {
    icon: Users,
    title: 'Customer-First',
    description: 'Your success is our success. We listen, adapt, and continuously improve.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We push boundaries to deliver cutting-edge features and performance.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We build trust through transparency, security, and ethical practices.',
  },
];

const team = [
  {
    name: 'Alex Morrison',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYwMTEwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwMTEwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDExMDE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-8 leading-tight">
                We're on a mission to<br />simplify link management
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl text-neutral-600 leading-relaxed">
                SmartLink was born from a simple idea: link management shouldn't be complicated. 
                We're building tools that help businesses connect with their audience more effectively.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-4xl md:text-5xl text-neutral-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                  <p>
                    Launched as part of our NoSQL Databases coursework, this project began as a simple academic exercise aimed at exploring modern database technologies.
                  </p>
                  <p>
                    What started in the classroom has grown into a vision for a full-fledged product designed to solve real-world problems.
                  </p>
                  <p>
                    Today, we're working to transform this idea into a powerful, scalable platform—built with the same passion and precision that inspired its beginning.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjAxMTAxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Team collaboration"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-16 text-center">
              Our Values
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-16 text-center">
              Meet Our Team
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden mb-6 shadow-xl">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-2">{member.name}</h3>
                  <p className="text-neutral-600">{member.role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1K+', label: 'Active users projected after launch' },
              { value: '10K+', label: 'Links projected in First Quarter' },
              { value: '99.9%', label: 'Uptime Goal' },
              { value: '50+', label: 'Integrations Planned' },
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl text-neutral-900 mb-2">{stat.value}</div>
                  <div className="text-neutral-600">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
