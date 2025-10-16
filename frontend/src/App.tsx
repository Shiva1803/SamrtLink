// Clean imports from organized structure
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';

// Public pages
import { Home as HomePage } from './pages/Home';
import { FeaturesPage } from './pages/FeaturesPage';
import { Pricing as PricingPage } from './pages/Pricing';
import { About as AboutPage } from './pages/About';
import { Contact as ContactPage } from './pages/Contact';

// Auth pages
import { SignIn as SignInPage } from './pages/SignIn';
import { SignUp as SignUpPage } from './pages/SignUp';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';

// Dashboard - Single unified version
import { Dashboard } from './pages/DashboardUnified';
import { Settings as SettingsPage } from './pages/Settings';
import { PublicProfile as ProfilePage } from './pages/PublicProfile';

// UI components
import { Toaster } from './components/ui/sonner';

// Hooks and utils
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState(ROUTES.HOME);
  const { scrollYProgress } = useScroll();
  const { user, isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation(); // Get current location

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Handle navigation with authentication check
  const handleNavigation = (page: string) => {
    // Protect dashboard route
    if (page === ROUTES.DASHBOARD && !isAuthenticated) {
      toast.error('Please sign in to access the dashboard');
      setCurrentPage(ROUTES.SIGN_IN);
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setCurrentPage(ROUTES.HOME);
  };

  // Auto-redirect to dashboard after successful sign in
  useEffect(() => {
    console.log('🔄 Auth state changed:', { isAuthenticated, currentPage, userName: user?.name });

    if (isAuthenticated && (currentPage === ROUTES.SIGN_IN || currentPage === ROUTES.SIGN_UP)) {
      console.log('✅ Redirecting to dashboard...');
      // Immediate redirect without setTimeout
      setCurrentPage(ROUTES.DASHBOARD);
      toast.success(`Welcome back, ${user?.name || 'User'}!`);
    }
  }, [isAuthenticated, currentPage, user?.name]);

  // Check if user is authenticated on mount and should be on dashboard
  useEffect(() => {
    if (isAuthenticated) {
      console.log('✅ User already authenticated on mount');
      // If on home page and authenticated, user can stay there
      // If on sign-in/sign-up page, redirect to dashboard
      if (currentPage === ROUTES.SIGN_IN || currentPage === ROUTES.SIGN_UP) {
        console.log('🔄 Redirecting from auth page to dashboard');
        setCurrentPage(ROUTES.DASHBOARD);
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case ROUTES.HOME:
        return <HomePage />;
      case ROUTES.FEATURES:
        return <FeaturesPage />;
      case ROUTES.PRICING:
        return <PricingPage />;
      case ROUTES.ABOUT:
        return <AboutPage />;
      case ROUTES.CONTACT:
        return <ContactPage />;
      case ROUTES.DASHBOARD:
        // Protected route - redirect if not authenticated
        if (!isAuthenticated) {
          toast.error('Please sign in to access the dashboard');
          setCurrentPage(ROUTES.SIGN_IN);
          return <SignInPage onNavigate={handleNavigation} />;
        }
        return <Dashboard onNavigate={handleNavigation} onLogout={handleLogout} />;
      case ROUTES.SETTINGS:
        if (!isAuthenticated) {
          setCurrentPage(ROUTES.SIGN_IN);
          return <SignInPage onNavigate={handleNavigation} />;
        }
        return <SettingsPage />;
      case ROUTES.PROFILE:
        return <ProfilePage />;
      case ROUTES.SIGN_IN:
        // Redirect to dashboard if already authenticated
        if (isAuthenticated) {
          setCurrentPage(ROUTES.DASHBOARD);
          return <Dashboard onNavigate={handleNavigation} onLogout={handleLogout} />;
        }
        return <SignInPage onNavigate={handleNavigation} />;
      case ROUTES.SIGN_UP:
        // Redirect to dashboard if already authenticated
        if (isAuthenticated) {
          setCurrentPage(ROUTES.DASHBOARD);
          return <Dashboard onNavigate={handleNavigation} onLogout={handleLogout} />;
        }
        return <SignUpPage />;
      // --- Add Admin Routes ---
      case ROUTES.ADMIN_LOGIN:
        return <AdminLogin onNavigate={handleNavigation} />;
      case ROUTES.ADMIN:
        // Protect the admin route
        if (!isAuthenticated || user?.role !== 'admin') {
          toast.error('Administrator access required.');
          setCurrentPage(ROUTES.ADMIN_LOGIN);
          return <AdminLogin onNavigate={handleNavigation} />;
        }
        return <Admin onNavigate={handleNavigation} />;
      default:
        return <HomePage />;
    }
  };

  // Hide footer on auth, dashboard, settings, and profile pages
  const hideFooter = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.DASHBOARD, ROUTES.SETTINGS, ROUTES.PROFILE, ROUTES.ADMIN, ROUTES.ADMIN_LOGIN].includes(currentPage);
  const hideNavigation = [ROUTES.DASHBOARD, ROUTES.ADMIN, ROUTES.ADMIN_LOGIN].includes(currentPage);

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
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {/* Navigation */}
      {!hideNavigation && (
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigation}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}

      {/* Main content with page transitions */}
      <PageTransition page={currentPage}>
        <main>
          {renderPage()}
        </main>
      </PageTransition>

      {/* Footer */}
      {!hideFooter && <Footer onNavigate={handleNavigation} />}

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

// export function WrappedApp() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

