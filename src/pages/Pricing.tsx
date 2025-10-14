import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for individuals and small projects',
    features: [
      '1,000 links per month',
      'Basic analytics',
      'QR code generation',
      '24/7 email support',
      '1 custom domain',
      'Link expiration',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: { monthly: 29, yearly: 290 },
    description: 'For growing businesses and teams',
    features: [
      '10,000 links per month',
      'Advanced analytics',
      'Custom branded domains',
      'Priority support',
      'Team collaboration (5 members)',
      'A/B testing',
      'API access',
      'Password protection',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 99, yearly: 990 },
    description: 'For large teams and organizations',
    features: [
      'Unlimited links',
      'Advanced analytics & reporting',
      'Unlimited custom domains',
      'Dedicated account manager',
      'Unlimited team members',
      'Advanced security features',
      'Full API access',
      'Custom integrations',
      'SLA guarantee',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  // PLACEHOLDER FUNCTION - Connect to subscription API
  const handleSubscribe = (planName: string) => {
    // TODO: API call to /api/subscribe
    console.log('Subscribing to plan:', { plan: planName, billing: isYearly ? 'yearly' : 'monthly' });
    toast.success(`Starting ${planName} plan! (Placeholder)`);
  };

  // PLACEHOLDER FUNCTION - Connect to sales API
  const handleContactSales = () => {
    // TODO: API call to /api/contact-sales
    console.log('Contacting sales team');
    toast.success('Sales team will contact you soon! (Placeholder)');
  };

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
                Simple, transparent pricing
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl text-neutral-600 leading-relaxed mb-12">
                Choose the plan that fits your needs. All plans include a 14-day free trial.
              </p>
            </ScrollReveal>

            {/* Billing Toggle */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center justify-center gap-4 mb-16">
                <span className={`text-sm ${!isYearly ? 'text-neutral-900' : 'text-neutral-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-7 bg-neutral-200 rounded-full transition-colors hover:bg-neutral-300"
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-black rounded-full"
                    animate={{ x: isYearly ? 28 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
                <span className={`text-sm ${isYearly ? 'text-neutral-900' : 'text-neutral-500'}`}>
                  Yearly
                  <span className="ml-2 text-green-600 font-medium">Save 17%</span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <motion.div
                  className={`relative bg-white rounded-2xl p-8 border ${
                    plan.popular ? 'border-black shadow-2xl' : 'border-neutral-200'
                  }`}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-sm rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl text-neutral-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-neutral-600 mb-6">{plan.description}</p>
                    
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl text-neutral-900">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-neutral-600">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>

                    <Button
                      onClick={() => 
                        plan.name === 'Enterprise' 
                          ? handleContactSales() 
                          : handleSubscribe(plan.name)
                      }
                      className={`w-full h-12 ${
                        plan.popular
                          ? 'bg-black hover:bg-neutral-800 text-white'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-neutral-900" />
                        </div>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-12 text-center">
              Compare features
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 px-6 text-neutral-900">Feature</th>
                    <th className="text-center py-4 px-6 text-neutral-900">Starter</th>
                    <th className="text-center py-4 px-6 text-neutral-900">Professional</th>
                    <th className="text-center py-4 px-6 text-neutral-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Links per month', starter: '1,000', pro: '10,000', enterprise: 'Unlimited' },
                    { feature: 'Custom domains', starter: '1', pro: '5', enterprise: 'Unlimited' },
                    { feature: 'Team members', starter: '1', pro: '5', enterprise: 'Unlimited' },
                    { feature: 'Analytics retention', starter: '30 days', pro: '1 year', enterprise: 'Unlimited' },
                    { feature: 'API access', starter: false, pro: true, enterprise: true },
                    { feature: 'A/B testing', starter: false, pro: true, enterprise: true },
                    { feature: 'White-label', starter: false, pro: false, enterprise: true },
                    { feature: 'SLA guarantee', starter: false, pro: false, enterprise: true },
                  ].map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-neutral-100 hover:bg-neutral-50"
                    >
                      <td className="py-4 px-6 text-neutral-700">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-neutral-600">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-neutral-300">—</span>
                          )
                        ) : (
                          row.starter
                        )}
                      </td>
                      <td className="py-4 px-6 text-center text-neutral-600">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-neutral-300">—</span>
                          )
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="py-4 px-6 text-center text-neutral-600">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-neutral-300">—</span>
                          )
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-12 text-center">
              Frequently asked questions
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
              },
              {
                q: 'What happens when I hit my link limit?',
                a: "You'll receive a notification when you're approaching your limit. You can upgrade anytime to get more links.",
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-neutral-200">
                  <h3 className="text-lg text-neutral-900 mb-3">{faq.q}</h3>
                  <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
