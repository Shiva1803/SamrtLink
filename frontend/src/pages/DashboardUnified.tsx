// Protected Dashboard - Single unified version
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import {
  Send,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  Crown,
  LogOut,
  Settings as SettingsIcon,
  MousePointer
} from 'lucide-react';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { useAuth } from '@/hooks/useAuth';
import { useLinks } from '@/hooks/useLinks';
import { API_CONFIG } from '@/config/api.config';
import { apiClient } from '@/lib/api';

// AI Chat messages
const INITIAL_CHAT = [
  {
    role: 'ai' as const,
    message: 'Hello! 👋 I\'m your SmartLink AI assistant. I can help you analyze link performance, suggest optimizations, and answer questions about your analytics. How can I help you today?',
    timestamp: 'Just now',
  },
];

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Use real data hooks
  const { user } = useAuth();
  const { links, isLoading, deleteLink, refreshLinks } = useLinks();

  // Calculate total clicks from real links data
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.link-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }, sidebarRef);
    return () => ctx.revert();
  }, [links]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Refresh links on mount
  useEffect(() => {
    refreshLinks();
  }, []);

  // Send message
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user' as const,
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use authenticated chat endpoint (token from apiClient)
      const data = await apiClient.post<{ reply: string }>(
        API_CONFIG.ENDPOINTS.CHAT_MESSAGE,
        { message: currentMessage },
        true // requiresAuth
      );

      const aiMessage = {
        role: 'ai' as const,
        message: data.reply || 'Sorry, I could not process your request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'ai' as const,
        message: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again or check your internet connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response');
    } finally {
      setIsTyping(false);
    }
  };

  // Link actions
  const handleCopyLink = (shortCode: string) => {
    const shortUrl = `http://localhost:5001/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink(id);
      toast.success('Link deleted successfully');
      await refreshLinks();
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const handleEditLink = (id: string) => {
    toast.info('Edit link - Coming soon');
  };

  const handleViewAnalytics = (id: string) => {
    toast.info('Analytics view - Coming soon');
  };

  return (
    <div className="h-screen overflow-hidden bg-neutral-50 flex">
      {/* LEFT SIDEBAR - User Profile & Links */}
      <aside
        ref={sidebarRef}
        className="w-80 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0"
      >
        {/* User Profile Banner */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-neutral-200">
              <AvatarFallback className="bg-black text-white">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-neutral-900">{user?.name || 'User'}</h2>
                <Badge variant="secondary" className="text-xs gap-1">
                  <Crown className="w-3 h-3" />
                  Free
                </Badge>
              </div>
              <p className="text-sm text-neutral-600">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-xs text-neutral-600 mb-1">Total Links</div>
              <div className="text-xl font-bold text-neutral-900">{links.length}</div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-xs text-neutral-600 mb-1">Total Clicks</div>
              <div className="text-xl font-bold text-neutral-900">
                {totalClicks.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-6 pb-4 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-2">Your Links</h3>
            <Button size="sm" className="w-full" onClick={() => toast.info('Create link - Coming soon')}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Link
            </Button>
          </div>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-3 py-4">
              {isLoading ? (
                <div className="text-center text-neutral-500 py-8">Loading links...</div>
              ) : links.length === 0 ? (
                <div className="text-center text-neutral-500 py-8">
                  <p className="mb-2">No links yet</p>
                  <p className="text-sm">Create your first link to get started!</p>
                </div>
              ) : (
                links.map((link) => (
                  <Card
                    key={link._id}
                    className="link-item p-4 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-neutral-900 truncate">
                          {link.title || 'Untitled Link'}
                        </h4>
                        <p className="text-sm text-neutral-600 truncate">
                          localhost:5001/{link.shortCode}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleCopyLink(link.shortCode)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteLink(link._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <MousePointer className="w-4 h-4" />
                        <span>{link.clicks || 0} clicks</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => handleViewAnalytics(link._id)}
                      >
                        Analytics
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-neutral-200 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onNavigate('settings')}
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT - AI Chat */}
      <div className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-neutral-900">AI Assistant</h1>
              <p className="text-sm text-neutral-600">Get insights about your links</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 min-h-0 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {chatMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <p className="text-xs opacity-60 mt-2">{msg.timestamp}</p>
                </div>
                {msg.role === 'user' && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-black text-white text-xs">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t border-neutral-200 p-6">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your link analytics..."
                className="flex-1 bg-neutral-50 border-neutral-200"
              />
              <Button type="submit" size="icon" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
