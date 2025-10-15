import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { QrCode, Download, Palette } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

// PLACEHOLDER: Interactive QR Code Generator Demo
export function QRCodeDemo() {
  const [url, setUrl] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#0066FF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#00CC00' },
  ];

  // PLACEHOLDER FUNCTION - Replace with actual QR generation API
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    // TODO: API call to /api/qrcode/generate
    console.log('Generating QR code for:', { url, color: selectedColor });
    setQrGenerated(true);
    toast.success('QR Code generated!');
  };

  // PLACEHOLDER FUNCTION - Replace with actual download API
  const handleDownload = () => {
    // TODO: API call to /api/qrcode/download
    console.log('Downloading QR code');
    toast.success('QR Code downloaded!');
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-neutral-200">
      <h3 className="text-2xl text-neutral-900 mb-6">QR Code Generator</h3>
      
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="text-sm text-neutral-700 mb-2 block">
            Enter URL for QR Code
          </label>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="bg-neutral-50 border-neutral-200"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-700 mb-3 block">
            <Palette className="w-4 h-4 inline mr-2" />
            Choose Color
          </label>
          <div className="flex gap-3">
            {colors.map((color) => (
              <motion.button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  selectedColor === color.value
                    ? 'border-black scale-110'
                    : 'border-neutral-200'
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-black hover:bg-neutral-800 text-white"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
      </form>

      {qrGenerated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 pt-8 border-t border-neutral-200"
        >
          <div className="text-center">
            <div 
              className="w-64 h-64 mx-auto rounded-xl bg-neutral-50 flex items-center justify-center mb-6 border border-neutral-200"
            >
              {/* PLACEHOLDER - Replace with actual QR code image from API */}
              <QrCode className="w-32 h-32" style={{ color: selectedColor }} />
            </div>
            
            <p className="text-sm text-neutral-600 mb-4">
              QR Code for: <span className="text-neutral-900">{url}</span>
            </p>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-neutral-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download High Resolution
            </Button>
          </div>
        </motion.div>
      )}

      <p className="text-xs text-neutral-500 mt-6 text-center">
        {/* PLACEHOLDER: Add actual feature info */}
        Try our QR code generator! Sign up to save and customize your codes.
      </p>
    </div>
  );
}
