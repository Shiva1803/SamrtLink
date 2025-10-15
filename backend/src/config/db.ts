import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri || mongoUri.trim() === '') {
      console.log("⚠️  MongoDB URI not configured. Running without database.");
      console.log("💡 Tip: Set MONGO_URI in your .env file");
      return;
    }

    // Set mongoose options for better error handling
    mongoose.set('strictQuery', false);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
      isConnected = false;
    });

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("⚠️  Server will continue without database");
    console.log("💡 To fix: Make sure MongoDB is running with 'brew services start mongodb-community'");
    isConnected = false;
  }
};

export const isMongoConnected = () => isConnected;
