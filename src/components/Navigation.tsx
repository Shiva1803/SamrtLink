import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { Link2, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 0 rgba(0, 0, 0, 0)', '0 1px 3px 0 rgba(0, 0, 0, 0.1)']
  );

  const menuItems = [
    { label: 'Home', page: 'home' },
    { label: 'Features', page: 'features' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Dashboard', page: 'dashboard' },
  ];

  // Show dashboard link if user is "logged in" (placeholder logic)
  const isLoggedIn = ['dashboard', 'dashboard-analytics', 'settings', 'profile'].includes(currentPage); // PLACEHOLDER: Replace with actual auth state

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor, boxShadow }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-9 h-9 bg-black rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
            <span className="text-xl text-neutral-900">SmartLink</span>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`transition-colors relative ${
                  currentPage === item.page
                    ? 'text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => handleNavigate('dashboard')}
                  className="bg-black hover:bg-neutral-800 text-white"
                >
                  Dashboard
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => handleNavigate('signin')}
                    variant="ghost" 
                    className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  >
                    Sign In
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => handleNavigate('signup')}
                    className="bg-black hover:bg-neutral-800 text-white"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-6 border-t border-neutral-100"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`text-left py-2 transition-colors ${
                    currentPage === item.page
                      ? 'text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                {isLoggedIn ? (
                  <Button 
                    onClick={() => handleNavigate('dashboard')}
                    className="w-full bg-black text-white"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={() => handleNavigate('signin')}
                      variant="outline" 
                      className="w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => handleNavigate('signup')}
                      className="w-full bg-black text-white"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
