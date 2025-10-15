import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

const router = express.Router();

// Sign up endpoint (matches frontend /api/auth/signup)
router.post("/signup", async (req, res) => {
  try {
    console.log("📝 Sign up request received:", { email: req.body.email, name: req.body.name });

    const { name, email, password } = req.body;

    // Check MongoDB connection
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({ message: "Database not available. Please try again." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️  User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash: hash });
    await user.save();

    console.log("✅ User created successfully:", { id: user._id, email: user.email });

    const token = generateToken(user._id.toString());
    res.json({
      token,
      user: {
        id: user._id.toString(), // Convert ObjectId to string
        _id: user._id.toString(), // Also include _id for compatibility
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Sign up error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Sign in endpoint (matches frontend /api/auth/signin)
router.post("/signin", async (req, res) => {
  try {
    console.log("🔐 Sign in request received:", { email: req.body.email });

    const { email, password } = req.body;

    // Check MongoDB connection
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({ message: "Database not available. Please try again." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️  User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      console.log("⚠️  Invalid password for:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ User signed in successfully:", { id: user._id, email: user.email });

    const token = generateToken(user._id.toString());
    res.json({
      token,
      user: {
        id: user._id.toString(), // Convert ObjectId to string
        _id: user._id.toString(), // Also include _id for compatibility
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Sign in error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Legacy endpoints for backward compatibility
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  req.body = { name, email, password };
  return router.post("/signup")(req, res);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  req.body = { email, password };
  return router.post("/signin")(req, res);
});

export default router;