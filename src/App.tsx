import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { FeaturesPage } from './pages/FeaturesPage';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';
import { DashboardNew } from './pages/DashboardNew';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Settings } from './pages/Settings';
import { PublicProfile } from './pages/PublicProfile';
import { Toaster } from './components/ui/sonner';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Start on home, click Dashboard in nav to access
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <Pricing />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return <DashboardNew onNavigate={setCurrentPage} />; // New two-panel dashboard
      case 'dashboard-analytics':
        return <Dashboard />; // Original analytics dashboard
      case 'settings':
        return <Settings />;
      case 'profile':
        return <PublicProfile />;
      case 'signin':
        return <SignIn />;
      case 'signup':
        return <SignUp />;
      default:
        return <Home />;
    }
  };

  // Hide footer on auth, dashboard, settings, and profile pages
  const hideFooter = ['signin', 'signup', 'dashboard', 'dashboard-analytics', 'settings', 'profile'].includes(currentPage);

  // Hide navbar and scroll progress on new dashboard
  const hideNavigation = currentPage === 'dashboard';

  return (
    <div className="min-h-screen bg-white relative">
      {/* Scroll progress indicator */}
      {!hideNavigation && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
          style={{ scaleX }}
        />
      )}

      {/* Animated background elements */}
      {!hideNavigation && (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-neutral-100 rounded-full blur-3xl opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {!hideNavigation && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      
      <PageTransition page={currentPage}>
        {renderPage()}
      </PageTransition>

      {!hideFooter && <Footer onNavigate={setCurrentPage} />}
      <Toaster />
    </div>
  );
}
