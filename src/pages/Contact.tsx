import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  // PLACEHOLDER FUNCTION - Connect to contact form API
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: API call to /api/contact
    console.log('Submitting contact form:', formData);
    
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                Get in touch
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Have questions? We'd love to hear from you. Send us a message and 
                we'll respond as soon as possible.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="bg-neutral-50 rounded-2xl p-8 md:p-12 border border-neutral-200">
                <h2 className="text-3xl text-neutral-900 mb-8">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-white border-neutral-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-white border-neutral-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-2 bg-white border-neutral-200"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-white border-neutral-200 min-h-[150px]"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white h-12"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl text-neutral-900 mb-6">Contact Information</h2>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                    Prefer to reach out directly? Here are other ways to get in touch with us.
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-6 bg-neutral-50 rounded-xl border border-neutral-200"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-neutral-900 mb-1">Email</h3>
                      <a href="mailto:hello@smartlink.com" className="text-neutral-600 hover:text-neutral-900">
                        hello@smartlink.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-6 bg-neutral-50 rounded-xl border border-neutral-200"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-neutral-900 mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-neutral-600 hover:text-neutral-900">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-6 bg-neutral-50 rounded-xl border border-neutral-200"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-neutral-900 mb-1">Office</h3>
                      <p className="text-neutral-600">
                        123 Business Street<br />
                        San Francisco, CA 94102<br />
                        United States
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-8">
                  <h3 className="text-xl text-neutral-900 mb-4">Office Hours</h3>
                  <div className="space-y-2 text-neutral-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Join thousands of teams using SmartLink to manage their links
            </p>
            <Button className="bg-black hover:bg-neutral-800 text-white px-8 h-14">
              Start Free Trial
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
