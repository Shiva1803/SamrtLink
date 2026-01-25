import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

const router = express.Router();

type AuthPayload = {
  name?: string;
  email?: string;
  password?: string;
};

const getAuthPayload = (req: express.Request): AuthPayload => ({
  name: req.body?.name,
  email: req.body?.email,
  password: req.body?.password,
});

const isSignUpPayloadValid = (payload: AuthPayload): payload is Required<AuthPayload> =>
  Boolean(payload.name && payload.email && payload.password);

const isSignInPayloadValid = (payload: AuthPayload): payload is Required<Pick<AuthPayload, 'email' | 'password'>> =>
  Boolean(payload.email && payload.password);

const ensureMongoConnection = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

const handleSignUp = async (req: express.Request, res: express.Response) => {
  try {
    console.log("📝 Sign up request received:", { email: req.body.email, name: req.body.name });

    const payload = getAuthPayload(req);

    if (!isSignUpPayloadValid(payload)) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (!ensureMongoConnection()) {
      console.error("❌ MongoDB not connected. State:", require('mongoose').connection.readyState);
      return res.status(503).json({ message: "Database not available. Please try again." });
    }

    const existing = await User.findOne({ email: payload.email });
    if (existing) {
      console.log("⚠️  User already exists:", payload.email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(payload.password, 10);
    const user = new User({ name: payload.name, email: payload.email, passwordHash: hash });
    await user.save();

    console.log("✅ User created successfully:", { id: user._id, email: user.email });

    const token = generateToken(user._id.toString());
    return res.json({
      token,
      user: {
        id: user._id.toString(),
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Sign up error:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: "Server error", error: message });
  }
};

const handleSignIn = async (req: express.Request, res: express.Response) => {
  try {
    console.log("🔐 Sign in request received:", { email: req.body.email });

    const payload = getAuthPayload(req);

    if (!isSignInPayloadValid(payload)) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (!ensureMongoConnection()) {
      console.error("❌ MongoDB not connected. State:", require('mongoose').connection.readyState);
      return res.status(503).json({ message: "Database not available. Please try again." });
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      console.log("⚠️  User not found:", payload.email);
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(payload.password, user.passwordHash || '');
    if (!valid) {
      console.log("⚠️  Invalid password for:", payload.email);
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ User signed in successfully:", { id: user._id, email: user.email });

    const token = generateToken(user._id.toString());
    return res.json({
      token,
      user: {
        id: user._id.toString(),
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Sign in error:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: "Server error", error: message });
  }
};

// Sign up endpoint (matches frontend /api/auth/signup)
router.post("/signup", handleSignUp);

// Sign in endpoint (matches frontend /api/auth/signin)
router.post("/signin", handleSignIn);

// Legacy endpoints for backward compatibility
router.post("/register", handleSignUp);
router.post("/login", handleSignIn);

export default router;
