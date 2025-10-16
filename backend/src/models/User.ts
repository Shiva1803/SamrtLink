import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  bio: String,
  socialLinks: Object,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);