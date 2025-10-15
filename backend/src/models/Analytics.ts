import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: "Link", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ipAddress: String,
  userAgent: String,
  device: String,
  browser: String,
  country: String,
  city: String,
  referer: String,
  timestamp: { type: Date, default: Date.now }
});

export const Analytics = mongoose.model("Analytics", analyticsSchema);