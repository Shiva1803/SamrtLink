import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { UserBanner } from '../components/UserBanner';
import { LinkCard } from '../components/LinkCard';
import { ChatMessage } from '../components/ChatMessage';
import { 
  Link2, 
  ArrowLeft, 
  Send, 
  Sparkles,
  Plus 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DashboardNewProps {
  onNavigate?: (page: string) => void;
}

// ============================================
// PLACEHOLDER DATA - Replace with API calls
// ============================================

const PLACEHOLDER_USER = {
  name: 'Alex Morrison',
  email: 'alex@smartlink.io',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  plan: 'pro' as const,
  socials: {
    instagram: 'https://instagram.com/alexmorrison',
    twitter: 'https://twitter.com/alexmorrison',
    linkedin: 'https://linkedin.com/in/alexmorrison',
    github: 'https://github.com/alexmorrison',
  },
};

const PLACEHOLDER_LINKS = [
  {
    id: 1,
    title: 'Summer Campaign 2024',
    shortUrl: 'smartlink.io/summer24',
    originalUrl: 'https://example.com/summer-campaign',
    clicks: 12453,
  },
  {
    id: 2,
    title: 'Product Launch Page',
    shortUrl: 'smartlink.io/launch',
    originalUrl: 'https://example.com/product-launch',
    clicks: 8329,
  },
  {
    id: 3,
    title: 'Newsletter Signup',
    shortUrl: 'smartlink.io/newsletter',
    originalUrl: 'https://example.com/subscribe',
    clicks: 5647,
  },
  {
    id: 4,
    title: 'Webinar Registration',
    shortUrl: 'smartlink.io/webinar',
    originalUrl: 'https://example.com/webinar-reg',
    clicks: 3421,
  },
  {
    id: 5,
    title: 'Holiday Promotion',
    shortUrl: 'smartlink.io/holiday',
    originalUrl: 'https://example.com/holiday-sale',
    clicks: 2156,
  },
];

const INITIAL_CHAT = [
  {
    role: 'ai' as const,
    message: 'Hello! I\'m your SmartLink AI assistant. I can help you analyze your link performance, suggest optimizations, and answer questions about your analytics. How can I assist you today?',
    timestamp: 'Just now',
  },
];

const AI_RESPONSES = [
  'Based on your link performance, your Summer Campaign is performing exceptionally well with 12,453 clicks. The click-through rate is 23% higher than your average.',
  'Your top-performing link is "Summer Campaign 2024" with 12,453 total clicks. Consider creating similar campaigns to replicate this success.',
  'To boost traffic, I recommend:\n• Adding UTM parameters for better tracking\n• Sharing links during peak hours (2-4 PM)\n• A/B testing different call-to-actions',
  'Your links have generated 31,006 total clicks across 5 active campaigns. The average click rate is 6,201 clicks per link.',
  'The "Product Launch Page" shows strong momentum with 8,329 clicks. Consider promoting it more on social media platforms.',
];

export function DashboardNew({ onNavigate }: DashboardNewProps = {}) {
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ============================================
  // GSAP Animations
  // ============================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.link-card',
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // ============================================
  // PLACEHOLDER FUNCTIONS - Connect to API
  // ============================================

  // TODO: API call to send message to AI
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user' as const,
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMessage = {
        role: 'ai' as const,
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // TODO: API call to edit link
  const handleEditLink = (id: number) => {
    console.log('Edit link:', id);
    toast.info('Edit functionality - Connect to API');
  };

  // TODO: API call to delete link
  const handleDeleteLink = (id: number) => {
    console.log('Delete link:', id);
    toast.success('Link deleted (Placeholder)');
  };

  // TODO: API call to view analytics
  const handleAnalytics = (id: number) => {
    console.log('View analytics:', id);
    toast.info('Analytics view - Connect to API');
  };

  // Navigation function
  const handleBack = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      toast.info('Navigation - Implement routing');
    }
  };

  // TODO: Create new link
  const handleCreateLink = () => {
    console.log('Create new link');
    toast.info('Create link modal - Implement');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* ============================================ */}
      {/* TOP HEADER - Full Width */}
      {/* ============================================ */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-neutral-200"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg text-neutral-900">SmartLink</span>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => onNavigate && onNavigate(item.toLowerCase())}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </nav>

          {/* Back Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBack}
              variant="outline"
              size="sm"
              className="border-neutral-200 hover:bg-neutral-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* ============================================ */}
      {/* MAIN CONTENT - Two Panel Layout */}
      {/* ============================================ */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Links Panel */}
        <motion.aside
          ref={sidebarRef}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[420px] bg-white border-r border-neutral-200 flex flex-col h-full"
        >
          {/* User Banner - Fixed at top */}
          <div className="flex-shrink-0 overflow-hidden">
            <UserBanner
              name={PLACEHOLDER_USER.name}
              email={PLACEHOLDER_USER.email}
              avatar={PLACEHOLDER_USER.avatar}
              plan={PLACEHOLDER_USER.plan}
              socials={PLACEHOLDER_USER.socials}
            />
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Create Link Button */}
            <div className="p-6 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleCreateLink}
                  className="w-full bg-black hover:bg-neutral-800 text-white h-12 shadow-lg shadow-black/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Link
                </Button>
              </motion.div>
            </div>

            {/* Links List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-4 pb-4">
                {PLACEHOLDER_LINKS.length === 0 ? (
                  <div className="text-center py-12">
                    <Link2 className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500">No links yet</p>
                    <p className="text-sm text-neutral-400 mt-1">
                      Create your first link to get started
                    </p>
                  </div>
                ) : (
                  PLACEHOLDER_LINKS.map((link, index) => (
                    <div key={link.id} className="link-card">
                      <LinkCard
                        {...link}
                        index={index}
                        onEdit={handleEditLink}
                        onDelete={handleDeleteLink}
                        onAnalytics={handleAnalytics}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Stats Footer - Fixed at bottom */}
            <div className="p-6 border-t border-neutral-200 bg-gradient-to-br from-neutral-50 to-white flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm"
                >
                  <p className="text-xs text-neutral-500 mb-1">Total Links</p>
                  <p className="text-2xl text-neutral-900">{PLACEHOLDER_LINKS.length}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm"
                >
                  <p className="text-xs text-neutral-500 mb-1">Total Clicks</p>
                  <p className="text-2xl text-neutral-900">
                    {PLACEHOLDER_LINKS.reduce((sum, link) => sum + link.clicks, 0).toLocaleString()}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* RIGHT PANEL - AI Chatbot */}
        <motion.main
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 flex flex-col bg-white"
        >
          {/* Chat Header */}
          <div className="px-8 py-6 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl text-neutral-900">AI Assistant</h2>
                <p className="text-sm text-neutral-500">
                  Ask me about your link performance and analytics
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 px-8 py-8">
            <div className="max-w-3xl mx-auto space-y-8">
              {chatMessages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  role={msg.role}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  index={index}
                />
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-neutral-400"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-neutral-400"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-neutral-400"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="px-8 py-6 border-t border-neutral-200 bg-gradient-to-br from-neutral-50 to-white">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
              <div className="flex gap-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about your link performance, traffic sources, or get optimization tips..."
                  className="flex-1 bg-white border-neutral-200 h-12 shadow-sm"
                  disabled={isTyping}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    disabled={isTyping || !inputMessage.trim()}
                    className="bg-black hover:bg-neutral-800 text-white h-12 w-12 p-0 shadow-lg shadow-black/10"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  'How are my links performing?',
                  'Top performing link',
                  'Boost traffic tips',
                ].map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:border-black hover:text-black hover:bg-neutral-50 transition-all shadow-sm"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </form>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
