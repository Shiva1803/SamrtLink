import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'ai';
  message: string;
  timestamp?: string;
  index: number;
}

export function ChatMessage({ role, message, timestamp, index }: ChatMessageProps) {
  const isAI = role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.05 + 0.1 }}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
          isAI ? 'bg-gradient-to-br from-neutral-900 to-neutral-700 text-white' : 'bg-neutral-100 text-neutral-900'
        }`}
      >
        {isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </motion.div>

      {/* Message Content */}
      <div className={`flex-1 ${isAI ? 'items-start' : 'items-end'} flex flex-col`}>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 + 0.15 }}
          className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm ${
            isAI
              ? 'bg-neutral-100 text-neutral-900 rounded-tl-sm'
              : 'bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-tr-sm'
          }`}
        >
          <p className="leading-relaxed whitespace-pre-wrap">{message}</p>
        </motion.div>
        
        {timestamp && (
          <span className="text-xs text-neutral-400 mt-2 px-1">
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
}
