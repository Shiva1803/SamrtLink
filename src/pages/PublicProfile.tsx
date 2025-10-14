import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card } from '../components/ui/card';
import { 
  Send, 
  Link2, 
  ExternalLink,
  Mail,
  Globe,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

// PLACEHOLDER DATA - Replace with API calls
const PLACEHOLDER_PROFILE = {
  name: 'Alex Morrison',
  username: 'alexmorrison',
  bio: 'Digital Marketing Expert | Link Optimization Specialist | Helping brands grow their online presence',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  customDomain: 'links.alexmorrison.com',
  location: 'San Francisco, CA',
  website: 'alexmorrison.com',
  email: 'hello@alexmorrison.com',
};

const PLACEHOLDER_SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter', url: 'twitter.com/alexmorrison', color: '#1DA1F2' },
  { icon: Linkedin, label: 'LinkedIn', url: 'linkedin.com/in/alexmorrison', color: '#0A66C2' },
  { icon: Github, label: 'GitHub', url: 'github.com/alexmorrison', color: '#000000' },
  { icon: Instagram, label: 'Instagram', url: 'instagram.com/alexmorrison', color: '#E4405F' },
];

const PLACEHOLDER_FEATURED_LINKS = [
  {
    id: 1,
    title: 'My Latest Blog Post',
    description: 'Learn about advanced link tracking strategies',
    url: 'smartlink.io/blog-2024',
    clicks: 1243,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Free Marketing Guide',
    description: 'Download my comprehensive marketing toolkit',
    url: 'smartlink.io/guide',
    clicks: 892,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Upcoming Webinar',
    description: 'Join me for a live session on link optimization',
    url: 'smartlink.io/webinar',
    clicks: 567,
    thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop',
  },
];

export function PublicProfile() {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai'; message: string }>>([
    { 
      role: 'ai', 
      message: 'Hi! I\'m Alex\'s AI assistant. How can I help you today?' 
    },
  ]);

  // TODO: API call to send chat message to AI
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    setChatHistory([...chatHistory, { role: 'user', message: chatMessage }]);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { 
          role: 'ai', 
          message: 'Thanks for your message! This is a placeholder response. In production, this would connect to an AI service.' 
        }
      ]);
    }, 1000);

    setChatMessage('');
  };

  // TODO: API call to track link click
  const handleLinkClick = (linkId: number, url: string) => {
    console.log('Tracking click for link:', linkId);
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-neutral-50"
    >
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <Avatar className="w-32 h-32 mx-auto border-4 border-neutral-100">
                <AvatarImage src={PLACEHOLDER_PROFILE.avatar} />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Name & Username */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl text-neutral-900 mb-2"
            >
              {PLACEHOLDER_PROFILE.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-neutral-500 mb-6"
            >
              @{PLACEHOLDER_PROFILE.username}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {PLACEHOLDER_PROFILE.bio}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600"
            >
              {PLACEHOLDER_PROFILE.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {PLACEHOLDER_PROFILE.location}
                </div>
              )}
              {PLACEHOLDER_PROFILE.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a href={`https://${PLACEHOLDER_PROFILE.website}`} className="hover:text-neutral-900 transition-colors">
                    {PLACEHOLDER_PROFILE.website}
                  </a>
                </div>
              )}
              {PLACEHOLDER_PROFILE.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${PLACEHOLDER_PROFILE.email}`} className="hover:text-neutral-900 transition-colors">
                    {PLACEHOLDER_PROFILE.email}
                  </a>
                </div>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 mt-8"
            >
              {PLACEHOLDER_SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={`https://${social.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="w-12 h-12 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  style={{ color: social.color }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - AI Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-white border-neutral-200 sticky top-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100">
                <MessageCircle className="w-6 h-6 text-neutral-900" />
                <div>
                  <h2 className="text-xl text-neutral-900">AI Assistant</h2>
                  <p className="text-sm text-neutral-500">Ask me anything about {PLACEHOLDER_PROFILE.name}</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {chatHistory.map((chat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        chat.role === 'user'
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{chat.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-neutral-50 border-neutral-200"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="bg-black hover:bg-neutral-800 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>

              <p className="text-xs text-neutral-500 mt-4 text-center">
                Powered by SmartLink AI • Responses may vary
              </p>
            </Card>
          </motion.div>

          {/* Right Column - Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-white border-neutral-200">
              <h3 className="text-lg text-neutral-900 mb-4">Custom Domain</h3>
              <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                <Link2 className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-700">{PLACEHOLDER_PROFILE.customDomain}</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Featured Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl text-neutral-900 mb-8 text-center">Featured Links</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_FEATURED_LINKS.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="overflow-hidden border-neutral-200 cursor-pointer h-full"
                  onClick={() => handleLinkClick(link.id, link.url)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video overflow-hidden bg-neutral-100">
                    <img 
                      src={link.thumbnail} 
                      alt={link.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg text-neutral-900 mb-2">{link.title}</h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {link.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <ExternalLink className="w-4 h-4" />
                        <span>{link.url}</span>
                      </div>
                      <span className="text-xs text-neutral-500">
                        {link.clicks.toLocaleString()} clicks
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-neutral-500">
            Powered by{' '}
            <a href="/" className="text-neutral-900 hover:underline">
              SmartLink
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
