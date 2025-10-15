import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { Link2, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  user?: { name: string; email: string } | null;
}

export function Navigation({ currentPage, onNavigate, isAuthenticated = false, user }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
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
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor, boxShadow }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-neutral-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left */}
            <motion.button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl text-neutral-900 hidden sm:block">SmartLink</span>
            </motion.button>

            {/* Center Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.page}
                  variant={currentPage === item.page ? 'default' : 'ghost'}
                  onClick={() => handleNavigate(item.page)}
                  className={currentPage === item.page ? 'bg-black text-white hover:bg-neutral-800' : ''}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Right - Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleNavigate('dashboard')}
                    className="items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm text-neutral-700">{user?.name || 'User'}</span>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigate('signin')}
                    className="text-neutral-900 hover:text-black"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavigate('signup')}
                    className="bg-black text-white hover:bg-neutral-800"
                  >
                    Get Started
                  </Button>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 py-4"
            >
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.page}
                    variant={currentPage === item.page ? 'default' : 'ghost'}
                    onClick={() => handleNavigate(item.page)}
                    className={`justify-start ${currentPage === item.page ? 'bg-black text-white' : ''}`}
                  >
                    {item.label}
                  </Button>
                ))}
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    onClick={() => handleNavigate('dashboard')}
                    className="justify-start gap-2"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigate('signin')}
                      className="justify-start"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleNavigate('signup')}
                      className="justify-start bg-black text-white hover:bg-neutral-800"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Auth Required Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in Required</DialogTitle>
            <DialogDescription>
              You need to be signed in to access the dashboard. Please sign in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => {
                setShowAuthModal(false);
                handleNavigate('signin');
              }}
              className="w-full"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setShowAuthModal(false);
                handleNavigate('signup');
              }}
              variant="outline"
              className="w-full"
            >
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
