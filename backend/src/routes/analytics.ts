import express from 'express';
import { Link } from '../models/Link';
import { Analytics } from '../models/Analytics';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

type StatAccumulator = Record<string, number>;

const incrementStat = (acc: StatAccumulator, key: string | undefined) => {
  const safeKey = key && key.trim() !== '' ? key : 'unknown';
  acc[safeKey] = (acc[safeKey] || 0) + 1;
  return acc;
};

// Get analytics for a specific link
router.get('/:linkId', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOne({ _id: req.params.linkId, userId: req.userId });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    const analytics = await Analytics.find({ linkId: req.params.linkId })
      .sort({ timestamp: -1 })
      .limit(100);

    // Calculate stats
    const totalClicks = link.clicks;
    const uniqueVisitors = new Set(analytics.map(a => a.ipAddress)).size;

    // Group by date for chart data
    const clicksByDate: { [key: string]: number } = {};
    analytics.forEach(a => {
      const date = a.timestamp.toISOString().split('T')[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });

    // Device stats
    const deviceStats = analytics.reduce((acc, a) => {
      return incrementStat(acc, a.device);
    }, {} as StatAccumulator);

    // Browser stats
    const browserStats = analytics.reduce((acc, a) => {
      return incrementStat(acc, a.browser);
    }, {} as StatAccumulator);

    // Location stats
    const locationStats = analytics.reduce((acc, a) => {
      return incrementStat(acc, a.country);
    }, {} as StatAccumulator);

    res.json({
      linkId: link._id,
      shortCode: link.shortCode,
      originalUrl: link.originalUrl,
      totalClicks,
      uniqueVisitors,
      clicksByDate,
      deviceStats,
      browserStats,
      locationStats,
      recentClicks: analytics.slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error });
  }
});

// Get dashboard stats
router.get('/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ userId: req.userId });

    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

    // Get all analytics for user's links
    const linkIds = links.map(l => l._id);
    const analytics = await Analytics.find({ linkId: { $in: linkIds } });

    const uniqueVisitors = new Set(analytics.map(a => a.ipAddress)).size;
    const conversionRate = totalClicks > 0 ? (uniqueVisitors / totalClicks) * 100 : 0;

    res.json({
      totalLinks,
      totalClicks,
      uniqueVisitors,
      conversionRate: Math.round(conversionRate * 100) / 100,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error });
  }
});

export default router;
