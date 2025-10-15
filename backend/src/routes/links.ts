import express from 'express';
import { Link } from '../models/Link';
import { authMiddleware } from '../middleware/auth';
import QRCode from 'qrcode';

const router = express.Router();

// Generate random short code
function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}

// Get all links for authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch links', error });
  }
});

// Get single link
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOne({ _id: req.params.id, userId: req.userId });
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch link', error });
  }
});

// Create new link
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { originalUrl, customAlias, title, description, expiresAt } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    // Generate or use custom short code
    let shortCode = customAlias || generateShortCode();

    // Check if custom alias already exists
    if (customAlias) {
      const existing = await Link.findOne({ customAlias });
      if (existing) {
        return res.status(400).json({ message: 'Custom alias already taken' });
      }
    }

    // Ensure short code is unique
    while (await Link.findOne({ shortCode })) {
      shortCode = generateShortCode();
    }

    const link = new Link({
      userId: req.userId,
      originalUrl,
      shortCode,
      customAlias,
      title,
      description,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    await link.save();
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create link', error });
  }
});

// Update link
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, isActive, expiresAt } = req.body;

    const link = await Link.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, isActive, expiresAt },
      { new: true }
    );

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update link', error });
  }
});

// Delete link
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.json({ success: true, message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete link', error });
  }
});

// Track click (public endpoint)
router.get('/track/:shortCode', async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.shortCode });

    if (!link || !link.isActive) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Check if expired
    if (link.expiresAt && new Date() > link.expiresAt) {
      return res.status(410).json({ message: 'Link expired' });
    }

    // Increment click count
    link.clicks += 1;
    await link.save();

    // Record analytics
    const Analytics = (await import('../models/Analytics')).Analytics;
    const userAgent = req.headers['user-agent'] || '';

    // Simple device detection
    const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
    const device = isMobile ? 'mobile' : 'desktop';

    // Simple browser detection
    let browser = 'other';
    if (userAgent.includes('Chrome')) browser = 'chrome';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Safari')) browser = 'safari';
    else if (userAgent.includes('Edge')) browser = 'edge';

    await Analytics.create({
      linkId: link._id,
      userId: link.userId,
      ipAddress: req.ip,
      userAgent,
      device,
      browser,
      referer: req.headers.referer || req.headers.referrer,
      timestamp: new Date(),
    });

    // Redirect to original URL
    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).json({ message: 'Failed to track link', error });
  }
});

// Generate QR code for a link
router.get('/:id/qrcode', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOne({ _id: req.params.id, userId: req.userId });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    const shortUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/${link.shortCode}`;

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(shortUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 300,
      margin: 2,
    });

    res.json({ qrCode: qrCodeDataUrl, shortUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate QR code', error });
  }
});

export default router;
