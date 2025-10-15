import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Link2, BarChart3, Shield, Zap, QrCode, Users, Globe, Lock, TrendingUp, Smartphone, Code, Headphones, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LinkShortenerDemo } from '../components/LinkShortenerDemo';
import { QRCodeDemo } from '../components/QRCodeDemo';
import { Button } from '../components/ui/button';

const allFeatures = [
  {
    icon: Link2,
    title: 'Smart URL Shortening',
    description: 'Create branded short links that are memorable and professional. Customize every link to match your brand identity and boost recognition.',
    details: 'Advanced link customization with custom slugs, branded domains, and bulk URL shortening capabilities.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track clicks, locations, devices, and referrers in real-time. Make data-driven decisions with comprehensive dashboards.',
    details: 'Detailed insights including geographic data, device types, browser information, and referral sources.',
  },
  {
    icon: QrCode,
    title: 'Dynamic QR Codes',
    description: 'Generate scannable QR codes for your links. Perfect for print materials, packaging, and offline campaigns.',
    details: 'Customizable QR codes with logo embedding, color schemes, and high-resolution exports.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and spam protection. Your links and data are always safe and secure.',
    details: 'SSL certificates, malware scanning, password protection, and link expiration settings.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Global CDN ensures instant redirects anywhere in the world. Your audience never waits.',
    details: '99.99% uptime SLA with servers in 20+ locations worldwide for optimal performance.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, set permissions, and work together seamlessly on link campaigns.',
    details: 'Role-based access control, team workspaces, and collaborative link management.',
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description: 'Use your own branded domain for all short links to build trust and reinforce brand recognition.',
    details: 'Connect unlimited custom domains with automatic SSL certificate provisioning.',
  },
  {
    icon: Lock,
    title: 'Link Privacy',
    description: 'Control who can access your links with password protection and private link sharing.',
    details: 'Set passwords, expiration dates, and access limits for sensitive content.',
  },
  {
    icon: TrendingUp,
    title: 'A/B Testing',
    description: 'Test multiple destinations and automatically route traffic to the best-performing URLs.',
    details: 'Split testing with automatic winner selection and conversion tracking.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Deep Links',
    description: 'Direct users to specific app screens based on their device platform.',
    details: 'iOS and Android deep linking with fallback URLs for desktop users.',
  },
  {
    icon: Code,
    title: 'Developer API',
    description: 'Comprehensive REST API with detailed documentation for seamless integration.',
    details: 'Full API access with webhooks, batch operations, and SDK support.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help anytime with our dedicated support team via chat, email, or phone.',
    details: 'Priority support for enterprise customers with dedicated account managers.',
  },
];

export function FeaturesPage() {
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
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 mb-8"
              >
                <span className="text-sm text-neutral-700">All Features</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-8 leading-tight">
                Everything you need to<br />manage your links
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                Powerful features designed for modern teams. From basic link shortening 
                to advanced analytics and team collaboration—we've got you covered.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.05}>
                <motion.div
                  className="bg-white rounded-2xl p-8 border border-neutral-200 h-full"
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>

                  <h3 className="text-xl text-neutral-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    {feature.details}
                  </p>

                  <motion.div whileHover={{ x: 5 }} className="mt-auto">
                    <Button 
                      variant="ghost" 
                      className="text-neutral-900 hover:text-black p-0 h-auto group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Link Shortener */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
                Try it yourself
              </h2>
              <p className="text-xl text-neutral-600">
                Experience our link shortener in action. No signup required.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <LinkShortenerDemo />
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Demo Section - QR Code Generator */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
                Generate QR Codes
              </h2>
              <p className="text-xl text-neutral-600">
                Create custom QR codes for your links in seconds.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <QRCodeDemo />
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <ScrollReveal>
              <div>
                <h2 className="text-4xl md:text-5xl text-neutral-900 mb-6">
                  Real-time analytics that matter
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Get instant insights into every click. Track geographic data, device types, 
                  referral sources, and user behavior with our comprehensive analytics dashboard.
                </p>
                <ul className="space-y-3">
                  {['Click tracking', 'Geographic insights', 'Device analytics', 'Referral sources'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-neutral-700">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBzY3JlZW58ZW58MXx8fHwxNzYwMDc4MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Analytics Dashboard"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal className="lg:order-2">
              <div>
                <h2 className="text-4xl md:text-5xl text-neutral-900 mb-6">
                  Collaborate with your team
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Invite team members, assign roles, and manage permissions. Work together 
                  on campaigns with shared workspaces and collaborative tools.
                </p>
                <ul className="space-y-3">
                  {['Team workspaces', 'Role-based access', 'Activity logs', 'Shared campaigns'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-neutral-700">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjAxMTAxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Team Collaboration"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
