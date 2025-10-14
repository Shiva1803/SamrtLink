import { Link2, Twitter, Linkedin, Github, Facebook, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing!');
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-200 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button onClick={() => handleNavigate('home')} className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl text-neutral-900">SmartLink</span>
            </button>
            <p className="text-neutral-600 mb-6 leading-relaxed max-w-sm">
              The modern way to manage and optimize your links. Trusted by thousands of teams worldwide.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-neutral-900 mb-4">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-neutral-50 border-neutral-200"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-50 hover:bg-neutral-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-neutral-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-neutral-900 mb-6">Product</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleNavigate('features')} className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('pricing')} className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Pricing
                </button>
              </li>
              {['API', 'Integrations', 'Enterprise'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-neutral-900 mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleNavigate('about')} className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  About
                </button>
              </li>
              {['Blog', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={() => handleNavigate('contact')} className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-neutral-900 mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              © 2025 SmartLink. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                Terms
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
