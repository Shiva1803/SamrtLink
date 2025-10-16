import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import linkRoutes from "./routes/links";
import analyticsRoutes from "./routes/analytics";
import ingestRoutes from "./routes/ingest";
import chatRoutes from "./routes/chat";
import adminRoutes from "./routes/admin";

// Load environment variables FIRST
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ingest", ingestRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

// Public redirect endpoint - must be after API routes
app.get('/:shortCode', async (req, res) => {
  try {
    const { Link } = await import('./models/Link');
    const { Analytics } = await import('./models/Analytics');

    const link = await Link.findOne({ shortCode: req.params.shortCode });

    if (!link || !link.isActive) {
      return res.status(404).send('Link not found');
    }

    // Check if expired
    if (link.expiresAt && new Date() > link.expiresAt) {
      return res.status(410).send('Link expired');
    }

    // Increment click count
    link.clicks += 1;
    await link.save();

    // Record analytics
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
    const device = isMobile ? 'mobile' : 'desktop';

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
    console.error('Redirect error:', error);
    res.status(500).send('Server error');
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5001;

// Start server
const startServer = async () => {
  // Try to connect to MongoDB (won't crash if it fails)
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📡 API Base: http://localhost:${PORT}/api`);
    console.log('\n✨ Ready to accept requests!\n');
  });
};

startServer();
