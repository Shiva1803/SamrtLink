import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  bio: String,
  socialLinks: Object,
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);