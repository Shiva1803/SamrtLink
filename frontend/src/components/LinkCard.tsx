import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Link2, TrendingUp, Edit, Trash2, BarChart3, Copy } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LinkCardProps {
  id: number;
  title: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAnalytics: (id: number) => void;
  index: number;
}

export function LinkCard({
  id,
  title,
  shortUrl,
  clicks,
  onEdit,
  onDelete,
  onAnalytics,
  index,
}: LinkCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-2xl p-5 border border-neutral-200 cursor-pointer group shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Link2 className="w-4 h-4 text-neutral-600" />
            </div>
            <h3 className="text-neutral-900 truncate">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2 ml-10">
            <p className="text-sm text-neutral-500 truncate">{shortUrl}</p>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Copy className="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-900" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-900">{clicks.toLocaleString()}</span>
          </div>
          <span className="text-neutral-400">clicks</span>
        </div>

        <div className="flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onAnalytics(id)}
              className="h-9 w-9 p-0 hover:bg-neutral-100 rounded-lg"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(id)}
              className="h-9 w-9 p-0 hover:bg-neutral-100 rounded-lg"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(id)}
              className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
