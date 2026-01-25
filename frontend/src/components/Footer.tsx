import { motion } from 'motion/react';
import { Link2, Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { ROUTES } from '@/config/constants';

const footerLinks = {
  product: [
    { label: 'Features', route: ROUTES.FEATURES },
    { label: 'Pricing', route: ROUTES.PRICING },
    { label: 'Analytics', route: ROUTES.DASHBOARD },
    { label: 'API', route: ROUTES.FEATURES },
  ],
  company: [
    { label: 'About', route: ROUTES.ABOUT },
    { label: 'Contact', route: ROUTES.CONTACT },
    { label: 'Careers', route: ROUTES.CONTACT },
    { label: 'Press', route: ROUTES.CONTACT },
  ],
  resources: [
    { label: 'Help Center', route: ROUTES.CONTACT },
    { label: 'Documentation', route: ROUTES.FEATURES },
    { label: 'Blog', route: ROUTES.FEATURES },
    { label: 'Status', route: ROUTES.CONTACT },
  ],
};

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Thanks for subscribing!');
  };

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl text-neutral-900">SmartLink</span>
            </div>
            <p className="text-neutral-600 leading-relaxed max-w-md">
              SmartLink is the modern link management platform built for marketers, creators, and teams.
              Shorten, track, and optimize every link with confidence.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-600">
                <Mail className="w-4 h-4" />
                <span>hello@smartlink.com</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h3 className="text-sm text-neutral-900 mb-4 uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.route)}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm text-neutral-900 mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.route)}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm text-neutral-900 mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.route)}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl text-neutral-900 mb-2">Stay ahead of the curve</h3>
              <p className="text-neutral-600">Product updates, growth tips, and market insights—delivered monthly.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-white border-neutral-200"
              />
              <Button type="submit" className="bg-black text-white hover:bg-neutral-800">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">© 2025 SmartLink. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-neutral-500 hover:text-neutral-900"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-neutral-500 hover:text-neutral-900"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-neutral-500 hover:text-neutral-900"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
