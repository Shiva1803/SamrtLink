import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Download, QrCode, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// PLACEHOLDER: Interactive QR Code Generator Demo
export function QRCodeDemo() {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // PLACEHOLDER FUNCTION - Replace with actual QR generation API
  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    setIsGenerating(true);

    // Simulated API call delay
    setTimeout(() => {
      // PLACEHOLDER: Generate mock QR code URL
      setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url));
      setIsGenerating(false);
      toast.success('QR code generated successfully!');
    }, 1000);
  };

  // PLACEHOLDER FUNCTION - Replace with actual download API
  const handleDownload = () => {
    console.log('Downloading QR code:', qrCodeUrl);
    toast.success('Download started!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="relative">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to generate QR code..."
            className="h-14 pr-32 bg-white border-neutral-200 text-lg"
            disabled={isGenerating}
          />
          <Button
            type="submit"
            disabled={isGenerating}
            className="absolute right-2 top-2 bg-black hover:bg-neutral-800 text-white h-10"
          >
            {isGenerating ? (
              'Generating...'
            ) : (
              <>
                Generate
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {qrCodeUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                <img src={qrCodeUrl} alt="Generated QR Code" className="w-full h-full object-contain" />
              </div>
              <Button
                type="button"
                onClick={handleDownload}
                className="bg-black text-white hover:bg-neutral-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
              <p className="text-sm text-neutral-500">
                This is a demo. Connect your account to generate branded QR codes.
              </p>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
