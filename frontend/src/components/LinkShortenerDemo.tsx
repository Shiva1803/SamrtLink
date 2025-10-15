import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

// PLACEHOLDER: Interactive demo component for link shortening
export function LinkShortenerDemo() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // PLACEHOLDER FUNCTION - Replace with actual API call
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    setIsProcessing(true);
    
    // Simulated API call delay
    setTimeout(() => {
      // PLACEHOLDER: Generate mock short URL
      const randomId = Math.random().toString(36).substring(2, 8);
      setShortUrl(`smartlink.io/${randomId}`);
      setIsProcessing(false);
      toast.success('Link shortened successfully!');
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleShorten} className="space-y-4">
        <div className="relative">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="h-14 pr-32 bg-white border-neutral-200 text-lg"
            disabled={isProcessing}
          />
          <Button
            type="submit"
            disabled={isProcessing}
            className="absolute right-2 top-2 bg-black hover:bg-neutral-800 text-white h-10"
          >
            {isProcessing ? (
              'Shortening...'
            ) : (
              <>
                Shorten
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-500 mb-1">Your shortened link:</p>
                <p className="text-lg text-neutral-900 truncate">{shortUrl}</p>
              </div>
              <Button
                type="button"
                onClick={handleCopy}
                variant="outline"
                className="border-neutral-200 flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-6 text-sm text-neutral-600">
                <span>0 clicks</span>
                <span>Created just now</span>
                <button className="text-neutral-900 hover:underline">
                  View Analytics →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </form>

      <p className="text-center text-sm text-neutral-500 mt-6">
        {/* PLACEHOLDER: Add actual feature info */}
        Try it out! This is a demo. Sign up to save and track your links.
      </p>
    </div>
  );
}
