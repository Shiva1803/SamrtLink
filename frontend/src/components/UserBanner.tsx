import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Crown, Instagram, Twitter, Linkedin, Github, Facebook, Youtube } from 'lucide-react';

interface UserBannerProps {
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro' | 'enterprise';
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    youtube?: string;
  };
}

export function UserBanner({ name, email, avatar, plan, socials }: UserBannerProps) {
  const planColors = {
    free: 'bg-neutral-100 text-neutral-700',
    pro: 'bg-black text-white',
    enterprise: 'bg-gradient-to-r from-neutral-800 to-black text-white',
  };

  const socialIcons = [
    { name: 'instagram', icon: Instagram, url: socials?.instagram },
    { name: 'twitter', icon: Twitter, url: socials?.twitter },
    { name: 'linkedin', icon: Linkedin, url: socials?.linkedin },
    { name: 'github', icon: Github, url: socials?.github },
    { name: 'facebook', icon: Facebook, url: socials?.facebook },
    { name: 'youtube', icon: Youtube, url: socials?.youtube },
  ].filter(social => social.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden border-b border-neutral-200"
    >
      {/* Gradient Banner Background */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-10 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative px-8 pt-20 pb-8">
        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            {plan === 'pro' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-white"
              >
                <Crown className="w-4 h-4 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* User Info */}
        <div className="text-center space-y-2 mb-5">
          <h2 className="text-xl text-neutral-900">{name}</h2>
          <p className="text-sm text-neutral-500">{email}</p>
          
          <div className="flex justify-center pt-2">
            <Badge className={`${planColors[plan]} px-4 py-1.5`}>
              {plan === 'enterprise' && <Crown className="w-3 h-3 mr-1.5" />}
              {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
            </Badge>
          </div>
        </div>

        {/* Social Media Icons */}
        {socialIcons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center gap-3 pt-4 border-t border-neutral-200"
          >
            {socialIcons.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-900 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
